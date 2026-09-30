'use client';

import React, { useState } from 'react';
import { GALLERY_DATA } from '@/lib/data';
import { GalleryItem } from '@/types/pemira';
import { Image as ImageIcon, Calendar, Maximize2, X } from 'lucide-react';

interface GallerySectionProps {
  items?: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const galleryList = items && items.length > 0 ? items : GALLERY_DATA;
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <section id="galeri" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0F2] text-[#800020] text-xs font-bold border border-[#F7D4D9]">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Dokumentasi Kegiatan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#800020] tracking-tight">
            Galeri <span className="text-[#212529]">& Momen Pemira</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Arsip foto pelaksanaan orasi, musyawarah besar, debat terbuka kandidat, hingga perhitungan suara Pemira Sistem Informasi.
          </p>
        </div>

        {/* Responsive 3x2 Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryList.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-64 rounded-3xl overflow-hidden border border-[#F7D4D9] shadow-md hover:shadow-2xl hover:border-[#800020]/50 transition-all duration-500 cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover Dark Overlay & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 p-6 flex flex-col justify-end text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#800020] text-pink-100 px-2.5 py-1 rounded-full border border-pink-400/30">
                    {item.category}
                  </span>
                  <Maximize2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                </div>

                <h3 className="text-base font-extrabold line-clamp-2 text-white group-hover:text-pink-100 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-300 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-pink-300" />
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal View */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#800020] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-white space-y-2">
              <span className="text-xs font-bold text-[#800020] bg-[#FFF0F2] px-3 py-1 rounded-full border border-[#F7D4D9]">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{selectedImage.title}</h3>
              <p className="text-xs text-gray-500 font-medium">Tanggal: {selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
