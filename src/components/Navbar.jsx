import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import NotificationDropdown from './NotificationDropdown'

const links = [
  { label: 'INICIO', to: '/#inicio' },
  { label: 'NOSOTROS', to: '/#nosotros' },
  { label: 'MIEMBROS', to: '/#miembros' },
  { label: 'REGLAS', to: '/reglas' },
  { label: 'CONTACTO', to: '/contacto' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const transparent = pathname === '/contacto' || !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-white/10 bg-night-950/90 backdrop-blur'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/favicon.png"
            alt="Logo DX7"
            className="h-9 w-9 rounded object-cover"
          />
          <span className="text-lg font-extrabold tracking-wide">
            CLAN <span className="text-clan-red-500">| DX7</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="text-sm font-semibold tracking-wider text-gray-300 transition hover:text-clan-red-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <NotificationDropdown />

          <button
            type="button"
            aria-label="Abrir menú"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-gray-300 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-night-950/95 px-4 pb-4 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-2 text-sm font-semibold tracking-wider text-gray-300 transition hover:bg-white/5 hover:text-clan-red-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
