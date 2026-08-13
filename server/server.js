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
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  PermissionsBitField,
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
const VERIFY_CHANNEL_ID = process.env.VERIFY_CHANNEL_ID ?? ''
const ROLE_ID = process.env.ROLE_ID ?? ''
const VERIFY_ROLE_ID = process.env.VERIFY_ROLE_ID ?? ''
const MEMBER_ROLE_ID = process.env.MEMBER_ROLE_ID ?? ''
const API_SECRET = process.env.API_SECRET ?? ''
const GUILD_ID = process.env.GUILD_ID ?? ''
const PORT = process.env.PORT ?? 3000

const FF_API_URL = process.env.FF_API_URL ?? 'https://developers.freefirecommunity.com/api/v1/info'
const FF_API_KEY = process.env.FF_API_KEY ?? ''
const FF_REGIONS = (process.env.FF_REGIONS ?? 'br,latam,us,ind,id,pk,vn,sg')
  .split(',')
  .map((r) => r.trim())
  .filter(Boolean)

const FF_RANK_MAP = {
  296: 'Bronce I', 297: 'Bronce II', 298: 'Bronce III',
  299: 'Plata I', 300: 'Plata II', 301: 'Plata III',
  302: 'Oro I', 303: 'Oro II', 304: 'Oro III', 305: 'Oro IV',
  306: 'Platino I', 307: 'Platino II', 308: 'Platino III', 309: 'Platino IV',
  310: 'Diamante I', 311: 'Diamante II', 312: 'Diamante III', 313: 'Diamante IV', 314: 'Diamante V',
  315: 'Maestro I', 316: 'Maestro II', 317: 'Maestro III', 318: 'Maestro IV', 319: 'Maestro V',
  320: 'Gran Maestro I', 321: 'Gran Maestro II', 322: 'Gran Maestro III', 323: 'Gran Maestro IV',
  324: 'Gran Maestro V', 325: 'Gran Maestro VI', 326: 'Gran Maestro VII', 327: 'Héroe',
}

async function fetchPlayerInfo(uid) {
  const headers = { Accept: 'application/json' }
  if (FF_API_KEY) headers['x-api-key'] = FF_API_KEY
  for (const region of FF_REGIONS) {
    try {
      const res = await fetch(
        `${FF_API_URL}?region=${encodeURIComponent(region)}&uid=${encodeURIComponent(uid)}`,
        { headers, signal: AbortSignal.timeout(8000) },
      )
      if (!res.ok) continue
      const data = await res.json()
      const basic =
        data?.basicInfo ??
        data?.basicinfo ??
        data?.result?.basicinfo ??
        data?.data?.basicInfo ??
        data
      const nickname = basic?.nickname
      if (!nickname) continue
      const clan = data?.clanBasicInfo ?? data?.claninfo ?? {}
      return {
        nickname,
        level: basic.level ?? null,
        rank: FF_RANK_MAP[basic.rank] ?? basic.rank ?? null,
        likes: basic.liked ?? null,
        region: (basic.region ?? region).toUpperCase(),
        clanName: clan.clanName ?? clan.clanname ?? null,
        clanLevel: clan.clanLevel ?? clan.clanlevel ?? null,
        clanMembers: clan.memberNum ?? clan.membernum ?? null,
      }
    } catch {
      continue
    }
  }
  return null
}

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

function updateRequest(id, patch) {
  const requests = loadRequests()
  const i = requests.findIndex((r) => r.id === id)
  if (i === -1) return null
  requests[i] = { ...requests[i], ...patch }
  saveRequests(requests)
  return requests[i]
}

function buildRoleOptions(guild) {
  return [...(guild?.roles.cache.values() ?? [])]
    .filter((r) => r.name !== '@everyone' && !r.managed)
    .sort((a, b) => b.position - a.position)
    .slice(0, 25)
    .map((r) => ({ label: r.name, value: r.id }))
}

function buildAdminEmbed(request, guild) {
  const selected = request.selectedRoleId
    ? guild?.roles.resolve(request.selectedRoleId)
    : null
  const fields = [
    { name: 'Usuario', value: `@${request.discordUser}`, inline: true },
    { name: 'Rol actual', value: request.role, inline: true },
    { name: 'Nombre en el juego', value: request.gameName, inline: true },
    { name: 'ID del juego', value: request.gameId, inline: true },
  ]
  if (request.ffLevel) {
    fields.push({ name: 'Nivel', value: `${request.ffLevel}`, inline: true })
  }
  if (request.ffRank) {
    fields.push({ name: 'Rango', value: request.ffRank, inline: true })
  }
  if (request.ffClan) {
    fields.push({
      name: 'Clan',
      value: request.ffClan + (request.ffLevel ? '' : ''),
      inline: true,
    })
  }
  if (request.ffRegion) {
    fields.push({ name: 'Región', value: request.ffRegion, inline: true })
  }
  fields.push({ name: 'Rol a asignar', value: selected ? selected.name : 'No elegido' })
  return new EmbedBuilder()
    .setColor(0xb91c1c)
    .setTitle('Nueva solicitud para DX7')
    .setDescription(`Solicitud de <@${request.discordId}>`)
    .setThumbnail(request.avatar)
    .addFields(fields)
    .setFooter({ text: 'Elige el rol en el menú y luego presiona Aprobar' })
    .setTimestamp()
}

function buildAdminRows(request, guild) {
  const rows = []
  const roleOptions = buildRoleOptions(guild)
  if (roleOptions.length) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId(`dx7:select:${request.id}`)
      .setPlaceholder('Elige el rol a asignar')
      .addOptions(roleOptions)
    rows.push(new ActionRowBuilder().addComponents(menu))
  }
  const approveBtn = new ButtonBuilder()
    .setCustomId(`dx7:approve:${request.id}`)
    .setLabel('Aprobar')
    .setStyle(ButtonStyle.Success)
  const rejectBtn = new ButtonBuilder()
    .setCustomId(`dx7:reject:${request.id}`)
    .setLabel('Rechazar')
    .setStyle(ButtonStyle.Danger)
  rows.push(new ActionRowBuilder().addComponents(approveBtn, rejectBtn))
  return rows
}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true, bot: !!DISCORD_TOKEN })
})

app.get('/api/team-requests', (_req, res) => {
  res.json({ requests: loadRequests().filter((r) => r.status === 'approved') })
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
    status: 'pending',
    createdAt: new Date().toISOString(),
  })
  res.status(201).json({ ok: true, request })
})

app.get('/api/notifications', (_req, res) => {
  res.json([])
})

const isAuthorized = (req) =>
  !API_SECRET || req.headers['x-api-secret'] === API_SECRET

app.delete('/api/team-requests/all', (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ error: 'No autorizado' })
  saveRequests([])
  res.json({ ok: true })
})

app.delete('/api/team-requests/:id', (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ error: 'No autorizado' })
  const requests = loadRequests().filter((r) => r.id !== req.params.id)
  saveRequests(requests)
  res.json({ ok: true })
})

app.get('/api/admin/clear', (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ error: 'No autorizado' })
  saveRequests([])
  res.json({ ok: true })
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
    console.log(
      `Servidores del bot: ${client.guilds.cache.map((g) => `${g.name} (${g.id})`).join(', ') || 'NINGUNO (no esta en ningun servidor)'}`,
    )
    try {
      if (GUILD_ID) {
        const guild = client.guilds.cache.get(GUILD_ID)
        if (guild) {
          await guild.commands.create(teamCommand)
          console.log(`Comando /team registrado AL INSTANTE en el servidor ${guild.name}`)
        } else {
          console.warn(
            `No encontre el servidor con ID ${GUILD_ID}. Revisa el GUILD_ID o que el bot este invitado ahi.`,
          )
        }
      } else {
        await client.application.commands.create(teamCommand)
        console.log('Comando /team registrado (global, puede tardar hasta 1 hora en aparecer)')
      }
    } catch (error) {
      console.error('No se pudo registrar el comando:', error.message)
    }
  })

  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      if (interaction.isChatInputCommand() && interaction.commandName === 'team') {
        if (VERIFY_CHANNEL_ID && interaction.channelId !== VERIFY_CHANNEL_ID) {
          return interaction.reply({
            content: `⚠️ Usa /team solo en el canal de verificación del clan.`,
            ephemeral: true,
          })
        }

        const modal = new ModalBuilder()
          .setCustomId('team_modal')
          .setTitle('Solicitud para unirte a DX7')

        const idJuego = new TextInputBuilder()
          .setCustomId('id_juego')
          .setLabel('ID del juego (perfil → Copiar ID)')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(30)

        modal.addComponents(new ActionRowBuilder().addComponents(idJuego))

        await interaction.showModal(modal)
        return
      }

      if (interaction.isModalSubmit() && interaction.customId === 'team_modal') {
        const uid = interaction.fields.getTextInputValue('id_juego').trim()
        const user = interaction.user
        const member = interaction.member

        const info = await fetchPlayerInfo(uid)
        if (!info) {
          return interaction.reply({
            content:
              '❌ No encontré un jugador de Free Fire con ese ID. Revisa que sea tu ID de perfil e inténtalo de nuevo.',
            ephemeral: true,
          })
        }

        const request = addRequest({
          id: `${Date.now()}`,
          discordUser: user.username,
          discordId: user.id,
          avatar: user.displayAvatarURL({ extension: 'png', size: 256 }),
          role: member?.roles?.highest?.name ?? 'Miembro',
          roleColor: member?.roles?.highest?.color ?? 0,
          gameName: info.nickname,
          gameId: uid,
          ffLevel: info.level ?? null,
          ffRank: info.rank ?? null,
          ffClan: info.clanName ?? null,
          ffRegion: info.region ?? null,
          status: 'pending',
          createdAt: new Date().toISOString(),
        })

        if (ADMIN_CHANNEL_ID) {
          const channel = await client.channels.fetch(ADMIN_CHANNEL_ID).catch(() => null)
          if (channel?.isTextBased()) {
            await channel.send({
              embeds: [buildAdminEmbed(request, interaction.guild)],
              components: buildAdminRows(request, interaction.guild),
            })
          }
        }

        await interaction.reply({
          content: `✅ Jugador encontrado: **${info.nickname}** (Nivel ${info.level ?? '?'}${info.rank ? ` · ${info.rank}` : ''}${info.clanName ? ` · Clan ${info.clanName}` : ''}). Tu solicitud fue enviada; un administrador la revisará.`,
          ephemeral: true,
        })
        return
      }

      if (interaction.isStringSelectMenu()) {
        const [prefix, action, requestId] = interaction.customId.split(':')
        if (prefix !== 'dx7' || action !== 'select') return

        const isAdmin =
          interaction.member?.permissions?.has(PermissionsBitField.Flags.Administrator)
        if (!isAdmin) {
          return interaction.reply({
            content: '❌ Solo un administrador puede elegir el rol.',
            ephemeral: true,
          })
        }

        const roleId = interaction.values[0]
        updateRequest(requestId, { selectedRoleId: roleId })

        const request = loadRequests().find((r) => r.id === requestId)
        if (!request) {
          return interaction.reply({ content: 'Solicitud no encontrada.', ephemeral: true })
        }

        await interaction.message.edit({
          embeds: [buildAdminEmbed(request, interaction.guild)],
          components: buildAdminRows(request, interaction.guild),
        })
        await interaction.reply({
          content: `Rol guardado: @${interaction.guild?.roles.resolve(roleId)?.name ?? '?'}. Ahora presiona Aprobar.`,
          ephemeral: true,
        })
        return
      }

      if (interaction.isButton()) {
        const [prefix, action, requestId] = interaction.customId.split(':')
        if (prefix !== 'dx7') return

        const isAdmin =
          interaction.member?.permissions?.has(PermissionsBitField.Flags.Administrator)
        if (!isAdmin) {
          return interaction.reply({
            content: '❌ Solo un administrador puede aprobar o rechazar solicitudes.',
            ephemeral: true,
          })
        }

        const request = loadRequests().find((r) => r.id === requestId)
        if (!request) {
          return interaction.reply({
            content: 'Solicitud no encontrada.',
            ephemeral: true,
          })
        }
        if (request.status !== 'pending') {
          return interaction.reply({
            content: `Esta solicitud ya fue ${request.status === 'approved' ? 'aprobada' : 'rechazada'}.`,
            ephemeral: true,
          })
        }

        if (action === 'approve') {
          const guild = interaction.guild
          const target = await guild?.members.fetch(request.discordId).catch(() => null)
          const assigned = []

          const addRole = async (roleId) => {
            const role = guild?.roles.resolve(roleId)
            if (!role) return
            if (target) {
              await target.roles.add(roleId).catch((e) => {
                console.error(`No se pudo asignar el rol ${roleId}:`, e.message)
              })
            }
            if (!assigned.includes(role.name)) assigned.push(role.name)
          }

          if (VERIFY_ROLE_ID) {
            await addRole(VERIFY_ROLE_ID)
          }
          if (MEMBER_ROLE_ID) {
            await addRole(MEMBER_ROLE_ID)
          }
          if (request.selectedRoleId) {
            await addRole(request.selectedRoleId)
          } else if (ROLE_ID) {
            for (const roleId of ROLE_ID.split(',').map((r) => r.trim()).filter(Boolean)) {
              await addRole(roleId)
            }
          }

          updateRequest(requestId, {
            status: 'approved',
            role: assigned.length ? assigned.join(' · ') : request.role,
            reviewedAt: new Date().toISOString(),
          })
          await interaction.message.edit({ components: [] })
          await interaction.reply({
            content: `✅ Solicitud de ${request.gameName} aprobada. Roles asignados: ${assigned.join(' · ') || request.role}. Ya aparece en la página de miembros.`,
            ephemeral: true,
          })
        } else {
          updateRequest(requestId, {
            status: 'rejected',
            reviewedAt: new Date().toISOString(),
          })
          await interaction.message.edit({ components: [] })
          await interaction.reply({
            content: `❌ Solicitud de ${request.gameName} rechazada.`,
            ephemeral: true,
          })
        }
        return
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
