export interface LocalizedText {
  en: string;
  id: string;
}

export interface StatItem {
  value: string;
  label: LocalizedText;
}

export interface FeatureItem {
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
}

export interface CarouselItem {
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  image?: string;
}

export interface SolutionItem {
  slug: string;
  layoutTemplate: "fsm" | "standard" | "manufacturing" | "banking";
  title: LocalizedText;
  badge: LocalizedText;
  description: LocalizedText;
  heroImage: string;
  
  // Stats
  stats: StatItem[];
  
  // Core Strengths
  coreStrengths: FeatureItem[];
  
  // Teams zone (iPhone App)
  teamsZone?: {
    badge: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    bullets: FeatureItem[];
  };
  
  // Tracking zone (Albert Flores Table Dashboard)
  trackingZone?: {
    badge: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    bullets: FeatureItem[];
  };
  
  // Who Benefits Carousel
  whoBenefits?: {
    title: LocalizedText;
    subtitle: LocalizedText;
    items: CarouselItem[];
  };
  
  // Feature Insight
  featureInsight?: {
    title: LocalizedText;
    subtitle: LocalizedText;
    points: FeatureItem[];
    blogTeaser: {
      category: LocalizedText;
      date: string;
      title: LocalizedText;
      image?: string;
    };
  };
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    slug: "fsm",
    layoutTemplate: "fsm",
    badge: {
      en: "Use Case for Smart Field Operation",
      id: "Studi Kasus untuk Operasi Lapangan Cerdas"
    },
    title: {
      en: "Field operations, simplified. Plan better, track faster, execute smarter.",
      id: "Operasional lapangan, disederhanakan. Rencana lebih baik, lacak lebih cepat, eksekusi cerdas."
    },
    description: {
      en: "Managing field operations requires speed, coordination, and real-time visibility—all at once. Our system helps you assign tasks, track teams, and automate reporting in one platform, so your operations run efficiently without delays or manual overhead.",
      id: "Mengelola operasional lapangan membutuhkan kecepatan, koordinasi, dan visibilitas real-time secara bersamaan. Sistem kami membantu Anda menetapkan tugas, melacak tim, dan mengotomatiskan pelaporan dalam satu platform, sehingga operasional berjalan efisien tanpa penundaan atau beban manual."
    },
    heroImage: "/images/preview_video_bg.png",
    stats: [
      {
        value: "10x",
        label: {
          en: "Faster Dispatch Speed",
          id: "Kecepatan Pengiriman Lebih Cepat"
        }
      },
      {
        value: "99.9%",
        label: {
          en: "Task SLA Accuracy",
          id: "Akurasi SLA Tugas"
        }
      },
      {
        value: "500+",
        label: {
          en: "Active Mobile Teams",
          id: "Tim Seluler Aktif"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Assign tasks instantly",
          id: "Tugaskan pekerjaan instan"
        },
        description: {
          en: "Create and assign tasks to your field teams in seconds, with clear instructions, priorities, and deadlines to ensure smooth execution.",
          id: "Buat dan tugaskan pekerjaan ke tim lapangan dalam hitungan detik, dengan instruksi, prioritas, dan tenggat waktu yang jelas untuk memastikan eksekusi yang lancar."
        },
        icon: "Send"
      },
      {
        title: {
          en: "Track progress in real-time",
          id: "Lacak kemajuan real-time"
        },
        description: {
          en: "Monitor task status and team activity as it happens, giving you full visibility into ongoing operations without delays.",
          id: "Pantau status pekerjaan dan aktivitas tim saat itu terjadi, memberikan Anda visibilitas penuh ke dalam operasional yang sedang berjalan tanpa penundaan."
        },
        icon: "Activity"
      },
      {
        title: {
          en: "Monitor team activity",
          id: "Pantau aktivitas tim"
        },
        description: {
          en: "Stay informed on where your teams are and what they’re working on, helping you ensure accountability and better coordination.",
          id: "Tetap terinformasi tentang di mana tim Anda berada dan apa yang sedang mereka kerjakan, membantu Anda memastikan akuntabilitas dan koordinasi yang lebih baik."
        },
        icon: "MapPin"
      },
      {
        title: {
          en: "Generate reports automatically",
          id: "Hasilkan laporan otomatis"
        },
        description: {
          en: "Eliminate manual reporting with automated summaries and real-time data, so you can focus on decision-making instead of paperwork.",
          id: "Eliminasi pelaporan manual dengan ringkasan otomatis dan data real-time, sehingga Anda dapat fokus pada pengambilan keputusan daripada pekerjaan kertas."
        },
        icon: "FileText"
      }
    ],
    teamsZone: {
      badge: {
        en: "FOR TEAMS",
        id: "UNTUK TIM LAPANGAN"
      },
      title: {
        en: "Give your field teams full control on the ground",
        id: "Berikan tim lapangan Anda kontrol penuh di lapangan"
      },
      description: {
        en: "Enable your teams to receive tasks, update progress, and report work directly from the field with a simple and intuitive system—ensuring better coordination, faster execution, and clear visibility across every operation.",
        id: "Memungkinkan tim Anda menerima tugas, memperbarui kemajuan, dan melaporkan pekerjaan langsung dari lapangan dengan sistem yang sederhana dan intuitif—memastikan koordinasi yang lebih baik, eksekusi yang lebih cepat, dan visibilitas yang jelas di setiap operasional."
      },
      bullets: [
        {
          title: {
            en: "Task update on the go",
            id: "Pembaruan tugas instan"
          },
          description: {
            en: "Update status, add notes, and upload photos on the fly.",
            id: "Perbarui status, tambahkan catatan, dan unggah foto langsung di lapangan."
          },
          icon: "CheckCircle"
        },
        {
          title: {
            en: "Live reporting",
            id: "Pelaporan langsung"
          },
          description: {
            en: "Submit reports instantly from any location.",
            id: "Kirim laporan secara instan dari lokasi mana pun."
          },
          icon: "Zap"
        },
        {
          title: {
            en: "Mobile access",
            id: "Akses seluler"
          },
          description: {
            en: "Everything your team needs in one simple app.",
            id: "Semua yang dibutuhkan tim Anda dalam satu aplikasi sederhana."
          },
          icon: "Smartphone"
        }
      ]
    },
    trackingZone: {
      badge: {
        en: "PERFORMANCE TRACKING",
        id: "PELACAKAN KINERJA"
      },
      title: {
        en: "Monitor operations and team performance in real-time",
        id: "Pantau operasional dan kinerja tim secara real-time"
      },
      description: {
        en: "Make data-driven decisions with real-time insights into tasks, team performance, and operational efficiency.",
        id: "Ambil keputusan berbasis data dengan wawasan real-time tentang pekerjaan, kinerja tim, dan efisiensi operasional."
      },
      bullets: [
        {
          title: {
            en: "Activity tracking",
            id: "Pelacakan aktivitas"
          },
          description: {
            en: "See real-time updates from the field directly.",
            id: "Lihat pembaruan real-time dari lapangan secara langsung."
          },
          icon: "Navigation"
        },
        {
          title: {
            en: "Performance insights",
            id: "Wawasan kinerja"
          },
          description: {
            en: "Measure team performance and task completion speed.",
            id: "Ukur kinerja tim dan kecepatan penyelesaian pekerjaan."
          },
          icon: "BarChart"
        },
        {
          title: {
            en: "Data-driven decisions",
            id: "Keputusan berbasis data"
          },
          description: {
            en: "Use insights to optimize and improve operations.",
            id: "Gunakan wawasan untuk mengoptimalkan dan meningkatkan operasional."
          },
          icon: "PieChart"
        }
      ]
    },
    whoBenefits: {
      title: {
        en: "Who Benefits From This Solution?",
        id: "Siapa yang Mendapatkan Manfaat Dari Solusi Ini?"
      },
      subtitle: {
        en: "Explore our range of software and IoT solutions designed to streamline and optimize your operations.",
        id: "Jelajahi rangkaian solusi perangkat lunak dan IoT kami yang dirancang untuk menyederhanakan dan mengoptimalkan operasi Anda."
      },
      items: [
        {
          title: {
            en: "Elevate Professional Standards",
            id: "Tingkatkan Standar Profesional"
          },
          subtitle: {
            en: "Improve efficiency, reporting, and client communication.",
            id: "Tingkatkan efisiensi, pelaporan, dan komunikasi klien."
          },
          description: {
            en: "Enhance service standards through accurate reporting, seamless client communication, and measurable work efficiency.",
            id: "Tingkatkan standar layanan melalui pelaporan yang akurat, komunikasi klien yang lancar, dan efisiensi kerja yang terukur."
          }
        },
        {
          title: {
            en: "Empower Your Mobile Workforce",
            id: "Berdayakan Tenaga Kerja Seluler Anda"
          },
          subtitle: {
            en: "Manage service requests, engineers, and customer satisfaction.",
            id: "Kelola permintaan layanan, teknisi, dan kepuasan pelanggan."
          },
          description: {
            en: "Simplify on-field service request management, technician coordination, and customer satisfaction monitoring in one platform.",
            id: "Sederhanakan manajemen permintaan layanan di lapangan, koordinasi teknisi, dan pemantauan kepuasan pelanggan dalam satu platform."
          }
        },
        {
          title: {
            en: "Maximize Uptime & Reliability",
            id: "Maksimalkan Uptime & Keandalan"
          },
          subtitle: {
            en: "Schedule maintenance, track issues, and reduce downtime.",
            id: "Jadwalkan pemeliharaan, lacak masalah, dan kurangi waktu henti."
          },
          description: {
            en: "Assist maintenance teams in organizing routine schedules, detecting issues faster, and minimizing operational downtime of company assets.",
            id: "Bantu tim pemeliharaan dalam mengatur jadwal rutin, mendeteksi masalah lebih cepat, dan meminimalkan waktu henti operasional aset perusahaan."
          }
        }
      ]
    },
    featureInsight: {
      title: {
        en: "Transforming Field Operations Into Scalable Systems",
        id: "Mengubah Operasional Lapangan Menjadi Sistem yang Skalabel"
      },
      subtitle: {
        en: "Seamlessly connecting field data with scalable digital infrastructure.",
        id: "Menghubungkan data lapangan secara mulus dengan infrastruktur digital yang skalabel."
      },
      points: [
        {
          title: {
            en: "Improve team coordination",
            id: "Meningkatkan koordinasi tim"
          },
          description: {
            en: "Keep everyone aligned and informed about ongoing tasks, delays, and critical resolution times.",
            id: "Jaga agar semua orang tetap selaras dan terinformasi tentang tugas yang berjalan, penundaan, dan waktu resolusi penting."
          },
          icon: "Users"
        },
        {
          title: {
            en: "Gain full visibility",
            id: "Dapatkan visibilitas penuh"
          },
          description: {
            en: "Know exactly what's happening on the ground, anytime, from anywhere in the world.",
            id: "Ketahui persis apa yang terjadi di lapangan, kapan saja, dari mana saja di seluruh dunia."
          },
          icon: "Eye"
        }
      ],
      blogTeaser: {
        category: {
          en: "Blog",
          id: "Blog"
        },
        date: "19.04.2026",
        title: {
          en: "5 Common Challenges in Field Operations—and How to Solve Them",
          id: "5 Tantangan Umum dalam Operasional Lapangan—dan Cara Mengatasinya"
        }
      }
    }
  },
  {
    slug: "banking",
    layoutTemplate: "standard",
    badge: {
      en: "Industry Solutions",
      id: "Solusi Industri"
    },
    title: {
      en: "Secure & High-Speed Technological Systems for Banking Operations",
      id: "Sistem Teknologi Aman & Kecepatan Tinggi untuk Operasional Perbankan"
    },
    description: {
      en: "Safeguard assets and accelerate transaction throughput by deploying rugged IoT hardware, smart security padlock systems, and connected checkout terminals.",
      id: "Lindungi aset dan akselerasi kecepatan transaksi dengan menyebarkan perangkat keras IoT kokoh, sistem gembok pengaman pintar, dan terminal pembayaran terintegrasi."
    },
    heroImage: "/images/usecase_banking.png",
    stats: [
      {
        value: "99.99%",
        label: {
          en: "Transaction Uptime SLA",
          id: "SLA Uptime Transaksi"
        }
      },
      {
        value: "< 0.5s",
        label: {
          en: "Terminal Network Latency",
          id: "Latensi Jaringan Terminal"
        }
      },
      {
        value: "15K+",
        label: {
          en: "Monitored Banking Endpoints",
          id: "Titik Ujung Perbankan Terpantau"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "ATM Smart Lock Access",
          id: "Kontrol Akses Gembok Pintar ATM"
        },
        description: {
          en: "Dual-factor authenticated Bluetooth lock cylinders with automated electronic key dispatching and real-time open/close audit trails.",
          id: "Silinder kunci Bluetooth dengan autentikasi ganda, pengiriman kunci elektronik otomatis, dan rekaman audit pembukaan/penutupan real-time."
        },
        icon: "Shield"
      },
      {
        title: {
          en: "ATM Perimeter CCTV AI",
          id: "CCTV AI & Pengawasan ATM"
        },
        description: {
          en: "Edge AI camera video analytics to instantly detect camera masking, device skimming, and physical vandalism attempts.",
          id: "Analitik video kamera Edge AI untuk mendeteksi penutupan kamera, skimming perangkat, dan upaya vandalisme fisik secara instan."
        },
        icon: "Eye"
      },
      {
        title: {
          en: "Safe Environmental Telemetry",
          id: "Telemetri Brankas & Lingkungan"
        },
        description: {
          en: "Robust industrial IoT multi-sensors monitoring real-time safe door states, temperatures, and structural vibration anomalies.",
          id: "Multi-sensor IoT industri kokoh yang memantau status pintu brankas, suhu, dan anomali getaran struktural secara real-time."
        },
        icon: "Cpu"
      },
      {
        title: {
          en: "Secure EDC Provisioning",
          id: "Penyediaan Terminal EDC Aman"
        },
        description: {
          en: "PCI-DSS compliant remote device provisioning and dynamic secure Key Loading (RKL) with automated health status telemetry.",
          id: "Penyediaan perangkat jarak jauh yang sesuai standar PCI-DSS dan pemuatan kunci transaksi aman (RKL) dinamis dengan telemetri kesehatan otomatis."
        },
        icon: "Smartphone"
      },
      {
        title: {
          en: "Intelligent POS Systems",
          id: "Sistem Terminal POS Cerdas"
        },
        description: {
          en: "Offline-first local checkout queueing, unified cloud inventory synchronization, and digital receipt tracking platforms.",
          id: "Antrean pembayaran lokal luring-terlebih-dahulu (offline-first), sinkronisasi inventaris awan terpadu, dan platform pelacakan resi digital."
        },
        icon: "Activity"
      },
      {
        title: {
          en: "Voice QR Code Soundbox",
          id: "Soundbox Konfirmasi Suara QR"
        },
        description: {
          en: "Dynamic QR displays and instant audio payment confirmations to protect merchant transactions and prevent teller queue fraud.",
          id: "Tampilan QR dinamis dan konfirmasi pembayaran suara instan untuk melindungi transaksi merchant dan mencegah penipuan antrean kasir."
        },
        icon: "Volume2"
      }
    ]
  },
  {
    slug: "logistics",
    layoutTemplate: "standard",
    badge: {
      en: "Industry Solutions",
      id: "Solusi Industri"
    },
    title: {
      en: "Optimize Fleet Performance & Real-Time Logistics Tracking",
      id: "Optimalkan Kinerja Armada & Pelacakan Logistik Real-Time"
    },
    description: {
      en: "Track vehicle positions live, optimize delivery dispatches routes, and guarantee cold chain cargo integrity with smart IoT sensors.",
      id: "Lacak posisi kendaraan secara langsung, optimalkan rute pengiriman, dan jamin integritas kargo rantai dingin dengan sensor IoT cerdas."
    },
    heroImage: "/images/preview_video_bg.png",
    stats: [
      {
        value: "25%",
        label: {
          en: "Fuel Costs Savings",
          id: "Penghematan Biaya Bahan Bakar"
        }
      },
      {
        value: "0%",
        label: {
          en: "Cold Chain Breakdowns",
          id: "Kegagalan Rantai Dingin"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Fleet Live Tracking",
          id: "Pelacakan Armada Langsung"
        },
        description: {
          en: "Track GPS locations and routes history dynamically on interactive dashboards.",
          id: "Lacak lokasi GPS dan riwayat rute secara dinamis pada dasbor interaktif."
        },
        icon: "Navigation"
      },
      {
        title: {
          en: "Cold Chain Telemetry",
          id: "Telemetri Rantai Dingin"
        },
        description: {
          en: "Receive alerts instantly if temperature levels exceed critical safety margins.",
          id: "Terima peringatan secara instan jika tingkat suhu melebihi batas keselamatan kritis."
        },
        icon: "Thermometer"
      }
    ]
  },
  {
    slug: "manufacturing",
    layoutTemplate: "standard",
    badge: {
      en: "Industry Solutions",
      id: "Solusi Industri"
    },
    title: {
      en: "Predictive Maintenance & Smart Factory IoT Operations",
      id: "Pemeliharaan Prediktif & Operasional IoT Pabrik Cerdas"
    },
    description: {
      en: "Connect manufacturing equipment to centralized dashboards, detect operational anomalies early, and schedule routine maintenance perfectly.",
      id: "Hubungkan peralatan manufaktur ke dasbor terpusat, deteksi anomali operasional sejak dini, dan jadwalkan pemeliharaan rutin secara sempurna."
    },
    heroImage: "/images/why-choose-us.jpg",
    stats: [
      {
        value: "30%",
        label: {
          en: "Maintenance Cost Reduction",
          id: "Pengurangan Biaya Pemeliharaan"
        }
      },
      {
        value: "15x",
        label: {
          en: "Extended Asset Lifespan",
          id: "Masa Pakai Aset Lebih Panjang"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Predictive Maintenance",
          id: "Pemeliharaan Prediktif"
        },
        description: {
          en: "Analyze engine vibrations and heat curves automatically to prevent production stops.",
          id: "Analisis getaran mesin dan kurva panas secara otomatis untuk mencegah penghentian produksi."
        },
        icon: "Activity"
      },
      {
        title: {
          en: "Quality Control Automation",
          id: "Otomatisasi Kontrol Kualitas"
        },
        description: {
          en: "Deploy smart machine sensors to record telemetry values at every stage of the line.",
          id: "Terapkan sensor mesin cerdas untuk mencatat nilai telemetri di setiap tahapan lini produksi."
        },
        icon: "CheckCircle"
      }
    ]
  },
  {
    slug: "energy-industry",
    layoutTemplate: "standard",
    badge: {
      en: "Industry Solutions",
      id: "Solusi Industri"
    },
    title: {
      en: "Unified Remote Infrastructure & Smart Grid Asset Control",
      id: "Infrastruktur Jarak Jauh Terpadu & Kontrol Aset Grid Cerdas"
    },
    description: {
      en: "Oversee gas, power grid, and water distribution networks with rugged industrial telemetry gateways and automatic alert thresholds.",
      id: "Pantau jaringan gas, listrik, dan distribusi air dengan gerbang telemetri industri yang kokoh dan ambang batas peringatan otomatis."
    },
    heroImage: "/images/about-us.jpg",
    stats: [
      {
        value: "99.9%",
        label: {
          en: "Grid Infrastructure Uptime",
          id: "Uptime Infrastruktur Jaringan"
        }
      },
      {
        value: "2.4s",
        label: {
          en: "Anomaly Alarm Dispatch",
          id: "Pengiriman Alarm Anomali"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Remote Asset Management",
          id: "Manajemen Aset Jarak Jauh"
        },
        description: {
          en: "Read sensor inputs wirelessly from off-grid areas with zero manual field checks.",
          id: "Baca input sensor secara nirkabel dari area luar jaringan tanpa pemeriksaan lapangan manual."
        },
        icon: "Cpu"
      },
      {
        title: {
          en: "Smart Metering",
          id: "Metering Cerdas"
        },
        description: {
          en: "Automate consumption billing rates and generate load profiles in real-time.",
          id: "Otomatiskan tarif penagihan konsumsi dan buat profil beban secara real-time."
        },
        icon: "Sliders"
      }
    ]
  },
  {
    slug: "energy",
    layoutTemplate: "standard",
    badge: {
      en: "Industry Solutions",
      id: "Solusi Industri"
    },
    title: {
      en: "Unified Remote Infrastructure & Smart Grid Asset Control",
      id: "Infrastruktur Jarak Jauh Terpadu & Kontrol Aset Grid Cerdas"
    },
    description: {
      en: "Oversee gas, power grid, and water distribution networks with rugged industrial telemetry gateways and automatic alert thresholds.",
      id: "Pantau jaringan gas, listrik, dan distribusi air dengan gerbang telemetri industri yang kokoh dan ambang batas peringatan otomatis."
    },
    heroImage: "/images/about-us.jpg",
    stats: [
      {
        value: "99.9%",
        label: {
          en: "Grid Infrastructure Uptime",
          id: "Uptime Infrastruktur Jaringan"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Remote Asset Management",
          id: "Manajemen Aset Jarak Jauh"
        },
        description: {
          en: "Read sensor inputs wirelessly from off-grid areas.",
          id: "Baca input sensor secara nirkabel dari area luar jaringan."
        },
        icon: "Cpu"
      }
    ]
  },
  {
    slug: "aiot",
    layoutTemplate: "standard",
    badge: {
      en: "Technology Solutions",
      id: "Solusi Teknologi"
    },
    title: {
      en: "Artificial Intelligence & Connected Internet of Things",
      id: "Kecerdasan Buatan & Internet of Things yang Terkoneksi"
    },
    description: {
      en: "Deploy smart machine sensors, process edge-computing values, and trigger automated operational actions in real time.",
      id: "Terapkan sensor mesin cerdas, proses nilai komputasi tepi, dan picu tindakan operasional otomatis secara real-time."
    },
    heroImage: "/images/prod_iot.png",
    stats: [
      {
        value: "24/7",
        label: {
          en: "Automated Monitoring",
          id: "Pemantauan Otomatis"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Edge AI Computing",
          id: "Komputasi AI Tepi"
        },
        description: {
          en: "Process telemetry inputs locally at the gateway level to decrease latency.",
          id: "Proses input telemetri secara lokal di tingkat gerbang untuk mengurangi latensi."
        },
        icon: "Cpu"
      }
    ]
  },
  {
    slug: "asset-tracking",
    layoutTemplate: "standard",
    badge: {
      en: "Operational Solutions",
      id: "Solusi Operasional"
    },
    title: {
      en: "Next-Gen Asset Tracking & Geolocation Telemetry Hub",
      id: "Pelacakan Aset Generasi Baru & Hub Telemetri Geolokasi"
    },
    description: {
      en: "Track locations of industrial machines, container cargo, and fleet vehicles in real time with compact rugged GPS transceivers.",
      id: "Lacak lokasi mesin industri, kargo kontainer, dan armada kendaraan secara real-time dengan pemancar GPS kokoh yang ringkas."
    },
    heroImage: "/images/usecase_logistics.png",
    stats: [
      {
        value: "99.98%",
        label: {
          en: "GPS Route Accuracy",
          id: "Akurasi Rute GPS"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Precision Geolocation",
          id: "Geolokasi Presisi"
        },
        description: {
          en: "Pinpoint valuable hardware units instantly on elegant multi-layer maps.",
          id: "Tentukan posisi unit perangkat keras berharga secara instan di peta multi-layer yang elegan."
        },
        icon: "MapPin"
      }
    ]
  },
  {
    slug: "analytics",
    layoutTemplate: "standard",
    badge: {
      en: "Enterprise Intelligence",
      id: "Kecerdasan Perusahaan"
    },
    title: {
      en: "Enterprise Reporting & Interactive Dashboards Analytics",
      id: "Pelaporan Perusahaan & Analitik Dasbor Interaktif"
    },
    description: {
      en: "Translate field telemetry inputs and technician logs into actionable executive dashboards and optimization schedules.",
      id: "Terjemahkan masukan telemetri lapangan dan log teknisi menjadi dasbor eksekutif yang dapat ditindaklanjuti."
    },
    heroImage: "/images/prod_fsm.png",
    stats: [
      {
        value: "100%",
        label: {
          en: "Data-Driven Visibility",
          id: "Visibilitas Berbasis Data"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Interactive Dashboards",
          id: "Dasbor Interaktif"
        },
        description: {
          en: "Build custom widgets to monitor active metrics and calculate task SLAs in real time.",
          id: "Buat widget khusus untuk memantau metrik aktif dan menghitung SLA tugas secara real-time."
        },
        icon: "BarChart"
      }
    ]
  },
  {
    slug: "retail",
    layoutTemplate: "standard",
    badge: {
      en: "Retail Solutions",
      id: "Solusi Ritel"
    },
    title: {
      en: "Integrated Retail Payment & POS Terminal Systems",
      id: "Sistem Terminal POS & Pembayaran Ritel Terintegrasi"
    },
    description: {
      en: "Modernize retail environments with unified Point-of-Sale (POS) systems, smooth payment integration, and shop floor analytics.",
      id: "Modernisasi lingkungan ritel dengan sistem Point-of-Sale (POS) terpadu, integrasi pembayaran yang lancar, dan analitik toko."
    },
    heroImage: "/images/usecase_logistics.png",
    stats: [
      {
        value: "99.98%",
        label: {
          en: "Terminal Uptime",
          id: "Waktu Aktif Terminal"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Integrated POS Systems",
          id: "Sistem POS Terintegrasi"
        },
        description: {
          en: "Optimize sales operations and inventory tracking with advanced Point-of-Sale.",
          id: "Optimalkan operasi penjualan dan pelacakan inventaris dengan Point-of-Sale canggih."
        },
        icon: "Cpu"
      }
    ]
  },
  {
    slug: "advertising",
    layoutTemplate: "standard",
    badge: {
      en: "Advertising Solutions",
      id: "Solusi Periklanan"
    },
    title: {
      en: "Digital Advertising & High-Yield Mobile Ad Campaigns",
      id: "Iklan Digital & Kampanye Iklan Seluler Berkinerja Tinggi"
    },
    description: {
      en: "Maximize user acquisitions and revenue with targeted CPC, CPI, and CPM ad campaigns.",
      id: "Maksimalkan akuisisi pengguna dan pendapatan dengan kampanye iklan CPC, CPI, dan CPM tertarget."
    },
    heroImage: "/images/usecase_logistics.png",
    stats: [
      {
        value: "4.5x",
        label: {
          en: "Higher ROI Average",
          id: "Rata-rata ROI Lebih Tinggi"
        }
      }
    ],
    coreStrengths: [
      {
        title: {
          en: "Targeted Campaigns",
          id: "Kampanye Tertarget"
        },
        description: {
          en: "Deliver highly relevant ads using CPC, CPI, and CPM pricing models.",
          id: "Kirimkan iklan yang sangat relevan menggunakan model harga CPC, CPI, dan CPM."
        },
        icon: "Zap"
      }
    ]
  }
];
