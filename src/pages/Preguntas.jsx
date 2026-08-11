import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaChevronDown, FaArrowLeft } from 'react-icons/fa'
import { faqs } from '../data/faqs'

function Preguntas() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="min-h-screen bg-night-950">
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Img/FONDO%20MIEMBROS.png')" }}
        />
        <div className="absolute inset-0 bg-night-950/85" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-950 to-transparent" />

        <div className="relative z-10 px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
            FAQ
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase sm:text-5xl">
            Preguntas <span className="text-clan-red-500">frecuentes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-300 sm:text-base">
            Resolvemos las dudas más comunes sobre el clan DX7. Si no
            encuentras tu respuesta, escríbenos por Discord o WhatsApp.
          </p>
        </div>
      </section>

      <section className="relative py-16">
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const open = openIndex === index
              return (
                <div
                  key={faq.q}
                  className={`overflow-hidden rounded-xl border transition ${
                    open
                      ? 'border-clan-red-500/60 bg-clan-red-600/5'
                      : 'border-white/10'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-bold sm:text-base">
                      <span className="mr-2 text-clan-red-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {faq.q}
                    </span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-clan-red-500">
                      {open ? (
                        <FaChevronDown className="h-3 w-3" />
                      ) : (
                        <FaChevronRight className="h-3 w-3" />
                      )}
                    </span>
                  </button>
                  {open && (
                    <p className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-gray-400">
                      {faq.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-clan-red-600 to-clan-red-700 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
            >
              Contacto
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-clan-red-500 hover:text-clan-red-500"
            >
              <FaArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Preguntas
