# E-Pemira 🗳️

Sistem Pemilihan Raya (E-Voting) berbasis web modern yang dibangun menggunakan **Next.js 16 App Router**, **React 19**, **Tailwind CSS v4**, dan **Supabase**.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Backend & Database:** [Supabase](https://supabase.com/) (`@supabase/ssr` & PostgreSQL)
- **Package Manager:** [pnpm](https://pnpm.io/)

---

## 📁 Struktur Direktori

Project ini menggunakan arsitektur **Fullstack Monolith** di mana frontend dan backend berada dalam satu codebase:

```text
e-pemira/
├── public/                 # Static assets (gambar, favicon, logo)
├── src/
│   ├── actions/            # [BACKEND] Server Actions ("use server" mutations)
│   │   └── auth-actions.ts # Contoh Server Action autentikasi
│   ├── app/                # [FRONTEND & ROUTING] Next.js App Router
│   │   ├── favicon.ico
│   │   ├── globals.css     # Konfigurasi Tailwind CSS
│   │   ├── layout.tsx      # Root Layout
│   │   └── page.tsx        # Halaman Beranda (Landing Page)
│   ├── components/         # [FRONTEND] Reusable UI Components
│   ├── lib/
│   │   └── supabase/       # [BACKEND/CLIENT] Supabase Client Configuration
│   │       ├── client.ts   # Browser client untuk Client Components ("use client")
│   │       ├── server.ts   # Server client untuk Server Components & Actions
│   │       └── proxy.ts    # Helper session token refresh
│   ├── proxy.ts            # Proxy Middleware Next.js 16 (Token refresh & auth guard)
│   └── types/              # Definisi TypeScript
│       └── database.types.ts # Schema kontrak database Supabase
├── .env.example            # Template variabel environment
├── .env.local              # Kredensial lokal (di-ignore oleh git)
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## 🛠️ Panduan Memulai (Getting Started)

### 1. Prasyarat
- **Node.js:** Versi >= 20.x
- **pnpm:** Versi >= 9.x atau 10.x (disarankan)

### 2. Instalasi Dependensi
Clone repository ini, lalu jalankan:
```bash
pnpm install
```

### 3. Konfigurasi Environment Variables
Duplikasi file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Isi nilai variabel dengan kredensial Supabase project:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 4. Menjalankan Server Development
```bash
pnpm dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 📜 Perintah yang Tersedia (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `pnpm dev` | Menjalankan development server dengan Turbopack |
| `pnpm build` | Membangun bundle produksi teroptimasi |
| `pnpm start` | Menjalankan server dalam mode produksi |
| `pnpm lint` | Memeriksa kualitas kode dengan ESLint |
| `pnpm db:types` | Meng-generate TypeScript types dari schema tabel Supabase |

---

## 🤝 Panduan Kolaborasi Tim

### Untuk Pengembang Frontend:
1. Buat halaman baru di dalam folder `src/app/` (contoh: `src/app/voting/page.tsx`, `src/app/kandidat/page.tsx`).
2. Komponen UI reusable diletakkan di `src/components/`.
3. Styling sepenuhnya didukung oleh utility classes **Tailwind CSS**.
4. Jika butuh data interaktif di browser, gunakan Client Component (`"use client"`) dan panggil Supabase via `@/lib/supabase/client`.

### Untuk Pengembang Backend:
1. Logika manipulasi data, validasi, dan transaksi database diletakkan di `src/actions/` menggunakan **Server Actions** (`"use server"`).
2. Panggil Supabase di server menggunakan `@/lib/supabase/server`.
3. Proteksi route / halaman dilayani di [src/proxy.ts](file:///D:/project/e-pemira/src/proxy.ts).
4. Setelah update schema tabel di Supabase Dashboard, perbarui file type dengan menjalankan `pnpm db:types`.
