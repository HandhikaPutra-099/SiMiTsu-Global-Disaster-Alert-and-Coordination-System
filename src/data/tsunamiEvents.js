export const tsunamiEvents = [
  { id: 0, year: 2004, name: "Aceh / Samudera Hindia", mag: 9.1, height: 30, victims: "227.000+", cause: "Megathrust Sumatera", lat: 3.3, lng: 95.9 },
  { id: 1, year: 2006, name: "Pangandaran, Jawa Barat", mag: 7.7, height: 21, victims: "668", cause: "Gempa subduksi", lat: -9.3, lng: 107.3 },
  { id: 2, year: 2010, name: "Kepulauan Mentawai", mag: 7.8, height: 9, victims: "408", cause: "Gempa subduksi", lat: -3.5, lng: 100.1 },
  { id: 3, year: 1992, name: "Flores, NTT", mag: 7.8, height: 26, victims: "2.500", cause: "Gempa subduksi", lat: -8.5, lng: 122.0 },
  { id: 4, year: 2018, name: "Palu-Donggala, Sulawesi", mag: 7.5, height: 11, victims: "4.340+", cause: "Sesar lokal + likuefaksi", lat: -0.18, lng: 119.85 },
  { id: 5, year: 1996, name: "Biak, Papua", mag: 8.2, height: 7, victims: "166", cause: "Gempa subduksi", lat: -0.89, lng: 136.0 },
  { id: 6, year: 2018, name: "Selat Sunda (Anak Krakatau)", mag: null, height: 5, victims: "426", cause: "Erupsi vulkanik", lat: -6.1, lng: 105.42 },
  { id: 7, year: 1950, name: "Maluku Utara", mag: 8.1, height: 10, victims: "N/A", cause: "Gempa subduksi", lat: 1.6, lng: 128.2 },
  { id: 8, year: 2005, name: "Nias, Sumatera Utara", mag: 8.6, height: 3, victims: "1.313", cause: "Megathrust", lat: 2.07, lng: 97.0 },
  { id: 9, year: 1994, name: "Halmahera/Ternate", mag: 7.0, height: 15, victims: "238", cause: "Gempa subduksi", lat: 1.05, lng: 127.6 },
  { id: 10, year: 2018, name: "Lombok, NTB", mag: 7.0, height: 2, victims: "560", cause: "Sesar Flores", lat: -8.35, lng: 116.5 },
  { id: 11, year: 2006, name: "Yogyakarta (off-shore)", mag: 6.3, height: 2, victims: "5.749", cause: "Gempa tektonik", lat: -9.3, lng: 110.4 },
  { id: 12, year: 1883, name: "Selat Sunda (Krakatau)", mag: null, height: 40, victims: "36.000+", cause: "Erupsi Krakatau", lat: -6.12, lng: 105.42 },
  { id: 13, year: 2022, name: "Cianjur, Jawa Barat", mag: 5.6, height: null, victims: "335", cause: "Sesar Cugenang", lat: -6.86, lng: 107.06 },
  { id: 14, year: 2021, name: "Sulawesi Barat", mag: 6.2, height: 1, victims: "105", cause: "Sesar Mamuju", lat: -2.98, lng: 118.9 },
  { id: 15, year: 2000, name: "Bengkulu, Sumatera", mag: 7.9, height: 3, victims: "97", cause: "Gempa subduksi", lat: -3.95, lng: 101.9 },
  { id: 16, year: 1977, name: "Sumbawa, NTB", mag: 8.3, height: 9, victims: "189", cause: "Gempa subduksi", lat: -11.1, lng: 118.5 },
  { id: 17, year: 2009, name: "Sumatera Barat (Padang)", mag: 7.6, height: 1, victims: "1.117", cause: "Gempa subduksi", lat: -0.79, lng: 99.96 },
  { id: 18, year: 2010, name: "Sumba, NTT", mag: 7.1, height: 2, victims: "N/A", cause: "Gempa subduksi", lat: -7.0, lng: 122.5 },
  { id: 19, year: 2019, name: "Maluku (Ambon)", mag: 6.5, height: 2, victims: "41", cause: "Sesar lokal", lat: -3.55, lng: 128.5 },
];

export function getMagClass(mag) {
  if (mag === null) return 'mag-low';
  if (mag >= 8.5) return 'mag-extreme';
  if (mag >= 7.8) return 'mag-high';
  if (mag >= 7.0) return 'mag-med';
  return 'mag-low';
}

export function getMagLabel(mag) {
  if (mag === null) return 'Vulkanik';
  if (mag >= 8.5) return 'Ekstrem';
  if (mag >= 7.8) return 'Besar';
  if (mag >= 7.0) return 'Menengah';
  return 'Kecil';
}

export function dotColor(mag) {
  return mag === null || mag >= 8.0 ? '#ef4444' : mag >= 7.0 ? '#f97316' : '#f59e0b';
}

