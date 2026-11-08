import { Link } from 'react-router-dom'
import { Play, MapPin } from 'lucide-react'

export default function HeroSection() {
  const heroStats = [
    {
      value: '20+',
      label: 'Tsunami Tercatat',
      desc: 'Arsip gempa & tsunami terdokumentasi di Nusantara',
      accent: 'text-[#0ea5e9]',
      border: 'border-[#0ea5e9]/30',
    },
    {
      value: '280K+',
      label: 'Korban Jiwa',
      desc: 'Estimasi total korban historis dari berbagai peristiwa',
      accent: 'text-[#f97316]',
      border: 'border-[#f97316]/30',
    },
    {
      value: '5',
      label: 'Zona Risiko',
      desc: 'Tingkat ancaman pesisir berdasarkan parameter kerentanan',
      accent: 'text-[#22c55e]',
      border: 'border-[#22c55e]/30',
    },
  ]

  const handleScrollToSim = (e) => {
    e.preventDefault()
    const el = document.getElementById('simulasi')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 pb-16 px-4 sm:px-6">
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0c162b] to-[#0a0e1a] pointer-events-none" />
      
      {/* Subtle Technical Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(to right, #0ea5e9 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* Radial Cyan Glow in Center */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#0ea5e9]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Wave Silhouette at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-20 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z"
            fill="#0ea5e9"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Top Tag / Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#1e293b] shadow-inner mb-6 text-xs text-[#94a3b8]">
          <span className="flex h-2 w-2 rounded-full bg-[#0ea5e9] animate-pulse" />
          <span className="font-semibold tracking-wider text-[#cbd5e1] uppercase">
            Sistem Mitigasi Tsunami Indonesia
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
          Sistem Mitigasi <br />
          <span className="bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] bg-clip-text text-transparent">
            Tsunami Indonesia
          </span>
        </h1>

        {/* Hero Copy (Mandatory phrase) */}
        <p className="mt-6 text-lg sm:text-xl text-[#94a3b8] max-w-2xl mx-auto font-normal leading-relaxed">
          Platform edukasi dan simulasi berbasis data.
        </p>

        {/* Extended educational context */}
        <p className="mt-2 text-sm sm:text-base text-[#64748b] max-w-xl mx-auto">
          Pahami dinamika gelombang, pelajari mekanisme patahan lempeng, dan kuasai langkah evakuasi mandiri untuk keselamatan jiwa.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#simulasi"
            onClick={handleScrollToSim}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0ea5e9] hover:bg-[#38bdf8] text-[#0a0e1a] font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-[#0ea5e9]/25 hover:shadow-[#0ea5e9]/40 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0ea5e9]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mulai Simulasi</span>
          </a>

          <Link
            to="/peta"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111827] hover:bg-[#1a2234] text-white border border-[#1e293b] hover:border-[#0ea5e9]/50 font-semibold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1e293b]"
          >
            <MapPin className="w-4 h-4 text-[#0ea5e9]" />
            <span>Lihat Peta Risiko</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {heroStats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-sm border ${stat.border} shadow-lg text-left transition-transform duration-200 hover:-translate-y-1`}
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className={`text-3xl sm:text-4xl font-extrabold ${stat.accent} font-mono tracking-tight`}>
                  {stat.value}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#1a2234] text-[#94a3b8] uppercase">
                  Data
                </span>
              </div>
              <h2 className="text-base font-bold text-white mb-1">
                {stat.label}
              </h2>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
