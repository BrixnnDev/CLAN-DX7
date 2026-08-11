import { FaCrown, FaTrophy, FaGamepad, FaStar, FaChevronDown } from 'react-icons/fa'
import { miembros } from '../data/miembros'
import Solicitudes from '../components/Solicitudes'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const stats = [
  { icon: FaTrophy, value: 'Booyah', label: 'Victorias' },
  { icon: FaGamepad, value: 'X', label: 'ID Free Fire' },
  { icon: FaStar, value: 'X', label: 'Nivel' },
]

function Miembros() {
  return (
    <div className="min-h-screen bg-night-950">
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Img/FONDO%20MIEMBROS.webp')" }}
        />
        <div className="absolute inset-0 bg-night-950/80" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-night-950" />

        <div className="relative z-10 px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
            Miembros
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase sm:text-5xl">
            Los guerreros de <span className="text-clan-red-500">DX7</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-300 sm:text-base">
            Conoce a los miembros que hacen crecer al clan cada día.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-1">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">
            Scroll
          </span>
          <FaChevronDown className="h-5 w-5 animate-bounce text-clan-red-500" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {miembros.map(({ name, alias, role, tags, desc }) => (
              <div
                key={name}
                className="group rounded-xl border border-white/10 bg-night-900 p-6 transition hover:-translate-y-1 hover:border-clan-red-500/60"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-clan-red-500 to-clan-red-700 text-xl font-black text-white">
                    {initials(name)}
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold">
                      {name}
                      {(tags.includes('Líder') || tags.includes('Admin')) && (
                        <FaCrown className="h-4 w-4 text-clan-red-500" />
                      )}
                    </h3>
                    <p className="text-sm text-clan-red-500">
                      @{alias} · {role}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  {desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-clan-red-500/40 bg-clan-red-600/10 px-2.5 py-0.5 text-[10px] font-semibold text-clan-red-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/10 rounded-lg border border-white/10 bg-night-850">
                  {stats.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex flex-col items-center py-2">
                      <Icon className="h-4 w-4 text-clan-red-500" />
                      <span className="mt-1 text-sm font-bold">{value}</span>
                      <span className="text-[10px] uppercase text-gray-500">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Solicitudes />
    </div>
  )
}

export default Miembros
