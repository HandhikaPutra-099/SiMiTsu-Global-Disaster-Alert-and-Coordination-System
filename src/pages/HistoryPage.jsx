import { useState, useEffect, useMemo } from 'react'
import {
  Search,
  Calendar,
  X,
  Database,
  ArrowUpDown,
  Eye,
} from 'lucide-react'
import { fetchTsunamiEvents } from '../data/supabaseClient'
import { getMagLabel } from '../data/tsunamiEvents'

export default function HistoryPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCause, setSelectedCause] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('all')
  const [sortOrder, setSortOrder] = useState('desc') // desc = latest year first
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const data = await fetchTsunamiEvents()
        setEvents(data)
      } catch (err) {
        console.error('Gagal memuat arsip tsunami:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Cause options
  const causesList = useMemo(() => {
    const set = new Set()
    events.forEach((ev) => {
      if (ev.cause) set.add(ev.cause)
    })
    return Array.from(set)
  }, [events])

  // Filtered & sorted events
  const filteredEvents = useMemo(() => {
    return events
      .filter((ev) => {
        // Search query
        const query = searchQuery.toLowerCase()
        const matchName = ev.name.toLowerCase().includes(query)
        const matchCause = ev.cause.toLowerCase().includes(query)
        const matchYear = String(ev.year).includes(query)
        if (searchQuery && !matchName && !matchCause && !matchYear) return false

        // Cause filter
        if (selectedCause !== 'all' && ev.cause !== selectedCause) return false

        // Period filter
        if (selectedPeriod === '2010+') return ev.year >= 2010
        if (selectedPeriod === '2000-2009') return ev.year >= 2000 && ev.year <= 2009
        if (selectedPeriod === '1990-1999') return ev.year >= 1990 && ev.year <= 1999
        if (selectedPeriod === 'pre-1990') return ev.year < 1990

        return true
      })
      .sort((a, b) => {
        return sortOrder === 'desc' ? b.year - a.year : a.year - b.year
      })
  }, [events, searchQuery, selectedCause, selectedPeriod, sortOrder])

  const getMagBadgeStyles = (mag) => {
    if (mag === null) {
      return 'bg-[#4a1506] text-[#f97316] border-[#f97316]/30'
    }
    if (mag >= 8.5) {
      return 'bg-[#4c0519] text-[#fda4af] border-[#ef4444]/40'
    }
    if (mag >= 7.8) {
      return 'bg-[#7f1d1d] text-[#fca5a5] border-[#ef4444]/30'
    }
    if (mag >= 7.0) {
      return 'bg-[#92400e] text-[#fde68a] border-[#f59e0b]/30'
    }
    return 'bg-[#14532d] text-[#86efac] border-[#22c55e]/30'
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-xs font-semibold text-[#38bdf8] uppercase tracking-wider mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Arsip Sejarah Bencana</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Riwayat Tsunami Indonesia
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#94a3b8] max-w-3xl">
          Dokumentasi peristiwa tsunami besar di kepulauan Indonesia dari tahun 1883 hingga era modern berdasarkan arsip BMKG, BNPB, dan NOAA NGDC.
        </p>

        {/* Database Status Alert */}
        <div className="mt-4 p-4 rounded-xl bg-[#111827] border border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#94a3b8]">
          <div className="flex items-center gap-2.5">
            <Database className="w-4 h-4 text-[#0ea5e9] shrink-0" />
            <span>
              <b>Status Akses Data:</b> Menggunakan dataset tervalidasi lokal. Skema PostgreSQL Supabase dan RLS telah disiapkan untuk sinkronisasi cloud backend mendatang.
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#cbd5e1] bg-[#1a2234] px-2.5 py-1 rounded-lg border border-[#1e293b] shrink-0">
            {events.length} Peristiwa Tercatat
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-xl mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari lokasi, tahun, atau penyebab..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-xs text-white placeholder-[#64748b] focus:border-[#0ea5e9] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Period Filter */}
          <div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-xs text-[#cbd5e1] focus:border-[#0ea5e9] focus:outline-none"
            >
              <option value="all">Semua Periode Tahun</option>
              <option value="2010+">2010 – Sekarang</option>
              <option value="2000-2009">2000 – 2009 (Dekade Pasca-Aceh)</option>
              <option value="1990-1999">1990 – 1999</option>
              <option value="pre-1990">Sebelum 1990 (Termasuk Krakatau 1883)</option>
            </select>
          </div>

          {/* Cause Filter */}
          <div>
            <select
              value={selectedCause}
              onChange={(e) => setSelectedCause(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-xs text-[#cbd5e1] focus:border-[#0ea5e9] focus:outline-none"
            >
              <option value="all">Semua Mekanisme Pemicu</option>
              {causesList.map((cause) => (
                <option key={cause} value={cause}>
                  {cause}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order Toggle */}
          <div>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="w-full px-4 py-2.5 bg-[#1a2234] hover:bg-[#222f46] text-[#cbd5e1] hover:text-white border border-[#1e293b] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#0ea5e9]" />
              <span>Urutan Tahun: {sortOrder === 'desc' ? 'Terbaru ke Terlama' : 'Terlama ke Terbaru'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Events Table Container */}
      <div className="rounded-2xl border border-[#1e293b] bg-[#111827] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#cbd5e1]">
            <thead className="bg-[#1a2234] text-xs uppercase tracking-wider text-[#94a3b8] font-bold border-b border-[#1e293b]">
              <tr>
                <th className="px-5 py-3.5">Tahun</th>
                <th className="px-5 py-3.5">Lokasi & Wilayah</th>
                <th className="px-5 py-3.5">Magnitudo</th>
                <th className="px-5 py-3.5">Ketinggian Maks.</th>
                <th className="px-5 py-3.5">Estimasi Korban</th>
                <th className="px-5 py-3.5">Penyebab Geologis</th>
                <th className="px-5 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-[#94a3b8]">
                    Memuat data arsip historis...
                  </td>
                </tr>
              ) : filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-[#94a3b8]">
                    Tidak ditemukan data tsunami yang cocok dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((ev) => {
                  const badgeClass = getMagBadgeStyles(ev.mag)
                  const magLabel = getMagLabel(ev.mag)
                  return (
                    <tr
                      key={ev.id}
                      className="hover:bg-[#1a2234]/70 transition-colors cursor-pointer group"
                      onClick={() => setSelectedEvent(ev)}
                    >
                      <td className="px-5 py-4 font-mono font-bold text-white text-base">
                        {ev.year}
                      </td>
                      <td className="px-5 py-4 font-semibold text-white">
                        {ev.name}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeClass}`}
                        >
                          {ev.mag === null ? 'Vulkanik' : `M${ev.mag}`}
                          <span className="text-[10px] opacity-75 font-normal">
                            ({magLabel})
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-[#38bdf8]">
                        {ev.height === null ? '—' : `${ev.height} m`}
                      </td>
                      <td className="px-5 py-4 font-semibold text-[#f87171]">
                        {ev.victims}
                      </td>
                      <td className="px-5 py-4 text-xs text-[#94a3b8]">
                        {ev.cause}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedEvent(ev)
                          }}
                          className="p-1.5 rounded-lg bg-[#0a0e1a] hover:bg-[#0ea5e9] text-[#94a3b8] hover:text-[#0a0e1a] border border-[#1e293b] transition-colors"
                          aria-label={`Lihat detail ${ev.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="px-5 py-3.5 bg-[#0d1322] border-t border-[#1e293b] flex items-center justify-between text-xs text-[#64748b]">
          <span>
            Menampilkan <b>{filteredEvents.length}</b> dari {events.length} kejadian tsunami.
          </span>
          <span>Sumber data: BMKG, BNPB & NOAA National Geophysical Data Center.</span>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#111827] border border-[#1e293b] rounded-2xl p-6 shadow-2xl text-sm">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1.5 text-[#94a3b8] hover:text-white rounded-lg hover:bg-[#1a2234]"
              aria-label="Tutup detail kejadian"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#0ea5e9]/10 text-[#38bdf8] border border-[#0ea5e9]/20 font-bold">
                Tahun {selectedEvent.year}
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getMagBadgeStyles(
                  selectedEvent.mag
                )}`}
              >
                {selectedEvent.mag === null ? 'Vulkanik' : `M${selectedEvent.mag}`}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-white mb-4">
              {selectedEvent.name}
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 rounded-xl bg-[#1a2234] border border-[#1e293b]">
                <span className="text-[11px] text-[#64748b] block uppercase">
                  Tinggi Gelombang Maks.
                </span>
                <span className="text-xl font-bold font-mono text-[#38bdf8]">
                  {selectedEvent.height === null ? '—' : `${selectedEvent.height} meter`}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#1a2234] border border-[#1e293b]">
                <span className="text-[11px] text-[#64748b] block uppercase">
                  Estimasi Korban Jiwa
                </span>
                <span className="text-xl font-bold font-mono text-[#ef4444]">
                  {selectedEvent.victims}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#1a2234] border border-[#1e293b]">
                <span className="text-[11px] text-[#64748b] block uppercase">
                  Mekanisme Pemicu
                </span>
                <span className="text-xs font-semibold text-white">
                  {selectedEvent.cause}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#1a2234] border border-[#1e293b]">
                <span className="text-[11px] text-[#64748b] block uppercase">
                  Koordinat Episentrum
                </span>
                <span className="text-xs font-mono text-[#cbd5e1]">
                  {selectedEvent.lat && selectedEvent.lng
                    ? `${selectedEvent.lat}°, ${selectedEvent.lng}°`
                    : 'Data tidak tersedia'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0e1a] border border-[#1e293b] text-xs text-[#94a3b8] mb-6 leading-relaxed">
              <p>
                <b>Catatan Sejarah:</b> Peristiwa tsunami ini merupakan salah satu pengingat penting akan kerentanan kawasan pesisir Indonesia terhadap deformasi tektonik maupun letusan vulkanik laut.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1e293b] hover:bg-[#28354b] text-white text-xs font-bold transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
