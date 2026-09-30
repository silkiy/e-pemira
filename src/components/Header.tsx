'use client';

import React, { useState } from 'react';
import { UserSession } from '@/types/pemira';
import { LogIn, LogOut, ShieldCheck, User, Menu, X, LayoutDashboard, Vote } from 'lucide-react';

interface HeaderProps {
  userSession: UserSession | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenVoting: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userSession,
  onOpenLogin,
  onLogout,
  onOpenVoting,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'History', href: '#history' },
    { name: 'Panduan', href: '#panduan' },
    { name: 'Voting', href: '#voting-section', isVotingTrigger: true },
    { name: 'Real-Time Counting', href: '#live-counting' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-[#F7D4D9]/80 shadow-sm transition-all bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto my-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Uses Official logo.svg from public folder */}
        <a href="#beranda" className="flex items-center gap-3 group">
          <img src="/logo.svg" alt="E-PEMIRA Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
        </a>

        <nav className="hidden xl:flex items-center gap-7">
          {navLinks.map((link) =>
            link.isVotingTrigger ? (
              <button
                key={link.name}
                onClick={onOpenVoting}
                className="text-sm font-extrabold text-[#800020] hover:text-[#5F0018] transition-colors relative py-1"
              >
                {link.name}
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-gray-700 hover:text-[#800020] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#800020] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            )
          )}
        </nav>

        {/* Action Buttons: Log Out / Profile Status Badge */}
        <div className="hidden lg:flex items-center gap-3">
          {userSession ? (
            <div className="flex items-center gap-3 bg-[#FFF0F2] border border-[#F7D4D9] p-1.5 pl-3.5 rounded-full shadow-sm">
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#800020] flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#800020]" />
                  {userSession.name}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  NIM: {userSession.nim} ({userSession.role.toUpperCase()})
                </span>
              </div>

              {/* <button
                onClick={onOpenVoting}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#800020] text-white hover:bg-[#5F0018] transition-colors shadow-sm flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Voting Now
              </button> */}

              <button
                onClick={onLogout}
                className="w-8 h-8 rounded-full bg-[#800020] text-white flex items-center justify-center hover:bg-[#5F0018] transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#800020] text-white hover:bg-[#5F0018] hover:shadow-lg hover:shadow-[#800020]/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Log In
            </button>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-[#FFF0F2] text-[#800020] border border-[#F7D4D9]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2 pt-2 pb-3 border-b border-gray-100">
            {navLinks.map((link) =>
              link.isVotingTrigger ? (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenVoting();
                  }}
                  className="text-left text-sm font-bold text-[#800020] py-1.5 px-3 rounded-md hover:bg-[#FFF0F2]"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-gray-800 hover:text-[#800020] py-1.5 px-3 rounded-md hover:bg-[#FFF0F2]"
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          <div className="pt-2">
            {userSession ? (
              <div className="space-y-3">
                <div className="p-3 bg-[#FFF0F2] rounded-xl border border-[#F7D4D9]">
                  <p className="text-xs font-bold text-[#800020]">{userSession.name}</p>
                  <p className="text-xs text-gray-600">NIM: {userSession.nim}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenVoting();
                    }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#800020] text-white text-center"
                  >
                    Buka Halaman Voting
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-800 text-white flex items-center justify-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-3 rounded-xl text-sm font-bold bg-[#800020] text-white text-center flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Log In NIM Mahasiswa
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
