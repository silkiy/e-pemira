import { createClient } from './client';
import {
  Candidate,
  CandidateCategory,
  PemiraSettings,
  TimelineStep,
  HistoryLeader,
  GalleryItem,
  UserSession,
} from '@/types/pemira';
import {
  INITIAL_CANDIDATES,
  INITIAL_SETTINGS,
  TIMELINE_DATA,
  HISTORY_LEADERS,
  GALLERY_DATA,
} from '@/lib/data';

/**
 * Mengambil seluruh data awal (Settings, Candidates + Live Count, Timeline, History, Gallery)
 * langsung dari database Supabase dengan fallback ke dummy data jika database kosong.
 */
export async function fetchPemiraData(): Promise<{
  settings: PemiraSettings;
  candidates: Candidate[];
  timelineSteps: TimelineStep[];
  historyLeaders: HistoryLeader[];
  galleryItems: GalleryItem[];
}> {
  const supabase = createClient();

  try {
    // 1. Fetch Settings
    const { data: settingsData } = await supabase
      .from('pemira_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    // 2. Fetch Candidates & Live Vote Counts
    const [candidatesRes, voteCountsRes] = await Promise.all([
      supabase.from('candidates').select('*').order('number', { ascending: true }),
      supabase.rpc('get_live_vote_counts'),
    ]);

    // Map candidates with their live vote counts from database
    let mappedCandidates: Candidate[] = [];
    if (candidatesRes.data && candidatesRes.data.length > 0) {
      const countsMap = new Map<string, number>();
      if (voteCountsRes.data && Array.isArray(voteCountsRes.data)) {
        voteCountsRes.data.forEach((c) => {
          countsMap.set(c.candidate_id, c.total_votes || 0);
        });
      }

      mappedCandidates = candidatesRes.data.map((row) => ({
        id: row.id,
        number: row.number,
        name: row.name,
        viceName: row.vice_name || undefined,
        category: row.category as CandidateCategory,
        period: row.period,
        angkatan: row.angkatan || undefined,
        vision: row.vision,
        mission: row.mission || [],
        photoUrl: row.photo_url || '/profile.png',
        totalVotes: countsMap.get(row.id) ?? 0,
        badge: row.badge || undefined,
      }));
    } else {
      mappedCandidates = INITIAL_CANDIDATES;
    }

    // 3. Fetch Timeline Steps
    const { data: timelineData } = await supabase
      .from('timeline_steps')
      .select('*')
      .order('step_number', { ascending: true });

    const mappedTimeline: TimelineStep[] =
      timelineData && timelineData.length > 0
        ? timelineData.map((t) => ({
            id: t.id,
            stepNumber: t.step_number,
            title: t.title,
            description: t.description || undefined,
            status: t.status as TimelineStep['status'],
            dateRange: t.date_range,
          }))
        : TIMELINE_DATA;

    // 4. Fetch History Leaders
    const { data: historyData } = await supabase
      .from('history_leaders')
      .select('*')
      .order('period', { ascending: false });

    const mappedHistory: HistoryLeader[] =
      historyData && historyData.length > 0
        ? historyData.map((h) => ({
            id: h.id,
            name: h.name,
            viceName: h.vice_name || undefined,
            category: h.category as CandidateCategory,
            period: h.period,
            angkatan: h.angkatan || undefined,
            photoUrl: h.photo_url || '/profile.png',
            quote: h.quote || undefined,
          }))
        : HISTORY_LEADERS;

    // 5. Fetch Gallery Items
    const { data: galleryData } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false });

    const mappedGallery: GalleryItem[] =
      galleryData && galleryData.length > 0
        ? galleryData.map((g) => ({
            id: g.id,
            title: g.title,
            category: g.category,
            date: g.event_date,
            imageUrl: g.image_url,
          }))
        : GALLERY_DATA;

    // Calculate total votes and percentage
    const totalVotesSum = mappedCandidates.reduce((acc, c) => acc + c.totalVotes, 0);
    const totalVoters = settingsData?.total_voters ?? INITIAL_SETTINGS.totalVoters;
    const suaraMasukPercentage =
      totalVoters > 0
        ? Math.min(100, Number(((totalVotesSum / totalVoters) * 100).toFixed(1)))
        : 0;

    const mappedSettings: PemiraSettings = settingsData
      ? {
          isKahimaVotingOpen: settingsData.is_kahima_voting_open,
          isKomtingVotingOpen: settingsData.is_komting_voting_open,
          activePeriod: settingsData.active_period,
          totalVoters: settingsData.total_voters,
          suaraMasukPercentage: suaraMasukPercentage || INITIAL_SETTINGS.suaraMasukPercentage,
        }
      : INITIAL_SETTINGS;

    return {
      settings: mappedSettings,
      candidates: mappedCandidates,
      timelineSteps: mappedTimeline,
      historyLeaders: mappedHistory,
      galleryItems: mappedGallery,
    };
  } catch (error) {
    console.error('Error fetching Pemira data from Supabase:', error);
    return {
      settings: INITIAL_SETTINGS,
      candidates: INITIAL_CANDIDATES,
      timelineSteps: TIMELINE_DATA,
      historyLeaders: HISTORY_LEADERS,
      galleryItems: GALLERY_DATA,
    };
  }
}

/**
 * Mengambil rekap vote terkini dari RPC Supabase
 */
export async function fetchLiveVoteCounts(): Promise<Record<string, number>> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_live_vote_counts');
  if (error || !data) {
    return {};
  }
  const map: Record<string, number> = {};
  data.forEach((item) => {
    map[item.candidate_id] = item.total_votes || 0;
  });
  return map;
}

/**
 * Login user (Mahasiswa / Admin) via Supabase Auth
 */
export async function loginWithNim(
  nim: string,
  passwordToken: string
): Promise<{ session: UserSession | null; error: string | null }> {
  const supabase = createClient();
  const cleanNim = nim.trim();
  const cleanPassword = passwordToken.trim();

  const email =
    cleanNim === 'admin'
      ? 'admin@pemira.internal'
      : `${cleanNim}@pemira.internal`;

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: cleanPassword,
  });

  if (authError || !authData.user) {
    let msg = 'NIM atau Password / Token tidak valid.';
    if (authError?.message?.includes('Invalid login credentials')) {
      msg = 'NIM atau Password / Token salah. Harap periksa kembali.';
    }
    return { session: null, error: msg };
  }

  // Ambil profil voter dari tabel 'voters'
  const { data: voter } = await supabase
    .from('voters')
    .select('*')
    .eq('id', authData.user.id)
    .maybeSingle();

  const role = (voter?.role as 'student' | 'admin') || (cleanNim === 'admin' ? 'admin' : 'student');
  const session: UserSession = {
    nim: voter?.nim || cleanNim,
    name: voter?.name || (role === 'admin' ? 'Panitia Pemira (Admin)' : `Mahasiswa SISFOR (${cleanNim.slice(-4)})`),
    role,
    angkatan: voter?.angkatan || '2024',
    hasVotedKahima: Boolean(voter?.has_voted_kahima),
    hasVotedKomting: Boolean(voter?.has_voted_komting),
  };

  return { session, error: null };
}

/**
 * Cek sesi login user yang sedang aktif saat ini
 */
export async function getCurrentUserSession(): Promise<UserSession | null> {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: voter } = await supabase
      .from('voters')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!voter) return null;

    return {
      nim: voter.nim,
      name: voter.name,
      role: voter.role as 'student' | 'admin',
      angkatan: voter.angkatan,
      hasVotedKahima: Boolean(voter.has_voted_kahima),
      hasVotedKomting: Boolean(voter.has_voted_komting),
    };
  } catch {
    return null;
  }
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

/**
 * Melakukan voting via RPC 'cast_vote'
 */
export async function submitVote(
  kahimaCandidateId?: string,
  komtingCandidateId?: string
): Promise<{ success: boolean; message: string }> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('cast_vote', {
    p_kahima_candidate_id: kahimaCandidateId || undefined,
    p_komting_candidate_id: komtingCandidateId || undefined,
  });

  if (error) {
    return {
      success: false,
      message: error.message || 'Gagal memproses suara. Pastikan sesi pemilihan aktif.',
    };
  }

  const res = data as { success?: boolean; message?: string } | null;
  return {
    success: res?.success ?? true,
    message: res?.message ?? 'Suara Anda berhasil dicatat dengan aman.',
  };
}

/**
 * Admin: Toggle sesi pemilihan Kahima
 */
export async function toggleKahimaVotingInDb(
  isOpen: boolean
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from('pemira_settings')
    .update({ is_kahima_voting_open: isOpen })
    .eq('id', 1);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

/**
 * Admin: Toggle sesi pemilihan Komting
 */
export async function toggleKomtingVotingInDb(
  isOpen: boolean
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from('pemira_settings')
    .update({ is_komting_voting_open: isOpen })
    .eq('id', 1);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true, error: null };
}

/**
 * Admin: Tambah kandidat baru ke database
 */
export async function insertCandidateDb(
  cand: Omit<Candidate, 'id' | 'totalVotes'>
): Promise<{ candidate: Candidate | null; error: string | null }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('candidates')
    .insert({
      number: cand.number,
      name: cand.name,
      vice_name: cand.viceName || null,
      category: cand.category,
      period: cand.period,
      angkatan: cand.angkatan || null,
      vision: cand.vision,
      mission: cand.mission,
      photo_url: cand.photoUrl || '/profile.png',
      badge: cand.badge || null,
    })
    .select()
    .single();

  if (error || !data) {
    return { candidate: null, error: error?.message || 'Gagal menambahkan kandidat' };
  }

  return {
    candidate: {
      id: data.id,
      number: data.number,
      name: data.name,
      viceName: data.vice_name || undefined,
      category: data.category as CandidateCategory,
      period: data.period,
      angkatan: data.angkatan || undefined,
      vision: data.vision,
      mission: data.mission || [],
      photoUrl: data.photo_url,
      totalVotes: 0,
      badge: data.badge || undefined,
    },
    error: null,
  };
}

/**
 * Admin: Hapus kandidat dari database
 */
export async function deleteCandidateDb(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from('candidates').delete().eq('id', id);
  return !error;
}

/**
 * Admin: Simpan (Insert / Update) Timeline Step
 */
export async function saveTimelineStepDb(step: TimelineStep): Promise<boolean> {
  const supabase = createClient();
  // Cek apakah step_number sudah ada
  const { data: existing } = await supabase
    .from('timeline_steps')
    .select('id')
    .eq('step_number', step.stepNumber)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from('timeline_steps')
      .update({
        title: step.title,
        date_range: step.dateRange,
        status: step.status,
        description: step.description || null,
      })
      .eq('id', existing.id);
    return !error;
  } else {
    const { error } = await supabase.from('timeline_steps').insert({
      step_number: step.stepNumber,
      title: step.title,
      date_range: step.dateRange,
      status: step.status,
      description: step.description || null,
    });
    return !error;
  }
}

/**
 * Admin: Hapus Timeline Step
 */
export async function deleteTimelineStepDb(stepNumber: number): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from('timeline_steps').delete().eq('step_number', stepNumber);
  return !error;
}

/**
 * Admin: Tambah History Leader
 */
export async function insertHistoryLeaderDb(leader: Omit<HistoryLeader, 'id'>): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from('history_leaders').insert({
    name: leader.name,
    vice_name: leader.viceName || null,
    category: leader.category,
    period: leader.period,
    angkatan: leader.angkatan || null,
    photo_url: leader.photoUrl || '/profile.png',
    quote: leader.quote || null,
  });
  return !error;
}

/**
 * Admin: Hapus History Leader
 */
export async function deleteHistoryLeaderDb(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from('history_leaders').delete().eq('id', id);
  return !error;
}

/**
 * Admin: Tambah Gallery Item
 */
export async function insertGalleryItemDb(item: Omit<GalleryItem, 'id'>): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from('gallery_items').insert({
    title: item.title,
    category: item.category,
    event_date: item.date,
    image_url: item.imageUrl,
  });
  return !error;
}

/**
 * Admin: Hapus Gallery Item
 */
export async function deleteGalleryItemDb(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from('gallery_items').delete().eq('id', id);
  return !error;
}
