import {
  Candidate,
  TimelineStep,
  GuideStep,
  HistoryLeader,
  GalleryItem,
  PemiraSettings,
} from '@/types/pemira';

export const INITIAL_SETTINGS: PemiraSettings = {
  isKahimaVotingOpen: true,
  isKomtingVotingOpen: false, // Default: Kahima currently open, Komting currently closed
  activePeriod: '2026-2027',
  totalVoters: 450,
  suaraMasukPercentage: 78.4,
};

export const TIMELINE_DATA: TimelineStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Pendaftaran & Registrasi',
    description: 'Pendaftaran berkas fisik & digital calon Ketua Himpunan & Komting.',
    status: 'completed',
    dateRange: '1 - 10 Oktober 2026',
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Verifikasi Data & Berkas',
    description: 'Pemeriksaan keabsahan dokumen dan kualifikasi oleh Panitia Pemira.',
    status: 'completed',
    dateRange: '11 - 15 Oktober 2026',
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Pengumuman Kandidat (Cakahima & Cakomting)',
    description: 'Penetapan dan publikasi paslon serta pencabutan nomor urut resmi.',
    status: 'completed',
    dateRange: '16 Oktober 2026',
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Masa Kampanye & Debat',
    description: 'Penyampaian orasi visi-misi dan debat publik calon pemimpin.',
    status: 'active',
    dateRange: '17 - 22 Oktober 2026',
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Pemungutan Suara (Voting Day)',
    description: 'Pelaksanaan e-voting secara langsung, rahasia, dan terverifikasi.',
    status: 'pending',
    dateRange: '23 Oktober 2026',
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'Pelantikan & Hasil Akhir',
    description: 'Penetapan pemenang dan acara pelantikan kepemimpinan periode baru.',
    status: 'pending',
    dateRange: '25 Oktober 2026',
  },
];

export const GUIDE_STEPS: GuideStep[] = [
  {
    stepNumber: 1,
    title: 'Langkah 1: Login Akun',
    description: 'Masuk menggunakan akun NIM & Password default yang telah digenerate panitia.',
  },
  {
    stepNumber: 2,
    title: 'Langkah 2: Buka Menu Voting',
    description: 'Buka menu Pemira pada beranda aplikasi atau tekan tombol "Ayo Voting".',
  },
  {
    stepNumber: 3,
    title: 'Langkah 3: Tinjau Kandidat',
    description: 'Tinjau profil, foto, serta visi & misi kandidat Kahima & Komting.',
  },
  {
    stepNumber: 4,
    title: 'Langkah 4: Tentukan Pilihan',
    description: 'Tentukan pilihan Anda lalu tekan tombol Konfirmasi untuk memproses suara.',
  },
  {
    stepNumber: 5,
    title: 'Langkah 5: Suara Tersimpan',
    description: 'Suara Anda telah berhasil tersimpan dengan aman di sistem e-voting.',
  },
];

export const INITIAL_CANDIDATES: Candidate[] = [
  // KAHIMA CANDIDATES (Cakahima NO 1 & NO 2)
  {
    id: 'kahima-1',
    number: 1,
    name: 'Higo Ganendra Waladi',
    category: 'kahima',
    period: '2026-2027',
    vision:
      'Mewujudkan HMD Sistem Informasi UISI yang Proaktif, Inovatif, Kolaboratif, serta Unggul dalam Pengembangan Teknologi & Pengabdian Masyarakat.',
    mission: [
      'Optimalisasi tata kelola organisasi berbasis teknologi digital yang efisien dan inklusif.',
      'Penguatan program pelatihan skill IT & kesiapan karir industri bagi mahasiswa.',
      'Mempererat kebersamaan internal angkatan melalui kegiatan kemahasiswaan yang produktif.',
    ],
    photoUrl: '/profile.png',
    totalVotes: 184,
    badge: 'Kandidat NO 1',
  },
  {
    id: 'kahima-2',
    number: 2,
    name: 'Nasudin Alkharomi',
    category: 'kahima',
    period: '2026-2027',
    vision:
      'Membangun Sinergi Himpunan Mahasiswa Sistem Informasi yang Inklusif, Berintegritas, dan Berdaya Saing Global.',
    mission: [
      'Penyelenggaraan riset terapan dan kompetisi IT tingkat nasional secara berkala.',
      'Fasilitasi penyaluran aspirasi mahasiswa yang transparan dan cepat ditanggapi.',
      'Membangun jejaring alumni SISFOR UISI yang kuat dan saling mendukung.',
    ],
    photoUrl: '/profile.png',
    totalVotes: 168,
    badge: 'Kandidat NO 2',
  },

  // KOMTING CANDIDATES (Cakomting NO 1 & NO 2)
  {
    id: 'komting-1',
    number: 1,
    name: 'Bintang Syahputra',
    category: 'komting',
    period: '2026-2027',
    angkatan: '2024',
    vision: 'Menjadi jembatan komunikasi yang responsif, adil, dan mengayomi seluruh kelas Sistem Informasi.',
    mission: [
      'Mengkoordinasikan informasi akademik & jadwal perkuliahan secara tepat waktu.',
      'Mengadakan forum diskusi bulanan angkatan.',
    ],
    photoUrl: '/profile.png',
    totalVotes: 142,
    badge: 'Cakomting NO 1',
  },
  {
    id: 'komting-2',
    number: 2,
    name: 'Siti Nurhaliza',
    category: 'komting',
    period: '2026-2027',
    angkatan: '2024',
    vision: 'Komting yang Tanggap, Cepat Informasi, dan Mempererat Keakraban Internal Angkatan.',
    mission: [
      'Transparansi keuangan dan kegiatan angkatan.',
      'Pendampingan bagi mahasiswa yang memerlukan bantuan akademis.',
    ],
    photoUrl: '/profile.png',
    totalVotes: 211,
    badge: 'Cakomting NO 2',
  },
];

export const HISTORY_LEADERS: HistoryLeader[] = [
  // KAHIMA LEADERS (Periode based)
  {
    id: 'h-kahima-1',
    name: 'Arya Pratama',
    category: 'kahima',
    period: '2023-2024',
    photoUrl: '/profile.png',
    quote: 'Fondasi Utama Kepemimpinan adalah Pelayanan Sepenuh Hati.',
  },
  {
    id: 'h-kahima-2',
    name: 'Dimas Setiawan',
    category: 'kahima',
    period: '2024-2025',
    photoUrl: '/profile.png',
    quote: 'Inovasi Digital Membawa SISFOR Ke Tingkat Nasional.',
  },
  {
    id: 'h-kahima-3',
    name: 'Reza Fauzan',
    category: 'kahima',
    period: '2025-2026',
    photoUrl: '/profile.png',
    quote: 'Satu Arah, Satu Karya untuk Kemajuan Bersama.',
  },
  {
    id: 'h-kahima-4',
    name: 'Higo Ganendra Waladi',
    category: 'kahima',
    period: '2026-2027',
    photoUrl: '/profile.png',
    quote: 'Kandidat 01 Pemira 2026.',
  },

  // KOMTING LEADERS (Angkatan 1 - 11)
  {
    id: 'h-komting-1',
    name: 'Ahmad Fauzi',
    category: 'komting',
    period: '2016',
    angkatan: 'Angkatan 1',
    photoUrl: '/profile.png',
    quote: 'Pelopor Angkatan 1 Sistem Informasi.',
  },
  {
    id: 'h-komting-2',
    name: 'Budi Santoso',
    category: 'komting',
    period: '2017',
    angkatan: 'Angkatan 2',
    photoUrl: '/profile.png',
    quote: 'Soliditas Angkatan 2 SISFOR.',
  },
  {
    id: 'h-komting-3',
    name: 'Citra Dewi',
    category: 'komting',
    period: '2018',
    angkatan: 'Angkatan 3',
    photoUrl: '/profile.png',
    quote: 'Semangat Inovasi Angkatan 3.',
  },
  {
    id: 'h-komting-4',
    name: 'Dian Permana',
    category: 'komting',
    period: '2019',
    angkatan: 'Angkatan 4',
    photoUrl: '/profile.png',
    quote: 'Kebersamaan Angkatan 4.',
  },
  {
    id: 'h-komting-5',
    name: 'Eka Putra',
    category: 'komting',
    period: '2020',
    angkatan: 'Angkatan 5',
    photoUrl: '/profile.png',
    quote: 'Tangguh Beradaptasi Angkatan 5.',
  },
  {
    id: 'h-komting-6',
    name: 'Gilang Ramadhan',
    category: 'komting',
    period: '2021',
    angkatan: 'Angkatan 6',
    photoUrl: '/profile.png',
    quote: 'Angkatan 6 Solid dan Berprestasi.',
  },
  {
    id: 'h-komting-7',
    name: 'Kevin Wijaya',
    category: 'komting',
    period: '2022',
    angkatan: 'Angkatan 7',
    photoUrl: '/profile.png',
    quote: 'Mengabdi demi kebersamaan Angkatan 7.',
  },
  {
    id: 'h-komting-8',
    name: 'Hafiz Maulana',
    category: 'komting',
    period: '2023',
    angkatan: 'Angkatan 8',
    photoUrl: '/profile.png',
    quote: 'Inspirasi Muda Angkatan 8.',
  },
  {
    id: 'h-komting-9',
    name: 'Bintang Syahputra',
    category: 'komting',
    period: '2024',
    angkatan: 'Angkatan 9',
    photoUrl: '/profile.png',
    quote: 'Semangat Baru Angkatan 9.',
  },
  {
    id: 'h-komting-10',
    name: 'Siti Nurhaliza',
    category: 'komting',
    period: '2025',
    angkatan: 'Angkatan 10',
    photoUrl: '/profile.png',
    quote: 'Inovasi Digital Angkatan 10.',
  },
  {
    id: 'h-komting-11',
    name: 'Rian Ardiansyah',
    category: 'komting',
    period: '2026',
    angkatan: 'Angkatan 11',
    photoUrl: '/profile.png',
    quote: 'Pemimpin Masa Depan Angkatan 11.',
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Debat Terbuka Cakahima 2026',
    category: 'Debat Kandidat',
    date: '24 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'g-2',
    title: 'Musyawarah Besar HMD Sistem Informasi',
    category: 'Musyawarah',
    date: '18 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'g-3',
    title: 'Sosialisasi Tatacara E-Voting Pemira UISI',
    category: 'Sosialisasi',
    date: '12 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'g-4',
    title: 'Orasi Kampanye Monologis Kandidat',
    category: 'Kampanye',
    date: '22 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'g-5',
    title: 'Simulasi Pemungutan Suara Berbasis Website',
    category: 'Uji Coba System',
    date: '27 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'g-6',
    title: 'Pelantikan Kahima & Komting Terpilih Periode Lalu',
    category: 'Pelantikan',
    date: '05 November 2025',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600',
  },
];
