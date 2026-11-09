export const causesData = [
  {
    id: 0,
    title: 'Gempa Subduksi (Megathrust)',
    tag: 'Tektonik',
    borderColor: 'border-[#0ea5e9]/40',
    badgeColor: 'bg-[#0ea5e9]/10 text-[#38bdf8] border-[#0ea5e9]/30',
    shortDesc:
      'Patahan pada zona megathrust menggeser dasar laut dan memindahkan kolom air.',
    details: [
      { text: 'Lempeng tektonik bergerak perlahan (3–7 cm per tahun), mengunci regangan di zona megathrust selama ratusan tahun.' },
      { text: 'Patahan elastis tiba-tiba (elastic rebound) mendisplesi kolom air secara vertikal dalam hitungan detik.' },
      { text: 'Gelombang tsunami merambat ke segala arah dengan panjang gelombang mencapai lebih dari 100–200 kilometer.' },
      { text: 'Contoh peristiwa nyata: Tsunami Aceh 2004 (M9.1), Tsunami Nias 2005 (M8.6), Tsunami Mentawai 2010 (M7.8).', highlight: true },
    ],
    note:
      'Merupakan pemicu lebih dari 85% kejadian tsunami di kawasan Samudera Hindia dan busur Sunda.',
    noteLabel: 'Catatan',
  },
  {
    id: 1,
    title: 'Erupsi Vulkanik',
    tag: 'Vulkanik',
    borderColor: 'border-[#f97316]/40',
    badgeColor: 'bg-[#f97316]/10 text-[#fb923c] border-[#f97316]/30',
    shortDesc:
      'Material vulkanik yang masuk ke laut dapat membentuk gelombang tsunami.',
    details: [
      { text: 'Terjadi akibat ledakan piroklastik bawah air atau kolaps kaldera (runtuhnya kawah gunung berapi).' },
      { text: 'Seringkali terjadi tanpa didahului gempa daratan berdurasi panjang, sehingga waktu evakuasi mandiri sangat singkat.' },
      { text: 'Massa material vulkanik yang masuk ke air membentuk gelombang kejut radial berkekuatan destruktif tinggi.' },
      { text: 'Contoh peristiwa bersejarah: Letusan Krakatau 1883 (ketinggian gelombang 40 m) dan Kolaps Anak Krakatau 2018 di Selat Sunda.', highlight: true },
    ],
  },
  {
    id: 2,
    title: 'Longsor Bawah Laut',
    tag: 'Geomorfologi',
    borderColor: 'border-[#8b5cf6]/40',
    badgeColor: 'bg-[#8b5cf6]/10 text-[#a78bfa] border-[#8b5cf6]/30',
    shortDesc:
      'Pergerakan sedimen bawah laut dapat memicu gelombang lokal.',
    details: [
      { text: 'Sering kali dipicu oleh gempa tektonik lokal berkekuatan sedang atau sedimentasi jenuh di tepi paparan benua.' },
      { text: 'Perpindahan sedimen jutaan ton memicu pembentukan gelombang lokal dengan amplitudo sangat tinggi.' },
      { text: 'Radius jangkauan umumnya terlokalisasi di sekitar teluk/palung, namun kedatangan gelombang hanya beberapa menit setelah pemicu.' },
      { text: 'Contoh peristiwa: Teluk Palu 2018 (kombinasi sesar mendatar, likuefaksi pantai, dan longsor dasar laut), Papua Nugini 1998.', highlight: true },
    ],
    note:
      'Dapat menghasilkan gelombang ekstrem lokal dalam hitungan 2–5 menit pasca guncangan awal.',
    noteLabel: 'Catatan',
  },
  {
    id: 3,
    title: 'Tumbukan Objek Luar Angkasa',
    tag: 'Teoretis / Langka',
    borderColor: 'border-[#ef4444]/40',
    badgeColor: 'bg-[#ef4444]/10 text-[#f87171] border-[#ef4444]/30',
    shortDesc:
      'Tumbukan benda antariksa di laut merupakan mekanisme hipotesis yang sangat langka.',
    details: [
      { text: 'Kinetik tumbukan benda antariksa dengan kecepatan puluhan kilometer per detik menguapkan air laut dan membentuk kawah tumbukan transien.' },
      { text: 'Runtuhnya rongga air dan ekspansi gelombang kejut menimbulkan gelombang megatsunami melingkar.' },
      { text: 'Sangat langka dalam skala waktu geologi modern dan TIDAK tercatat dalam riwayat rekaman sejarah modern Indonesia.' },
      { text: 'Dikaji dalam pemodelan ilmiah oseanografi dan astrofisika global untuk studi pertahanan planet bumi.' },
    ],
    note:
      'Peristiwa hipotesis/teoretis; tidak ada rekaman instrumen modern tsunami Indonesia dari penyebab ini.',
    noteLabel: 'Catatan khusus',
  },
]
