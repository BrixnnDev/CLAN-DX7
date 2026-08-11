import { useEffect, useRef, useState } from 'react'
import { FiBell } from 'react-icons/fi'
import {
  FaGift,
  FaCrosshairs,
  FaUserPlus,
  FaBullhorn,
  FaDiscord,
} from 'react-icons/fa'

const placeholder = [
  {
    icon: FaGift,
    title: 'Sorteo de diamantes',
    text: 'Este sÃ¡bado sorteo de 500 diamantes para miembros activos.',
    time: 'hace 1 h',
  },
  {
    icon: FaCrosshairs,
    title: 'Scrim el viernes',
    text: 'Scrim contra un clan rival. Confirma asistencia en Discord.',
    time: 'hace 3 h',
  },
  {
    icon: FaUserPlus,
    title: 'Nuevo miembro',
    text: 'Carlos se uniÃ³ al clan. Â¡Bienvenido al equipo DX7!',
    time: 'hace 1 dÃ­a',
  },
]

const iconMap = {
  sorteo: FaGift,
  scrim: FaCrosshairs,
  miembro: FaUserPlus,
  anuncio: FaBullhorn,
}

const API = import.meta.env.VITE_API_URL ?? ''

function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(placeholder)
  const ref = useRef(null)

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    if (!API) return
    let active = true
    const load = async () => {
      try {
        const res = await fetch(`${API}/notifications`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        if (active && Array.isArray(data) && data.length > 0) {
          setNotifications(
            data.map((n) => ({
              icon: iconMap[n.type] ?? FaBullhorn,
              title: n.title,
              text: n.text,
              time: n.time ?? 'ahora',
            })),
          )
        }
      } catch {
        /* mantiene las notificaciones de ejemplo */
      }
    }
    load()
    const id = setInterval(load, 30000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Notificaciones"
        onClick={() => setOpen((prev) => !prev)}
        className={`grid h-10 w-10 place-items-center rounded-full border transition ${
          open
            ? 'border-clan-red-500 text-clan-red-500'
            : 'border-white/10 text-gray-300 hover:border-clan-red-500 hover:text-clan-red-500'
        }`}
      >
        <FiBell className="h-5 w-5" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-clan-red-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-2xl border border-white/10 bg-night-900 shadow-2xl shadow-black/60">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-sm font-bold uppercase tracking-wider">
              Notificaciones
            </span>
            <FaDiscord className="h-4 w-4 text-clan-red-500" />
          </div>

          <ul className="scrollbar-hidden max-h-72 overflow-y-auto">
            {notifications.length === 0 && (
              <li className="flex flex-col items-center px-4 py-8 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-clan-red-600/15 text-clan-red-500">
                  <FaBullhorn className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-bold">
                  Aún no hay notificaciones
                </p>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Únete al clan DX7 para recibir anuncios, sorteos, scrims y
                  todas las novedades del equipo. ¡No te pierdas nada!
                </p>
                <a
                  href="/#unete"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:brightness-110"
                >
                  <FaDiscord className="h-3.5 w-3.5" />
                  Unirme al clan
                </a>
              </li>
            )}
            {notifications.map(({ icon: Icon, title, text, time }, index) => (
              <li
                key={`${title}-${index}`}
                className="flex gap-3 border-b border-white/5 px-4 py-3 transition hover:bg-white/5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-clan-red-600/15 text-clan-red-500">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-gray-400">
                    {text}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-500">
                    <FaBullhorn className="h-2.5 w-2.5 text-clan-red-500" />
                    {time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown

