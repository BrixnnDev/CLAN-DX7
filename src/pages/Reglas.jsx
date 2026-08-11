import {
  FaUsers,
  FaBan,
  FaShieldAlt,
  FaCalendarAlt,
  FaFlag,
  FaComments,
  FaHandshake,
  FaTrophy,
} from 'react-icons/fa'

const reglas = [
  {
    icon: FaUsers,
    title: 'Respeto ante todo',
    text: 'Trata a todos los miembros con respeto. Cero toxicidad, insultos, racismo o discriminación dentro y fuera del juego.',
  },
  {
    icon: FaBan,
    title: 'Sin trampas ni hacks',
    text: 'Prohibido el uso de hacks, cheats o cualquier ventaja ilegal. Quien use trampas será expulsado del clan.',
  },
  {
    icon: FaShieldAlt,
    title: 'Discord obligatorio',
    text: 'Todo miembro debe estar activo en nuestro Discord para recibir anuncios, coordinarse y participar en scrims.',
  },
  {
    icon: FaCalendarAlt,
    title: 'Asistencia a eventos',
    text: 'Asistir a scrims, torneos y eventos del clan. Si no puedes asistir, avisa con anticipación.',
  },
  {
    icon: FaComments,
    title: 'Comunicación',
    text: 'Contesta los anuncios y mantente al tanto de las novedades. La comunicación es clave para el equipo.',
  },
  {
    icon: FaFlag,
    title: 'Nombre del clan',
    text: 'Los miembros deben llevar la etiqueta del clan (DX7) en su nombre de Free Fire.',
  },
  {
    icon: FaHandshake,
    title: 'Ayuda mutua',
    text: 'Ayuda a los nuevos miembros a mejorar. Todos empezamos en algún lugar y juntos somos más fuertes.',
  },
  {
    icon: FaTrophy,
    title: 'Actitud competitiva',
    text: 'Entrena con constancia y da tu máximo en cada partida. El compromiso se premia.',
  },
]

function Reglas() {
  return (
    <div className="min-h-screen bg-night-950">
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Img/FONDO%20REGLAS.webp')" }}
        />
        <div className="absolute inset-0 bg-night-950/80" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-950 to-transparent" />

        <div className="relative z-10 px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
            Reglas
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase sm:text-5xl">
            Código del <span className="text-clan-red-500">clan</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-300 sm:text-base">
            Estas son las reglas que todo miembro de DX7 debe cumplir. El
            incumplimiento puede llevar a advertencias o expulsión.
          </p>
        </div>
      </section>

      <section className="relative py-16">
        <div className="relative z-10 mx-auto max-w-5xl px-4">

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reglas.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl border border-white/10 p-6 transition hover:border-clan-red-500/60"
            >
              <div className="flex flex-col items-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-clan-red-600/15 text-clan-red-500">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="mt-3 text-xs font-bold text-gray-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wide">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  )
}

export default Reglas
