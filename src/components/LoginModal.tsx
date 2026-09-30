'use client';

import React, { useState } from 'react';
import { UserSession } from '@/types/pemira';
import { X, User, Lock, KeyRound, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';

import { loginWithNim } from '@/lib/supabase/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!nim || !password) {
      setErrorMsg('Harap isi NIM dan Password temporary Anda.');
      return;
    }

    setIsLoading(true);

    try {
      const { session, error } = await loginWithNim(nim, password);
      if (error || !session) {
        setErrorMsg(error || 'Login gagal. Periksa NIM & Password.');
        return;
      }

      onLoginSuccess(session);
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem saat login.';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoStudent = () => {
    setNim('3012110045');
    setPassword('3012110045');
  };

  const handleQuickDemoAdmin = () => {
    setNim('admin');
    setPassword('ADMIN-SECRET');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full border border-[#F7D4D9] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#800020] to-[#5F0018] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="space-y-1">
       
            <h3 className="text-2xl font-extrabold">Login Mahasiswa</h3>
            <p className="text-xs text-pink-100">
              Masuk menggunakan NIM & Password.
            </p>
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">NIM (Nomor Induk Mahasiswa)</label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Contoh: 3012110045"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">Password Temporary</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#800020] transition-colors p-1"
                title={showPassword ? 'Sembunyikan Password' : 'Tampilkan Password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#800020] hover:bg-[#5F0018] text-white font-bold text-sm shadow-lg shadow-[#800020]/25 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Memproses Login...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Masuk Sistem Voting</span>
              </>
            )}
          </button>

          <div className="pt-2 border-t border-gray-100 space-y-2">
            <p className="text-[11px] text-gray-500 font-semibold text-center">Akun Percobaan (Supabase DB):</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleQuickDemoStudent}
                className="flex-1 py-2 px-3 text-[11px] font-bold rounded-lg border border-[#F7D4D9] bg-[#FFF0F2] text-[#800020] hover:bg-[#FCE8EB] transition-colors"
              >
                Mahasiswa (3012110045)
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="flex-1 py-2 px-3 text-[11px] font-bold rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Admin Panitia
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
