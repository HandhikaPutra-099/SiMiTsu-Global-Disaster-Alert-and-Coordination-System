export const beforeSteps = [
  {
    id: 1,
    title: "Kenali Jalur Evakuasi",
    desc: "Ketahui jalur evakuasi resmi dan lokasi Tempat Evakuasi Sementara (TES) atau dataran tinggi terdekat yang telah dipetakan BPBD setempat."
  },
  {
    id: 2,
    title: "Buat Rencana Keluarga",
    desc: "Sepakati titik temu darurat dan nomor kontak anggota keluarga jika jaringan telekomunikasi terganggu saat bencana."
  },
  {
    id: 3,
    title: "Siapkan Tas Darurat (Go Bag)",
    desc: "Sediakan tas siaga bencana berisi kebutuhan pokok untuk bertahan 72 jam pertama di lokasi yang mudah dijangkau saat darurat."
  }
];

export const duringSteps = [
  {
    id: 1,
    title: "Evakuasi Segera saat Gempa Kuat/Lama di Pesisir",
    desc: "Jika merasakan guncangan gempa kuat atau berlangsung lama (>20 detik) di kawasan pantai, segera evakuasi ke tempat tinggi tanpa menunggu peringatan resmi."
  },
  {
    id: 2,
    title: "Jauhi Pantai, Muara, dan Sungai",
    desc: "Segera tinggalkan bibir pantai, teluk, muara, dan aliran sungai. Gelombang tsunami dapat merambat masuk ke daratan melalui aliran sungai dengan kecepatan tinggi."
  },
  {
    id: 3,
    title: "Ikuti Arahan Resmi dan Otoritas Lokal",
    desc: "Patuhi rambu evakuasi dan instruksi dari BPBD, BMKG, atau tim SAR setempat. Gunakan akses jalan kaki atau berlari jika terjadi kemacetan lalu lintas."
  }
];

export const afterSteps = [
  {
    id: 1,
    title: "Tunggu Hingga Otoritas Menyatakan Aman",
    desc: "Tetap berada di titik aman hingga ada pernyataan resmi dari BMKG atau BPBD bahwa ancaman tsunami berakhir. Gelombang tsunami adalah serangkaian gelombang, dan gelombang berikutnya bisa jauh lebih besar."
  },
  {
    id: 2,
    title: "Waspadai Bahaya Lanjutan",
    desc: "Perhatikan runtuhan bangunan, tiang listrik roboh, kebocoran gas, kabel listrik terbuka, dan pencemaran sumber air minum pasca genangan surut."
  },
  {
    id: 3,
    title: "Gunakan Informasi Resmi Sebelum Kembali",
    desc: "Hanya gunakan kanal informasi resmi pemerintah untuk pembaruan status keselamatan dan instruksi pemulihan sebelum memutuskan kembali ke hunian."
  }
];

export const riskZones = [
  {
    id: "red",
    name: "Zona Merah — Bahaya Tinggi",
    color: "#ef4444",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    coverage: "Area pesisir terdepan (indikasi elevasi rendah & langsung berbatasan dengan laut)*",
    items: [
      "Evakuasi SEGERA saat guncangan gempa kuat/lama terasa atau muncul tanda alami tsunami",
      "Tidak menunggu sirine peringatan dini atau konfirmasi resmi",
      "Jangan kembali ke zona ini sebelum otoritas berwenang menyatakan aman",
      "Rute evakuasi: bergerak cepat menjauhi garis pantai menuju dataran tinggi terdekat"
    ]
  },
  {
    id: "orange",
    name: "Zona Oranye — Bahaya Menengah",
    color: "#f97316",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    coverage: "Area transisi pesisir (potensi genangan atau limpasan gelombang signifikan)*",
    items: [
      "Siapkan tas darurat (Go Bag) tanpa menunda langkah penyelamatan diri",
      "Pantau perkembangan informasi resmi peringatan dini dari BMKG dan BPBD",
      "Kenali jalur evakuasi vertikal (TES) atau rute darurat terdekat",
      "Lakukan evakuasi mandiri terencana saat arahan siaga diaktifkan"
    ]
  },
  {
    id: "yellow",
    name: "Zona Kuning — Waspada",
    color: "#f59e0b",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    coverage: "Area daratan penyangga (potensi dampak sekunder atau dampak gelombang ekstrem)*",
    items: [
      "Tetap siaga dan ikuti terus pembaruan informasi dari saluran resmi",
      "Jangan mendekati pesisir atau muara sungai saat status peringatan aktif",
      "Bantu koordinasi dan tertibkan akses jalan bagi warga yang mengevakuasi diri",
      "Pastikan jalur evakuasi lingkungan tidak terhalang kendaraan"
    ]
  },
  {
    id: "green",
    name: "Zona Hijau — Relatif Aman",
    color: "#22c55e",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    coverage: "Area dataran tinggi atau lokasi di luar jangkauan bahaya rendaman tsunami*",
    items: [
      "Area titik kumpul utama (assembly point) dan lokasi posko pengungsian",
      "Dukung pertolongan pertama, logistik, dan pendataan warga terdampak",
      "Koordinasi teratur bersama tim SAR gabungan, BPBD, dan aparat relawan",
      "Tetap waspada terhadap risiko gempa susulan terhadap kelayakan struktur bangunan"
    ]
  }
];

export const riskZonesDisclaimer =
  "*Catatan Penting: Klasifikasi zona risiko di atas disajikan sebagai panduan edukasi umum. Penetapan zona bahaya, batas elevasi, serta radius aman yang pasti dan mengikat wajib mengacu pada peta bahaya tsunami resmi yang diterbitkan oleh BPBD setempat.";

export const evacuationSteps = [
  {
    step: 1,
    title: "Kenali Tanda Alam",
    desc: "Guncangan kuat berlangsung lebih dari 20–30 detik, air laut surut tiba-tiba memperlihatkan dasar laut, atau terdengar suara gemuruh dari arah laut — segera bergerak menjauh tanpa menanti peringatan."
  },
  {
    step: 2,
    title: "Jangan Panik & Segera Bergerak",
    desc: "Bawa tas darurat jika siap di dekat Anda (jangan menunda evakuasi untuk mencarinya). Matikan gas dan listrik jika memungkinkan, lalu prioritaskan evakuasi dengan berjalan cepat atau berlari."
  },
  {
    step: 3,
    title: "Menuju Dataran Tinggi Sesuai Jalur Setempat",
    desc: "Menuju dataran tinggi sesuai jalur evakuasi setempat. Gunakan rute evakuasi resmi yang telah dipasang rambu oleh BPBD menuju bukit atau Tempat Evakuasi Sementara (TES)."
  },
  {
    step: 4,
    title: "Jauhi Muara & Aliran Sungai",
    desc: "Gelombang tsunami dapat bergerak menyusuri aliran sungai jauh ke pedalaman dengan arus deras. Hindari berada di dekat jembatan dan sempadan sungai saat evakuasi."
  },
  {
    step: 5,
    title: "Tunggu Hingga Otoritas Menyatakan Aman",
    desc: "Tunggu hingga otoritas menyatakan aman. Setelah tiba di tempat aman, tetap bertahan dan jangan kembali ke pantai terburu-buru sampai BMKG atau BPBD resmi mencabut ancaman peringatan."
  },
  {
    step: 6,
    title: "Komunikasi & Informasi Resmi",
    desc: "Hubungi keluarga via pesan singkat (SMS/chat) untuk menghemat baterai. Pantau informasi resmi lewat radio portabel atau BMKG. Hubungi layanan darurat BNPB di 117 jika memerlukan evakuasi medis."
  },
  {
    step: 7,
    title: "Kembali Hanya Setelah Ada Izin",
    desc: "Kembali ke permukiman hanya setelah diizinkan oleh pihak berwenang. Waspadai struktur bangunan yang rapuh, kabel listrik roboh, dan air bersih yang terkontaminasi."
  }
];

export const goBagItems = [
  "Air mineral (minimal 3 liter per orang)",
  "Makanan darurat siap santap / biskuit padat kalori",
  "Kotak Pertolongan Pertama (P3K)",
  "Senter bertenaga baterai / tenaga putar + baterai cadangan",
  "Dokumen penting (KTP, KK, polis, ijazah) dalam kantong plastik kedap air",
  "Uang tunai secukupnya dalam pecahan kecil",
  "Peluit darurat untuk menarik perhatian tim penyelamat",
  "Selimut termal (foil emergency blanket) atau pakaian cadangan",
  "Obat-obatan rutin pribadi bagi anggota keluarga yang membutuhkan",
  "Radio portabel (AM/FM) untuk memantau siaran informasi darurat",
  "Masker penutup hidung dan perlengkapan sanitasi pribadi"
];

