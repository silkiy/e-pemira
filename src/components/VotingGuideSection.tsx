'use client';

import React from 'react';
import { GUIDE_STEPS } from '@/lib/data';
import {
  UserCheck,
  Vote,
  Users,
  CheckCircle2,
  ShieldAlert,
  ChevronRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const VotingGuideSection: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <UserCheck className="w-5 h-5 text-[#800020]" />;
      case 1:
        return <Vote className="w-5 h-5 text-[#800020]" />;
      case 2:
        return <Users className="w-5 h-5 text-[#800020]" />;
      case 3:
        return <ShieldAlert className="w-5 h-5 text-[#800020]" />;
      case 4:
        return <CheckCircle2 className="w-5 h-5 text-[#800020]" />;
      default:
        return <Vote className="w-5 h-5 text-[#800020]" />;
    }
  };

  return (
    <section id="panduan" className="py-16 md:py-24 relative overflow-hidden bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header & Visual Phone Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Header */}
          <div className="lg:col-span-7 space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-black text-[#800020] tracking-tight">
              Panduan <span className="text-[#212529]">Voting E-Pemira</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
              Ikuti langkah-langkah mudah berikut untuk menyalurkan hak suara Anda pada Pemilihan Raya Prodi Sistem Informasi Universitas Internasional Semen Indonesia secara aman dan transparan.
            </p>
          </div>

          {/* Right Smartphone UI Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-64 sm:w-72 bg-[#800020] p-3.5 rounded-[40px] shadow-2xl shadow-[#800020]/25 transform hover:scale-105 transition-all duration-500">
              <div className="bg-white rounded-[32px] p-5 space-y-4 relative overflow-hidden">
                {/* Phone Notch */}
                <div className="flex justify-center mb-1">
                  <div className="w-20 h-3.5 bg-gray-200 rounded-full" />
                </div>

                {/* Mobile App Screen Content */}
                <div className="flex items-center gap-2 border-b pb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#800020] text-white flex items-center justify-center font-bold text-xs">
                    <Vote className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#800020]">Pilih Kandidat</p>
                    <p className="text-[10px] text-gray-500 font-medium">PEMIRA SISFOR 2026</p>
                  </div>
                </div>

                {/* Candidate Selection Radio Option Mockup */}
                <div className="space-y-2.5">
                  <div className="p-2.5 bg-[#FFF0F2] rounded-xl border border-[#F7D4D9] flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#800020] text-white text-[10px] flex items-center justify-center font-bold">
                        01
                      </div>
                      <div className="h-2.5 w-20 bg-[#800020]/20 rounded-full" />
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-[#800020] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#800020]" />
                    </div>
                  </div>

                  <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 text-[10px] flex items-center justify-center font-bold">
                        02
                      </div>
                      <div className="h-2.5 w-20 bg-gray-300 rounded-full" />
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="w-full py-2.5 rounded-xl bg-[#800020] text-white font-extrabold text-xs text-center shadow-md">
                    Submit Suara
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Horizontal Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {GUIDE_STEPS.map((step, index) => (
            <div
              key={step.stepNumber}
              className="bg-[#FFF0F2]/60 hover:bg-[#FFF0F2] border border-[#F7D4D9] rounded-2xl p-5 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#800020]/10 flex flex-col justify-between relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#F7D4D9] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {getStepIcon(index)}
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#800020] bg-white border border-[#F7D4D9] px-2 py-0.5 rounded-full shadow-xs">
                    0{step.stepNumber}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-[#212529] mt-1 leading-snug">
                    {step.title.replace(`Langkah ${step.stepNumber}: `, '')}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Arrow Indicator for non-last items */}
              {index < 4 && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-[#800020]">
                  <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Soft Red Notice Banner */}
        <div className="bg-[#FFF0F2] border border-[#F7D4D9] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-[#800020] text-white flex-shrink-0 flex items-center justify-center shadow-sm">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-gray-800 leading-relaxed">
            <span className="font-extrabold text-[#800020] mr-1">Catatan Penting:</span>
            Pastikan koneksi internet Anda stabil dan simpan bukti transaksi/konfirmasi voting Anda. Jangan membagikan token temporary Anda kepada siapapun.
          </div>
        </div>
        
      </div>
    </section>
  );
};
