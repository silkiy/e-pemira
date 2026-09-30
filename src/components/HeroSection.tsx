'use client';

import React from 'react';
import { ArrowRight, Shield, Sparkles, Vote } from 'lucide-react';
import { PemiraSettings } from '@/types/pemira';

interface HeroSectionProps {
  onOpenVoting: () => void;
  settings: PemiraSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVoting, settings }) => {
  return (
    <section id="beranda" className="relative pt-12 pb-24 md:pt-16 md:pb-36 overflow-hidden bg-[#FAF7F5]">
      {/* Connected Organic Background Wave & Pattern Layers */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/pattern.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Seamless Flowing Pink Wave Ribbon connecting to Section 2 (Timeline) */}
        <svg
          className="absolute top-0 right-0 w-[150%] sm:w-[125%] lg:w-full h-[120%] opacity-80 pointer-events-none"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Diagonal Pink Band */}
          <path
            d="M 1440 100 C 1100 220, 800 380, 500 500 C 200 620, 0 750, 0 900 L 1440 900 Z"
            fill="url(#hero-wave-flow)"
          />
          {/* Accent Upper Curve */}
          <path
            d="M 1440 220 C 1150 340, 880 480, 560 580 C 240 680, 0 800, 0 900 L 1440 900 Z"
            fill="#FFF0F2"
            fillOpacity="0.7"
          />
          <defs>
            <linearGradient id="hero-wave-flow" x1="1440" y1="0" x2="0" y2="900" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF0F2" />
              <stop offset="0.5" stopColor="#F7D4D9" stopOpacity="0.5" />
              <stop offset="1" stopColor="#FAF7F5" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#800020]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#800020] leading-[1.2]">
              Pemilihan Raya <br className="hidden sm:inline" />
              <span className="text-[#212529]">Sistem Informasi</span> <br />
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-normal">
                Universitas Internasional Semen Indonesia
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Mari gunakan hak suara mu untuk memilih pemimpin terbaik bagi masa depan Sistem Informasi Universitas Internasional Semen Indonesia secara transparan, aman, dan terpercaya.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenVoting}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#800020] hover:bg-[#5F0018] text-white font-bold text-base shadow-xl shadow-[#800020]/25 hover:shadow-2xl hover:shadow-[#800020]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group"
              >
                <Vote className="w-5 h-5 text-pink-200 group-hover:rotate-12 transition-transform" />
                <span>Ayo Voting Sekarang!</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </button>

                         </div>
          </div>

          {/* Right Column: 3D Vector Electronic Ballot Box Illustration */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFF0F2] via-[#F7D4D9]/40 to-transparent blur-2xl transform scale-110" />

              <svg
                className="w-full h-full drop-shadow-2xl overflow-visible transform hover:scale-105 transition-transform duration-500"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="250" cy="440" rx="180" ry="25" fill="#800020" fillOpacity="0.12" />

                <path
                  d="M100 220 L270 140 L400 220 L230 300 Z"
                  fill="#FFF0F2"
                  stroke="#800020"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />

                <path
                  d="M210 200 L280 167 L310 182 L240 215 Z"
                  fill="#800020"
                  stroke="#5F0018"
                  strokeWidth="3"
                />

                <path
                  d="M100 220 L230 300 V410 L100 330 Z"
                  fill="#FFFFFF"
                  stroke="#800020"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />

                <path
                  d="M230 300 L400 220 V330 L230 410 Z"
                  fill="#FAF7F5"
                  stroke="#800020"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />

                <rect x="250" y="300" width="36" height="42" rx="4" fill="#800020" />
                <path d="M260 312 L268 320 L276 312" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M260 324 L268 332 L276 324" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                <g className="animate-bounce" style={{ animationDuration: '3.5s' }}>
                  <g transform="rotate(-10 280 160)">
                    <rect x="235" y="105" width="90" height="110" rx="10" fill="#FFF0F2" stroke="#800020" strokeWidth="5" />
                    <circle cx="280" cy="150" r="18" fill="#800020"/>   
                    <path d="M272 150 L277 155 L288 143" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
