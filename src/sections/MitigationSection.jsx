import { useState } from 'react'
import {
  ShieldAlert,
  Clock,
  Compass,
  CheckCircle2,
  Package,
  Check,
  Info,
} from 'lucide-react'
import {
  beforeSteps,
  duringSteps,
  afterSteps,
  riskZones,
  riskZonesDisclaimer,
  evacuationSteps,
  goBagItems,
} from '../data/mitigationData'

export default function MitigationSection() {
  // Interactive Go Bag checklist state
  const [checkedItems, setCheckedItems] = useState({})

  const toggleItem = (idx) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }))
  }

  const completedCount = Object.values(checkedItems).filter(Boolean).length
  const progressPercent = Math.round((completedCount / goBagItems.length) * 100)

  return (
    <section id="mitigasi" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-xs font-semibold text-[#38bdf8] uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Protokol Keselamatan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Panduan Mitigasi & Evakuasi
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#94a3b8] max-w-2xl">
            Tindakan cepat dan tepat menyelamatkan jiwa. Pahami langkah penyelamatan diri sebelum, saat, dan sesudah terjadinya ancaman tsunami di kawasan pesisir.
          </p>
        </div>
      </div>

      {/* Part 1: Tiga Tahapan Waktu (Sebelum, Saat, Setelah) */}
      <div className="mb-16">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#0ea5e9]" />
          <span>Tindakan Berdasarkan Waktu Kejadian</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sebelum Terjadi */}
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0ea5e9]/10 text-[#38bdf8] border border-[#0ea5e9]/20 text-xs font-bold mb-4 uppercase">
                <span>1. Sebelum Terjadi</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-4">
                Kesiapsiagaan & Perencanaan
              </h4>
              <ul className="space-y-4">
                {beforeSteps.map((item) => (
                  <li key={item.id} className="text-xs">
                    <span className="font-semibold text-[#e2e8f0] block mb-1">
                      {item.title}
                    </span>
                    <span className="text-[#94a3b8] leading-relaxed block">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1e293b] text-[11px] text-[#64748b]">
              Kunci keberhasilan: kesepakatan rencana darurat dalam keluarga.
            </div>
          </div>

          {/* Saat Ada Ancaman */}
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#f97316]/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f97316]/10 text-[#fb923c] border border-[#f97316]/20 text-xs font-bold mb-4 uppercase">
                <span>2. Saat Ada Ancaman</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-4">
                Respon Cepat & Mandiri
              </h4>
              <ul className="space-y-4">
                {duringSteps.map((item) => (
                  <li key={item.id} className="text-xs">
                    <span className="font-semibold text-[#fde68a] block mb-1">
                      {item.title}
                    </span>
                    <span className="text-[#94a3b8] leading-relaxed block">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1e293b] text-[11px] text-[#f97316]">
              Prinsip utama: evakuasi segera tanpa menunggu sirine jika gempa terasa kuat.
            </div>
          </div>

          {/* Setelah Gelombang */}
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#22c55e]/10 text-[#4ade80] border border-[#22c55e]/20 text-xs font-bold mb-4 uppercase">
                <span>3. Setelah Gelombang</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-4">
                Pemulihan & Bertahan
              </h4>
              <ul className="space-y-4">
                {afterSteps.map((item) => (
                  <li key={item.id} className="text-xs">
                    <span className="font-semibold text-[#e2e8f0] block mb-1">
                      {item.title}
                    </span>
                    <span className="text-[#94a3b8] leading-relaxed block">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1e293b] text-[11px] text-[#64748b]">
              Penting: waspadai kemungkinan gelombang susulan berikutnya.
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Empat Zona Risiko & Disclaimer */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#f59e0b]" />
            <span>Klasifikasi Zona Risiko Pesisir</span>
          </h3>
          <span className="text-xs text-[#64748b]">
            4 Band Klasifikasi Bahaya
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {riskZones.map((zone) => (
            <div
              key={zone.id}
              className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-3 ${zone.badgeColor}`}>
                  {zone.name}
                </span>

                <p className="text-xs text-[#cbd5e1] font-medium mb-3 italic">
                  {zone.coverage}
                </p>

                <ul className="space-y-2 text-xs text-[#94a3b8]">
                  {zone.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-[#0ea5e9] mt-0.5">•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="mt-4 p-4 rounded-xl bg-[#1a2234] border border-[#1e293b] text-xs text-[#cbd5e1] flex items-start gap-3 leading-relaxed">
          <Info className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
          <p>{riskZonesDisclaimer}</p>
        </div>
      </div>

      {/* Part 3: Tujuh Langkah Evakuasi Mandiri */}
      <div className="mb-16">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
          <span>7 Langkah Evakuasi Mandiri</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {evacuationSteps.map((stepItem) => (
            <div
              key={stepItem.step}
              className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] flex gap-4 items-start shadow-md hover:border-[#0ea5e9]/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#0ea5e9] text-[#0a0e1a] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                {stepItem.step}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">
                  {stepItem.title}
                </h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 4: Interactive Go Bag Checklist */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1e293b]">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-[#0ea5e9]" />
              <span>Daftar Kebutuhan Tas Siaga Bencana (Go Bag)</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
              Periksa kelengkapan tas siaga bencana untuk ketahanan 72 jam pertama di pengungsian.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-xs text-[#64748b] block">Kelengkapan</span>
              <span className="text-sm font-mono font-bold text-white">
                {completedCount} / {goBagItems.length} item ({progressPercent}%)
              </span>
            </div>
            <div className="w-16 h-2 bg-[#1e293b] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0ea5e9] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {goBagItems.map((item, idx) => {
            const isChecked = !!checkedItems[idx]
            return (
              <button
                key={idx}
                onClick={() => toggleItem(idx)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-xs transition-all duration-200 focus:outline-none ${
                  isChecked
                    ? 'bg-[#16293d] border-[#0ea5e9]/50 text-white'
                    : 'bg-[#0a0e1a] border-[#1e293b] text-[#94a3b8] hover:border-[#64748b] hover:text-[#e2e8f0]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isChecked
                      ? 'bg-[#0ea5e9] border-[#0ea5e9] text-[#0a0e1a]'
                      : 'border-[#64748b] bg-transparent'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={isChecked ? 'line-through text-[#cbd5e1]' : ''}>
                  {item}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
