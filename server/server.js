import express from 'express'
import cors from 'cors'
import {
  Client,
  GatewayIntentBits,
  Events,
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} from 'discord.js'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')
const DATA_FILE = join(DATA_DIR, 'team.json')
const MAX_REQUESTS = 100

const DISCORD_TOKEN = process.env.DISCORD_TOKEN ?? ''
const ADMIN_CHANNEL_ID = process.env.ADMIN_CHANNEL_ID ?? ''
const API_SECRET = process.env.API_SECRET ?? ''
const PORT = process.env.PORT ?? 3000

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })

function loadRequests() {
  try {
    if (!existsSync(DATA_FILE)) return []
    return JSON.parse(readFileSync(DATA_FILE, 'utf8'))
  } catch {
    return []
  }
}

function saveRequests(requests) {
  writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2))
}

function addRequest(request) {
  const requests = loadRequests()
  requests.unshift(request)
  saveRequests(requests.slice(0, MAX_REQUESTS))
  return request
}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true, bot: !!DISCORD_TOKEN })
})

app.get('/api/team-requests', (_req, res) => {
  res.json({ requests: loadRequests() })
})

app.post('/api/team-requests', (req, res) => {
  if (API_SECRET && req.headers['x-api-secret'] !== API_SECRET) {
    return res.status(401).json({ error: 'No autorizado' })
  }
  const { discordUser, discordId, avatar, role, roleColor, gameName, gameId } =
    req.body ?? {}
  if (!discordUser || !gameName || !gameId) {
    return res.status(400).json({ error: 'Faltan datos' })
  }
  const request = addRequest({
    id: `${Date.now()}`,
    discordUser,
    discordId,
    avatar,
    role,
    roleColor,
    gameName,
    gameId,
    createdAt: new Date().toISOString(),
  })
  res.status(201).json({ ok: true, request })
})

app.get('/api/notifications', (_req, res) => {
  res.json([])
})

app.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT}`)
})

if (!DISCORD_TOKEN) {
  console.warn('AVISO: DISCORD_TOKEN no está configurado. El bot no se conectará.')
} else {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  })

  const teamCommand = new SlashCommandBuilder()
    .setName('team')
    .setDescription('Envía tu solicitud para unirte al clan DX7')

  client.on(Events.ClientReady, async () => {
    console.log(`Bot listo como ${client.user.tag}`)
    try {
      await client.application.commands.create(teamCommand)
      console.log('Comando /team registrado (global)')
    } catch (error) {
      console.error('No se pudo registrar el comando:', error.message)
    }
  })

  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      if (interaction.isChatInputCommand() && interaction.commandName === 'team') {
        const modal = new ModalBuilder()
          .setCustomId('team_modal')
          .setTitle('Solicitud para unirte a DX7')

        const nombreJuego = new TextInputBuilder()
          .setCustomId('nombre_juego')
          .setLabel('Nombre dentro del juego')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(30)

        const idJuego = new TextInputBuilder()
          .setCustomId('id_juego')
          .setLabel('ID del juego')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(30)

        modal.addComponents(
          new ActionRowBuilder().addComponents(nombreJuego),
          new ActionRowBuilder().addComponents(idJuego),
        )

        await interaction.showModal(modal)
        return
      }

      if (interaction.isModalSubmit() && interaction.customId === 'team_modal') {
        const nombreJuego = interaction.fields.getTextInputValue('nombre_juego')
        const idJuego = interaction.fields.getTextInputValue('id_juego')
        const user = interaction.user
        const member = interaction.member

        const role = member?.roles?.highest?.name ?? 'Miembro'
        const roleColor = member?.roles?.highest?.color ?? 0

        const request = addRequest({
          id: `${Date.now()}`,
          discordUser: user.username,
          discordId: user.id,
          avatar: user.displayAvatarURL({ extension: 'png', size: 256 }),
          role,
          roleColor,
          gameName: nombreJuego,
          gameId: idJuego,
          createdAt: new Date().toISOString(),
        })

        if (ADMIN_CHANNEL_ID) {
          const channel = await client.channels.fetch(ADMIN_CHANNEL_ID).catch(() => null)
          if (channel?.isTextBased()) {
            const embed = new EmbedBuilder()
              .setColor(0xb91c1c)
              .setTitle('Nueva solicitud para DX7')
              .setThumbnail(request.avatar)
              .addFields(
                { name: 'Usuario', value: `@${request.discordUser}`, inline: true },
                { name: 'Rol', value: request.role, inline: true },
                { name: 'Nombre en el juego', value: request.gameName, inline: true },
                { name: 'ID del juego', value: request.gameId, inline: true },
              )
              .setTimestamp()
            await channel.send({ embeds: [embed] })
          }
        }

        await interaction.reply({
          content:
            '✅ ¡Solicitud enviada! Nuestros administradores la revisarán pronto.',
          ephemeral: true,
        })
      }
    } catch (error) {
      console.error('Error en interacción:', error)
    }
  })

  client.login(DISCORD_TOKEN).catch((error) => {
    console.error('ERROR al conectar el bot:', error.message)
    console.error(
      'Revisa que DISCORD_TOKEN sea el token real de la pagina Bot (empieza con MT y tiene 3 partes separadas por punto)',
    )
  })
}

process.on('unhandledRejection', (reason) => {
  console.error('Promesa no manejada:', reason)
})
process.on('uncaughtException', (error) => {
  console.error('Excepcion no controlada:', error.message)
})
