import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="flex border-t border-white/10 sm:h-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-4 py-5 sm:flex-row sm:justify-between sm:py-0">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/favicon.png"
            alt="Logo DX7"
            className="h-8 w-8 rounded object-cover"
          />
          <span className="font-extrabold tracking-wide">
            CLAN <span className="text-clan-red-500">| DX7</span>
          </span>
        </Link>

        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CLAN DX7. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-4">
          <a href="#" className="text-xs text-gray-400 transition hover:text-clan-red-500">
            Términos y condiciones
          </a>
          <span className="h-4 w-px bg-white/15" />
          <a
            href="https://brixnndev.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-400 transition hover:text-clan-red-500"
          >
            Creado por <span className="font-bold text-clan-red-500">BrixnnDev</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
