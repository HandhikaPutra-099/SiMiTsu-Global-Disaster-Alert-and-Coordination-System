import { ShieldAlert, PhoneCall, Radio } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#1e293b] bg-[#080c16] text-[#94a3b8] text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#111827] border border-[#1e293b] flex items-center justify-center">
                <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path d="M2 20 Q7 10 14 16 Q21 22 26 10" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M2 24 Q8 14 14 20 Q20 26 26 14" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
                  <circle cx="14" cy="8" r="3" fill="#f97316" />
                </svg>
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">
                SiMi<span className="text-[#0ea5e9]">Tsu</span>
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] max-w-md leading-relaxed">
              Sistem Mitigasi Tsunami Indonesia. Platform edukasi dan simulasi berbasis data ilmiah untuk meningkatkan kesiapsiagaan masyarakat pesisir terhadap ancaman tsunami di Nusantara.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-xs text-[#cbd5e1]">
              <ShieldAlert className="w-4 h-4 text-[#f59e0b]" />
              <span>Bukan peringatan dini real-time BMKG / BNPB</span>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#0ea5e9]" /> Kontak Kedaruratan
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex flex-col">
                <span className="text-[#64748b]">Call Center BNPB</span>
                <span className="text-white font-mono font-bold text-sm">117</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[#64748b]">Pusat Gempa BMKG</span>
                <span className="text-white font-mono font-bold text-sm">(021) 6546318</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[#64748b]">Layanan Darurat Terpadu</span>
                <span className="text-white font-mono font-bold text-sm">112</span>
              </li>
            </ul>
          </div>

          {/* Data References */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#22c55e]" /> Sumber & Referensi Data
            </h4>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span>BMKG (InaTEWS)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span>BNPB (InaRISK)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span>UNESCO-IOC Tsunami Programme</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <span>NOAA National Geophysical Data Center</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>© {new Date().getFullYear()} SiMiTsu — Edukasi & Mitigasi Bencana Pesisir Indonesia.</p>
          <p className="text-[11px]">
            Data dan simulasi disajikan untuk tujuan literasi dan simulasi konseptual.
          </p>
        </div>
      </div>
    </footer>
  )
}
