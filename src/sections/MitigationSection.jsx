import { useCallback, useRef, useState } from 'react'
import {
  ShieldAlert,
  Clock,
  Compass,
  CheckCircle2,
  Info,
  ClipboardCheck,
  TriangleAlert,
  LifeBuoy,
} from 'lucide-react'
import DetailModal from '../components/DetailModal'
import {
  beforeSteps,
  duringSteps,
  afterSteps,
  riskZones,
  riskZonesDisclaimer,
  evacuationSteps,
} from '../data/mitigationData'

export default function MitigationSection() {
  const [activeDetail, setActiveDetail] = useState(null)
  const triggerRef = useRef(null)

  const phaseCards = [
    {
      id: 'before',
      title: 'Sebelum Terjadi',
      subtitle: 'Kesiapsiagaan & Perencanaan',
      description: 'Kenali jalur evakuasi, sepakati rencana keluarga, dan siapkan tas darurat.',
      icon: ClipboardCheck,
      badgeColor: 'bg-[#0ea5e9]/10 text-[#38bdf8] border-[#0ea5e9]/30',
      steps: beforeSteps,
      note: 'Kunci keberhasilan: kesepakatan rencana darurat dalam keluarga.',
    },
    {
      id: 'during',
      title: 'Saat Ada Ancaman',
      subtitle: 'Respons Cepat & Mandiri',
      description: 'Segera menjauh dari pantai dan ikuti jalur serta arahan evakuasi.',
      icon: TriangleAlert,
      badgeColor: 'bg-[#f97316]/10 text-[#fb923c] border-[#f97316]/30',
      steps: duringSteps,
      note: 'Prinsip utama: evakuasi segera tanpa menunggu sirine jika gempa terasa kuat.',
    },
    {
      id: 'after',
      title: 'Setelah Gelombang',
      subtitle: 'Pemulihan & Bertahan',
      description: 'Tetap di tempat aman dan tunggu informasi resmi sebelum kembali.',
      icon: LifeBuoy,
      badgeColor: 'bg-[#22c55e]/10 text-[#4ade80] border-[#22c55e]/30',
      steps: afterSteps,
      note: 'Penting: waspadai kemungkinan gelombang susulan berikutnya.',
    },
  ]

  const openDetail = (content, trigger) => {
    triggerRef.current = trigger
    setActiveDetail(content)
  }
  const closeDetail = useCallback(() => setActiveDetail(null), [])

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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {phaseCards.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.id}
                className="flex min-h-64 flex-col justify-between rounded-xl border border-[#1e293b] bg-[#111827] p-5 transition-colors hover:border-[#334155] sm:p-6"
              >
                <div>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <span className={`inline-flex min-h-8 items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${card.badgeColor}`}>
                      {card.title}
                    </span>
                    <Icon className="h-5 w-5 shrink-0 text-[#38bdf8]" aria-hidden="true" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-white">{card.subtitle}</h4>
                  <p className="text-sm leading-relaxed text-[#cbd5e1]">
                    {card.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(event) => openDetail({
                    id: card.id,
                    tag: card.title,
                    title: card.subtitle,
                    badgeColor: card.badgeColor,
                    details: card.steps.map((step) => ({
                      text: `${step.title}: ${step.desc}`,
                    })),
                    note: card.note,
                  }, event.currentTarget)}
                  className="mt-5 inline-flex min-h-11 w-fit cursor-pointer items-center justify-center rounded-lg border border-[#0ea5e9]/50 bg-[#0ea5e9]/10 px-4 text-sm font-semibold text-[#7dd3fc] transition-colors hover:border-[#38bdf8] hover:bg-[#0ea5e9]/20 active:bg-[#0ea5e9]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
                >
                  Lihat Detail
                </button>
              </article>
            )
          })}
        </div>
      </div>

      {/* Part 2: Empat Zona Risiko & Disclaimer */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#f59e0b]" />
            <span>Klasifikasi Zona Risiko Pesisir</span>
          </h3>
          <span className="text-xs font-medium text-[#cbd5e1]">
            4 Band Klasifikasi Bahaya
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {riskZones.map((zone) => {
            const [zoneTitle, zoneLevel] = zone.name.split(' — ')
            return (
              <article
                key={zone.id}
                className="flex min-h-64 flex-col rounded-xl border border-[#1e293b] bg-[#111827] p-5 transition-colors hover:border-[#334155]"
              >
                <span className={`mb-4 inline-flex min-h-8 w-fit items-center rounded-md border px-2.5 py-1 text-[11px] font-bold ${zone.badgeColor}`}>
                  {zoneLevel}
                </span>
                <h4 className="mb-2 text-lg font-bold text-white">{zoneTitle}</h4>
                <p className="flex-1 text-sm leading-relaxed text-[#cbd5e1]">
                  {zone.coverage.replace(/\*$/, '')}
                </p>
                <button
                  type="button"
                  onClick={(event) => openDetail({
                    id: `zone-${zone.id}`,
                    tag: zoneLevel,
                    title: zoneTitle,
                    badgeColor: zone.badgeColor,
                    details: zone.items,
                    note: riskZonesDisclaimer,
                  }, event.currentTarget)}
                  className="mt-5 inline-flex min-h-11 w-fit cursor-pointer items-center justify-center rounded-lg border border-[#334155] bg-[#1a2234] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#222f46] active:bg-[#28354b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
                >
                  Lihat Detail
                </button>
              </article>
            )
          })}
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#1e293b] bg-[#1a2234] p-4 text-sm leading-relaxed text-[#e2e8f0]">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#38bdf8]" aria-hidden="true" />
          <p>{riskZonesDisclaimer}</p>
        </div>
      </div>

      {/* Part 3: Tujuh Langkah Evakuasi Mandiri */}
      <div>
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

      {activeDetail && (
        <DetailModal
          content={activeDetail}
          sectionLabel="PANDUAN TINDAKAN"
          closeLabel="Tutup detail mitigasi"
          onClose={closeDetail}
          triggerRef={triggerRef}
        />
      )}
    </section>
  )
}
