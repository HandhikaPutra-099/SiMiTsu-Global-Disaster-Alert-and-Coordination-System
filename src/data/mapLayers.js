export const tectonicPlates = [
  {
    name: "Palung Sunda (Java Trench)",
    tooltip: "🔶 Palung Sunda (Java Trench) — Zona Megathrust Utama",
    coords: [
      [14.0, 93.0], [12.0, 93.5], [10.0, 93.8], [8.0, 94.5], [6.0, 94.8], [4.0, 95.0],
      [2.0, 95.5], [0.0, 96.5], [-1.5, 97.5], [-3.0, 99.0], [-4.5, 100.5], [-5.5, 102.0],
      [-6.5, 103.5], [-7.5, 105.0], [-8.5, 106.5], [-9.0, 108.5], [-9.5, 110.5],
      [-9.8, 112.5], [-9.8, 114.5], [-9.5, 116.5], [-9.8, 118.5], [-10.0, 120.5],
      [-10.2, 122.0], [-10.0, 124.0]
    ],
    style: { color: "#ff6b00", weight: 4, opacity: 0.95, dashArray: "12,5" },
    label: { lat: -9.0, lng: 109.5, text: "PALUNG SUNDA", color: "#ff6b00" }
  },
  {
    name: "Busur Banda",
    tooltip: "🔶 Busur Banda — Batas Konvergen",
    coords: [
      [-9.5, 124.0], [-9.2, 125.5], [-8.8, 127.0], [-8.0, 128.5],
      [-7.0, 130.0], [-5.5, 131.5], [-4.5, 132.5], [-3.5, 133.5],
      [-2.5, 134.5], [-1.5, 135.5], [-0.5, 136.5], [0.5, 137.5]
    ],
    style: { color: "#ff6b00", weight: 3, opacity: 0.9, dashArray: "8,5" },
    label: { lat: -4.0, lng: 131.5, text: "BUSUR BANDA", color: "#ff6b00" }
  },
  {
    name: "Batas Lempeng Filipina",
    tooltip: "🟣 Batas Lempeng Filipina",
    coords: [
      [10.0, 127.5], [8.0, 127.0], [6.0, 126.0], [4.0, 125.5],
      [2.0, 125.5], [0.5, 126.0], [-1.0, 126.5], [-2.0, 127.0],
      [-3.0, 127.5], [-4.0, 128.0]
    ],
    style: { color: "#8b5cf6", weight: 3, opacity: 0.9, dashArray: "6,4" },
    label: { lat: 3.0, lng: 126.2, text: "LEMPENG FILIPINA", color: "#8b5cf6" }
  },
  {
    name: "Palung Sulawesi Utara",
    tooltip: "🟣 Palung Sulawesi Utara",
    coords: [
      [4.5, 124.0], [3.5, 124.5], [2.5, 125.0], [1.5, 125.5],
      [0.5, 126.5], [-0.5, 127.0], [-1.5, 127.5], [-2.0, 128.5]
    ],
    style: { color: "#8b5cf6", weight: 2.5, opacity: 0.9, dashArray: "6,4" },
    label: { lat: 2.5, lng: 124.8, text: "PALUNG SULAWESI", color: "#8b5cf6" }
  },
  {
    name: "Lempeng Australia (PNG)",
    tooltip: "🟢 Batas Lempeng Australia — konvergen dengan PNG",
    coords: [
      [-4.5, 141.0], [-5.0, 143.0], [-5.5, 145.0], [-6.0, 147.0],
      [-6.5, 149.5], [-7.0, 152.0], [-7.5, 155.0]
    ],
    style: { color: "#22c55e", weight: 3, opacity: 0.9, dashArray: "8,4" },
    label: { lat: -6.0, lng: 145.5, text: "LEMPENG AUSTRALIA", color: "#22c55e" }
  },
  {
    name: "Lempeng Australia (Selatan Timor)",
    tooltip: "🟢 Lempeng Australia — batas selatan Timor",
    coords: [
      [-10.5, 124.0], [-11.0, 126.0], [-11.5, 128.0], [-12.0, 130.0],
      [-12.5, 132.0], [-13.0, 134.0], [-13.0, 136.0], [-12.5, 138.0]
    ],
    style: { color: "#22c55e", weight: 2.5, opacity: 0.85, dashArray: "6,4" },
    label: null
  },
  {
    name: "Sesar Besar Sumatera",
    tooltip: "🟡 Sesar Besar Sumatera (Dextral Strike-Slip)",
    coords: [
      [5.5, 95.5], [4.5, 96.0], [3.5, 96.5], [2.5, 97.0], [1.5, 97.5],
      [0.5, 98.0], [-0.5, 98.5], [-1.5, 99.0], [-2.5, 99.5], [-3.5, 100.0],
      [-4.5, 101.0], [-5.5, 102.0], [-5.8, 103.5]
    ],
    style: { color: "#f59e0b", weight: 2.5, opacity: 0.85, dashArray: "4,4" },
    label: { lat: 1.0, lng: 97.8, text: "SESAR SUMATERA", color: "#f59e0b" }
  },
  {
    name: "Sesar Palu-Koro",
    tooltip: "🟡 Sesar Palu-Koro — Penyebab Tsunami Palu 2018",
    coords: [
      [1.5, 120.0], [1.0, 120.2], [0.5, 120.0], [0.0, 119.9],
      [-0.5, 119.8], [-1.0, 119.8], [-1.5, 120.2], [-2.0, 120.5]
    ],
    style: { color: "#f59e0b", weight: 2.5, opacity: 0.9, dashArray: "4,3" },
    label: { lat: 0.0, lng: 120.5, text: "SESAR PALU-KORO", color: "#f59e0b" }
  },
  {
    name: "Sesar Sorong",
    tooltip: "🟡 Sesar Sorong",
    coords: [
      [-1.0, 131.0], [-0.5, 132.5], [0.0, 134.0], [0.5, 135.5],
      [0.8, 137.0], [1.0, 138.5], [1.0, 140.5]
    ],
    style: { color: "#f59e0b", weight: 2, opacity: 0.8, dashArray: "4,4" },
    label: { lat: 0.5, lng: 135.5, text: "SESAR SORONG", color: "#f59e0b" }
  },
  {
    name: "Sesar Flores (Back-Arc Thrust)",
    tooltip: "🔵 Sesar Flores — Penyebab Gempa Flores 1992 & Lombok 2018",
    coords: [
      [-7.5, 117.0], [-8.0, 119.0], [-8.2, 121.0],
      [-8.0, 123.0], [-7.5, 124.5]
    ],
    style: { color: "#60a5fa", weight: 2, opacity: 0.8, dashArray: "5,3" },
    label: { lat: -8.0, lng: 120.5, text: "SESAR FLORES", color: "#60a5fa" }
  }
];

export const generalPlateLabels = [
  { lat: 5.0, lng: 105.0, text: "LEMPENG EURASIA", color: "#93c5fd" },
  { lat: -14.0, lng: 120.0, text: "LEMPENG AUSTRALIA", color: "#86efac" }
];

export const sensors = [
  // DART / OBP Buoys (oceanic pressure sensors)
  { lat: -6.5, lng: 100.5, type: "dart", name: "DART 53401", desc: "Buoy tekanan bawah laut (OBP), Samudra Hindia barat Sumatera. Mendeteksi perubahan tekanan kolom air akibat tsunami." },
  { lat: -8.0, lng: 106.5, type: "dart", name: "DART 56001", desc: "Buoy DART di selatan Jawa, zona palung Sunda. Real-time data ke InaTEWS BMKG." },
  { lat: -9.5, lng: 112.0, type: "dart", name: "DART 56002", desc: "Buoy tekanan bawah laut di selatan Jawa Timur. Mendeteksi gelombang megathrust." },
  { lat: -9.0, lng: 120.5, type: "dart", name: "DART 56003", desc: "Buoy OBP selatan Nusa Tenggara. Mendukung peringatan tsunami regional." },
  { lat: -10.5, lng: 118.0, type: "dart", name: "DART 56004", desc: "Buoy di palung Sumbawa — zona rawan megathrust." },
  { lat: -7.5, lng: 129.0, type: "dart", name: "DART Banda", desc: "Sensor tekanan Laut Banda, monitoring busur Banda." },
  { lat: -2.5, lng: 130.5, type: "dart", name: "DART Maluku", desc: "Buoy OBP utara Maluku, area pertemuan 3 lempeng." },
  { lat: 2.0, lng: 96.5, type: "dart", name: "DART 23401", desc: "Buoy DART barat laut Sumatera, jalur propagasi tsunami Aceh." },
  { lat: -4.0, lng: 99.5, type: "dart", name: "DART Mentawai", desc: "OBP buoy kawasan Kepulauan Mentawai — zona megathrust aktif." },
  { lat: 0.5, lng: 124.5, type: "dart", name: "DART Sulawesi", desc: "Sensor laut utara Sulawesi, dekat palung Sulawesi." },
  { lat: -1.0, lng: 136.5, type: "dart", name: "DART Papua", desc: "Buoy teluk Cenderawasih, Papua." },

  // Tide Gauges — BMKG InaTEWS
  { lat: 3.3, lng: 95.3, type: "tide", name: "Tide Gauge Sabang", desc: "Stasiun tide gauge Sabang, Aceh. Titik terdepan monitoring tsunami Samudera Hindia." },
  { lat: -5.4, lng: 105.3, type: "tide", name: "Tide Gauge Panjang", desc: "Tide gauge Pelabuhan Panjang, Lampung. Monitoring Selat Sunda." },
  { lat: -6.1, lng: 106.8, type: "tide", name: "Tide Gauge Tanjung Priok", desc: "Stasiun Jakarta — monitoring teluk Jakarta dan Laut Jawa." },
  { lat: -7.2, lng: 112.7, type: "tide", name: "Tide Gauge Surabaya", desc: "Tide gauge Tanjung Perak, monitoring Selat Madura." },
  { lat: -8.7, lng: 115.2, type: "tide", name: "Tide Gauge Benoa", desc: "Stasiun Bali, monitoring Samudera Hindia selatan Bali." },
  { lat: -8.5, lng: 122.2, type: "tide", name: "Tide Gauge Maumere", desc: "Tide gauge Maumere, NTT — area gempa Flores 1992." },
  { lat: -0.9, lng: 119.8, type: "tide", name: "Tide Gauge Palu", desc: "Stasiun Palu — pasca tsunami 2018, sistem monitoring ditingkatkan." },
  { lat: -3.7, lng: 128.2, type: "tide", name: "Tide Gauge Ambon", desc: "Tide gauge Ambon — monitoring Laut Banda dan Laut Seram." },
  { lat: 1.0, lng: 124.8, type: "tide", name: "Tide Gauge Manado", desc: "Stasiun Manado, monitoring utara Sulawesi." },
  { lat: -2.5, lng: 140.7, type: "tide", name: "Tide Gauge Jayapura", desc: "Tide gauge Jayapura, Papua — monitoring Pasifik." },
  { lat: -1.3, lng: 116.8, type: "tide", name: "Tide Gauge Balikpapan", desc: "Monitoring Selat Makassar dan Kalimantan Timur." },
  { lat: -8.5, lng: 116.1, type: "tide", name: "Tide Gauge Lombok", desc: "Tide gauge pasca gempa Lombok 2018." },
  { lat: -2.0, lng: 99.9, type: "tide", name: "Tide Gauge Padang", desc: "Stasiun Padang — garis terdepan monitoring megathrust Mentawai." },

  // Seismograf bawah laut (OBS — Ocean Bottom Seismometer)
  { lat: -5.0, lng: 102.5, type: "seis", name: "OBS Bengkulu", desc: "Ocean Bottom Seismometer barat Bengkulu — monitoring subduksi Sumatera selatan." },
  { lat: -8.5, lng: 108.0, type: "seis", name: "OBS Java Selatan", desc: "OBS di palung selatan Jawa Tengah." },
  { lat: -9.2, lng: 114.0, type: "seis", name: "OBS Banyuwangi", desc: "OBS selatan Banyuwangi, dekat segmen palung aktif." },
  { lat: -9.8, lng: 119.0, type: "seis", name: "OBS Sumbawa", desc: "OBS selatan Sumbawa, monitoring segmen subduksi NTB." },
  { lat: 0.0, lng: 122.5, type: "seis", name: "OBS Sulawesi Utara", desc: "OBS utara Sulawesi — monitoring seismik Laut Maluku." },
  { lat: -3.5, lng: 135.0, type: "seis", name: "OBS Papua Barat", desc: "OBS Teluk Bintuni, Papua Barat." }
];

