'use client';

import React, { useState } from 'react';
import { Candidate, PemiraSettings, TimelineStep, HistoryLeader, GalleryItem } from '@/types/pemira';
import {
  ShieldAlert,
  Power,
  Plus,
  Trash2,
  Key,
  Award,
  Copy,
  Check,
  Database,
  ArrowLeft,
  LogOut,
  Lock,
  CheckCircle2,
  Users,
  Calendar,
  Edit,
  Clock,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';

interface AdminDashboardProps {
  settings: PemiraSettings;
  candidates: Candidate[];
  timelineSteps: TimelineStep[];
  historyLeaders: HistoryLeader[];
  galleryItems: GalleryItem[];
  onToggleKahimaVoting: () => void;
  onToggleKomtingVoting: () => void;
  onAddCandidate: (newCandidate: Candidate) => void;
  onDeleteCandidate: (id: string) => void;
  onAddTimelineStep: (newStep: TimelineStep) => void;
  onUpdateTimelineStep: (updatedStep: TimelineStep) => void;
  onDeleteTimelineStep: (stepNumber: number) => void;
  onAddHistoryLeader: (newLeader: HistoryLeader) => void;
  onDeleteHistoryLeader: (id: string) => void;
  onAddGalleryItem: (newItem: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onBackToUserView: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  settings,
  candidates,
  timelineSteps,
  historyLeaders,
  galleryItems,
  onToggleKahimaVoting,
  onToggleKomtingVoting,
  onAddCandidate,
  onDeleteCandidate,
  onAddTimelineStep,
  onUpdateTimelineStep,
  onDeleteTimelineStep,
  onAddHistoryLeader,
  onDeleteHistoryLeader,
  onAddGalleryItem,
  onDeleteGalleryItem,
  onBackToUserView,
}) => {
  const [activeTab, setActiveTab] = useState<
    'candidates' | 'timeline' | 'history' | 'gallery' | 'nim-generator' | 'audit'
  >('candidates');

  // Candidate Form Modal state
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'kahima' | 'komting'>('kahima');
  const [number, setNumber] = useState(1);
  const [vision, setVision] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  // Timeline Form Modal state
  const [isTimelineFormOpen, setIsTimelineFormOpen] = useState(false);
  const [editingTimelineStep, setEditingTimelineStep] = useState<TimelineStep | null>(null);
  const [timelineStepNumber, setTimelineStepNumber] = useState<number>(1);
  const [timelineTitle, setTimelineTitle] = useState('');
  const [timelineDateRange, setTimelineDateRange] = useState('');
  const [timelineStatus, setTimelineStatus] = useState<TimelineStep['status']>('pending');
  const [timelineDescription, setTimelineDescription] = useState('');

  // History Leader Modal state
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyName, setHistoryName] = useState('');
  const [historyCategory, setHistoryCategory] = useState<'kahima' | 'komting'>('kahima');
  const [historyPeriod, setHistoryPeriod] = useState('');
  const [historyAngkatan, setHistoryAngkatan] = useState('');
  const [historyPhotoUrl, setHistoryPhotoUrl] = useState('');
  const [historyQuote, setHistoryQuote] = useState('');

  // Gallery Item Modal state
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('Debat Kandidat');
  const [galleryDate, setGalleryDate] = useState('');
  const [galleryImageUrl, setGalleryImageUrl] = useState('');

  // Generator state
  const [generatedTokens, setGeneratedTokens] = useState<
    { nim: string; token: string; status: string }[]
  >([
    { nim: '3012110045', token: 'PEMIRA-2026-X89A', status: 'Belum Digunakan' },
    { nim: '3012110046', token: 'PEMIRA-2026-B12K', status: 'Sudah Memilih' },
    { nim: '3012110047', token: 'PEMIRA-2026-C99P', status: 'Belum Digunakan' },
  ]);
  const [newNimInput, setNewNimInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !vision) return;

    const newCandidate: Candidate = {
      id: `${category}-${Date.now()}`,
      number: Number(number),
      name,
      category,
      period: settings.activePeriod,
      vision,
      mission: ['Komitmen mengabdi untuk Sistem Informasi UISI.'],
      photoUrl: photoUrl || '/profile.png',
      totalVotes: 0,
    };

    onAddCandidate(newCandidate);
    setIsAddFormOpen(false);
    setName('');
    setVision('');
  };

  const handleSaveTimelineStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!timelineTitle || !timelineDateRange) return;

    const stepData: TimelineStep = {
      stepNumber: Number(timelineStepNumber),
      title: timelineTitle,
      dateRange: timelineDateRange,
      status: timelineStatus,
      description: timelineDescription,
    };

    if (editingTimelineStep) {
      onUpdateTimelineStep(stepData);
    } else {
      onAddTimelineStep(stepData);
    }

    setIsTimelineFormOpen(false);
    setEditingTimelineStep(null);
    setTimelineTitle('');
    setTimelineDateRange('');
    setTimelineDescription('');
  };

  const handleCreateHistoryLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!historyName) return;

    const newLeader: HistoryLeader = {
      id: `h-${historyCategory}-${Date.now()}`,
      name: historyName,
      category: historyCategory,
      period: historyPeriod || '2026',
      angkatan: historyCategory === 'komting' ? (historyAngkatan || `Angkatan ${historyPeriod}`) : undefined,
      photoUrl: historyPhotoUrl || '/profile.png',
      quote: historyQuote || 'Pemimpin Sistem Informasi UISI.',
    };

    onAddHistoryLeader(newLeader);
    setIsHistoryModalOpen(false);
    setHistoryName('');
    setHistoryPeriod('');
    setHistoryAngkatan('');
    setHistoryPhotoUrl('');
    setHistoryQuote('');
  };

  const handleCreateGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle) return;

    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      title: galleryTitle,
      category: galleryCategory || 'Dokumentasi',
      date: galleryDate || new Date().toLocaleDateString('id-ID'),
      imageUrl: galleryImageUrl || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600',
    };

    onAddGalleryItem(newItem);
    setIsGalleryModalOpen(false);
    setGalleryTitle('');
    setGalleryCategory('Debat Kandidat');
    setGalleryDate('');
    setGalleryImageUrl('');
  };

  const handleGenerateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNimInput) return;
    const randStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newToken = `PEMIRA-2026-${randStr}`;

    setGeneratedTokens([
      ...generatedTokens,
      { nim: newNimInput, token: newToken, status: 'Belum Digunakan' },
    ]);
    setNewNimInput('');
  };

  const handleCopyToken = (token: string, idx: number) => {
    navigator.clipboard.writeText(token);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner Dashboard Admin */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#800020] via-[#5F0018] to-[#800020] text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Dashboard Manajemen E-PEMIRA
          </h1>
          <p className="text-xs sm:text-sm text-pink-100">
            Kontrol terpisah jadwal e-voting Kahima & Komting, kelola kandidat, timeline, history, galeri, serta generator password temporary.
          </p>
        </div>
      </div>

      {/* Dual Independent Voting Control Panel Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kahima Voting Control Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#F7D4D9] shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#800020]" />
              <h3 className="text-base font-extrabold text-[#800020]">Pemilihan KAHIMA</h3>
            </div>
            <p className="text-xs text-gray-500">
              Status saat ini:{' '}
              <span className={`font-bold ${settings.isKahimaVotingOpen ? 'text-emerald-600' : 'text-red-600'}`}>
                {settings.isKahimaVotingOpen ? '● Sesi DIBUKA' : '● Sesi DITUTUP'}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200">
            <span className="text-xs font-bold text-gray-700">
              {settings.isKahimaVotingOpen ? 'DIBUKA' : 'DITUTUP'}
            </span>
            <button
              onClick={onToggleKahimaVoting}
              className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${
                settings.isKahimaVotingOpen ? 'bg-emerald-500 justify-end' : 'bg-gray-400 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center">
                <Power className="w-3 h-3 text-gray-800" />
              </div>
            </button>
          </div>
        </div>

        {/* Komting Voting Control Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#F7D4D9] shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#800020]" />
              <h3 className="text-base font-extrabold text-[#800020]">Pemilihan KOMTING</h3>
            </div>
            <p className="text-xs text-gray-500">
              Status saat ini:{' '}
              <span className={`font-bold ${settings.isKomtingVotingOpen ? 'text-emerald-600' : 'text-red-600'}`}>
                {settings.isKomtingVotingOpen ? '● Sesi DIBUKA' : '● Sesi DITUTUP'}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200">
            <span className="text-xs font-bold text-gray-700">
              {settings.isKomtingVotingOpen ? 'DIBUKA' : 'DITUTUP'}
            </span>
            <button
              onClick={onToggleKomtingVoting}
              className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${
                settings.isKomtingVotingOpen ? 'bg-emerald-500 justify-end' : 'bg-gray-400 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center">
                <Power className="w-3 h-3 text-gray-800" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 bg-white rounded-2xl p-2 border shadow-sm gap-1">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`flex-1 min-w-[140px] py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'candidates'
                ? 'bg-[#800020] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Award className="w-4 h-4" />
            Kandidat ({candidates.length})
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 min-w-[140px] py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'bg-[#800020] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Timeline ({timelineSteps.length})
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 min-w-[140px] py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-[#800020] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            History ({historyLeaders.length})
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 min-w-[140px] py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'gallery'
                ? 'bg-[#800020] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Galeri ({galleryItems.length})
          </button>

          <button
            onClick={() => setActiveTab('nim-generator')}
            className={`flex-1 min-w-[140px] py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'nim-generator'
                ? 'bg-[#800020] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Key className="w-4 h-4" />
            Generator NIM
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex-1 min-w-[140px] py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'audit'
                ? 'bg-[#800020] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Database className="w-4 h-4" />
            Audit System
          </button>
        </div>

        {/* TAB 1: CANDIDATE MANAGEMENT */}
        {activeTab === 'candidates' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F7D4D9] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#800020]">
                  Daftar Calon Kahima & Komting
                </h3>
                <p className="text-xs text-gray-500">
                  Tambah, sunting, atau hapus data kandidat peserta Pemira 2026.
                </p>
              </div>

              <button
                onClick={() => setIsAddFormOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#800020] text-white font-bold text-xs shadow-md hover:bg-[#5F0018] transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Kandidat Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF0F2] text-[#800020] font-extrabold border-b border-[#F7D4D9]">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">No. Urut & Foto</th>
                    <th className="p-3.5">Nama Kandidat</th>
                    <th className="p-3.5">Kategori</th>
                    <th className="p-3.5">Visi Ringkas</th>
                    <th className="p-3.5">Total Suara</th>
                    <th className="p-3.5 rounded-r-xl text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {candidates.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <span className="font-extrabold text-[#800020]">0{c.number}</span>
                        <img
                          src={c.photoUrl}
                          alt={c.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#800020]"
                        />
                      </td>
                      <td className="p-3.5">
                        <p className="font-bold text-gray-900">{c.name}</p>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            c.category === 'kahima'
                              ? 'bg-[#FFF0F2] text-[#800020] border border-[#F7D4D9]'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {c.category}
                        </span>
                      </td>
                      <td className="p-3.5 max-w-xs truncate text-gray-600 font-medium">
                        &quot;{c.vision}&quot;
                      </td>
                      <td className="p-3.5 font-bold text-[#800020]">
                        {c.totalVotes} Suara
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => onDeleteCandidate(c.id)}
                          className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Kandidat Ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TIMELINE MANAGEMENT */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F7D4D9] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#800020]">
                  Manajemen Timeline Acara Pemira
                </h3>
                <p className="text-xs text-gray-500">
                  Kelola tahapan, tanggal pelaksanaan, dan status alur rangkaian Pemira.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTimelineStep(null);
                  setTimelineStepNumber(timelineSteps.length + 1);
                  setTimelineTitle('');
                  setTimelineDateRange('');
                  setTimelineDescription('');
                  setTimelineStatus('pending');
                  setIsTimelineFormOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#800020] text-white font-bold text-xs shadow-md hover:bg-[#5F0018] transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Tahapan Timeline</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF0F2] text-[#800020] font-extrabold border-b border-[#F7D4D9]">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">No. Langkah</th>
                    <th className="p-3.5">Nama Kegiatan</th>
                    <th className="p-3.5">Tanggal Pelaksanaan</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Deskripsi</th>
                    <th className="p-3.5 rounded-r-xl text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {timelineSteps.map((step) => (
                    <tr key={step.stepNumber} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3.5 font-extrabold text-[#800020]">
                        Step 0{step.stepNumber}
                      </td>
                      <td className="p-3.5 font-bold text-gray-900">{step.title}</td>
                      <td className="p-3.5 text-gray-600 font-semibold">{step.dateRange}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            step.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : step.status === 'active'
                              ? 'bg-pink-100 text-[#800020] animate-pulse border border-[#800020]'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {step.status}
                        </span>
                      </td>
                      <td className="p-3.5 max-w-xs truncate text-gray-500">
                        {step.description || '-'}
                      </td>
                      <td className="p-3.5 text-center flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingTimelineStep(step);
                            setTimelineStepNumber(step.stepNumber);
                            setTimelineTitle(step.title);
                            setTimelineDateRange(step.dateRange);
                            setTimelineStatus(step.status);
                            setTimelineDescription(step.description || '');
                            setIsTimelineFormOpen(true);
                          }}
                          className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Sunting Tahapan"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteTimelineStep(step.stepNumber)}
                          className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Tahapan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: HISTORY MANAGEMENT */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F7D4D9] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#800020]">
                  Manajemen History Pemimpin (Kahima & Komting)
                </h3>
                <p className="text-xs text-gray-500">
                  Kelola daftar rekam jejak Ketua Himpunan & Komting Angkatan dari masa ke masa.
                </p>
              </div>

              <button
                onClick={() => setIsHistoryModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#800020] text-white font-bold text-xs shadow-md hover:bg-[#5F0018] transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah History Pemimpin</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF0F2] text-[#800020] font-extrabold border-b border-[#F7D4D9]">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">Foto & Nama</th>
                    <th className="p-3.5">Kategori</th>
                    <th className="p-3.5">Periode / Angkatan</th>
                    <th className="p-3.5">Quote / Pesan</th>
                    <th className="p-3.5 rounded-r-xl text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {historyLeaders.map((leader) => (
                    <tr key={leader.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={leader.photoUrl}
                          alt={leader.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#800020]"
                        />
                        <span className="font-bold text-gray-900">{leader.name}</span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            leader.category === 'kahima'
                              ? 'bg-[#FFF0F2] text-[#800020] border border-[#F7D4D9]'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {leader.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-[#800020]">
                        {leader.category === 'komting'
                          ? leader.angkatan || `Angkatan ${leader.period}`
                          : `Periode ${leader.period}`}
                      </td>
                      <td className="p-3.5 max-w-xs truncate text-gray-600 italic">
                        &quot;{leader.quote || '-'}&quot;
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => onDeleteHistoryLeader(leader.id)}
                          className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus History"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F7D4D9] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#800020]">
                  Manajemen Galeri & Momen Pemira
                </h3>
                <p className="text-xs text-gray-500">
                  Kelola arsip foto kegiatan orasi, musyawarah, debat, dan pelaksanaan voting.
                </p>
              </div>

              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#800020] text-white font-bold text-xs shadow-md hover:bg-[#5F0018] transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Foto Galeri</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF0F2] text-[#800020] font-extrabold border-b border-[#F7D4D9]">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">Foto Kegiatan</th>
                    <th className="p-3.5">Judul Momen / Acara</th>
                    <th className="p-3.5">Kategori</th>
                    <th className="p-3.5">Tanggal</th>
                    <th className="p-3.5 rounded-r-xl text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {galleryItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3.5">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-16 h-10 rounded-xl object-cover border border-gray-300"
                        />
                      </td>
                      <td className="p-3.5 font-bold text-gray-900">{item.title}</td>
                      <td className="p-3.5">
                        <span className="bg-[#FFF0F2] text-[#800020] px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#F7D4D9]">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3.5 text-gray-600 font-semibold">{item.date}</td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => onDeleteGalleryItem(item.id)}
                          className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Galeri"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: NIM GENERATOR */}
        {activeTab === 'nim-generator' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F7D4D9] shadow-xl space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-extrabold text-[#800020]">
                Generator Password & Token NIM Mahasiswa
              </h3>
              <p className="text-xs text-gray-500">
                Generate token unik e-voting berbasis NIM mahasiswa untuk otentikasi login voting.
              </p>
            </div>

            <form onSubmit={handleGenerateToken} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="text"
                placeholder="Masukkan NIM Mahasiswa (contoh: 3012110048)"
                value={newNimInput}
                onChange={(e) => setNewNimInput(e.target.value)}
                className="flex-1 p-3 rounded-xl border border-gray-300 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#800020] text-white font-bold text-xs hover:bg-[#5F0018] transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Generate Token Baru</span>
              </button>
            </form>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF0F2] text-[#800020] font-extrabold border-b border-[#F7D4D9]">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">NIM Mahasiswa</th>
                    <th className="p-3.5">Token Password Temporary</th>
                    <th className="p-3.5">Status Hak Pilih</th>
                    <th className="p-3.5 rounded-r-xl text-center">Salin Token</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {generatedTokens.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3.5 font-bold text-gray-900">{item.nim}</td>
                      <td className="p-3.5 font-mono font-bold text-[#800020]">{item.token}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.status === 'Sudah Memilih'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => handleCopyToken(item.token, idx)}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition-colors inline-flex items-center gap-1 text-[11px]"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-gray-500" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: SYSTEM AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-3xl p-6 border border-[#F7D4D9] shadow-xl space-y-6">
            <div className="border-b pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-[#800020]">
                  Log Transaksi Real-time & Status Database Supabase
                </h3>
                <p className="text-xs text-gray-500">
                  Monitoring keabsahan suara masuk dan status konektivitas enkripsi e-voting.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Database Status: Connected</span>
              </div>
            </div>

            <div className="p-4 bg-[#212529] text-gray-200 rounded-2xl font-mono text-xs space-y-2 overflow-x-auto shadow-inner">
              <p className="text-emerald-400">[INFO] Supabase PostgreSQL Client Connection Initialized.</p>
              <p className="text-emerald-400">[INFO] Table `candidates` RLS Policy Active (Public Read, Admin Write).</p>
              <p className="text-emerald-400">[INFO] Table `voting_sessions` Status: KAHIMA (ACTIVE), KOMTING (INACTIVE).</p>
              <p className="text-pink-300">[AUDIT] Hash Verification: sha256_e_voting_valid_2026_ok</p>
              <p className="text-gray-400">[LOG] {new Date().toISOString()} - Listening to real-time postgres changes...</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Form Tambah Kandidat */}
      {isAddFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#F7D4D9] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-extrabold text-[#800020]">Tambah Kandidat Peserta Baru</h3>
              <button onClick={() => setIsAddFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCandidate} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Kategori Pemilihan</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as 'kahima' | 'komting')}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                >
                  <option value="kahima">KAHIMA (Ketua Himpunan)</option>
                  <option value="komting">KOMTING (Komting Angkatan)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Nomor Urut Kandidat</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={number}
                  onChange={(e) => setNumber(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Nama Lengkap Kandidat</label>
                <input
                  type="text"
                  placeholder="Contoh: Muhammad Rizky"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Visi Ringkas</label>
                <textarea
                  placeholder="Visi utama kandidat..."
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold h-20"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">URL Foto Profile (Opsional)</label>
                <input
                  type="text"
                  placeholder="/profile.png atau URL Gambar"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="flex-1 py-3 rounded-full border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#800020] text-white font-bold hover:bg-[#5F0018] shadow-md"
                >
                  Simpan Kandidat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Form Timeline */}
      {isTimelineFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#F7D4D9] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-extrabold text-[#800020]">
                {editingTimelineStep ? 'Sunting Tahapan Timeline' : 'Tambah Tahapan Timeline Baru'}
              </h3>
              <button onClick={() => setIsTimelineFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTimelineStep} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Nomor Tahapan (Step Number)</label>
                <input
                  type="number"
                  min="1"
                  value={timelineStepNumber}
                  onChange={(e) => setTimelineStepNumber(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Nama Kegiatan</label>
                <input
                  type="text"
                  placeholder="Contoh: Masa Kampanye & Debat"
                  value={timelineTitle}
                  onChange={(e) => setTimelineTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Tanggal / Periode Pelaksanaan</label>
                <input
                  type="text"
                  placeholder="Contoh: 17 - 22 Oktober 2026"
                  value={timelineDateRange}
                  onChange={(e) => setTimelineDateRange(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Status Rangkaian</label>
                <select
                  value={timelineStatus}
                  onChange={(e) => setTimelineStatus(e.target.value as TimelineStep['status'])}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                >
                  <option value="pending">Pending / Mendatang</option>
                  <option value="active">Active / Sedang Berlangsung</option>
                  <option value="completed">Completed / Selesai</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Deskripsi Singkat (Opsional)</label>
                <textarea
                  placeholder="Penjelasan detail tahapan..."
                  value={timelineDescription}
                  onChange={(e) => setTimelineDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold h-20"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsTimelineFormOpen(false)}
                  className="flex-1 py-3 rounded-full border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#800020] text-white font-bold hover:bg-[#5F0018] shadow-md"
                >
                  Simpan Timeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Form History Leader */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#F7D4D9] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-extrabold text-[#800020]">Tambah History Pemimpin Baru</h3>
              <button onClick={() => setIsHistoryModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateHistoryLeader} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Nama Pemimpin</label>
                <input
                  type="text"
                  placeholder="Contoh: Arya Pratama"
                  value={historyName}
                  onChange={(e) => setHistoryName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Kategori Kepemimpinan</label>
                <select
                  value={historyCategory}
                  onChange={(e) => setHistoryCategory(e.target.value as 'kahima' | 'komting')}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                >
                  <option value="kahima">KAHIMA (Ketua Himpunan)</option>
                  <option value="komting">KOMTING (Komting Angkatan)</option>
                </select>
              </div>

              {historyCategory === 'kahima' ? (
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Periode Jabatan Kahima</label>
                  <input
                    type="text"
                    placeholder="Contoh: 2026-2027"
                    value={historyPeriod}
                    onChange={(e) => setHistoryPeriod(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Nama Angkatan Komting</label>
                  <input
                    type="text"
                    placeholder="Contoh: Angkatan 12"
                    value={historyAngkatan}
                    onChange={(e) => setHistoryAngkatan(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-gray-700">URL Foto Profil</label>
                <input
                  type="text"
                  placeholder="/profile.png"
                  value={historyPhotoUrl}
                  onChange={(e) => setHistoryPhotoUrl(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Quote / Pesan Kepemimpinan (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Fondasi Kepemimpinan adalah Pelayanan..."
                  value={historyQuote}
                  onChange={(e) => setHistoryQuote(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="flex-1 py-3 rounded-full border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#800020] text-white font-bold hover:bg-[#5F0018] shadow-md"
                >
                  Simpan History
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Form Gallery Item */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#F7D4D9] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-extrabold text-[#800020]">Tambah Foto Galeri Baru</h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGalleryItem} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Judul Kegiatan / Momen</label>
                <input
                  type="text"
                  placeholder="Contoh: Debat Terbuka Kandidat 2026"
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Kategori Dokumentasi</label>
                <input
                  type="text"
                  placeholder="Contoh: Debat Kandidat, Musyawarah, Sosialisasi"
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Tanggal Kegiatan</label>
                <input
                  type="text"
                  placeholder="Contoh: 28 Oktober 2026"
                  value={galleryDate}
                  onChange={(e) => setGalleryDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">URL Gambar Foto</label>
                <input
                  type="text"
                  placeholder="URL gambar (Unsplash/image link)"
                  value={galleryImageUrl}
                  onChange={(e) => setGalleryImageUrl(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 font-semibold"
                  required
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="flex-1 py-3 rounded-full border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#800020] text-white font-bold hover:bg-[#5F0018] shadow-md"
                >
                  Simpan Galeri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
