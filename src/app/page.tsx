'use client';

import React, { useState, useEffect } from 'react';
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
import { createClient } from '@/lib/supabase/client';
import {
  fetchPemiraData,
  fetchLiveVoteCounts,
  getCurrentUserSession,
  logoutUser,
  submitVote,
  toggleKahimaVotingInDb,
  toggleKomtingVotingInDb,
  insertCandidateDb,
  deleteCandidateDb,
  saveTimelineStepDb,
  deleteTimelineStepDb,
  insertHistoryLeaderDb,
  deleteHistoryLeaderDb,
  insertGalleryItemDb,
  deleteGalleryItemDb,
} from '@/lib/supabase/api';

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

  // Load real data from Supabase on mount & check active session
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [data, session] = await Promise.all([
          fetchPemiraData(),
          getCurrentUserSession(),
        ]);
        if (!isMounted) return;

        setCandidates(data.candidates);
        setSettings(data.settings);
        setTimelineSteps(data.timelineSteps);
        setHistoryLeaders(data.historyLeaders);
        setGalleryItems(data.galleryItems);

        if (session) {
          setUserSession(session);
          if (session.role === 'admin') {
            setIsAdminMode(true);
          }
        }
      } catch (err) {
        console.error('Failed to load initial Pemira data:', err);
      }
    }

    loadData();

    // Supabase Realtime Channel
    const supabase = createClient();
    const channel = supabase
      .channel('pemira-db-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ballots' },
        async () => {
          const liveCounts = await fetchLiveVoteCounts();
          if (!isMounted) return;
          setCandidates((prev) =>
            prev.map((c) => ({
              ...c,
              totalVotes: liveCounts[c.id] ?? c.totalVotes,
            }))
          );
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pemira_settings' },
        async () => {
          const { data: updated } = await supabase
            .from('pemira_settings')
            .select('*')
            .eq('id', 1)
            .maybeSingle();
          if (!isMounted || !updated) return;
          setSettings((prev) => ({
            ...prev,
            isKahimaVotingOpen: updated.is_kahima_voting_open,
            isKomtingVotingOpen: updated.is_komting_voting_open,
            activePeriod: updated.active_period,
            totalVoters: updated.total_voters,
          }));
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Auth Handlers
  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    if (session.role === 'admin') {
      setIsAdminMode(true);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
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

  // Voting Vote Action Handler (with Supabase cast_vote RPC)
  const handleVoteCast = async (kahimaId?: string, komtingId?: string) => {
    const res = await submitVote(kahimaId, komtingId);
    if (!res.success) {
      return { success: false, message: res.message };
    }

    if (userSession) {
      setUserSession({
        ...userSession,
        hasVotedKahima: kahimaId ? true : userSession.hasVotedKahima,
        hasVotedKomting: komtingId ? true : userSession.hasVotedKomting,
        votedKahimaCandidateId: kahimaId || userSession.votedKahimaCandidateId,
        votedKomtingCandidateId: komtingId || userSession.votedKomtingCandidateId,
      });
    }

    // Refresh live counts immediately
    const liveCounts = await fetchLiveVoteCounts();
    setCandidates((prevCandidates) =>
      prevCandidates.map((c) => {
        const freshVotes = liveCounts[c.id];
        if (freshVotes !== undefined) {
          return { ...c, totalVotes: freshVotes };
        }
        if (c.id === kahimaId || c.id === komtingId) {
          return { ...c, totalVotes: c.totalVotes + 1 };
        }
        return c;
      })
    );

    return { success: true };
  };

  // Admin Actions for Independent Voting Sessions
  const handleToggleKahimaVoting = async () => {
    const nextVal = !settings.isKahimaVotingOpen;
    setSettings((prev) => ({ ...prev, isKahimaVotingOpen: nextVal }));
    await toggleKahimaVotingInDb(nextVal);
  };

  const handleToggleKomtingVoting = async () => {
    const nextVal = !settings.isKomtingVotingOpen;
    setSettings((prev) => ({ ...prev, isKomtingVotingOpen: nextVal }));
    await toggleKomtingVotingInDb(nextVal);
  };

  const handleAddCandidate = async (newCand: Candidate) => {
    const res = await insertCandidateDb(newCand);
    if (res.candidate) {
      setCandidates((prev) => [...prev, res.candidate!]);
    } else {
      setCandidates((prev) => [...prev, newCand]);
    }
  };

  const handleDeleteCandidate = async (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    await deleteCandidateDb(id);
  };

  // Admin Actions for Timeline Steps
  const handleAddTimelineStep = async (newStep: TimelineStep) => {
    setTimelineSteps((prev) =>
      [...prev, newStep].sort((a, b) => a.stepNumber - b.stepNumber)
    );
    await saveTimelineStepDb(newStep);
  };

  const handleUpdateTimelineStep = async (updatedStep: TimelineStep) => {
    setTimelineSteps((prev) =>
      prev.map((step) => (step.stepNumber === updatedStep.stepNumber ? updatedStep : step))
    );
    await saveTimelineStepDb(updatedStep);
  };

  const handleDeleteTimelineStep = async (stepNumber: number) => {
    setTimelineSteps((prev) => prev.filter((step) => step.stepNumber !== stepNumber));
    await deleteTimelineStepDb(stepNumber);
  };

  // Admin Actions for History Leaders
  const handleAddHistoryLeader = async (newLeader: HistoryLeader) => {
    setHistoryLeaders((prev) => [newLeader, ...prev]);
    await insertHistoryLeaderDb(newLeader);
  };

  const handleDeleteHistoryLeader = async (id: string) => {
    setHistoryLeaders((prev) => prev.filter((h) => h.id !== id));
    await deleteHistoryLeaderDb(id);
  };

  // Admin Actions for Gallery Items
  const handleAddGalleryItem = async (newItem: GalleryItem) => {
    setGalleryItems((prev) => [newItem, ...prev]);
    await insertGalleryItemDb(newItem);
  };

  const handleDeleteGalleryItem = async (id: string) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
    await deleteGalleryItemDb(id);
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
