'use client';

import React, { useState } from 'react';
import { Candidate, PemiraSettings, UserSession } from '@/types/pemira';
import { ArrowLeft, Vote, Sparkles, Lock, LogOut } from 'lucide-react';

interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSession: UserSession | null;
  candidates: Candidate[];
  settings: PemiraSettings;
  onVoteCast: (kahimaId?: string, komtingId?: string) => void;
}

export const VotingModal: React.FC<VotingModalProps> = ({
  isOpen,
  onClose,
  userSession,
  candidates,
  settings,
  onVoteCast,
}) => {
  // Active category is determined directly by Admin settings (Kahima or Komting)
  const activeScope: 'kahima' | 'komting' = settings.isKahimaVotingOpen
    ? 'kahima'
    : 'komting';

  const [selectedKahimaId, setSelectedKahimaId] = useState<string | null>(null);
  const [selectedKomtingId, setSelectedKomtingId] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const kahimaCandidates = candidates.filter((c) => c.category === 'kahima');
  const komtingCandidates = candidates.filter((c) => c.category === 'komting');

  const activeCandidates = activeScope === 'kahima' ? kahimaCandidates : komtingCandidates;
  const isCurrentScopeOpen =
    activeScope === 'kahima' ? settings.isKahimaVotingOpen : settings.isKomtingVotingOpen;

  const handleFinalSubmit = () => {
    onVoteCast(selectedKahimaId || undefined, selectedKomtingId || undefined);
    setIsConfirming(false);
    setIsSuccess(true);
  };

  const handleCloseAll = () => {
    setIsSuccess(false);
    setIsConfirming(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#FAF7F5] overflow-y-auto min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/pattern.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#F7D4D9] px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="E-PEMIRA Logo" className="h-9 w-auto object-contain" />
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#800020] hover:text-[#5F0018] font-extrabold text-sm transition-colors py-1.5 px-4 rounded-full bg-[#FFF0F2] border border-[#F7D4D9]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
      </header>

      {/* Main Voting Body Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center">
        {/* ======================================================== */}
        {/* SUCCESS VIEW SCREEN (Frame 10 matching Image 2)           */}
        {/* ======================================================== */}
        {isSuccess ? (
          <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#F7D4D9] shadow-2xl space-y-6">
            {/* Center Content Box */}
            <div className="bg-[#FAF7F5] rounded-2xl p-8 sm:p-10 border border-gray-200 text-center space-y-3 shadow-inner">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                Terima Kasih, Suaramu Telah Tercatat!
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed max-w-md mx-auto">
                Voting kamu berhasil disubmit. Setiap suara memiliki arti dalam menentukan langkah dan kepemimpinan Sistem Informasi UISI.
              </p>
            </div>

            {/* Bottom Right Action Bar */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleCloseAll}
                className="px-8 py-3 rounded-full bg-[#800020] hover:bg-[#5F0018] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                BERANDA
              </button>
            </div>
          </div>
        ) : isConfirming ? (
          /* ======================================================== */
          /* CONFIRMATION SCREEN (Frame 7 matching Image 2)          */
          /* ======================================================== */
          <div className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#F7D4D9] shadow-2xl space-y-6 relative">
            {/* Top Right "Kembali" Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsConfirming(false)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-gray-700 hover:text-[#800020] transition-colors"
              >
                <LogOut className="w-4 h-4 rotate-180" />
                <span>Kembali</span>
              </button>
            </div>

            {/* Center Content Box */}
            <div className="bg-[#FAF7F5] rounded-2xl p-8 sm:p-10 border border-gray-200 text-center space-y-3 shadow-inner">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                Apakah Anda yakin dengan pilihan Anda?
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed max-w-md mx-auto">
                Periksa kembali kandidat yang telah Anda pilih sebelum mengirim suara. Setelah suara dikirim, pilihan tidak dapat diubah kembali.
              </p>
            </div>

            {/* Bottom Right Action Bar */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleFinalSubmit}
                className="px-8 py-3 rounded-full bg-[#800020] hover:bg-[#5F0018] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                PILIH KANDIDAT
              </button>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* MAIN DIRECT CANDIDATE VOTING PAGE VIEW                    */
          /* ======================================================== */
          <div className="space-y-10">
            {/* Static Category Indicator Badge (Controlled by Admin, NO interactive switch buttons) */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-8 py-3 bg-white rounded-full border border-[#F7D4D9] shadow-md">
                <span className="text-xs sm:text-sm font-extrabold text-[#800020] uppercase tracking-wider">
                  {activeScope === 'kahima' ? 'KAHIMA' : 'KOMTING'}
                </span>
                <span
                  className={`text-[10px] px-3 py-1 rounded-full font-extrabold uppercase ${
                    isCurrentScopeOpen
                      ? 'bg-emerald-500 text-white'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {isCurrentScopeOpen ? 'DIBUKA' : 'DITUTUP'}
                </span>
              </div>
            </div>

            {/* Page Header Title */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black text-[#800020] tracking-widest uppercase">
                {activeScope === 'kahima' ? 'CAKAHIMA' : 'CAKOMTING'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Pilihlah Pemimpin Terbaik untuk Masa Depan Sistem Informasi UISI
              </p>
            </div>

            {/* Notification Banner if Current Category Voting is Closed */}
            {!isCurrentScopeOpen && (
              <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center gap-3 text-red-800 text-xs font-bold shadow-sm">
                <Lock className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>
                  Sesi Pemilihan {activeScope === 'kahima' ? 'KAHIMA' : 'KOMTING'} saat ini sedang DITUTUP oleh Panitia.
                </span>
              </div>
            )}

            {/* Candidate Cards Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {activeCandidates.map((candidate) => {
                const isSelected =
                  activeScope === 'kahima'
                    ? selectedKahimaId === candidate.id
                    : selectedKomtingId === candidate.id;

                return (
                  <div
                    key={candidate.id}
                    className={`bg-[#FFF0F2]/90 backdrop-blur-md rounded-3xl p-6 border-2 shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 text-center ${
                      isSelected
                        ? 'border-[#800020] ring-4 ring-[#800020]/20 bg-[#FFF0F2]'
                        : 'border-[#F7D4D9] hover:border-[#800020]/40'
                    } ${!isCurrentScopeOpen ? 'opacity-85' : ''}`}
                  >
                    <div className="space-y-4">
                      {/* Top Pill */}
                      <div className="inline-block bg-white text-[#800020] border border-[#F7D4D9] px-6 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
                        {candidate.badge || `Kandidat NO ${candidate.number}`}
                      </div>

                      {/* Photo */}
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 border border-gray-300 shadow-md max-w-sm mx-auto">
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name (Single Candidate Only, No Vice Name) */}
                      <div>
                        <h3 className="text-xl font-extrabold text-[#212529]">
                          {candidate.name}
                        </h3>
                      </div>

                      {/* Visi Preview Box */}
                      <div className="p-4 bg-white/90 rounded-2xl border border-[#F7D4D9] text-left space-y-1.5">
                        <p className="text-xs font-extrabold text-[#800020] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Visi:
                        </p>
                        <p className="text-xs text-gray-700 italic font-medium leading-relaxed">
                          &quot;{candidate.vision}&quot;
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => {
                        if (!isCurrentScopeOpen) return;
                        if (activeScope === 'kahima') {
                          setSelectedKahimaId(candidate.id);
                        } else {
                          setSelectedKomtingId(candidate.id);
                        }
                      }}
                      disabled={!isCurrentScopeOpen}
                      className={`w-full py-3.5 rounded-full font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                        !isCurrentScopeOpen
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#800020] text-white ring-2 ring-[#800020]'
                          : 'bg-[#800020] hover:bg-[#5F0018] text-white hover:shadow-lg'
                      }`}
                    >
                      {!isCurrentScopeOpen ? (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Sesi Voting Ditutup</span>
                        </>
                      ) : (
                        <>
                          <Vote className="w-4 h-4" />
                          <span>{isSelected ? '✓ Terpilih (Klik Konfirmasi)' : `Vote Kandidat NO ${candidate.number}`}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom Final Action Bar */}
            <div className="max-w-2xl mx-auto pt-6 border-t border-[#F7D4D9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-semibold text-gray-600">
                Kandidat Terpilih:{' '}
                <span className="font-bold text-[#800020]">
                  {activeScope === 'kahima'
                    ? kahimaCandidates.find((c) => c.id === selectedKahimaId)?.name || 'Belum Memilih'
                    : komtingCandidates.find((c) => c.id === selectedKomtingId)?.name || 'Belum Memilih'}
                </span>
              </div>

              <button
                onClick={() => setIsConfirming(true)}
                disabled={activeScope === 'kahima' ? !selectedKahimaId : !selectedKomtingId}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#800020] hover:bg-[#5F0018] disabled:opacity-50 text-white font-extrabold text-xs shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Proses & Konfirmasi Suara</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
