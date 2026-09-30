'use client';

import React from 'react';
import { Vote, Heart, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#212529] text-gray-300 pt-16 pb-12 border-t-4 border-[#800020] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="E-PEMIRA Logo" className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Platform e-Voting Pemilihan Raya Himpunan Mahasiswa & Ketua Komting Angkatan Prodi Sistem Informasi Universitas Internasional Semen Indonesia.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li>
                <a href="#beranda" className="hover:text-[#FFF0F2] transition-colors">
                  Beranda Utama
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-[#FFF0F2] transition-colors">
                  Timeline Acara
                </a>
              </li>
              <li>
                <a href="#panduan" className="hover:text-[#FFF0F2] transition-colors">
                  Panduan Voting
                </a>
              </li>
              <li>
                <a href="#history" className="hover:text-[#FFF0F2] transition-colors">
                  History Kandidat
                </a>
              </li>
              <li>
                <a href="#live-counting" className="hover:text-[#FFF0F2] transition-colors">
                  Real-Time Count
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Sekretariat & Kontak</h4>
            <div className="space-y-2 text-xs text-gray-400 font-medium">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#800020] flex-shrink-0 mt-0.5" />
                Kampus B UISI, Kompleks PT Semen Indonesia (Persero) Tbk, Gresik, Jawa Timur.
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#800020] flex-shrink-0" />
                pemira.sisfor@uisi.ac.id
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© Copyright - E-PEMIRA Himpunan Mahasiswa Sistem Informasi.</p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="#panduan" className="hover:underline">FAQ & Bantuan</a>
            <span>•</span>
            <a href="#panduan" className="hover:underline">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
