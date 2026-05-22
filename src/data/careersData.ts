export interface CareerItem {
  id: number;
  slug: string;
  title: {
    en: string;
    id: string;
  };
  department: {
    en: string;
    id: string;
  };
  location: {
    en: string;
    id: string;
  };
  type: {
    en: string;
    id: string;
  };
  experience: {
    en: string;
    id: string;
  };
  salary: {
    en: string;
    id: string;
  };
  postedDate: string;
  description: {
    en: string;
    id: string;
  };
  requirements: {
    en: string[];
    id: string[];
  };
  responsibilities: {
    en: string[];
    id: string[];
  };
}

export const CAREERS_DATA: CareerItem[] = [
  {
    id: 1,
    slug: "product-manager",
    title: {
      en: "Product Manager",
      id: "Product Manager"
    },
    department: {
      en: "Engineer",
      id: "Engineer"
    },
    location: {
      en: "Bekasi, Jawa Barat",
      id: "Bekasi, Jawa Barat"
    },
    type: {
      en: "Full-time",
      id: "Penuh Waktu"
    },
    experience: {
      en: "3+ years",
      id: "3+ tahun"
    },
    salary: {
      en: "Competitive",
      id: "Kompetitif"
    },
    postedDate: "15 May 2026",
    description: {
      en: "We are seeking an experienced Product Manager to lead the lifecycle of our IT software and IoT solution platforms. You will collaborate closely with engineering, design, and sales to launch premium products that drive operational efficiency.",
      id: "Kami mencari Product Manager berpengalaman untuk memimpin siklus hidup perangkat lunak IT dan platform solusi IoT kami. Anda akan bekerja sama erat dengan tim teknik, desain, dan penjualan untuk meluncurkan produk premium yang mendorong efisiensi operasional."
    },
    requirements: {
      en: [
        "Bachelor's degree in Computer Science, Business Administration, or a related technical field.",
        "3+ years of experience managing software or hardware products, preferably in IoT or enterprise B2B fields.",
        "Strong understanding of Agile/Scrum methodologies and product management tools (Jira, Productboard).",
        "Excellent communication skills in English and Indonesian to coordinate with multiple stakeholders."
      ],
      id: [
        "Gelar Sarjana dalam Ilmu Komputer, Administrasi Bisnis, atau bidang teknis terkait.",
        "3+ tahun pengalaman mengelola produk perangkat lunak atau perangkat keras, lebih disukai di bidang IoT atau B2B korporat.",
        "Pemahaman kuat tentang metodologi Agile/Scrum dan alat manajemen produk (Jira, Productboard).",
        "Kemampuan komunikasi yang sangat baik dalam bahasa Inggris dan Indonesia untuk berkoordinasi dengan pemangku kepentingan."
      ]
    },
    responsibilities: {
      en: [
        "Define product strategy, roadmap, and core features based on market research and customer feedback.",
        "Translate product vision into detailed technical requirements, PRDs, and user stories.",
        "Oversee the development sprints and coordinate with developers to ensure timely, high-quality deliverables.",
        "Collaborate with marketing and sales teams to develop product launch collateral and training guides."
      ],
      id: [
        "Menentukan strategi produk, peta jalan (roadmap), dan fitur inti berdasarkan riset pasar dan masukan pelanggan.",
        "Menerjemahkan visi produk menjadi persyaratan teknis terperinci, PRD, dan user story.",
        "Mengawasi sprint pengembangan dan berkoordinasi dengan pengembang untuk memastikan hasil berkualitas tinggi tepat waktu.",
        "Berkolaborasi dengan tim pemasaran dan penjualan untuk mengembangkan materi peluncuran produk dan panduan pelatihan."
      ]
    }
  },
  {
    id: 2,
    slug: "freelance-teknisi-edc",
    title: {
      en: "Freelance Teknisi EDC",
      id: "Freelance Teknisi EDC"
    },
    department: {
      en: "Engineer",
      id: "Engineer"
    },
    location: {
      en: "Bekasi, Jawa Barat",
      id: "Bekasi, Jawa Barat"
    },
    type: {
      en: "Freelance",
      id: "Pekerja Lepas"
    },
    experience: {
      en: "1+ years",
      id: "1+ tahun"
    },
    salary: {
      en: "Per-project basis",
      id: "Berdasarkan Proyek"
    },
    postedDate: "12 May 2026",
    description: {
      en: "Join PT. Mitra Inovasi Bisnis as a Freelance EDC Technician. You will be responsible for installing, configuring, troubleshooting, and maintaining Electronic Data Capture (EDC) terminals across merchant networks in West Java.",
      id: "Bergabunglah dengan PT. Mitra Inovasi Bisnis sebagai Teknisi EDC Freelance. Anda akan bertanggung jawab untuk menginstal, mengonfigurasi, memecahkan masalah, dan memelihara terminal Electronic Data Capture (EDC) di jaringan merchant di Jawa Barat."
    },
    requirements: {
      en: [
        "Minimum High School / Vocational High School (SMK) in Electronic Engineering, Informatics, or related disciplines.",
        "Basic understanding of hardware networking, POS terminal operations, and SIM card configurations.",
        "Must own a motorcycle, a valid driver's license (SIM C), and an Android smartphone.",
        "Willingness to travel to client sites within Bekasi and surrounding West Java areas."
      ],
      id: [
        "Minimal SMA / SMK Jurusan Teknik Elektronika, Informatika, atau disiplin ilmu terkait.",
        "Pemahaman dasar tentang jaringan perangkat keras, operasi terminal POS, dan konfigurasi kartu SIM.",
        "Wajib memiliki sepeda motor sendiri, SIM C yang aktif, dan smartphone Android.",
        "Bersedia melakukan perjalanan ke lokasi klien di wilayah Bekasi dan sekitarnya di Jawa Barat."
      ]
    },
    responsibilities: {
      en: [
        "Perform field installation and activation of EDC terminal devices at merchant points of sale.",
        "Diagnose and resolve terminal connectivity issues (GPRS, Wifi, Dial-Up) on-site.",
        "Train merchant staff on proper terminal usage and fundamental troubleshooting practices.",
        "Provide daily field service status reports and documentation to the coordinator."
      ],
      id: [
        "Melakukan pemasangan di lapangan dan aktivasi perangkat terminal EDC di lokasi merchant.",
        "Mendiagnosis dan menyelesaikan masalah konektivitas terminal (GPRS, Wifi, Dial-Up) di lokasi.",
        "Melatih staf merchant tentang penggunaan terminal yang benar dan praktik dasar pemecahan masalah.",
        "Memberikan laporan status layanan lapangan harian dan dokumentasi kepada koordinator."
      ]
    }
  },
  {
    id: 3,
    slug: "sales-manager-it-product-solution",
    title: {
      en: "Sales Manager - IT Product & Solution",
      id: "Sales Manager - IT Product & Solution"
    },
    department: {
      en: "Engineer",
      id: "Engineer"
    },
    location: {
      en: "Bekasi, Jawa Barat",
      id: "Bekasi, Jawa Barat"
    },
    type: {
      en: "Full-time",
      id: "Penuh Waktu"
    },
    experience: {
      en: "5+ years",
      id: "5+ tahun"
    },
    salary: {
      en: "Highly Competitive",
      id: "Sangat Kompetitif"
    },
    postedDate: "10 May 2026",
    description: {
      en: "We are seeking a high-performing Sales Manager to drive the adoption of our software solutions, enterprise platforms, and IoT hardware. You will manage customer acquisitions, prepare technical proposals, and represent PT. Mitra Inovasi Bisnis at executive corporate pitches.",
      id: "Kami sedang mencari Sales Manager berkinerja tinggi untuk mendorong adopsi solusi perangkat lunak, platform perusahaan, dan perangkat keras IoT kami. Anda akan mengelola akuisisi pelanggan, menyiapkan proposal teknis, dan mewakili PT. Mitra Inovasi Bisnis dalam presentasi korporat."
    },
    requirements: {
      en: [
        "Bachelor's degree in Marketing, Business Administration, Engineering, or a technical field.",
        "5+ years of B2B corporate sales experience within the IT industry, software systems, or network hardware solutions.",
        "Proven track record of consistently meeting or exceeding quarterly and annual sales quotas.",
        "Strong negotiating skills and experience building deep relationships with corporate C-level executives."
      ],
      id: [
        "Gelar Sarjana dalam Pemasaran, Administrasi Bisnis, Teknik, atau bidang teknis.",
        "5+ tahun pengalaman penjualan korporat B2B di industri IT, sistem perangkat lunak, atau solusi perangkat keras jaringan.",
        "Rekam jejak terbukti secara konsisten memenuhi atau melampaui kuota penjualan triwulanan dan tahunan.",
        "Keterampilan negosiasi yang kuat dan pengalaman membangun hubungan mendalam dengan eksekutif C-level korporat."
      ]
    },
    responsibilities: {
      en: [
        "Identify new business opportunities, qualify leads, and close high-value enterprise accounts.",
        "Lead the creation of tailored project proposals, pricing quotations, and product pitch presentations.",
        "Maintain clean pipeline CRM logs and report weekly/monthly performance forecast reports to executive leadership.",
        "Collaborate with the solution engineering team to match complex technical requirements with PT. MIB product offerings."
      ],
      id: [
        "Mengidentifikasi peluang bisnis baru, menyaring prospek, dan menutup akun perusahaan bernilai tinggi.",
        "Memimpin pembuatan proposal proyek yang disesuaikan, penawaran harga, dan presentasi penawaran produk.",
        "Memelihara log CRM pipeline yang bersih dan melaporkan prakiraan kinerja mingguan/bulanan kepada kepemimpinan eksekutif.",
        "Berkolaborasi dengan tim insinyur solusi untuk mencocokkan persyaratan teknis yang kompleks dengan penawaran produk PT. MIB."
      ]
    }
  },
  {
    id: 4,
    slug: "frontend-engineer-react-nextjs",
    title: {
      en: "Frontend Engineer (React / Next.js)",
      id: "Frontend Engineer (React / Next.js)"
    },
    department: {
      en: "Engineer",
      id: "Engineer"
    },
    location: {
      en: "Bekasi, Jawa Barat",
      id: "Bekasi, Jawa Barat"
    },
    type: {
      en: "Full-time",
      id: "Penuh Waktu"
    },
    experience: {
      en: "2+ years",
      id: "2+ tahun"
    },
    salary: {
      en: "Competitive",
      id: "Kompetitif"
    },
    postedDate: "08 May 2026",
    description: {
      en: "We are looking for a Frontend Engineer skilled in React, Next.js, and TypeScript to build and polish the modern user interfaces of our Field Service Management (FSM) systems and client portal web applications.",
      id: "Kami sedang mencari Frontend Engineer yang terampil dalam React, Next.js, dan TypeScript untuk membangun dan menyempurnakan antarmuka pengguna modern dari sistem Field Service Management (FSM) dan aplikasi web portal klien kami."
    },
    requirements: {
      en: [
        "Bachelor's degree in Computer Science, Information Technology, or equivalent practical experience.",
        "2+ years of professional experience building web apps with React, Next.js, TailwindCSS, and TypeScript.",
        "Experience optimizing web apps for speed, responsive layouts, search engine optimization (SEO), and accessibility.",
        "Familiarity with state management libraries (Redux Toolkit, Zustand) and Git version control."
      ],
      id: [
        "Gelar Sarjana dalam Ilmu Komputer, Teknologi Informasi, atau pengalaman praktis yang setara.",
        "2+ tahun pengalaman profesional membangun aplikasi web dengan React, Next.js, TailwindCSS, dan TypeScript.",
        "Pengalaman mengoptimalkan aplikasi web untuk kecepatan, tata letak responsif, SEO, dan aksesibilitas.",
        "Keakraban dengan pustaka manajemen status (Redux Toolkit, Zustand) dan Git version control."
      ]
    },
    responsibilities: {
      en: [
        "Implement pixel-perfect, highly responsive, and beautiful user interfaces directly from Figma design assets.",
        "Develop reusable components and front-end utility modules to maintain design system consistency.",
        "Integrate dynamic client RESTful or GraphQL APIs and manage browser state securely.",
        "Collaborate with the QA team to ensure compatibility across popular desktop and mobile browsers."
      ],
      id: [
        "Mengimplementasikan antarmuka pengguna yang sangat responsif, indah, dan pixel-perfect langsung dari aset desain Figma.",
        "Mengembangkan komponen yang dapat digunakan kembali dan modul utilitas front-end untuk menjaga konsistensi sistem desain.",
        "Mengintegrasikan API RESTful atau GraphQL klien yang dinamis dan mengelola status browser dengan aman.",
        "Berkolaborasi dengan tim QA untuk memastikan kompatibilitas di berbagai browser desktop dan seluler populer."
      ]
    }
  }
];
