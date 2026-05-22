export interface LocalizedText {
  en: string;
  id: string;
}

export interface FeatureItem {
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
}

export interface WorkflowItem {
  title: LocalizedText;
  description: LocalizedText;
  image: string;
}

export interface MobileHighlightItem {
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
}

export interface StepItem {
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
}

export interface TelemetryItem {
  label: LocalizedText;
  value: string;
  status: "success" | "warning" | "danger";
}

export interface SpecItem {
  name: LocalizedText;
  value: LocalizedText;
}

export interface ProductItem {
  slug: string;
  category: "software" | "iot" | "hardware";
  title: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  badge: LocalizedText;
  heroImage: string;
  
  // Software solutions fields (optional, only populated if category === 'software')
  workflows?: WorkflowItem[];
  mobileHighlights?: MobileHighlightItem[];
  steps?: StepItem[];
  
  // IoT specific fields (optional, only populated if category === 'iot')
  telemetrySim?: TelemetryItem[];
  
  // Hardware specific fields (optional, only populated if category === 'hardware')
  specifications?: SpecItem[];
  certifications?: string[];
  dimensions?: {
    width: string;
    height: string;
    depth: string;
    weight: string;
  };
  
  // Common details
  features: FeatureItem[];
  benefits: FeatureItem[];
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    slug: "qifess",
    category: "software",
    title: {
      en: "Transform Field Operations Into A Real-Time Monitoring",
      id: "Ubah Operasi Lapangan Menjadi Pemantauan Real-Time"
    },
    tagline: {
      en: "Field Service Management",
      id: "Field Service Management"
    },
    badge: {
      en: "QIFESS FSM Platform",
      id: "Platform FSM QIFESS"
    },
    description: {
      en: "QIFESS provides all essential features for managing field service operations with real-time tracking, scheduling, and analytics.",
      id: "QIFESS menyediakan semua fitur penting untuk mengelola operasional layanan lapangan dengan pelacakan langsung, penjadwalan, dan analitik."
    },
    heroImage: "/images/preview_video_bg.png",
    workflows: [
      {
        title: {
          en: "ISP & Network Operations",
          id: "Operasi ISP & Jaringan"
        },
        description: {
          en: "Manage network installations, maintenance requests, and service disruptions with real-time technician coordination and operational visibility.",
          id: "Kelola instalasi jaringan, permintaan pemeliharaan, dan gangguan layanan dengan koordinasi teknisi real-time dan visibilitas operasional penuh."
        },
        image: "/images/usecase_main.png"
      },
      {
        title: {
          en: "Field Maintenance",
          id: "Pemeliharaan Lapangan"
        },
        description: {
          en: "Schedule routine equipment checks, dispatch closest certified technicians, and ensure field asset maintenance is handled promptly.",
          id: "Jadwalkan pemeriksaan rutin peralatan, kirim teknisi bersertifikat terdekat, dan pastikan pemeliharaan aset lapangan ditangani dengan segera."
        },
        image: "/images/why-choose-us.jpg"
      },
      {
        title: {
          en: "Technical Support Teams",
          id: "Tim Dukungan Teknis"
        },
        description: {
          en: "Equip your customer support representatives with instant ticket status feeds and coordinate field dispatches to solve issues on the first visit.",
          id: "Lengkapi tim dukungan pelanggan Anda dengan status tiket instan dan koordinasikan kunjungan lapangan untuk memecahkan masalah pada kunjungan pertama."
        },
        image: "/images/about-us.jpg"
      },
      {
        title: {
          en: "Utility & Infrastructure Services",
          id: "Layanan Utilitas & Infrastruktur"
        },
        description: {
          en: "Oversee water, power, gas, and telecom asset operations with geolocated tasks, offline forms compatibility, and safety checklist completions.",
          id: "Pantau operasional aset air, listrik, gas, dan telekomunikasi dengan tugas berbasis lokasi, kompatibilitas formulir luring, dan ceklis keselamatan."
        },
        image: "/images/preview_video_bg.png"
      }
    ],
    mobileHighlights: [
      {
        title: {
          en: "Task update on the go",
          id: "Pembaruan tugas saat bepergian"
        },
        description: {
          en: "Update status, add notes, and upload photos directly from the mobile app.",
          id: "Perbarui status, tambahkan catatan, dan unggah foto langsung dari aplikasi seluler."
        },
        icon: "CheckCircle"
      },
      {
        title: {
          en: "Live reporting",
          id: "Pelaporan langsung"
        },
        description: {
          en: "Submit work order reports instantly from any client location with e-signatures.",
          id: "Kirim laporan perintah kerja secara instan dari lokasi klien dengan tanda tangan digital."
        },
        icon: "FileText"
      },
      {
        title: {
          en: "Mobile access",
          id: "Akses seluler"
        },
        description: {
          en: "Everything your team needs to review service history is in one optimized app.",
          id: "Semua yang dibutuhkan tim untuk meninjau riwayat layanan ada dalam satu aplikasi yang dioptimalkan."
        },
        icon: "Smartphone"
      }
    ],
    steps: [
      {
        number: "01",
        title: {
          en: "Create & Assign",
          id: "Buat & Tugaskan"
        },
        description: {
          en: "Create service tickets and assign technicians instantly based on availability and workload.",
          id: "Buat tiket layanan dan tugaskan teknisi secara instan berdasarkan ketersediaan dan beban kerja."
        },
        image: "/images/usecase_main.png"
      },
      {
        number: "02",
        title: {
          en: "Track In Real-Time",
          id: "Lacak Secara Real-Time"
        },
        description: {
          en: "Monitor job progress, technician location, and task updates live from the field.",
          id: "Pantau kemajuan pekerjaan, lokasi teknisi, dan pembaruan tugas secara langsung dari lapangan."
        },
        image: "/images/why-choose-us.jpg"
      },
      {
        number: "03",
        title: {
          en: "Manage & Optimize",
          id: "Kelola & Optimalkan"
        },
        description: {
          en: "Adjust schedules, reassign jobs, and optimize resources to improve field efficiency.",
          id: "Sesuaikan jadwal, tugaskan kembali pekerjaan, dan optimalkan sumber daya untuk meningkatkan efisiensi lapangan."
        },
        image: "/images/about-us.jpg"
      },
      {
        number: "04",
        title: {
          en: "Report & Analyze",
          id: "Laporkan & Analisis"
        },
        description: {
          en: "Generate automated completion reports and track analytical operations dashboard graphs.",
          id: "Hasilkan laporan penyelesaian otomatis dan pantau grafik analitik operasional dasbor."
        },
        image: "/images/preview_video_bg.png"
      }
    ],
    features: [
      {
        title: {
          en: "Real-Time Technician Tracking",
          id: "Pelacakan Teknisi Real-Time"
        },
        description: {
          en: "Track technician location and status live on an interactive map to optimize daily dispatching.",
          id: "Lacak lokasi dan status teknisi secara langsung di peta interaktif untuk mengoptimalkan pengiriman harian."
        },
        icon: "MapPin"
      },
      {
        title: {
          en: "Active Mobile Dashboard",
          id: "Dasbor Seluler Aktif"
        },
        description: {
          en: "Empower field technicians with tasks checklists, navigation routes, and reporting tools.",
          id: "Berdayakan teknisi lapangan dengan daftar tugas, rute navigasi, dan alat pelaporan digital."
        },
        icon: "Smartphone"
      },
      {
        title: {
          en: "Performance & Dispatching",
          id: "Kinerja & Pengiriman"
        },
        description: {
          en: "Measure field response times and calculate completion rates with beautiful dashboards.",
          id: "Ukur waktu respons lapangan dan hitung tingkat penyelesaian dengan dasbor yang indah."
        },
        icon: "Activity"
      },
      {
        title: {
          en: "Automated Work Order Schedule",
          id: "Jadwal Kerja Otomatis"
        },
        description: {
          en: "Generate work orders automatically from customer requests and sync directly with technician calendars.",
          id: "Buat perintah kerja secara otomatis dari permintaan pelanggan dan sinkronkan langsung dengan kalender teknisi."
        },
        icon: "Calendar"
      },
      {
        title: {
          en: "General Ticket Dynamic SLA Monitor",
          id: "Pemantau SLA Tiket Dinamis"
        },
        description: {
          en: "Ensure compliance with client SLAs through automated color-coded reminders and escalations.",
          id: "Pastikan kepatuhan terhadap SLA klien melalui pengingat berkode warna otomatis dan eskalasi."
        },
        icon: "Clock"
      },
      {
        title: {
          en: "Customized Standard & Export Report",
          id: "Laporan Standar & Ekspor Kustom"
        },
        description: {
          en: "Export clean operational, technician performance, and client reports in CSV, Excel, or PDF format.",
          id: "Ekspor laporan operasional, kinerja teknisi, dan laporan klien yang bersih dalam format CSV, Excel, atau PDF."
        },
        icon: "Download"
      }
    ],
    benefits: [
      {
        title: {
          en: "Easy to Configure",
          id: "Mudah Dikonfigurasi"
        },
        description: {
          en: "Tailor workflows, status labels, and job report forms to fit your exact business process.",
          id: "Sesuaikan alur kerja, label status, dan formulir laporan pekerjaan agar sesuai dengan proses bisnis Anda."
        },
        icon: "Settings"
      },
      {
        title: {
          en: "Open API Integrations",
          id: "Integrasi API Terbuka"
        },
        description: {
          en: "Integrate seamlessly with your existing enterprise ERP, CRM, and financial accounting systems.",
          id: "Integrasikan secara mulus dengan sistem ERP, CRM, dan akuntansi keuangan perusahaan Anda yang sudah ada."
        },
        icon: "Cpu"
      },
      {
        title: {
          en: "Independent & Secure",
          id: "Independen & Aman"
        },
        description: {
          en: "Enterprise-grade data encryption both in transit and at rest with strict role access controls.",
          id: "Enkripsi data kelas perusahaan baik saat transit maupun saat disimpan dengan kontrol akses peran yang ketat."
        },
        icon: "Lock"
      },
      {
        title: {
          en: "Process Predictive Analytics",
          id: "Analitik Prediktif Proses"
        },
        description: {
          en: "Predict infrastructure maintenance cycles and prevent equipment breakdowns using smart algorithms.",
          id: "Prediksi siklus pemeliharaan infrastruktur dan cegah kerusakan peralatan menggunakan algoritma cerdas."
        },
        icon: "TrendingUp"
      },
      {
        title: {
          en: "Real-Time Telemetry Insights",
          id: "Wawasan Telemetri Real-Time"
        },
        description: {
          en: "Access real-time telemetry inputs on elegant operational graphs for rapid data-driven decisions.",
          id: "Akses masukan telemetri real-time pada grafik operasional yang elegan untuk keputusan cepat berbasis data."
        },
        icon: "Sliders"
      },
      {
        title: {
          en: "Enterprise Security Uptime",
          id: "Uptime & Keamanan Perusahaan"
        },
        description: {
          en: "99.9% guaranteed platform uptime SLA supported by professional 24/7 technical help desks.",
          id: "SLA uptime platform bergaransi 99,9% didukung oleh meja bantuan teknis profesional 24/7."
        },
        icon: "Shield"
      }
    ]
  },
  {
    slug: "simq",
    category: "software",
    title: {
      en: "Intelligent Queue Management & Resource Planning",
      id: "Manajemen Antrean Cerdas & Perencanaan Sumber Daya"
    },
    tagline: {
      en: "Queue & Customer Operations",
      id: "Operasi Antrean & Pelanggan"
    },
    badge: {
      en: "SIMQ Platform",
      id: "Platform SIMQ"
    },
    description: {
      en: "SIMQ streamlines customer flows and counter dispatching using smart wait-time forecasting algorithms and unified ticket kiosks.",
      id: "SIMQ menyederhanakan alur pelanggan dan pembagian loket menggunakan algoritma prakiraan waktu tunggu cerdas dan kios tiket terpadu."
    },
    heroImage: "/images/preview_video_bg.png",
    workflows: [
      {
        title: {
          en: "Bank Branch Desks",
          id: "Loket Kantor Cabang Bank"
        },
        description: {
          en: "Manage customer arrivals, separate VIP customer desks, and optimize teller work distribution in real-time.",
          id: "Kelola kedatangan nasabah, pisahkan meja nasabah VIP, dan optimalkan distribusi kerja teller secara real-time."
        },
        image: "/images/usecase_main.png"
      },
      {
        title: {
          en: "Public Service Lounges",
          id: "Lounge Layanan Publik"
        },
        description: {
          en: "Enable online pre-booking, dynamic SMS wait-list notifications, and comprehensive terminal ticketing.",
          id: "Aktifkan pemesanan pra-daring, notifikasi daftar tunggu SMS dinamis, dan tiket terminal komprehensif."
        },
        image: "/images/why-choose-us.jpg"
      }
    ],
    features: [
      {
        title: {
          en: "Predictive Queue Routing",
          id: "Perutean Antrean Prediktif"
        },
        description: {
          en: "Route customers dynamically to counters with the lowest average transaction processing times.",
          id: "Rute pelanggan secara dinamis ke loket dengan rata-rata waktu pemrosesan transaksi terendah."
        },
        icon: "Shuffle"
      },
      {
        title: {
          en: "Multi-Channel Wait Alerts",
          id: "Pemberitahuan Tunggu Multi-Saluran"
        },
        description: {
          en: "Keep visitors relaxed with real-time queue positions sent via WhatsApp, SMS, and dashboard screens.",
          id: "Biarkan pengunjung rileks dengan posisi antrean real-time yang dikirim via WhatsApp, SMS, dan layar dasbor."
        },
        icon: "Bell"
      }
    ],
    benefits: [
      {
        title: {
          en: "Reduced Wait Times",
          id: "Pengurangan Waktu Tunggu"
        },
        description: {
          en: "Improve visitor satisfaction ratings by lowering perceived and actual waiting times up to 40%.",
          id: "Tingkatkan peringkat kepuasan pengunjung dengan menurunkan persepsi dan waktu tunggu aktual hingga 40%."
        },
        icon: "Clock"
      }
    ]
  },
  {
    slug: "protectqube",
    category: "iot",
    title: {
      en: "Smart IoT Tracking & Cold Chain Telemetry Monitoring",
      id: "Pelacakan IoT Cerdas & Pemantauan Telemetri Rantai Dingin"
    },
    tagline: {
      en: "IoT Systems",
      id: "Sistem IoT"
    },
    badge: {
      en: "ProtectQube Smart Sensor Hub",
      id: "Hub Sensor Cerdas ProtectQube"
    },
    description: {
      en: "IoT tracking and monitoring system for assets, vehicles, and cold chain logistics equipment with real-time wireless telemetry updates.",
      id: "Sistem pelacakan dan pemantauan IoT untuk aset, kendaraan, dan logistik rantai dingin dengan pembaruan nirkabel real-time."
    },
    heroImage: "/images/usecase_main.png",
    telemetrySim: [
      {
        label: { en: "Internal Temperature", id: "Suhu Internal" },
        value: "-18.4 °C",
        status: "success"
      },
      {
        label: { en: "Battery Capacity", id: "Kapasitas Baterai" },
        value: "94 %",
        status: "success"
      },
      {
        label: { en: "Humidity Level", id: "Tingkat Kelembaban" },
        value: "42 %",
        status: "success"
      },
      {
        label: { en: "GPS Connectivity", id: "Konektivitas GPS" },
        value: "Excellent",
        status: "success"
      },
      {
        label: { en: "Compressor Vibration", id: "Getaran Kompresor" },
        value: "Normal",
        status: "success"
      }
    ],
    features: [
      {
        title: {
          en: "End-to-End Cold Chain Telemetry",
          id: "Telemetri Rantai Dingin End-to-End"
        },
        description: {
          en: "Continuously record ambient temperatures from -40°C to +80°C with medical-grade precision.",
          id: "Catat suhu sekitar terus-menerus dari -40°C hingga +80°C dengan presisi tingkat medis."
        },
        icon: "Thermometer"
      },
      {
        title: {
          en: "Shock & Tilt Geo-Alerts",
          id: "Peringatan Guncangan & Kemiringan GPS"
        },
        description: {
          en: "Receive instant notifications when valuable cargo experiences extreme vibrations or dynamic tilt.",
          id: "Terima notifikasi instan ketika kargo berharga mengalami getaran ekstrem atau kemiringan dinamis."
        },
        icon: "AlertTriangle"
      },
      {
        title: {
          en: "Dual cellular fallback connection",
          id: "Koneksi Cadangan Seluler Ganda"
        },
        description: {
          en: "Maintains connectivity using automatic roaming cellular cards, ensuring data storage in dead zones.",
          id: "Menjaga konektivitas menggunakan kartu seluler roaming otomatis, memastikan penyimpanan data di zona mati."
        },
        icon: "Wifi"
      }
    ],
    benefits: [
      {
        title: {
          en: "Minimize Cargo Damage",
          id: "Minimalkan Kerusakan Kargo"
        },
        description: {
          en: "Prevent cold chain compliance failures and claim distributions using early alerts system.",
          id: "Cegah kegagalan kepatuhan rantai dingin dan klaim distribusi menggunakan sistem peringatan dini."
        },
        icon: "CheckSquare"
      },
      {
        title: {
          en: "Easy Wireless Setup",
          id: "Pemasangan Nirkabel Mudah"
        },
        description: {
          en: "Magnetic mount enclosure with 5-year ultra-low energy battery lifespan requires no system wiring.",
          id: "Wadah dudukan magnetik dengan masa pakai baterai hemat energi 5 tahun tidak memerlukan kabel sistem."
        },
        icon: "Zap"
      }
    ]
  },
  {
    slug: "sensor-monitoring",
    category: "iot",
    title: {
      en: "Advanced Industrial Telemetry & Machine Sensor Monitoring",
      id: "Telemetri Industri Tingkat Lanjut & Pemantauan Sensor Mesin"
    },
    tagline: {
      en: "IoT Systems",
      id: "Sistem IoT"
    },
    badge: {
      en: "Smart Multi-Sensor Terminal",
      id: "Terminal Multi-Sensor Cerdas"
    },
    description: {
      en: "Advanced sensor technology for environmental monitoring, industrial machine utilization tracking, and predictive vibration alerts.",
      id: "Teknologi sensor canggih untuk pemantauan lingkungan, pelacakan utilitas mesin industri, dan peringatan getaran prediktif."
    },
    heroImage: "/images/usecase_main.png",
    telemetrySim: [
      {
        label: { en: "Machine Temperature", id: "Suhu Mesin" },
        value: "68.2 °C",
        status: "success"
      },
      {
        label: { en: "Power Load Current", id: "Arus Beban Daya" },
        value: "14.8 A",
        status: "success"
      },
      {
        label: { en: "Acoustic Frequency", id: "Frekuensi Akustik" },
        value: "420 Hz",
        status: "success"
      },
      {
        label: { en: "Oil Pressure Sensor", id: "Sensor Tekanan Oli" },
        value: "4.2 bar",
        status: "success"
      }
    ],
    features: [
      {
        title: {
          en: "Multi-Sensor Bus Support",
          id: "Dukungan Bus Multi-Sensor"
        },
        description: {
          en: "Interface directly with Modbus, RS485, and analog inputs to consolidate industrial sensors.",
          id: "Hubungkan langsung dengan Modbus, RS485, dan input analog untuk menyatukan sensor industri."
        },
        icon: "Sliders"
      }
    ],
    benefits: [
      {
        title: {
          en: "Prevent Downtime",
          id: "Mencegah Waktu Henti"
        },
        description: {
          en: "Schedule repairs before machines break using advanced AI anomaly detection algorithms.",
          id: "Jadwalkan perbaikan sebelum mesin rusak menggunakan algoritma deteksi anomali AI yang canggih."
        },
        icon: "Activity"
      }
    ]
  },
  {
    slug: "edc",
    category: "hardware",
    title: {
      en: "High-Performance Secure EDC Payment Terminal",
      id: "Terminal Pembayaran EDC Aman Berkinerja Tinggi"
    },
    tagline: {
      en: "Hardware Devices",
      id: "Perangkat Keras"
    },
    badge: {
      en: "Mitra Inovasi Bisnis EDC Terminal",
      id: "Terminal EDC Mitra Inovasi Bisnis"
    },
    description: {
      en: "Electronic Data Capture devices designed for highly secure, lightning-fast offline transaction processing and credit card payments.",
      id: "Perangkat Electronic Data Capture yang dirancang untuk pemrosesan transaksi luring yang sangat aman, sangat cepat, dan pembayaran kartu kredit."
    },
    heroImage: "/images/usecase_main.png",
    specifications: [
      {
        name: { en: "Processor", id: "Prosesor" },
        value: { en: "High-speed 32-bit ARM Security CPU", id: "Security CPU ARM 32-bit Kecepatan Tinggi" }
      },
      {
        name: { en: "Memory", id: "Memori" },
        value: { en: "256MB Flash, 128MB DDR RAM", id: "Flash 256MB, RAM DDR 128MB" }
      },
      {
        name: { en: "Display", id: "Layar" },
        value: { en: "3.5-inch TFT Color Touchscreen 320x480", id: "Layar Sentuh TFT Warna 3,5 inci 320x480" }
      },
      {
        name: { en: "Connectivity", id: "Konektivitas" },
        value: { en: "4G LTE, Dual-Band WiFi, Bluetooth 5.0", id: "4G LTE, WiFi Dual-Band, Bluetooth 5.0" }
      },
      {
        name: { en: "Battery", id: "Baterai" },
        value: { en: "7.4V / 2600mAh Li-ion Rechargeable", id: "Li-ion Rechargeable 7.4V / 2600mAh" }
      },
      {
        name: { en: "Card Reader", id: "Pembaca Kartu" },
        value: { en: "NFC Contactless, Magstripe, EMV Smart Card", id: "NFC Contactless, Magstripe, EMV Smart Card" }
      }
    ],
    certifications: [
      "PCI-PTS 6.x Certified",
      "EMVCo Level 1 & 2 Contactless",
      "CE & FCC Compliance Mark",
      "ISO 9001:2015 Manufacturing Quality"
    ],
    dimensions: {
      width: "82 mm",
      height: "175 mm",
      depth: "63 mm",
      weight: "360 g"
    },
    features: [
      {
        title: {
          en: "PCI Security Certification",
          id: "Sertifikasi Keamanan PCI"
        },
        description: {
          en: "Complies with PCI-PTS 6.x standards to keep client card holder data fully encrypted.",
          id: "Mematuhi standar PCI-PTS 6.x untuk menjaga data pemegang kartu klien terenkripsi sepenuhnya."
        },
        icon: "Shield"
      },
      {
        title: {
          en: "All-in-One NFC Reader",
          id: "Pembaca NFC All-in-One"
        },
        description: {
          en: "Accept apple pay, google wallet, standard contactless cards, chip and magstripe instantly.",
          id: "Terima Apple Pay, Google Wallet, kartu contactless standar, chip, dan magstripe secara instan."
        },
        icon: "CreditCard"
      }
    ],
    benefits: [
      {
        title: {
          en: "Fewer Transaction Failures",
          id: "Gagalan Transaksi Lebih Sedikit"
        },
        description: {
          en: "Fast multi-carrier 4G connections automatically fallback to WiFi to protect transactions.",
          id: "Koneksi 4G multi-operator yang cepat otomatis cadangkan ke WiFi untuk melindungi transaksi."
        },
        icon: "CheckCircle"
      }
    ]
  },
  {
    slug: "soundbox",
    category: "hardware",
    title: {
      en: "Dynamic QR Code Terminal & Voice Speaker Box",
      id: "Terminal Kode QR Dinamis & Kotak Suara Pembayaran"
    },
    tagline: {
      en: "Hardware Devices",
      id: "Perangkat Keras"
    },
    badge: {
      en: "Voice Soundbox Terminal",
      id: "Terminal Suara Soundbox"
    },
    description: {
      en: "Dynamic QR display terminals designed for rapid, secure contactless mobile wallet scanning with instant audio voice confirmation.",
      id: "Terminal tampilan QR dinamis dirancang untuk pemindaian dompet seluler nirkabel cepat dengan konfirmasi suara instan."
    },
    heroImage: "/images/usecase_main.png",
    specifications: [
      {
        name: { en: "Display Screen", id: "Layar Tampilan" },
        value: { en: "2.4-inch High Contrast LCD (Dynamic QR display)", id: "LCD Kontras Tinggi 2,4 inci (Tampilan QR Dinamis)" }
      },
      {
        name: { en: "Speaker Audio", id: "Audio Speaker" },
        value: { en: "Powerful 3W Acoustic Voice Confirmation Box", id: "Kotak Konfirmasi Suara Akustik 3W yang Kuat" }
      },
      {
        name: { en: "Connectivity", id: "Konektivitas" },
        value: { en: "4G LTE IoT SIM Card, WiFi Fallback", id: "Kartu SIM IoT 4G LTE, WiFi Fallback" }
      },
      {
        name: { en: "Battery Capacity", id: "Kapasitas Baterai" },
        value: { en: "3.7V / 2000mAh Rechargeable Lithium", id: "Litium Isi Ulang 3.7V / 2000mAh" }
      }
    ],
    certifications: [
      "Bank Indonesia QRIS Standard Compliant",
      "CE Quality Marks",
      "RoHS Lead-Free Certified"
    ],
    dimensions: {
      width: "90 mm",
      height: "140 mm",
      depth: "85 mm",
      weight: "280 g"
    },
    features: [
      {
        title: {
          en: "Instant Dynamic QRIS Generation",
          id: "Pembuatan QRIS Dinamis Instan"
        },
        description: {
          en: "Generates custom QR codes representing the exact billing amount dynamically per purchase.",
          id: "Menghasilkan kode QR khusus yang mewakili jumlah tagihan persis secara dinamis per pembelian."
        },
        icon: "QrCode"
      }
    ],
    benefits: [
      {
        title: {
          en: "Prevents Revenue Leakage",
          id: "Mencegah Kebocoran Pendapatan"
        },
        description: {
          en: "Dual dynamic screen + loud audio confirmation ensures payment is processed before user exits.",
          id: "Layar dinamis ganda + konfirmasi audio yang keras memastikan pembayaran diproses sebelum pengguna keluar."
        },
        icon: "Volume2"
      }
    ]
  },
  {
    slug: "mhu",
    category: "hardware",
    title: {
      en: "Multi-Currency High-Speed Banknote Counting & Validator Machine",
      id: "Mesin Penghitung & Validator Uang Kertas Kecepatan Tinggi"
    },
    tagline: {
      en: "Hardware Devices",
      id: "Perangkat Keras"
    },
    badge: {
      en: "MHU Banknote Validator",
      id: "Validator Uang Kertas MHU"
    },
    description: {
      en: "High-speed banknote counting and validator machines designed for heavy cash handling offices, bank branches, and currency vaults.",
      id: "Mesin penghitung dan validator uang kertas berkecepatan tinggi yang dirancang untuk kantor penanganan uang tunai besar."
    },
    heroImage: "/images/usecase_main.png",
    specifications: [
      {
        name: { en: "Counting Speed", id: "Kecepatan Menghitung" },
        value: { en: "Up to 1200 notes per minute (Adjustable)", id: "Hingga 1200 lembar per menit (Dapat Disesuaikan)" }
      },
      {
        name: { en: "Hopper Capacity", id: "Kapasitas Hopper" },
        value: { en: "500 standard banknotes", id: "500 lembar uang kertas standar" }
      },
      {
        name: { en: "Counter sensors", id: "Sensor Penghitung" },
        value: { en: "Dual CIS, UV, Magnetic, Infrared, Dimension Validator", id: "CIS Ganda, UV, Magnetik, Inframerah, Validator Dimensi" }
      }
    ],
    certifications: [
      "ECB (European Central Bank) Framework Tested",
      "CE Compliance mark",
      "ISO 9001:2015 Manufacturing Quality"
    ],
    dimensions: {
      width: "280 mm",
      height: "260 mm",
      depth: "245 mm",
      weight: "7.5 kg"
    },
    features: [
      {
        title: {
          en: "Counterfeit Detection Sensor",
          id: "Sensor Deteksi Uang Palsu"
        },
        description: {
          en: "Employs high-grade CIS sensors + UV + MG detection to identify counterfeit banknotes.",
          id: "Menggunakan sensor CIS tingkat tinggi + deteksi UV + MG untuk mengidentifikasi uang kertas palsu."
        },
        icon: "ShieldAlert"
      }
    ],
    benefits: [
      {
        title: {
          en: "Streamlined Cash Handling",
          id: "Penanganan Uang Tunai yang Efisien"
        },
        description: {
          en: "Reduce manual counting error margins and processing times by more than 85%.",
          id: "Kurangi margin kesalahan penghitungan manual dan waktu pemrosesan lebih dari 85%."
        },
        icon: "Activity"
      }
    ]
  }
];
