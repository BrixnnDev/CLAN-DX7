import { Link } from 'react-router-dom'
import {
  FaCrown,
  FaChevronRight,
  FaInstagram,
  FaTiktok,
  FaDiscord,
  FaInfoCircle,
} from 'react-icons/fa'
import { admins } from '../data/miembros'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function AdminPreview() {
  return (
    <section id="miembros" className="scroll-mt-20 pt-4">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-6 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
            Miembros
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
            Administradores
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
            El staff que mantiene a DX7 en la cima.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/10">
            <img
              src="/Img/LOGO%20ADMIN.webp"
              alt="Logo de administradores DX7"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {admins.map(({ name, alias, tags }) => (
                <div
                  key={name}
                  className="group rounded-xl border border-white/10 p-4 text-center transition hover:-translate-y-1 hover:border-white/25"
                >
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-clan-red-500 to-clan-red-700 text-base font-black text-white">
                    {initials(name)}
                  </div>
                  <h3 className="mt-2.5 text-sm font-bold">{name}</h3>
                  {alias && <p className="text-xs text-clan-red-500">@{alias}</p>}
                  <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[9px] font-semibold text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {[
                      { icon: FaInstagram, label: 'Instagram' },
                      { icon: FaTiktok, label: 'TikTok' },
                      { icon: FaDiscord, label: 'Discord' },
                    ].map(({ icon: Icon, label }) => (
                      <a
                        key={label}
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-gray-300 transition hover:border-clan-red-500 hover:text-clan-red-500"
                      >
                        <Icon className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-clan-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-clan-red-600/10"
                    >
                      <FaInfoCircle className="h-2.5 w-2.5" />
                      Información
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/miembros"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:brightness-110"
              >
                <FaCrown className="h-3.5 w-3.5" />
                Ver todos los miembros
                <FaChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminPreview
