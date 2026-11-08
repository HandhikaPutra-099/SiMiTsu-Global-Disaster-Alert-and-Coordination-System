function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="font-semibold text-cyan-600">
        SISTEM MITIGASI TSUNAMI INDONESIA
      </p>

      <h1 className="mt-4 text-5xl font-bold text-slate-900">
        SiMiTsu
      </h1>

      <p className="mt-4 text-lg text-slate-600">
        Platform edukasi dan simulasi berbasis data.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-slate-100 p-6">
          <h2 className="text-3xl font-bold">20+</h2>
          <p>Tsunami Tercatat</p>
        </div>

        <div className="rounded-xl bg-slate-100 p-6">
          <h2 className="text-3xl font-bold">280K+</h2>
          <p>Korban Jiwa</p>
        </div>

        <div className="rounded-xl bg-slate-100 p-6">
          <h2 className="text-3xl font-bold">4</h2>
          <p>Zona Risiko</p>
        </div>
      </div>
    </main>
  )
}

export default HomePage