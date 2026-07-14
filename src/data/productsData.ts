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
      en: "Unified Inventory, Warehouse & Repair Management System",
      id: "Sistem Terintegrasi Manajemen Inventaris, Gudang & Perbaikan"
    },
    tagline: {
      en: "Inventory & Repair Operations",
      id: "Operasi Inventaris & Perbaikan"
    },
    badge: {
      en: "SIMQ Platform",
      id: "Platform SIMQ"
    },
    description: {
      en: "SIMQ provides real-time visibility into your inventory, automates warehouse stock operations, and streamlines repair center ticketing and spare parts tracking.",
      id: "SIMQ memberikan visibilitas real-time ke dalam inventaris Anda, mengotomatiskan operasional stok gudang, serta menyederhanakan tiket pusat perbaikan dan pelacakan suku cadang."
    },
    heroImage: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    workflows: [
      {
        title: {
          en: "Warehouse Stock Control",
          id: "Kontrol Stok Gudang"
        },
        description: {
          en: "Manage stock-in/stock-out, track batch barcodes, optimize space allocation, and perform stock audits with real-time digital documentation.",
          id: "Kelola barang masuk/keluar, lacak barcode batch, optimalkan alokasi ruang, dan lakukan audit stok dengan dokumentasi digital real-time."
        },
        image: "/images/usecase_main.png"
      },
      {
        title: {
          en: "Repair Centre & Sparepart Tracking",
          id: "Pusat Perbaikan & Pelacakan Suku Cadang"
        },
        description: {
          en: "Track device repair cycles, log SLA completion, manage repair queues, and maintain real-time inventory of incoming spare parts.",
          id: "Lacak siklus perbaikan perangkat, catat penyelesaian SLA, kelola antrean perbaikan, dan pantau stok suku cadang masuk secara real-time."
        },
        image: "/images/why-choose-us.jpg"
      }
    ],
    steps: [
      {
        number: "01",
        title: {
          en: "Stock Receiving & Intake",
          id: "Penerimaan & Input Stok"
        },
        description: {
          en: "Scan incoming devices, verify serial numbers, and register items into the main inventory catalog.",
          id: "Pindai perangkat masuk, verifikasi nomor seri, dan daftarkan barang ke katalog inventaris utama."
        },
        image: "/images/usecase_main.png"
      },
      {
        number: "02",
        title: {
          en: "Warehouse Placement",
          id: "Penyimpanan di Gudang"
        },
        description: {
          en: "Assign bin locations, update stock status, and monitor inventory levels across multiple warehouses.",
          id: "Tetapkan lokasi rak, perbarui status stok, dan pantau tingkat inventaris di beberapa gudang."
        },
        image: "/images/why-choose-us.jpg"
      },
      {
        number: "03",
        title: {
          en: "Repair & Diagnostic Ticketing",
          id: "Tiket Perbaikan & Diagnostik"
        },
        description: {
          en: "Dispatch faulty devices to repair lines, log issues, track parts replaced, and verify SLA.",
          id: "Kirim perangkat rusak ke lini perbaikan, catat masalah, lacak suku cadang yang diganti, dan verifikasi SLA."
        },
        image: "/images/about-us.jpg"
      },
      {
        number: "04",
        title: {
          en: "Dispatch & Outflow",
          id: "Pengiriman & Barang Keluar"
        },
        description: {
          en: "Authorize cargo releases, print shipment tracking labels, and update stock records automatically.",
          id: "Otorisasi pengeluaran barang, cetak label pelacakan pengiriman, dan perbarui catatan stok secara otomatis."
        },
        image: "/images/preview_video_bg.png"
      }
    ],
    features: [
      {
        title: {
          en: "Real-Time Stock Alerts",
          id: "Peringatan Stok Real-Time"
        },
        description: {
          en: "Automatically trigger reorder alerts when inventory levels drop below critical safety stock thresholds.",
          id: "Picu peringatan pemesanan ulang secara otomatis saat tingkat inventaris turun di bawah ambang batas stok aman kritis."
        },
        icon: "Bell"
      },
      {
        title: {
          en: "Automated Serial & Barcode Tracking",
          id: "Pelacakan Barcode & Serial Otomatis"
        },
        description: {
          en: "Scan and track device serial numbers throughout receiving, staging, warehouse, and repair steps.",
          id: "Pindai dan lacak nomor seri perangkat di setiap tahap penerimaan, staging, gudang, dan perbaikan."
        },
        icon: "Sliders"
      }
    ],
    benefits: [
      {
        title: {
          en: "Optimize Operational Efficiency",
          id: "Optimalkan Efisiensi Operasional"
        },
        description: {
          en: "Reduce inventory discrepancies, automate stock workflows, and accelerate repair cycle times.",
          id: "Kurangi ketidakcocokan inventaris, otomatiskan alur kerja stok, dan percepat waktu siklus perbaikan."
        },
        icon: "Activity"
      }
    ]
  },
  {
    slug: "surveillance-ai-atm",
    category: "iot",
    title: {
      en: "AI ATM Security Surveillance System",
      id: "Sistem Pengawasan Keamanan AI ATM"
    },
    tagline: {
      en: "AIoT Systems",
      id: "Sistem AIoT"
    },
    badge: {
      en: "AI ATM Security",
      id: "Keamanan AI ATM"
    },
    description: {
      en: "Protects ATM terminals using AI computer vision, detecting physical vandalism, card skimming devices, and suspicious loitering in real time.",
      id: "Melindungi terminal ATM menggunakan computer vision AI, mendeteksi vandalisme fisik, alat skimming kartu, dan perilaku mencurigakan secara real-time."
    },
    heroImage: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    telemetrySim: [
      {
        label: { en: "Vibration Level", id: "Tingkat Getaran" },
        value: "0.02 G",
        status: "success"
      },
      {
        label: { en: "Camera Status", id: "Status Kamera" },
        value: "Active",
        status: "success"
      },
      {
        label: { en: "Facial Recognition", id: "Pengenalan Wajah" },
        value: "Active",
        status: "success"
      },
      {
        label: { en: "Skimming Sensor", id: "Sensor Skimming" },
        value: "OK",
        status: "success"
      }
    ],
    features: [
      {
        title: {
          en: "Skimming Detection",
          id: "Deteksi Skimming"
        },
        description: {
          en: "Detect unauthorized overlays or card slot tampering instantly using AI-powered edge analytics.",
          id: "Deteksi secara instan penutup ilegal atau perusakan slot kartu menggunakan analitik edge bertenaga AI."
        },
        icon: "Shield"
      },
      {
        title: {
          en: "Vandalism Alerts",
          id: "Peringatan Vandalisme"
        },
        description: {
          en: "Trigger instant alarms and notify security teams if physical impact or shake is detected.",
          id: "Picu alarm instan dan peringatkan tim keamanan jika guncangan atau benturan fisik terdeteksi."
        },
        icon: "AlertTriangle"
      }
    ],
    benefits: [
      {
        title: {
          en: "Prevent Asset Damage",
          id: "Cegah Kerusakan Aset"
        },
        description: {
          en: "Predict ATM physical tampering and vandalism with up to 99% accuracy.",
          id: "Prediksi sabotase fisik dan vandalisme ATM dengan tingkat akurasi hingga 99%."
        },
        icon: "CheckSquare"
      }
    ]
  },
  {
    slug: "hse",
    category: "iot",
    title: {
      en: "AI HSE",
      id: "AI HSE"
    },
    tagline: {
      en: "AIoT Systems",
      id: "Sistem AIoT"
    },
    badge: {
      en: "HSE Factory Safety",
      id: "K3 Pabrik Pintar"
    },
    description: {
      en: "Workplace safety checks and HSE compliance using AI cameras to detect personal protective equipment (PPE) like helmets, vests, and safety zone violations.",
      id: "Pemeriksaan keselamatan pabrik dan kepatuhan K3 menggunakan kamera AI untuk mendeteksi alat pelindung diri (APD) seperti helm, rompi, dan pelanggaran zona aman."
    },
    heroImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    telemetrySim: [
      {
        label: { en: "Helmet Compliance", id: "Kepatuhan Helm" },
        value: "100 %",
        status: "success"
      },
      {
        label: { en: "Vest Compliance", id: "Kepatuhan Rompi" },
        value: "98 %",
        status: "success"
      },
      {
        label: { en: "Hazard Zone Status", id: "Status Zona Bahaya" },
        value: "Clear",
        status: "success"
      }
    ],
    features: [
      {
        title: {
          en: "PPE Verification",
          id: "Verifikasi APD"
        },
        description: {
          en: "Perform automated real-time checks on workers for helmets, safety boots, and reflective vests.",
          id: "Lakukan pemeriksaan real-time otomatis pada pekerja untuk memastikan helm, sepatu keselamatan, dan rompi."
        },
        icon: "CheckCircle"
      },
      {
        title: {
          en: "Danger Zone Breaches",
          id: "Pelanggaran Zona Bahaya"
        },
        description: {
          en: "Alert factory coordinators immediately if unauthorized personnel enter restricted safety zones.",
          id: "Beri peringatan segera kepada koordinator pabrik jika personel tidak sah memasuki zona keselamatan terbatas."
        },
        icon: "AlertTriangle"
      }
    ],
    benefits: [
      {
        title: {
          en: "Zero Accident Operations",
          id: "Operasi Zero Accident"
        },
        description: {
          en: "Reduce safety violations and human errors in production areas by up to 95%.",
          id: "Kurangi pelanggaran keselamatan dan kesalahan manusia di area produksi hingga 95%."
        },
        icon: "Zap"
      }
    ]
  },
  {
    slug: "smart-monitoring",
    category: "iot",
    title: {
      en: "Advanced AI Smart Monitoring & CCTV Analytics",
      id: "Pemantauan Cerdas AI & Analitik CCTV Tingkat Lanjut"
    },
    tagline: {
      en: "AIoT Systems",
      id: "Sistem AIoT"
    },
    badge: {
      en: "Smart CCTV Monitoring",
      id: "Pemantauan CCTV Pintar"
    },
    description: {
      en: "Turns standard surveillance cameras into smart endpoints using AI algorithms to detect objects, analyze crowd density, and trigger automatic alerts.",
      id: "Mengubah kamera pengawas standar menjadi perangkat cerdas menggunakan algoritma AI untuk mendeteksi objek, menganalisis kepadatan kerumunan, dan memicu peringatan otomatis."
    },
    heroImage: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    telemetrySim: [
      {
        label: { en: "Live FPS", id: "FPS Langsung" },
        value: "30 fps",
        status: "success"
      },
      {
        label: { en: "Active Channels", id: "Saluran Aktif" },
        value: "24 channels",
        status: "success"
      },
      {
        label: { en: "Object Detection Status", id: "Deteksi Objek" },
        value: "Active",
        status: "success"
      }
    ],
    features: [
      {
        title: {
          en: "Object Tracking",
          id: "Pelacakan Objek"
        },
        description: {
          en: "Recognize vehicles, people, and packages with low latency on existing cameras.",
          id: "Kenali kendaraan, orang, dan paket dengan latensi rendah pada kamera yang ada."
        },
        icon: "Sliders"
      },
      {
        title: {
          en: "Crowd Density Analytics",
          id: "Analitik Kepadatan Kerumunan"
        },
        description: {
          en: "Analyze congestion, queue build-ups, or loitering patterns in monitored perimeters.",
          id: "Analisis penumpukan, antrean, atau pola kerumunan di perimeter yang diawasi."
        },
        icon: "Activity"
      }
    ],
    benefits: [
      {
        title: {
          en: "24/7 Automation",
          id: "Otomatisasi 24/7"
        },
        description: {
          en: "Minimize manual monitoring hours while increasing security response speed.",
          id: "Minimalkan jam pemantauan manual sekaligus tingkatkan kecepatan respons keamanan."
        },
        icon: "Clock"
      }
    ]
  },
  {
    slug: "voiceguard",
    category: "iot",
    title: {
      en: "VoiceGuard NLP Fraud Detection & Speech-to-Text Analytics",
      id: "Deteksi Fraud Wicara & Analitik Speech-to-Text VoiceGuard"
    },
    tagline: {
      en: "AIoT Systems",
      id: "Sistem AIoT"
    },
    badge: {
      en: "NLP Speech Analytics",
      id: "Analitik Suara NLP"
    },
    description: {
      en: "Leverages natural language processing (NLP) and speech-to-text algorithms to detect verbal fraud, check script compliance, and alert operators of suspicious transactions.",
      id: "Memanfaatkan pemrosesan bahasa alami (NLP) dan algoritma speech-to-text untuk mendeteksi penipuan verbal, memeriksa kepatuhan skrip, dan memperingatkan operator tentang transaksi mencurigakan."
    },
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    telemetrySim: [
      {
        label: { en: "Audio Stream Link", id: "Saluran Audio" },
        value: "Active",
        status: "success"
      },
      {
        label: { en: "Word Error Rate", id: "Tingkat Kesalahan Kata" },
        value: "2.4 %",
        status: "success"
      },
      {
        label: { en: "Phrase Matcher Status", id: "Status Pencocokan Frasa" },
        value: "Active",
        status: "success"
      }
    ],
    features: [
      {
        title: {
          en: "Speech-to-Text",
          id: "Speech-to-Text"
        },
        description: {
          en: "Transcribe audio calls and conversations instantly into searchable text for QA audit.",
          id: "Transkripsikan panggilan audio dan percakapan secara instan menjadi teks yang dapat dicari untuk audit QA."
        },
        icon: "FileText"
      },
      {
        title: {
          en: "Verbal Fraud Scan",
          id: "Pemindaian Penipuan Verbal"
        },
        description: {
          en: "Detect fraud patterns, compliance gaps, and forbidden phrases automatically.",
          id: "Deteksi pola penipuan, celah kepatuhan, dan frasa terlarang secara otomatis."
        },
        icon: "Lock"
      }
    ],
    benefits: [
      {
        title: {
          en: "Risk Prevention",
          id: "Pencegahan Risiko"
        },
        description: {
          en: "Prevent compliance risks and phone frauds in call centers and front desks.",
          id: "Cegah risiko kepatuhan dan penipuan telepon di pusat panggilan dan meja depan."
        },
        icon: "Shield"
      }
    ]
  },
  {
    slug: "sensor-node",
    category: "iot",
    title: {
      en: "Smart Sensor Node Security Smartbox",
      id: "Smartbox Keamanan Sensor Node Cerdas"
    },
    tagline: {
      en: "AIoT Systems",
      id: "Sistem AIoT"
    },
    badge: {
      en: "Physical Sensor Node",
      id: "Sensor Node Fisik"
    },
    description: {
      en: "A rugged security smartbox integrating physical sensor nodes like motion, heat, vibration, door contact, and humidity detectors for remote critical assets protection.",
      id: "Smartbox keamanan kokoh yang mengintegrasikan sensor fisik seperti gerakan, suhu, getaran, kontak pintu, dan kelembaban untuk perlindungan aset kritis jarak jauh."
    },
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    telemetrySim: [
      {
        label: { en: "Door Status", id: "Status Pintu" },
        value: "Locked",
        status: "success"
      },
      {
        label: { en: "Vibration G-Force", id: "G-Force Getaran" },
        value: "0.01 g",
        status: "success"
      },
      {
        label: { en: "Ambient Humidity", id: "Kelembaban Sekitar" },
        value: "48 %",
        status: "success"
      },
      {
        label: { en: "Heat Index", id: "Indeks Panas" },
        value: "24.5 °C",
        status: "success"
      }
    ],
    features: [
      {
        title: {
          en: "Multi-Sensor Grid",
          id: "Jaringan Multi-Sensor"
        },
        description: {
          en: "Connect physical sensors for heat, smoke, door locks, and water leakage.",
          id: "Hubungkan sensor fisik untuk suhu, asap, kunci pintu, dan kebocoran air."
        },
        icon: "Wifi"
      },
      {
        title: {
          en: "Battery Backup",
          id: "Baterai Cadangan"
        },
        description: {
          en: "Internal battery backup ensuring continuous tracking for up to 5 years.",
          id: "Cadangan baterai internal memastikan pelacakan berkelanjutan hingga 5 tahun."
        },
        icon: "Zap"
      }
    ],
    benefits: [
      {
        title: {
          en: "Remote Security",
          id: "Keamanan Jarak Jauh"
        },
        description: {
          en: "Secure unattended depots, bank vaults, and logistics kiosks without local power lines.",
          id: "Amankan depo tanpa penjaga, brankas bank, dan kios logistik tanpa kabel daya lokal."
        },
        icon: "CheckSquare"
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
        value: { en: "4G LTE AIoT SIM Card, WiFi Fallback", id: "Kartu SIM AIoT 4G LTE, WiFi Fallback" }
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
  },
  {
    slug: "aisino",
    category: "hardware",
    title: {
      en: "Smart Soundbox Audio Payment Verification",
      id: "Verifikasi Pembayaran Suara Soundbox Pintar"
    },
    tagline: {
      en: "Instant Voice Verification",
      id: "Verifikasi Suara Instan"
    },
    badge: {
      en: "Aisino Soundbox",
      id: "Aisino Soundbox"
    },
    description: {
      en: "High-volume smart Soundbox designed for instant voice payment receipts, reducing merchant transaction verification friction.",
      id: "Soundbox pintar volume tinggi yang dirancang untuk tanda terima pembayaran suara instan, mengurangi gesekan verifikasi transaksi merchant."
    },
    heroImage: "/images/usecase_logistics.png",
    features: [
      {
        title: { en: "Voice Broadcast", id: "Siaran Suara" },
        description: { en: "Clear and loud audio confirmations for all transactions.", id: "Konfirmasi audio yang jelas dan keras untuk semua transaksi." },
        icon: "Volume2"
      }
    ],
    benefits: [
      {
        title: { en: "Zero Fraud", id: "Nol Penipuan" },
        description: { en: "Prevent fake payment screenshot scams with immediate audio verification.", id: "Cegah penipuan tangkapan layar pembayaran palsu dengan verifikasi audio langsung." },
        icon: "Shield"
      }
    ]
  },
  {
    slug: "sunmi",
    category: "hardware",
    title: {
      en: "Sunmi Smart POS & EDC Terminal System",
      id: "Sistem Terminal POS & EDC Pintar Sunmi"
    },
    tagline: {
      en: "Enterprise Smart POS",
      id: "Smart POS Perusahaan"
    },
    badge: {
      en: "Sunmi POS",
      id: "Sunmi POS"
    },
    description: {
      en: "Next-generation Android-based POS and mobile EDC terminals with unified payment integration capabilities.",
      id: "Terminal POS berbasis Android generasi terbaru dan EDC seluler dengan kemampuan integrasi pembayaran terpadu."
    },
    heroImage: "/images/usecase_logistics.png",
    features: [
      {
        title: { en: "Dual Screen Support", id: "Dukungan Layar Ganda" },
        description: { en: "Display transactions clearly to both merchants and customers.", id: "Tampilkan transaksi dengan jelas untuk merchant dan pelanggan." },
        icon: "Tv"
      }
    ],
    benefits: [
      {
        title: { en: "Unified Payment", id: "Pembayaran Terpadu" },
        description: { en: "Accept card sweeps, dynamic QR codes, and digital wallets.", id: "Terima gesekan kartu, kode QR dinamis, dan dompet digital." },
        icon: "CreditCard"
      }
    ]
  },
  {
    slug: "telpo",
    category: "hardware",
    title: {
      en: "Telpo Biometric & Smart Desktop POS",
      id: "Terminal POS Meja Pintar & Biometrik Telpo"
    },
    tagline: {
      en: "Biometric POS Terminal",
      id: "Terminal POS Biometrik"
    },
    badge: {
      en: "Telpo POS",
      id: "Telpo POS"
    },
    description: {
      en: "Smart desktop and mobile payment devices supporting face recognition, biometric verification, and thermal printing.",
      id: "Perangkat pembayaran meja dan seluler pintar yang mendukung pengenalan wajah, verifikasi biometrik, dan cetak termal."
    },
    heroImage: "/images/usecase_logistics.png",
    features: [
      {
        title: { en: "Biometric Verification", id: "Verifikasi Biometrik" },
        description: { en: "Ensure high-security access controls and transaction logs.", id: "Pastikan kontrol akses dan log transaksi berkeamanan tinggi." },
        icon: "Fingerprint"
      }
    ],
    benefits: [
      {
        title: { en: "Versatile Formats", id: "Format Serbaguna" },
        description: { en: "Fits any retail shop floor or cashier counter setup.", id: "Cocok untuk ritel apa pun atau pengaturan meja kasir." },
        icon: "Layout"
      }
    ]
  },
  {
    slug: "masterwork",
    category: "hardware",
    title: {
      en: "Masterwork Cash Deposit & Recycling Machines",
      id: "Mesin Cash Deposit & Daur Ulang Masterwork"
    },
    tagline: {
      en: "Cash Deposit Solutions",
      id: "Solusi Cash Deposit"
    },
    badge: {
      en: "Masterwork CDM",
      id: "CDM Masterwork"
    },
    description: {
      en: "Heavy-duty cash deposit and recycling terminals to optimize high-volume branch operations and secure deposits.",
      id: "Terminal CDM dan daur ulang uang berat untuk mengoptimalkan operasional kantor cabang volume tinggi dan mengamankan deposit."
    },
    heroImage: "/images/usecase_logistics.png",
    features: [
      {
        title: { en: "Banknote Validation", id: "Validasi Uang Kertas" },
        description: { en: "Employs high-grade CIS sensors to validate banknotes.", id: "Menggunakan sensor CIS tingkat tinggi untuk memvalidasi uang kertas." },
        icon: "Coins"
      }
    ],
    benefits: [
      {
        title: { en: "High Security", id: "Keamanan Tinggi" },
        description: { en: "Reinforced vault walls to prevent physical breaches.", id: "Dinding brankas diperkuat untuk mencegah pembobolan fisik." },
        icon: "Shield"
      }
    ]
  },
  {
    slug: "gnd",
    category: "hardware",
    title: {
      en: "GND Automated Cash Counter & Validator",
      id: "Penghitung & Validator Uang Otomatis GND"
    },
    tagline: {
      en: "High-Speed Cash Processing",
      id: "Pemrosesan Uang Kecepatan Tinggi"
    },
    badge: {
      en: "GND Counter",
      id: "Penghitung GND"
    },
    description: {
      en: "Automated high-speed banknote counting machines featuring counterfeit detection and sorting options.",
      id: "Mesin penghitung uang kertas otomatis berkecepatan tinggi dengan deteksi uang palsu dan pilihan penyortiran."
    },
    heroImage: "/images/usecase_logistics.png",
    features: [
      {
        title: { en: "Counterfeit Sensor", id: "Sensor Uang Palsu" },
        description: { en: "UV and magnetic sensors to screen for counterfeit currency.", id: "Sensor UV dan magnetik untuk menyaring mata uang palsu." },
        icon: "AlertTriangle"
      }
    ],
    benefits: [
      {
        title: { en: "Processing Speed", id: "Kecepatan Pemrosesan" },
        description: { en: "Process up to 1,200 banknotes per minute.", id: "Proses hingga 1.200 uang kertas per menit." },
        icon: "Activity"
      }
    ]
  },
  {
    slug: "transsion",
    category: "hardware",
    title: {
      en: "Transsion Digital Campaigns & Ad Platform",
      id: "Kampanye Digital & Platform Iklan Transsion"
    },
    tagline: {
      en: "Targeted User Acquisitions",
      id: "Akuisisi Pengguna Tertarget"
    },
    badge: {
      en: "Transsion Ads",
      id: "Iklan Transsion"
    },
    description: {
      en: "Maximize brand visibility and conversions through targeted mobile CPC, CPI, and CPM ad campaigns powered by Transsion Holding.",
      id: "Maksimalkan visibilitas merek dan konversi melalui kampanye iklan seluler CPC, CPI, dan CPM tertarget dari Transsion Holding."
    },
    heroImage: "/images/usecase_logistics.png",
    features: [
      {
        title: { en: "Campaign Tracking", id: "Pelacakan Kampanye" },
        description: { en: "Track clicks, installs, and impressions in real-time.", id: "Lacak klik, instalasi, dan tayangan secara real-time." },
        icon: "BarChart2"
      }
    ],
    benefits: [
      {
        title: { en: "High Engagement", id: "Keterlibatan Tinggi" },
        description: { en: "Deliver ads to active users on Transsion mobile devices.", id: "Kirimkan iklan ke pengguna aktif di perangkat seluler Transsion." },
        icon: "Users"
      }
    ]
  },
  {
    slug: "willowmore",
    category: "hardware",
    title: {
      en: "Willowmore Keyless Smartlock & Access Control",
      id: "Smartlock Tanpa Kunci & Kontrol Akses Willowmore"
    },
    tagline: {
      en: "Industrial Keyless Access",
      id: "Akses Tanpa Kunci Industri"
    },
    badge: {
      en: "Willowmore Smartlock",
      id: "Smartlock Willowmore"
    },
    description: {
      en: "Keyless smart padlock systems designed for remote infrastructure protection, utility access control, and telemetry tracking.",
      id: "Sistem gembok pintar tanpa kunci yang dirancang untuk perlindungan infrastruktur jarak jauh, kontrol akses utilitas, dan pelacakan telemetri."
    },
    heroImage: "/images/usecase_logistics.png",
    features: [
      {
        title: { en: "Keyless Access", id: "Akses Tanpa Kunci" },
        description: { en: "Unlock padlocks securely via dynamic mobile app Bluetooth tokens.", id: "Buka kunci gembok dengan aman melalui token Bluetooth aplikasi seluler dinamis." },
        icon: "Lock"
      }
    ],
    benefits: [
      {
        title: { en: "Audit Trails", id: "Jalur Audit" },
        description: { en: "Logs every access event and duration automatically.", id: "Catat setiap peristiwa dan durasi akses secara otomatis." },
        icon: "Clock"
      }
    ]
  }
];
