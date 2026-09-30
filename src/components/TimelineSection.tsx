'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TimelineStep } from '@/types/pemira';
import { TIMELINE_DATA } from '@/lib/data';
import { Calendar, Sparkles } from 'lucide-react';

interface TimelineSectionProps {
  steps?: TimelineStep[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ steps }) => {
  const timelineData = steps && steps.length > 0 ? steps : TIMELINE_DATA;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.85); // Default fill for preview

  // Dynamic Scroll Progress Calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far section has scrolled past viewport center
      const totalDistance = rect.height + windowHeight;
      const currentPos = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, currentPos / totalDistance));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Split steps into Top Row (Steps 1-3) and Bottom Row (Steps 4-6)
  const topRowSteps = timelineData.slice(0, 3);
  const bottomRowSteps = timelineData.slice(3, 6);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#FAF7F5] via-[#FFF0F2]/40 to-[#FAF7F5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
      
          <h2 className="text-3xl sm:text-4xl font-black text-[#800020] tracking-tight">
            Timeline Acara <span className="text-[#212529]">Pemira 2026</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Tahapan dan urutan jadwal resmi pelaksanaan Pemilihan Raya Ketua Himpunan & Komando Angkatan.
          </p>
        </div>

        {/* Timeline Container Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-12 border border-[#F7D4D9] shadow-2xl relative overflow-hidden">
          
          {/* ======================================================== */}
          {/* DESKTOP SNAKE / WINDING PATHWAY LAYOUT (lg & above)      */}
          {/* ======================================================== */}
          <div className="hidden lg:block relative h-[380px] w-full my-4">
            
            {/* SVG Interactive Snake Path */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 1000 320"
              preserveAspectRatio="none"
            >
              {/* Background Path (Gray/Light Pink Track) */}
              <path
                d="M 166 100 L 834 100 A 60 60 0 0 1 834 220 L 166 220"
                fill="none"
                stroke="#F7D4D9"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Animated Maroon Progress Line */}
              <path
                d="M 166 100 L 834 100 A 60 60 0 0 1 834 220 L 166 220"
                fill="none"
                stroke="#800020"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="1600"
                strokeDashoffset={1600 * (1 - scrollProgress)}
                className="transition-all duration-300 ease-out"
              />
            </svg>

            {/* TOP ROW STEPS (Steps 1 to 3) - Centered at Y = 31.25% (Y=100 in 320 viewBox) */}
            <div className="absolute top-[31.25%] -translate-y-1/2 left-0 right-0 grid grid-cols-3 z-10">
              {topRowSteps.map((step) => {
                const isActive = step.status === 'active';

                return (
                  <div
                    key={step.stepNumber}
                    className="flex flex-col items-center justify-center relative group"
                  >
                    {/* Content Block (Positioned ABOVE Step Box) */}
                    <div className="absolute bottom-[100%] mb-3 flex flex-col items-center text-center w-full px-2">
                      <h4 className="text-sm sm:text-base font-extrabold text-[#212529] group-hover:text-[#800020] transition-colors leading-snug">
                        {step.title}
                      </h4>
                      
                      <p className="text-xs font-semibold text-gray-500 inline-flex items-center gap-1.5 bg-[#FFF0F2]/80 px-3 py-1 mt-1 rounded-full border border-[#F7D4D9]">
                        <Calendar className="w-3.5 h-3.5 text-[#800020]" />
                        <span>{step.dateRange}</span>
                      </p>
                    </div>

                    {/* Step Indicator Node (Square Maroon Box with Number only) */}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-300 shadow-xl border-2 border-white relative z-10 ${
                        isActive
                          ? 'bg-[#800020] text-white ring-4 ring-pink-400 scale-110 shadow-pink-900/40'
                          : 'bg-[#800020] text-white shadow-md'
                      }`}
                    >
                      <span className="leading-none">{step.stepNumber}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTTOM ROW STEPS (Steps 4 to 6) - Centered at Y = 68.75% (Y=220 in 320 viewBox) */}
            <div className="absolute top-[68.75%] -translate-y-1/2 left-0 right-0 grid grid-cols-3 z-10">
              {[...bottomRowSteps].reverse().map((step) => {
                const isActive = step.status === 'active';

                return (
                  <div
                    key={step.stepNumber}
                    className="flex flex-col items-center justify-center relative group"
                  >
                    {/* Step Indicator Node (Square Maroon Box with Number only) */}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-300 shadow-xl border-2 border-white relative z-10 ${
                        isActive
                          ? 'bg-[#800020] text-white ring-4 ring-pink-400 scale-110 shadow-pink-900/40'
                          : 'bg-[#800020] text-white shadow-md'
                      }`}
                    >
                      <span className="leading-none">{step.stepNumber}</span>
                    </div>

                    {/* Content Block (Positioned BELOW Step Box) */}
                    <div className="absolute top-[100%] mt-3 flex flex-col items-center text-center w-full px-2">
                      <h4 className="text-sm sm:text-base font-extrabold text-[#212529] group-hover:text-[#800020] transition-colors leading-snug">
                        {step.title}
                      </h4>

                      <p className="text-xs font-semibold text-gray-500 inline-flex items-center gap-1.5 bg-[#FFF0F2]/80 px-3 py-1 mt-1 rounded-full border border-[#F7D4D9]">
                        <Calendar className="w-3.5 h-3.5 text-[#800020]" />
                        <span>{step.dateRange}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ======================================================== */}
          {/* MOBILE & TABLET LAYOUT (< lg screen)                     */}
          {/* ======================================================== */}
          <div className="lg:hidden space-y-6 relative">
            {/* Vertical Maroon Progress Line */}
            <div className="absolute top-4 bottom-4 left-7 w-1 bg-gradient-to-b from-[#800020] via-[#800020] to-gray-200 z-0 rounded-full" />

            {timelineData.map((step) => {
              const isActive = step.status === 'active';

              return (
                <div
                  key={step.stepNumber}
                  className="flex items-start gap-4 relative z-10 group"
                >
                  {/* Square Maroon Step Box */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-lg transition-all duration-300 shadow-md border-2 border-white ${
                      isActive
                        ? 'bg-[#800020] text-white ring-4 ring-pink-300 scale-105 shadow-lg shadow-[#800020]/30'
                        : 'bg-[#800020] text-white'
                    }`}
                  >
                    <span>{step.stepNumber}</span>
                  </div>

                  {/* Step Info Content Box */}
                  <div className="bg-[#FFF0F2]/60 rounded-2xl p-4 border border-[#F7D4D9] flex-1 space-y-2 hover:bg-[#FFF0F2] transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-extrabold text-[#800020]">
                        {step.title}
                      </h4>
                      <span className="text-xs font-semibold text-gray-500 inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#800020]" />
                        {step.dateRange}
                      </span>
                    </div>

                    {step.description && (
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
