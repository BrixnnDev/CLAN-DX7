import { FaBell, FaEnvelope, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa'

function Suscripcion() {
  return (
    <section id="suscripcion" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-clan-red-600/20 text-clan-red-500">
            <FaBell className="h-7 w-7" />
          </span>
          <h2 className="mt-4 text-2xl font-black uppercase sm:text-3xl">
            Recibe <span className="text-clan-red-500">notificaciones</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-400">
            SuscrÃ­bete y entÃ©rate al instante de los sorteos, scrims y
            novedades del clan DX7.
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 p-8 sm:p-10">
          <form
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <FaEnvelope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Tu correo"
                className="w-full rounded-lg border border-white/10 bg-transparent py-1.5 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-gray-400 focus:border-clan-red-500"
              />
            </div>
            <div className="relative">
              <FaPhoneAlt className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="Tu nÃºmero (WhatsApp)"
                className="w-full rounded-lg border border-white/10 bg-transparent py-1.5 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-gray-400 focus:border-clan-red-500"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:brightness-110 sm:col-span-2"
            >
              <FaPaperPlane className="h-4 w-4" />
              Suscribirme
            </button>
          </form>
        </div>

        <p className="mx-auto mt-10 max-w-lg text-center text-sm leading-relaxed text-gray-400">
          Porque en DX7 no solo encuentras un clan: encuentras un equipo
          que entrena, compite y celebra contigo cada victoria. Juntos
          somos imparables.
        </p>
      </div>
    </section>
  )
}

export default Suscripcion

