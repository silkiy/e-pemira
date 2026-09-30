'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TimelineSection } from '@/components/TimelineSection';
import { VotingGuideSection } from '@/components/VotingGuideSection';
import { HistorySection } from '@/components/HistorySection';
import { GallerySection } from '@/components/GallerySection';
import { LiveCountSection } from '@/components/LiveCountSection';
import { Footer } from '@/components/Footer';
import { LoginModal } from '@/components/LoginModal';
import { VotingModal } from '@/components/VotingModal';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Candidate, PemiraSettings, UserSession, TimelineStep, HistoryLeader, GalleryItem } from '@/types/pemira';
import { INITIAL_CANDIDATES, INITIAL_SETTINGS, TIMELINE_DATA, HISTORY_LEADERS, GALLERY_DATA } from '@/lib/data';

export default function Home() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [settings, setSettings] = useState<PemiraSettings>(INITIAL_SETTINGS);
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>(TIMELINE_DATA);
  const [historyLeaders, setHistoryLeaders] = useState<HistoryLeader[]>(HISTORY_LEADERS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_DATA);

  // Auth Handlers
  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    if (session.role === 'admin') {
      setIsAdminMode(true);
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    setIsAdminMode(false);
  };

  // Open Voting Trigger
  const handleOpenVotingTrigger = () => {
    if (!userSession) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsVotingModalOpen(true);
  };

  // Voting Vote Action Handler
  const handleVoteCast = (kahimaId?: string, komtingId?: string) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((c) => {
        if (c.id === kahimaId || c.id === komtingId) {
          return { ...c, totalVotes: c.totalVotes + 1 };
        }
        return c;
      })
    );

    if (userSession) {
      setUserSession({
        ...userSession,
        hasVotedKahima: kahimaId ? true : userSession.hasVotedKahima,
        hasVotedKomting: komtingId ? true : userSession.hasVotedKomting,
        votedKahimaCandidateId: kahimaId || userSession.votedKahimaCandidateId,
        votedKomtingCandidateId: komtingId || userSession.votedKomtingCandidateId,
      });
    }

    // Increment settings
    setSettings((prev) => ({
      ...prev,
      suaraMasukPercentage: Math.min(100, Number((prev.suaraMasukPercentage + 0.4).toFixed(1))),
    }));
  };

  // Admin Actions for Independent Voting Sessions
  const handleToggleKahimaVoting = () => {
    setSettings((prev) => ({ ...prev, isKahimaVotingOpen: !prev.isKahimaVotingOpen }));
  };

  const handleToggleKomtingVoting = () => {
    setSettings((prev) => ({ ...prev, isKomtingVotingOpen: !prev.isKomtingVotingOpen }));
  };

  const handleAddCandidate = (newCand: Candidate) => {
    setCandidates((prev) => [...prev, newCand]);
  };

  const handleDeleteCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  // Admin Actions for Timeline Steps
  const handleAddTimelineStep = (newStep: TimelineStep) => {
    setTimelineSteps((prev) =>
      [...prev, newStep].sort((a, b) => a.stepNumber - b.stepNumber)
    );
  };

  const handleUpdateTimelineStep = (updatedStep: TimelineStep) => {
    setTimelineSteps((prev) =>
      prev.map((step) => (step.stepNumber === updatedStep.stepNumber ? updatedStep : step))
    );
  };

  const handleDeleteTimelineStep = (stepNumber: number) => {
    setTimelineSteps((prev) => prev.filter((step) => step.stepNumber !== stepNumber));
  };

  // Admin Actions for History Leaders
  const handleAddHistoryLeader = (newLeader: HistoryLeader) => {
    setHistoryLeaders((prev) => [newLeader, ...prev]);
  };

  const handleDeleteHistoryLeader = (id: string) => {
    setHistoryLeaders((prev) => prev.filter((h) => h.id !== id));
  };

  // Admin Actions for Gallery Items
  const handleAddGalleryItem = (newItem: GalleryItem) => {
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF7F5] text-[#212529]">
      {/* Navigation Bar */}
      <Header
        userSession={userSession}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenVoting={handleOpenVotingTrigger}
      />

      {/* Main Content Area: Admin View vs Student Landing View */}
      {isAdminMode ? (
        <main className="flex-grow">
          <AdminDashboard
            settings={settings}
            candidates={candidates}
            timelineSteps={timelineSteps}
            historyLeaders={historyLeaders}
            galleryItems={galleryItems}
            onToggleKahimaVoting={handleToggleKahimaVoting}
            onToggleKomtingVoting={handleToggleKomtingVoting}
            onAddCandidate={handleAddCandidate}
            onDeleteCandidate={handleDeleteCandidate}
            onAddTimelineStep={handleAddTimelineStep}
            onUpdateTimelineStep={handleUpdateTimelineStep}
            onDeleteTimelineStep={handleDeleteTimelineStep}
            onAddHistoryLeader={handleAddHistoryLeader}
            onDeleteHistoryLeader={handleDeleteHistoryLeader}
            onAddGalleryItem={handleAddGalleryItem}
            onDeleteGalleryItem={handleDeleteGalleryItem}
            onBackToUserView={handleLogout}
          />
        </main>
      ) : (
        <main className="flex-grow">
          <HeroSection
            onOpenVoting={handleOpenVotingTrigger}
            settings={settings}
          />
          <TimelineSection steps={timelineSteps} />
          <VotingGuideSection />
          <HistorySection leaders={historyLeaders} />
          <GallerySection items={galleryItems} />
          <LiveCountSection
            candidates={candidates}
            settings={settings}
            onOpenVoting={handleOpenVotingTrigger}
          />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <VotingModal
        isOpen={isVotingModalOpen}
        onClose={() => setIsVotingModalOpen(false)}
        userSession={userSession}
        candidates={candidates}
        settings={settings}
        onVoteCast={handleVoteCast}
      />
    </div>
  );
}
