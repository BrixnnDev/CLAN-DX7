import { Link } from 'react-router-dom'
import { FaGhost, FaHome } from 'react-icons/fa'

function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Img/FONDO%20INICIO.webp')" }}
      />
      <div className="absolute inset-0 bg-night-950/85" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-950 to-transparent" />

      <div className="relative z-10 px-4 text-center">
        <FaGhost className="mx-auto h-14 w-14 text-clan-red-500" />
        <p className="mt-6 text-7xl font-black text-white sm:text-8xl">
          4<span className="text-clan-red-500">0</span>4
        </p>
        <h2 className="mt-2 text-2xl font-black uppercase sm:text-3xl">
          Página no encontrada
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-400">
          Parece que te perdiste en el campo de batalla. La página que buscas no
          existe o fue movida.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
        >
          <FaHome className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}

export default NotFound
