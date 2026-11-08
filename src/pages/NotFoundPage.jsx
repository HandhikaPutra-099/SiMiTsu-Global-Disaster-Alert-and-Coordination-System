import { Link } from 'react-router-dom'
import { Compass, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#111827] border border-[#1e293b] flex items-center justify-center mb-6 shadow-xl">
        <Compass className="w-8 h-8 text-[#0ea5e9] animate-spin" style={{ animationDuration: '10s' }} />
      </div>

      <h1 className="text-7xl sm:text-8xl font-black font-mono text-white tracking-tight">
        4<span className="text-[#0ea5e9]">0</span>4
      </h1>

      <h2 className="mt-4 text-xl sm:text-2xl font-bold text-white">
        Halaman Tidak Ditemukan
      </h2>

      <p className="mt-2 text-sm text-[#94a3b8] max-w-md">
        Koordinat yang Anda tuju tidak berada dalam pemetaan sistem SiMiTsu. Silakan kembali ke jalur evakuasi utama.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0ea5e9] hover:bg-[#38bdf8] text-[#0a0e1a] font-bold text-sm transition-all shadow-lg shadow-[#0ea5e9]/20"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </main>
  )
}
