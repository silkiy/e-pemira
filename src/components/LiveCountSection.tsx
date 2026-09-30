'use client';

import React, { useState } from 'react';
import { Candidate, CandidateCategory, PemiraSettings } from '@/types/pemira';
import { ArrowRight, X, CheckCircle2, Sparkles, Vote } from 'lucide-react';

interface LiveCountSectionProps {
  candidates: Candidate[];
  settings: PemiraSettings;
  onOpenVoting: () => void;
}

export const LiveCountSection: React.FC<LiveCountSectionProps> = ({
  candidates,
  settings,
  onOpenVoting,
}) => {
  const [selectedCandidateDetail, setSelectedCandidateDetail] = useState<Candidate | null>(null);

  // Sync category view based on current voting settings
  const activeCategory: CandidateCategory =
    settings.isKomtingVotingOpen && !settings.isKahimaVotingOpen
      ? 'komting'
      : 'kahima';

  const activeCandidates = candidates.filter((c) => c.category === activeCategory);

  return (
    <section
      id="live-counting"
      className="py-16 md:py-24 relative overflow-hidden bg-[#FAF7F5]"
      style={{
        backgroundImage: "url('/pattern.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Top Header */}
        <div className="space-y-2 text-left">
          <h2 className="text-3xl sm:text-4xl font-black text-[#800020] tracking-tight">
            Live Perhitungan <span className="text-[#212529]">Suara</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg">
            Perhitungan suara langsung dari sesi e-voting yang sedang berlangsung secara aktif.
          </p>
        </div>

        {/* SINGLE ACTIVE CATEGORY SECTION (Matches screenshot layout) */}
        <div className="space-y-10 text-center">
          {/* Main Category Title */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-black text-[#800020] tracking-wider uppercase">
              {activeCategory === 'kahima' ? 'CAKAHIMA' : 'CAKOMTING'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto font-medium">
              {activeCategory === 'kahima'
                ? `Calon Ketua Himpunan Mahasiswa Sistem Informasi Periode ${settings.activePeriod}`
                : `Calon Komting Angkatan Sistem Informasi Periode ${settings.activePeriod}`}
            </p>
          </div>

          {/* Cards & Live Counter Container matching user screenshot */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 max-w-5xl mx-auto">
            {activeCandidates.map((candidate, idx) => (
              <React.Fragment key={candidate.id}>
                {/* Left side Live Counter for Candidate 1 */}
                {idx === 0 && (
                  <div className="order-2 lg:order-1 flex-shrink-0">
                    <div className="w-28 sm:w-32 bg-[#FFF0F2] border border-[#F7D4D9] rounded-t-3xl rounded-b-2xl p-4 text-center shadow-lg space-y-1 transform hover:scale-105 transition-transform">
                      <div className="inline-flex items-center gap-1 bg-[#800020]/10 border border-[#800020]/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#800020]">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        Live
                      </div>
                      <p className="text-3xl sm:text-4xl font-black text-[#800020] tracking-tight pt-1">
                        {String(candidate.totalVotes).padStart(3, '0')}
                      </p>
                      <p className="text-xs font-black text-[#800020] tracking-widest uppercase">
                        SUARA
                      </p>
                    </div>
                  </div>
                )}

                {/* Main Candidate Card */}
                <div className={`order-1 lg:order-${idx === 0 ? '2' : '3'} flex-1 w-full max-w-sm`}>
                  <div className="bg-[#FFF0F2]/80 backdrop-blur-md rounded-3xl p-5 border border-[#F7D4D9] shadow-2xl space-y-4 text-center relative hover:shadow-2xl hover:border-[#800020]/40 transition-all duration-300 group">
                    {/* Top Pill: Kandidat NO X */}
                    <div className="inline-block bg-white text-[#800020] border border-[#F7D4D9] px-6 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
                      {candidate.badge || `Kandidat NO ${candidate.number}`}
                    </div>

                    {/* Candidate Photo Frame */}
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 border border-gray-300/80 shadow-md">
                      <img
                        src={candidate.photoUrl}
                        alt={candidate.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Candidate Name */}
                    <div className="pt-1">
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#212529]">
                        {candidate.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-600 mt-0.5">
                        {candidate.category === 'kahima' ? 'Calon Ketua Himpunan' : `Angkatan ${candidate.angkatan || '2024'}`}
                      </p>
                    </div>

                    {/* Button: Lihat Detail */}
                    <button
                      onClick={() => setSelectedCandidateDetail(candidate)}
                      className="w-full py-3 rounded-full bg-[#800020] hover:bg-[#5F0018] text-white font-bold text-xs shadow-md hover:shadow-lg hover:shadow-[#800020]/25 transition-all flex items-center justify-center gap-2 group-hover:translate-y-0.5"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right side Live Counter for Candidate 2 */}
                {idx === 1 && (
                  <div className="order-3 lg:order-4 flex-shrink-0">
                    <div className="w-28 sm:w-32 bg-[#FFF0F2] border border-[#F7D4D9] rounded-t-3xl rounded-b-2xl p-4 text-center shadow-lg space-y-1 transform hover:scale-105 transition-transform">
                      <div className="inline-flex items-center gap-1 bg-[#800020]/10 border border-[#800020]/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#800020]">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        Live
                      </div>
                      <p className="text-3xl sm:text-4xl font-black text-[#800020] tracking-tight pt-1">
                        {String(candidate.totalVotes).padStart(3, '0')}
                      </p>
                      <p className="text-xs font-black text-[#800020] tracking-widest uppercase">
                        SUARA
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Global Action CTA Button */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenVoting}
            className="px-8 py-4 rounded-full bg-[#800020] hover:bg-[#5F0018] text-white font-extrabold text-sm shadow-xl shadow-[#800020]/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
          >
            <Vote className="w-5 h-5 text-pink-200" />
            <span>Buka Halaman Vote Kandidat Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Candidate Detail Modal (Visi & Misi overview) */}
      {selectedCandidateDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#F7D4D9] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#800020] to-[#5F0018] p-6 text-white relative flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-pink-400/30 px-3 py-1 rounded-full border border-pink-300/30">
                  {selectedCandidateDetail.badge || `Kandidat NO ${selectedCandidateDetail.number}`}
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedCandidateDetail.name}</h3>
              </div>

              <button
                onClick={() => setSelectedCandidateDetail(null)}
                className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content: Visi & Misi */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="flex items-center gap-4 p-4 bg-[#FFF0F2] rounded-2xl border border-[#F7D4D9]">
                <img
                  src={selectedCandidateDetail.photoUrl}
                  alt={selectedCandidateDetail.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#800020]"
                />
                <div>
                  <h4 className="text-base font-extrabold text-[#800020]">
                    {selectedCandidateDetail.name}
                  </h4>
                  <p className="text-xs text-gray-600 font-medium">
                    Kategori: {selectedCandidateDetail.category.toUpperCase()} Periode {selectedCandidateDetail.period}
                  </p>
                  <p className="text-xs font-bold text-[#800020] mt-1">
                    Total Perolehan Suara Live: {selectedCandidateDetail.totalVotes} Suara
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-[#800020] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Visi Kandidat
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 italic bg-gray-50 p-4 rounded-xl border border-gray-200 leading-relaxed">
                  &quot;{selectedCandidateDetail.vision}&quot;
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-[#800020] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#800020]" />
                  Misi Utama & Program Kerja
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  {selectedCandidateDetail.mission.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 bg-[#FFF0F2]/60 p-3 rounded-xl border border-[#F7D4D9]">
                      <span className="w-5 h-5 rounded-full bg-[#800020] text-white flex-shrink-0 text-[11px] font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedCandidateDetail(null)}
                  className="flex-1 py-3 rounded-full border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100"
                >
                  Tutup Profil
                </button>
                <button
                  onClick={() => {
                    setSelectedCandidateDetail(null);
                    onOpenVoting();
                  }}
                  className="flex-1 py-3 rounded-full bg-[#800020] text-white font-bold text-xs hover:bg-[#5F0018] shadow-md flex items-center justify-center gap-1.5"
                >
                  <Vote className="w-4 h-4" />
                  <span>Vote Candidate Ini</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
