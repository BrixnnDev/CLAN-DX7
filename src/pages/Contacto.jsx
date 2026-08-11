import Contacto from '../components/Contacto'
import Footer from '../components/Footer'

function ContactoPage() {
  return (
    <div className="relative flex h-screen flex-col pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Img/FONDO%20CONTACTO.webp')" }}
      />
      <div className="absolute inset-0 bg-night-950/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <Contacto />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default ContactoPage
