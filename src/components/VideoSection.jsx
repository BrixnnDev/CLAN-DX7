function VideoSection() {
  return (
    <section id="video" className="flex min-h-screen scroll-mt-20 items-center py-10">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-clan-red-500">
            Video
          </span>
          <h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">
            Nuestro clan <span className="text-clan-red-500">en acción</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-night-950">
          <video
            controls
            preload="metadata"
            poster="/Img/FONDO%20INICIO.png"
            className="aspect-video w-full object-cover"
          >
            <source src="/video/clan.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
