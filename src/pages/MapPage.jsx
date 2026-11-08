import { useState, useEffect, useRef } from 'react'
import { Layers, Globe, Shield } from 'lucide-react'
import { tsunamiEvents, dotColor } from '../data/tsunamiEvents'
import { tectonicPlates, generalPlateLabels, sensors } from '../data/mapLayers'

export default function MapPage() {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const layerGroupsRef = useRef({
    plates: null,
    tsunami: null,
    sensor: null,
  })

  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    // Check if Leaflet is loaded
    if (typeof window === 'undefined' || !window.L || !mapContainerRef.current) return
    const L = window.L

    // Avoid duplicate initialization
    if (mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [-2.5, 118.0],
      zoom: 5,
      minZoom: 4,
      maxZoom: 12,
      zoomControl: true,
    })
    mapInstanceRef.current = map

    // Base satellite imagery tile layer
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Sumber: Esri, USGS, GeoEye, NOAA',
        maxZoom: 18,
      }
    ).addTo(map)

    // Boundaries and place names overlay
    L.tileLayer(
      'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '',
        maxZoom: 18,
        opacity: 0.75,
      }
    ).addTo(map)

    // Layer 1: Tsunami Historis
    const tsunamiLayer = L.layerGroup()
    tsunamiEvents.forEach((ev) => {
      if (!ev.lat || !ev.lng) return
      const color = dotColor(ev.mag)
      const r = ev.mag >= 8.5 ? 12 : ev.mag >= 7.8 ? 10 : ev.mag >= 7.0 ? 8 : 6

      const marker = L.circleMarker([ev.lat, ev.lng], {
        radius: r,
        fillColor: color,
        color: '#ffffff',
        weight: 1.5,
        opacity: 0.95,
        fillOpacity: 0.85,
      })

      marker.bindPopup(
        `<div>
          <strong style="color: #0ea5e9; font-size: 14px;">${ev.name} (${ev.year})</strong>
          <div style="font-size: 12px; margin-top: 4px; color: #cbd5e1;">
            <div>Magnitudo: <b>${ev.mag === null ? 'Vulkanik' : `M${ev.mag}`}</b></div>
            <div>Tinggi Maks.: <b>${ev.height === null ? '—' : `${ev.height} m`}</b></div>
            <div>Korban Jiwa: <b style="color: #ef4444;">${ev.victims}</b></div>
            <div>Penyebab: <i>${ev.cause}</i></div>
          </div>
        </div>`
      )
      tsunamiLayer.addLayer(marker)
    })
    layerGroupsRef.current.tsunami = tsunamiLayer

    // Layer 2: Lempeng Tektonik
    const platesLayer = L.layerGroup()
    tectonicPlates.forEach((plate) => {
      const polyline = L.polyline(plate.coords, plate.style).bindTooltip(plate.tooltip, {
        sticky: true,
      })
      platesLayer.addLayer(polyline)

      if (plate.label) {
        const icon = L.divIcon({
          html: `<div style="background: rgba(10,14,26,0.85); color: ${plate.label.color}; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; white-space: nowrap; border: 1px solid ${plate.label.color}; pointer-events: none; font-family: monospace;">${plate.label.text}</div>`,
          className: '',
          iconAnchor: [40, 10],
        })
        platesLayer.addLayer(L.marker([plate.label.lat, plate.label.lng], { icon, interactive: false }))
      }
    })

    generalPlateLabels.forEach((gl) => {
      const icon = L.divIcon({
        html: `<div style="background: rgba(10,14,26,0.8); color: ${gl.color}; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 800; white-space: nowrap; border: 1px dashed ${gl.color}; pointer-events: none; letter-spacing: 0.05em;">${gl.text}</div>`,
        className: '',
        iconAnchor: [50, 10],
      })
      platesLayer.addLayer(L.marker([gl.lat, gl.lng], { icon, interactive: false }))
    })
    layerGroupsRef.current.plates = platesLayer

    // Layer 3: Sensor BMKG
    const sensorLayer = L.layerGroup()
    sensors.forEach((s) => {
      const color = s.type === 'dart' ? '#0ea5e9' : s.type === 'tide' ? '#22d3ee' : '#818cf8'
      const iconLabel = s.type === 'dart' ? '📡' : s.type === 'tide' ? '🌊' : '📻'
      const typeName =
        s.type === 'dart' ? 'DART / OBP Buoy' : s.type === 'tide' ? 'Tide Gauge BMKG' : 'OBS Seismometer'

      const customIcon = L.divIcon({
        html: `<div style="position: relative; width: 22px; height: 22px;">
                 <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 12px; height: 12px; border-radius: 50%; background: ${color}; border: 2px solid #ffffff; z-index: 2;"></div>
                 <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 22px; height: 22px; border-radius: 50%; background: ${color}; opacity: 0.35; animation: sensor-pulse 2s ease-in-out infinite;"></div>
               </div>`,
        className: '',
        iconAnchor: [11, 11],
      })

      const marker = L.marker([s.lat, s.lng], { icon: customIcon }).bindPopup(
        `<div>
          <strong style="color: ${color}; font-size: 13px;">${iconLabel} ${s.name}</strong>
          <div style="color: #64748b; font-size: 10px; text-transform: uppercase; font-weight: 700; margin-top: 2px;">${typeName}</div>
          <div style="color: #cbd5e1; font-size: 11px; margin-top: 6px; line-height: 1.5;">${s.desc}</div>
          <div style="color: #f59e0b; font-size: 9px; margin-top: 4px; font-style: italic;">*Posisi sensor ilustratif jejaring InaTEWS</div>
        </div>`
      )
      sensorLayer.addLayer(marker)
    })
    layerGroupsRef.current.sensor = sensorLayer

    // Add all layers initially
    platesLayer.addTo(map)
    tsunamiLayer.addTo(map)
    sensorLayer.addTo(map)

    // Invalidate size to guarantee no partial grey render
    setTimeout(() => {
      map.invalidateSize()
    }, 250)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Handle Layer Filtering
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return
    const { plates, tsunami, sensor } = layerGroupsRef.current
    if (!plates || !tsunami || !sensor) return

    const showPlates = activeFilter === 'all' || activeFilter === 'plates'
    const showTsunami = activeFilter === 'all' || activeFilter === 'tsunami'
    const showSensor = activeFilter === 'all' || activeFilter === 'sensor'

    if (showPlates) {
      if (!map.hasLayer(plates)) map.addLayer(plates)
    } else {
      if (map.hasLayer(plates)) map.removeLayer(plates)
    }

    if (showTsunami) {
      if (!map.hasLayer(tsunami)) map.addLayer(tsunami)
    } else {
      if (map.hasLayer(tsunami)) map.removeLayer(tsunami)
    }

    if (showSensor) {
      if (!map.hasLayer(sensor)) map.addLayer(sensor)
    } else {
      if (map.hasLayer(sensor)) map.removeLayer(sensor)
    }
  }, [activeFilter])

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-xs font-semibold text-[#38bdf8] uppercase tracking-wider mb-3">
          <Globe className="w-3.5 h-3.5" />
          <span>Sistem Pemetaan Spasial</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Peta Risiko Tsunami Indonesia
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#94a3b8] max-w-3xl">
          Visualisasi interaktif batas lempeng tektonik utama, rekaman historis episentrum tsunami, dan sebaran instrumen pemantau laut BMKG InaTEWS.
        </p>

        {/* Disclaimer alert */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#111827] border border-[#1e293b] flex items-center gap-3 text-xs text-[#cbd5e1]">
          <Shield className="w-4 h-4 text-[#f59e0b] shrink-0" />
          <span>
            <b>Catatan Integritas Data:</b> Titik sensor dan batas lempeng ditampilkan sebagai representasi edukasi spasial berbasis data arsip InaTEWS dan geodesi. Halaman ini bukan sistem pemantauan sensor real-time instrumen BMKG.
          </span>
        </div>
      </div>

      {/* Layer Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider mr-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#0ea5e9]" /> Filter Layer:
        </span>

        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#166534] text-[#86efac] border border-[#22c55e]'
              : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:text-white'
          }`}
        >
          🌐 Tampilkan Semua
        </button>

        <button
          onClick={() => setActiveFilter('plates')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'plates'
              ? 'bg-[#2a1705] text-[#ff6b00] border border-[#ff6b00]'
              : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:text-white'
          }`}
        >
          🔶 Lempeng Tektonik
        </button>

        <button
          onClick={() => setActiveFilter('tsunami')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'tsunami'
              ? 'bg-[#2b0808] text-[#ef4444] border border-[#ef4444]'
              : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:text-white'
          }`}
        >
          🌊 Tsunami Historis
        </button>

        <button
          onClick={() => setActiveFilter('sensor')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'sensor'
              ? 'bg-[#051f2d] text-[#0ea5e9] border border-[#0ea5e9]'
              : 'bg-[#111827] text-[#94a3b8] border border-[#1e293b] hover:text-white'
          }`}
        >
          📡 Sensor BMKG (InaTEWS)
        </button>
      </div>

      {/* Map Container */}
      <div className="rounded-2xl border border-[#1e293b] bg-[#111827] overflow-hidden shadow-2xl">
        <div ref={mapContainerRef} className="w-full h-[540px] z-10" />

        {/* Dynamic Legend Bar */}
        <div className="p-4 bg-[#0d1322] border-t border-[#1e293b] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#94a3b8]">
          <span className="font-bold text-white text-[11px] uppercase tracking-wider">
            Legenda:
          </span>

          {(activeFilter === 'all' || activeFilter === 'tsunami') && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] inline-block" />
                <span>Tsunami Besar (M ≥ 8.0)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] inline-block" />
                <span>Tsunami Menengah (7.0 – 7.9)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] inline-block" />
                <span>Tsunami Ringan / Vulkanik</span>
              </div>
            </>
          )}

          {(activeFilter === 'all' || activeFilter === 'plates') && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#ff6b00] inline-block rounded" />
                <span>Palung Sunda / Busur Banda</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#8b5cf6] inline-block rounded" />
                <span>Palung Sulawesi / Filipina</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-[#f59e0b] inline-block rounded" />
                <span>Sesar Geser Aktif</span>
              </div>
            </>
          )}

          {(activeFilter === 'all' || activeFilter === 'sensor') && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0ea5e9] inline-block" />
                <span>Buoy Tekanan DART</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22d3ee] inline-block" />
                <span>Stasiun Tide Gauge</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8] inline-block" />
                <span>OBS Seismograf Laut</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3 Regional Context Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-lg">
          <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-xl">🌊</span>
            <span>Samudera Hindia (Zona Sunda)</span>
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Zona subduksi Sumatera–Jawa merupakan batas pertemuan Lempeng Indo-Australia yang menunjam ke bawah Lempeng Eurasia, menjadi generator utama gempa megathrust berpotensi tsunami skala raksasa di Indonesia bagian barat.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-lg">
          <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span>Cincin Api Pasifik (Indonesia Timur)</span>
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Pertemuan kompleks antara Lempeng Pasifik, Filipina, Eurasia, dan benua mikro di wilayah Maluku, Papua, dan Sulawesi memicu sesar geser cepat dan palung laut dalam yang rawan menghasilkan tsunami lokal berkecepatan tinggi.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-lg">
          <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-xl">🌋</span>
            <span>Aktivitas Vulkanik Selat Sunda</span>
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Krakatau dan Anak Krakatau dapat memicu tsunami akibat letusan kaldera eksplosif atau longsoran tebing barat daya ke laut (flank collapse) tanpa didahului sinyal gempa tektonik darat, menuntut kesiapsiagaan visual warga pesisir.
          </p>
        </div>
      </div>
    </main>
  )
}
