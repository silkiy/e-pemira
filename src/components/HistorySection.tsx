'use client';

import React, { useState, useRef } from 'react';
import { HISTORY_LEADERS } from '@/lib/data';
import { CandidateCategory, HistoryLeader } from '@/types/pemira';
import { Award, Sparkles, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface HistorySectionProps {
  leaders?: HistoryLeader[];
}

export const HistorySection: React.FC<HistorySectionProps> = ({ leaders }) => {
  const leaderList = leaders && leaders.length > 0 ? leaders : HISTORY_LEADERS;
  const [activeCategory, setActiveCategory] = useState<CandidateCategory>('kahima');
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredLeaders = leaderList.filter(
    (leader) => leader.category === activeCategory
  );

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="history" className="py-16 md:py-24 relative bg-gradient-to-b from-[#FFF0F2]/50 via-transparent to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 pb-6">
          <div className="space-y-2">
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#800020]">
              History <span className="text-[#212529]">Pemimpin</span>
            </h2>
          </div>

          {/* Sub-section Category Tabs (KAHIMA / KOMTING) */}
          <div className="flex p-1.5 bg-[#FFF0F2] rounded-2xl border border-[#F7D4D9] w-fit">
            <button
              onClick={() => setActiveCategory('kahima')}
              className={`px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === 'kahima'
                  ? 'bg-[#800020] text-white shadow-md shadow-[#800020]/20'
                  : 'text-[#800020] hover:bg-[#800020]/10'
              }`}
            >
              <Award className="w-4 h-4" />
              KAHIMA SISFOR
            </button>
            <button
              onClick={() => setActiveCategory('komting')}
              className={`px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === 'komting'
                  ? 'bg-[#800020] text-white shadow-md shadow-[#800020]/20'
                  : 'text-[#800020] hover:bg-[#800020]/10'
              }`}
            >
              <User className="w-4 h-4" />
              KOMTING ANGKATAN
            </button>
          </div>
        </div>

        {/* Main Content Grid: Left Narrative + Right Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Narrative Text Summary Box */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 h-full border border-[#F7D4D9] shadow-lg shadow-[#800020]/5 flex flex-col justify-between space-y-6">
            <div className="my-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] text-[#800020] flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-extrabold text-[#800020]">
                {activeCategory === 'kahima'
                  ? 'Ketua Himpunan Mahasiswa (KAHIMA)'
                  : 'Komting Angkatan (KOMTING)'}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {activeCategory === 'kahima'
                  ? 'Daftar Ketua Himpunan Mahasiswa Sistem Informasi UISI dari masa ke masa yang telah mendedikasikan karya, ide, dan kepemimpinannya.'
                  : 'Daftar Komandan Tingkat (Komting) Angkatan Sistem Informasi UISI dari Angkatan 1 hingga angkatan terbaru.'}
              </p>
            </div>

          </div>

          {/* Right Horizontal Slider Layout (No whitespace gaps) */}
          <div className="lg:col-span-9 flex flex-col justify-between space-y-3 relative">
            {/* Slider Top Navigation Header */}
            <div className="flex items-center justify-end">
              

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollSlider('left')}
                  className="w-9 h-9 rounded-full bg-white border border-[#F7D4D9] text-[#800020] hover:bg-[#800020] hover:text-white flex items-center justify-center shadow-sm transition-all"
                  title="Geser Kiri"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollSlider('right')}
                  className="w-9 h-9 rounded-full bg-white border border-[#F7D4D9] text-[#800020] hover:bg-[#800020] hover:text-white flex items-center justify-center shadow-sm transition-all"
                  title="Geser Kanan"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Slider Track Container */}
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto scroll-smooth py-1 px-0.5 snap-x snap-mandatory scrollbar-none"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {filteredLeaders.map((leader) => (
                <div
                  key={leader.id}
                  className="w-[210px] sm:w-[230px] flex-shrink-0 snap-start bg-white rounded-2xl border border-[#F7D4D9] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#800020]/40 transition-all duration-300 group flex flex-col"
                >
                  {/* Full Photo Frame (No whitespace gap, direct transition to text footer) */}
                  <div className="w-full aspect-[3/4] relative overflow-hidden bg-gray-100">
                    <img
                      src={leader.photoUrl}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#800020] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
                      {leader.category === 'komting'
                        ? leader.angkatan || `Angkatan ${leader.period}`
                        : leader.period}
                    </div>
                  </div>

                  {/* Card Text Footer directly touching image */}
                  <div className="p-3.5 bg-[#FFF0F2]/70 text-center space-y-0.5 border-t border-[#F7D4D9] flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-extrabold text-[#212529] line-clamp-1 group-hover:text-[#800020] transition-colors">
                      {leader.name}
                    </h4>
                    <p className="text-[11px] font-bold text-[#800020]">
                      {leader.category === 'komting'
                        ? leader.angkatan || `Angkatan ${leader.period}`
                        : `Periode ${leader.period}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
