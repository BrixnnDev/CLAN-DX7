import { FaShieldAlt, FaUsers, FaBan, FaGavel } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const previewRules = [
  {
    icon: FaUsers,
    title: 'Respeto ante todo',
    text: 'Trata a todos los miembros con respeto. Cero toxicidad, insultos o discriminación.',
  },
  {
    icon: FaBan,
    title: 'Sin trampas',
    text: 'Prohibido el uso de hacks o cualquier trampa. Reporta a quien los use.',
  },
  {
    icon: FaShieldAlt,
    title: 'Discord obligatorio',
    text: 'Todo miembro debe estar activo en nuestro Discord para coordinarse.',
  },
]

function ReglasPreview() {
  return (
    <section id="reglas" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
            Reglas
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
            Código del <span className="text-clan-red-500">clan</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400">
            Estas son las reglas esenciales que todo miembro debe cumplir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {previewRules.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 p-6 transition hover:-translate-y-1 hover:border-clan-red-500/60"
            >
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-clan-red-600/15 text-clan-red-500">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold uppercase tracking-wide">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/reglas"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
          >
            <FaGavel className="h-4 w-4" />
            Ver más reglas
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ReglasPreview
