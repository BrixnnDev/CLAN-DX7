import { useEffect, useState } from 'react'
import {
  FaGamepad,
  FaHashtag,
  FaUserPlus,
  FaDiscord,
  FaExclamationTriangle,
} from 'react-icons/fa'

const API = import.meta.env.VITE_API_URL ?? ''

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'ahora mismo'
  if (min < 60) return `hace ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.floor(h / 24)
  return `hace ${d} día${d > 1 ? 's' : ''}`
}

function Solicitudes() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!API) {
      setLoading(false)
      setError(true)
      return
    }
    let active = true
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/team-requests`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        if (active) setRequests(data.requests ?? [])
      } catch {
        if (active) setError(true)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    const id = setInterval(load, 5000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
            Miembros verificados
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
            Nuestros <span className="text-clan-red-500">integrantes</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
            Jugadores que pasaron la verificación con el comando /team en
            Discord y fueron aprobados por nuestros administradores.
          </p>
        </div>

        {!API && (
          <div className="mx-auto max-w-lg rounded-xl border border-white/10 p-6 text-center">
            <FaExclamationTriangle className="mx-auto h-6 w-6 text-clan-red-500" />
            <p className="mt-3 text-sm text-gray-400">
              Define la variable <code className="text-clan-red-500">VITE_API_URL</code>{' '}
              en Vercel con la URL de tu servidor para mostrar las solicitudes.
            </p>
          </div>
        )}

        {error && API && (
          <div className="mx-auto max-w-lg rounded-xl border border-white/10 p-6 text-center">
            <FaExclamationTriangle className="mx-auto h-6 w-6 text-clan-red-500" />
            <p className="mt-3 text-sm text-gray-400">
              No se pudo conectar con el servidor del bot. Verifica que esté
              activo.
            </p>
          </div>
        )}

        {loading && (
          <p className="text-center text-sm text-gray-400">Cargando solicitudes...</p>
        )}

        {!loading && !error && API && requests.length === 0 && (
          <p className="text-center text-sm text-gray-400">
            Aún no hay miembros verificados. Usa <span className="text-clan-red-500">/team</span> en
            el Discord del clan y espera la aprobación de un administrador.
          </p>
        )}

        {requests.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-white/10 bg-night-900 p-6 transition hover:-translate-y-1 hover:border-clan-red-500/60"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={r.avatar}
                    alt={r.discordUser}
                    referrerPolicy="no-referrer"
                    className="h-16 w-16 shrink-0 rounded-full border-2 border-clan-red-600/60 object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 text-lg font-bold">
                      {r.gameName}
                    </h3>
                    <p className="flex items-center gap-1.5 truncate text-sm text-gray-400">
                      <FaDiscord className="h-3.5 w-3.5 text-clan-red-500" />
                      @{r.discordUser}
                    </p>
                    <span
                      className="mt-1.5 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
                      style={{
                        borderColor: r.roleColor
                          ? `#${r.roleColor.toString(16).padStart(6, '0')}66`
                          : undefined,
                        color: r.roleColor
                          ? `#${r.roleColor.toString(16).padStart(6, '0')}`
                          : '#f87171',
                      }}
                    >
                      {r.role}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/10 bg-night-850 p-3 text-center">
                    <FaGamepad className="mx-auto h-4 w-4 text-clan-red-500" />
                    <p className="mt-1 truncate text-sm font-bold">{r.gameName}</p>
                    <p className="text-[10px] uppercase text-gray-500">
                      Nombre en el juego
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-night-850 p-3 text-center">
                    <FaHashtag className="mx-auto h-4 w-4 text-clan-red-500" />
                    <p className="mt-1 truncate text-sm font-bold">{r.gameId}</p>
                    <p className="text-[10px] uppercase text-gray-500">ID del juego</p>
                  </div>
                </div>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500">
                  <FaUserPlus className="h-3 w-3 text-clan-red-500" />
                  {timeAgo(r.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Solicitudes
