import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "E-PEMIRA | Sistem Pemilihan Raya Sistem Informasi UISI",
  description:
    "Platform E-Voting Pemilihan Raya Himpunan Mahasiswa & Komting Angkatan Sistem Informasi Universitas Internasional Semen Indonesia.",
  keywords: ["E-PEMIRA", "UISI", "Sistem Informasi", "Pemira", "E-Voting", "Kahima", "Komting"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F5] text-[#212529]">
        {children}
      </body>
    </html>
  );
}

