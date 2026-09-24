import Link from "next/link";

export default function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const isConfigured =
    supabaseUrl.length > 0 && !supabaseUrl.includes("your-project-id");

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 space-y-8">
        {/* Header */}
        <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            Next.js 16 + Supabase Ready
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            E-Pemira System
          </h1>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            Sistem Pemilihan Raya berbasis Next.js App Router &amp; Supabase (PostgreSQL).
          </p>
        </div>

        {/* Database Status Card */}
        <div className="rounded-xl border p-5 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status Koneksi Supabase</span>
            {isConfigured ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Terkonfigurasi
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Menunggu Kredensial di .env.local
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isConfigured
              ? `Terhubung ke: ${supabaseUrl}`
              : "Masukkan URL & Publishable Key dari Dashboard Supabase ke file .env.local."}
          </p>
        </div>

        {/* Architecture Checklist */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Standar Industri yang Telah Disiapkan:
          </h2>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>
                <strong>Browser Client:</strong>{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  @/lib/supabase/client
                </code>{" "}
                untuk Client Components (&quot;use client&quot;).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>
                <strong>Server Client:</strong>{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  @/lib/supabase/server
                </code>{" "}
                untuk Server Actions &amp; RSC dengan cookie aman.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>
                <strong>Proxy Middleware (Next.js 16):</strong>{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  src/proxy.ts
                </code>{" "}
                untuk auto refresh token auth di setiap request.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>
                <strong>Type Generation Script:</strong> Jalankan{" "}
                <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  pnpm db:types
                </code>{" "}
                untuk sync schema PostgreSQL langsung ke TypeScript.
              </span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            href="https://supabase.com/docs"
            target="_blank"
            className="text-xs font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 underline underline-offset-4"
          >
            Dokumentasi Supabase →
          </Link>
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            className="text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 underline underline-offset-4"
          >
            Dokumentasi Next.js →
          </Link>
        </div>
      </div>
    </main>
  );
}
