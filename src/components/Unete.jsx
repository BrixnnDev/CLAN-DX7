import { FaDiscord, FaWhatsapp, FaUsers } from 'react-icons/fa'

function Unete() {
  return (
    <section id="unete" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
            Comunidad
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
            Únete al <span className="text-clan-red-500">clan DX7</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400">
            Entra a nuestros grupos y forma parte de la familia. Te esperamos.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="group rounded-2xl border border-white/10 p-8 text-center transition hover:-translate-y-1 hover:border-[#5865F2]/60">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#5865F2]/15 text-3xl text-[#5865F2]">
              <FaDiscord />
            </span>
            <h3 className="mt-5 text-xl font-black uppercase">Discord</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Nuestro servidor principal: anuncios, scrims, torneos y la
              comunidad de DX7 en un solo lugar.
            </p>
            <a
              href="https://discord.gg/PvUz57J6qK"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
            >
              <FaDiscord className="h-4 w-4" />
              Unirme a Discord
            </a>
          </div>

          <div className="group rounded-2xl border border-white/10 p-8 text-center transition hover:-translate-y-1 hover:border-[#25D366]/60">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#25D366]/15 text-3xl text-[#25D366]">
              <FaWhatsapp />
            </span>
            <h3 className="mt-5 text-xl font-black uppercase">WhatsApp</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Grupo rápido para coordinación diaria, partidas y avisos
              importantes del clan.
            </p>
            <a
              href="https://chat.whatsapp.com/FAYsEVlllaBCuZcRxA5G8q?s=cl&p=a&mlu=4"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
            >
              <FaWhatsapp className="h-4 w-4" />
              Unirme al grupo
            </a>
          </div>
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
          <FaUsers className="text-clan-red-500" />
          +50 miembros ya son parte de la familia DX7
        </p>
      </div>
    </section>
  )
}

export default Unete
