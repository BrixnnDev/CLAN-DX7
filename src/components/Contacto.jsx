import { FaDiscord, FaEnvelope, FaUser, FaMapMarkerAlt } from 'react-icons/fa'

const contactInfo = [
  { icon: FaUser, label: 'Clan', value: 'CLAN | DX7' },
  { icon: FaEnvelope, label: 'Correo', value: 'clan.dx7@correo.com' },
  { icon: FaDiscord, label: 'Discord', value: 'discord.gg/dx7' },
  { icon: FaMapMarkerAlt, label: 'Servidor', value: 'LatinoamÃ©rica' },
]

function Contacto() {
  return (
    <section id="contacto" className="w-full py-4">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="text-center text-xs font-bold uppercase tracking-[0.3em] text-white">
              Contacto
            </span>
            <form
              className="flex flex-col gap-2.5 rounded-2xl border border-white/15 p-5"
              onSubmit={(e) => e.preventDefault()}
            >
            <div>
              <label htmlFor="nombre" className="mb-1 block text-sm font-semibold text-gray-300">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre"
                className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-clan-red-500"
              />
            </div>

            <div>
              <label htmlFor="correo" className="mb-1 block text-sm font-semibold text-gray-300">
                Correo
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                required
                placeholder="tucorreo@correo.com"
                className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-clan-red-500"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="mb-1 block text-sm font-semibold text-gray-300">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={2}
                placeholder="CuÃ©ntanos por quÃ© quieres unirte al clan..."
                className="w-full resize-none rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-clan-red-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-8 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
            >
              Enviar
            </button>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-center text-xs font-bold uppercase tracking-[0.3em] text-white">
              InformaciÃ³n del clan
            </span>
            <div className="flex flex-1 flex-col justify-between gap-2">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-1 items-center justify-between gap-3 rounded-xl border border-white/15 px-3 py-2"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      {label}
                    </p>
                    <p className="text-xs font-semibold leading-tight">
                      {value}
                    </p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-clan-red-600/15 text-clan-red-500">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
              ))}
              <p className="text-center text-xs text-gray-400">
                Ãšnete a nuestro Discord para hablar con el staff y empezar tu
                prueba en el clan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto


