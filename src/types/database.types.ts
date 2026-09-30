export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      candidates: {
        Row: {
          id: string
          number: number
          name: string
          vice_name: string | null
          category: 'kahima' | 'komting'
          period: string
          angkatan: string | null
          vision: string
          mission: string[]
          photo_url: string
          badge: string | null
          created_at: string
        }
        Insert: {
          id?: string
          number: number
          name: string
          vice_name?: string | null
          category: 'kahima' | 'komting'
          period?: string
          angkatan?: string | null
          vision: string
          mission: string[]
          photo_url?: string
          badge?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          number?: number
          name?: string
          vice_name?: string | null
          category?: 'kahima' | 'komting'
          period?: string
          angkatan?: string | null
          vision?: string
          mission?: string[]
          photo_url?: string
          badge?: string | null
          created_at?: string
        }
        Relationships: []
      }
      pemira_settings: {
        Row: {
          id: number
          is_kahima_voting_open: boolean
          is_komting_voting_open: boolean
          is_live_count_visible: boolean
          active_period: string
          total_voters: number
          updated_at: string
        }
        Insert: {
          id?: number
          is_kahima_voting_open?: boolean
          is_komting_voting_open?: boolean
          is_live_count_visible?: boolean
          active_period?: string
          total_voters?: number
          updated_at?: string
        }
        Update: {
          id?: number
          is_kahima_voting_open?: boolean
          is_komting_voting_open?: boolean
          is_live_count_visible?: boolean
          active_period?: string
          total_voters?: number
          updated_at?: string
        }
        Relationships: []
      }
      timeline_steps: {
        Row: {
          id: string
          step_number: number
          title: string
          description: string | null
          date_range: string
          status: 'completed' | 'active' | 'pending' | 'upcoming'
          created_at: string
        }
        Insert: {
          id?: string
          step_number: number
          title: string
          description?: string | null
          date_range: string
          status: 'completed' | 'active' | 'pending' | 'upcoming'
          created_at?: string
        }
        Update: {
          id?: string
          step_number?: number
          title?: string
          description?: string | null
          date_range?: string
          status?: 'completed' | 'active' | 'pending' | 'upcoming'
          created_at?: string
        }
        Relationships: []
      }
      history_leaders: {
        Row: {
          id: string
          name: string
          vice_name: string | null
          category: 'kahima' | 'komting'
          period: string
          angkatan: string | null
          photo_url: string
          quote: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          vice_name?: string | null
          category: 'kahima' | 'komting'
          period: string
          angkatan?: string | null
          photo_url?: string
          quote?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          vice_name?: string | null
          category?: 'kahima' | 'komting'
          period?: string
          angkatan?: string | null
          photo_url?: string
          quote?: string | null
          created_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          id: string
          title: string
          category: string
          event_date: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          category: string
          event_date: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: string
          event_date?: string
          image_url?: string
          created_at?: string
        }
        Relationships: []
      }
      voters: {
        Row: {
          id: string
          nim: string
          name: string
          angkatan: string
          role: 'student' | 'admin'
          has_voted_kahima: boolean
          has_voted_komting: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          nim: string
          name: string
          angkatan: string
          role?: 'student' | 'admin'
          has_voted_kahima?: boolean
          has_voted_komting?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nim?: string
          name?: string
          angkatan?: string
          role?: 'student' | 'admin'
          has_voted_kahima?: boolean
          has_voted_komting?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      ballots: {
        Row: {
          id: string
          candidate_id: string
          category: string
          voter_angkatan: string
          casted_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          category: string
          voter_angkatan: string
          casted_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          category?: string
          voter_angkatan?: string
          casted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ballots_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_live_vote_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          candidate_id: string
          category: 'kahima' | 'komting'
          number: number
          name: string
          angkatan: string | null
          photo_url: string
          total_votes: number
        }[]
      }
      cast_vote: {
        Args: {
          p_kahima_candidate_id?: string
          p_komting_candidate_id?: string
        }
        Returns: {
          success: boolean
          message: string
        }
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
