export type CandidateCategory = 'kahima' | 'komting';

export interface Candidate {
  id: string;
  number: number;
  name: string;
  viceName?: string;
  category: CandidateCategory;
  period: string; // e.g., '2026-2027'
  angkatan?: string; // e.g., '2024'
  vision: string;
  mission: string[];
  photoUrl: string;
  totalVotes: number;
  badge?: string;
}

export interface TimelineStep {
  id?: string;
  stepNumber: number;
  title: string;
  description?: string;
  status: 'completed' | 'active' | 'pending' | 'upcoming';
  dateRange: string;
}

export interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface HistoryLeader {
  id: string;
  name: string;
  viceName?: string;
  category: CandidateCategory;
  period: string;
  angkatan?: string;
  photoUrl: string;
  quote?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

export interface UserSession {
  nim: string;
  name: string;
  role: 'student' | 'admin';
  angkatan: string;
  hasVotedKahima: boolean;
  hasVotedKomting: boolean;
  votedKahimaCandidateId?: string;
  votedKomtingCandidateId?: string;
}

export interface PemiraSettings {
  isKahimaVotingOpen: boolean;
  isKomtingVotingOpen: boolean;
  activePeriod: string;
  totalVoters: number;
  suaraMasukPercentage: number;
}
