import { Link } from 'react-router-dom'
import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

const socials = [
  { label: 'Discord', href: '#', icon: FaDiscord },
  { label: 'Instagram', href: '#', icon: FaInstagram },
  { label: 'TikTok', href: '#', icon: FaTiktok },
  { label: 'YouTube', href: '#', icon: FaYoutube },
]

function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden scroll-mt-20"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Img/FONDO%20INICIO.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-night-950" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center">
        <span className="mb-4 inline-block rounded-full border border-clan-red-500/50 bg-clan-red-600/10 px-4 py-1 text-xs font-bold tracking-[0.3em] text-clan-red-500">
          FREE FIRE • CLAN OFICIAL
        </span>

        <h1 className="text-5xl font-black uppercase leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          CLAN <span className="text-clan-red-500">| DX7</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-gray-300 sm:text-lg">
          La familia <span className="font-bold text-clan-red-500">DX7</span>{" "}
          te da la bienvenida. Somos un clan competitivo de Free Fire enfocado
          en el trabajo en equipo, la constancia y la victoria. Si buscas un
          equipo serio, este es tu lugar.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#nosotros"
            className="rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
          >
            Conócenos
          </a>
          <Link
            to="/miembros"
            className="rounded-lg border border-white/20 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-clan-red-500 hover:text-clan-red-500"
          >
            Nuestros Miembros
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-white/30" />
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-gray-300 transition hover:border-clan-red-500 hover:bg-clan-red-600 hover:text-white"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <span className="h-px w-12 bg-white/30" />
        </div>
      </div>
    </section>
  )
}

export default Hero
