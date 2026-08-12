import { FaChevronDown } from 'react-icons/fa'
import Solicitudes from '../components/Solicitudes'

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

      <Solicitudes />
    </div>
  )
}

export default Miembros
