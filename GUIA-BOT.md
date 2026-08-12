# GUÍA: Bot de Discord /team + API (Render) + Web (Vercel)

Sistema de solicitudes del clan DX7:
- El bot de Discord recibe `/team` con un formulario (nombre e ID del juego).
- El rol, el avatar y el usuario se toman automáticamente de Discord.
- Las solicitudes se guardan en `server/data/team.json` (API Express).
- La página `/miembros` las muestra como cards (se refresca cada 30 s).

## Paso 1 — Crear el bot en Discord (token)

1. Entra a https://discord.com/developers/applications → **New Application** → nombre: `DX7 Bot` → **Create**.
2. Menú izquierdo → **Bot** → **Reset Token** → **Confirm** → copia y guarda el token (solo se ve una vez).
3. Baja a **Privileged Gateway Intents** y activa **SERVER MEMBERS INTENT** → **Save** (necesario para leer roles).
4. Menú **OAuth2 → URL Generator** → marca:
   - **Scopes:** `bot` y `applications.commands`
   - **Bot Permissions:** `Send Messages`, `Embed Links`, `Read Messages/View Channels` (o `Administrator`).
5. Copia la URL generada, ábrela en el navegador y agrega el bot a tu servidor del clan.

### Config local (opcional)
Copia `server/.env.example` a `server/.env` y pega tu token:
```
DISCORD_TOKEN=tu_token_aqui
ADMIN_CHANNEL_ID=
API_SECRET=
PORT=3000
```
Prueba local:
```
cd server
bun install
bun server.js
```
Luego en Discord escribe `/team` y llena el formulario.

## Paso 2 — Subir el bot a Render (gratis, 24/7)

1. https://dashboard.render.com → **New → Web Service** → conecta el repo `CLAN-DX7`.
2. Configuración:
   - **Name:** `dx7-bot`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** **Free** (se duerme a los 15 min sin uso; se despierta solo).
3. Pestaña **Environment** → añade:
   - `DISCORD_TOKEN` = tu token
   - `ADMIN_CHANNEL_ID` = ID de un canal de Discord (clic derecho → Copiar ID, con Modo desarrollador activado).
   - `API_SECRET` = texto secreto opcional.
4. **Create Web Service** → espera a que diga **Live** → copia la URL: `https://dx7-bot.onrender.com`.
5. Verifica en el navegador: `https://dx7-bot.onrender.com/health` → `{"ok":true}`.
6. En Discord: `/team` debe abrir el formulario.

## Paso 3 — Conectar la web en Vercel

1. https://vercel.com → proyecto `CLAN-DX7` → **Settings → Environment Variables**.
2. Añade: `VITE_API_URL = https://dx7-bot.onrender.com`
3. **Redeploy** para que tome el cambio.

## Paso 4 — Probar el flujo completo

1. En el Discord del clan: `/team` → llena el formulario → enviar.
2. La solicitud aparece en `/miembros` como card (avatar, rol, nombre e ID del juego).
3. Si `ADMIN_CHANNEL_ID` está configurado, llega un embed al canal admin.

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado del servidor |
| GET | `/api/team-requests` | Lista de solicitudes |
| POST | `/api/team-requests` | Crear solicitud (requiere `x-api-secret` si hay `API_SECRET`) |
| GET | `/api/notifications` | Notificaciones para el dropdown |

## Notas
- `server/data/team.json` y `.env` están en `.gitignore` (no se suben al repo).
- Máximo 100 solicitudes guardadas (las más recientes).
- `VITE_API_URL` sin valor muestra un aviso en la sección de solicitudes.
