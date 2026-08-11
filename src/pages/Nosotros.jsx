import { Link } from 'react-router-dom'
import {
  FaUsers,
  FaTrophy,
  FaCrosshairs,
  FaEye,
  FaHeart,
  FaRocket,
  FaDiscord,
} from 'react-icons/fa'

const stats = [
  { icon: FaUsers, value: '+50', label: 'Miembros' },
  { icon: FaTrophy, value: '+100', label: 'Booyahs' },
  { icon: FaCrosshairs, value: '+20', label: 'Torneos' },
  { icon: FaRocket, value: '2024', label: 'Desde' },
]

const values = [
  {
    icon: FaCrosshairs,
    title: 'Misión',
    text: 'Formar un equipo competitivo y unido, donde cada miembro pueda mejorar su nivel y disfrutar el juego.',
  },
  {
    icon: FaEye,
    title: 'Visión',
    text: 'Ser uno de los clanes más reconocidos de la comunidad de Free Fire en Latinoamérica.',
  },
  {
    icon: FaHeart,
    title: 'Valores',
    text: 'Respeto, constancia, trabajo en equipo y pasión por competir. Eso es lo que nos mueve.',
  },
]

function Nosotros() {
  return (
    <div className="min-h-screen bg-night-950">
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Img/FONDO%20NOSOTROS.png')" }}
        />
        <div className="absolute inset-0 bg-night-950/80" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-950 to-transparent" />

        <div className="relative z-10 px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
            Nosotros
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase sm:text-5xl">
            Conoce más sobre <span className="text-clan-red-500">DX7</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-300 sm:text-base">
            Nacimos para competir y crecer. Somos una familia que entrena,
            juega y celebra cada victoria junta.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16">

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 p-5 text-center"
            >
              <Icon className="mx-auto h-6 w-6 text-clan-red-500" />
              <p className="mt-2 text-2xl font-black">{value}</p>
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 p-6 transition hover:border-clan-red-500/60"
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

        <div className="mt-16 rounded-2xl border border-clan-red-500/40 p-8 text-center sm:p-10">
          <h3 className="text-2xl font-black uppercase">
            ¿Listo para unirte a la <span className="text-clan-red-500">familia</span>?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-400">
            Únete a nuestro Discord y comienza tu prueba en el clan DX7.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
            >
              <FaDiscord className="h-4 w-4" />
              Unirme al Discord
            </a>
            <Link
              to="/contacto"
              className="inline-block rounded-lg border border-white/20 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-clan-red-500 hover:text-clan-red-500"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nosotros
