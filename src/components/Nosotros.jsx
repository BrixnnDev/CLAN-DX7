import { Link } from 'react-router-dom'
import { FaTrophy, FaUsers, FaGift, FaBolt } from 'react-icons/fa'

const features = [
  {
    icon: FaTrophy,
    title: 'Competitivo',
    text: 'Entrenamos en rangos altos y torneos para llevar al clan a la cima de Free Fire.',
  },
  {
    icon: FaUsers,
    title: 'Trabajo en equipo',
    text: 'Coordinación, rotación y comunicación constante en cada partida.',
  },
  {
    icon: FaGift,
    title: 'Regalos y sorteos',
    text: 'Sorteamos diamantes, membresías y premios entre nuestros miembros activos.',
  },
  {
    icon: FaBolt,
    title: 'Compromiso',
    text: 'Exigimos constancia y actitud: aquí todos entrenan para mejorar cada día.',
  },
]

function Nosotros() {
  return (
    <>
      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-night-950 to-transparent" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
              Nuestros pilares
            </span>
            <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
              Por qué elegir <span className="text-clan-red-500">DX7</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-xl border border-white/10 p-6 transition hover:-translate-y-1 hover:border-clan-red-500/60"
              >
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-clan-red-600/15 text-clan-red-500 transition group-hover:bg-clan-red-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold uppercase tracking-wide">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="scroll-mt-20 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
              Nosotros
            </span>
            <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
              ¿Qué es <span className="text-clan-red-500">DX7</span>?
            </h2>
            <p className="mt-6 max-w-xl text-gray-400">
              Un clan nacido para competir y crecer. Estos son los pilares que
              nos definen como equipo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/miembros"
                className="inline-block rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
              >
                Ver miembros
              </Link>
              <Link
                to="/nosotros"
                className="inline-block rounded-lg border border-white/20 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-clan-red-500 hover:text-clan-red-500"
              >
                Más información
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-clan-red-600/40 to-transparent blur-xl" />
            <img
              src="/Img/FONDO%20INICIO.webp"
              alt="Clan DX7"
              className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover opacity-80"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black via-black/60 to-transparent" />
            <span className="absolute bottom-5 left-1/2 w-full -translate-x-1/2 px-4 text-center text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
              El mejor clan de la <span className="text-clan-red-500">región</span>
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Nosotros
