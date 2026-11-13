// Placeholder matching supabase/migrations/20261114000000_nakano_academy_init.sql.
// Regenerated from the live project with `supabase gen types typescript`.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          user_id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          exam_score: number
          study_streak: number
          best_streak: number
          last_study_date: string | null
          maruo_approval: number
          preferred_sister: string
          baseline_mastery: Json
          current_mastery: Json
          item_inventory: Json
          scrambled_eggs_high_score: number
          scrambled_eggs_best_streak: number
          updated_at: string
        }
        Insert: {
          user_id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          exam_score?: number
          study_streak?: number
          best_streak?: number
          last_study_date?: string | null
          maruo_approval?: number
          preferred_sister?: string
          baseline_mastery?: Json
          current_mastery?: Json
          item_inventory?: Json
          scrambled_eggs_high_score?: number
          scrambled_eggs_best_streak?: number
          updated_at?: string
        }
        Update: {
          user_id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          exam_score?: number
          study_streak?: number
          best_streak?: number
          last_study_date?: string | null
          maruo_approval?: number
          preferred_sister?: string
          baseline_mastery?: Json
          current_mastery?: Json
          item_inventory?: Json
          scrambled_eggs_high_score?: number
          scrambled_eggs_best_streak?: number
          updated_at?: string
        }
        Relationships: []
      }
      question_progress: {
        Row: {
          id: string
          user_id: string
          subject_id: string
          question_id: string
          correct_count: number
          incorrect_count: number
          is_weak_spot: boolean
          ease_factor: number
          interval_days: number
          next_review_at: string
          last_answered_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id: string
          question_id: string
          correct_count?: number
          incorrect_count?: number
          is_weak_spot?: boolean
          ease_factor?: number
          interval_days?: number
          next_review_at?: string
          last_answered_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string
          question_id?: string
          correct_count?: number
          incorrect_count?: number
          is_weak_spot?: boolean
          ease_factor?: number
          interval_days?: number
          next_review_at?: string
          last_answered_at?: string
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          id: string
          user_id: string
          sister_id: string
          subject_id: string
          difficulty_tier: string
          score_earned: number
          correct_answers: number
          total_questions: number
          maruo_delta: number
          items_used: Json
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          sister_id: string
          subject_id: string
          difficulty_tier: string
          score_earned?: number
          correct_answers?: number
          total_questions?: number
          maruo_delta?: number
          items_used?: Json
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          sister_id?: string
          subject_id?: string
          difficulty_tier?: string
          score_earned?: number
          correct_answers?: number
          total_questions?: number
          maruo_delta?: number
          items_used?: Json
          completed_at?: string
        }
        Relationships: []
      }
      scrambled_eggs_logs: {
        Row: {
          id: string
          user_id: string
          target_sister: string
          guessed_sister: string
          clues_used: number
          multiplier: number
          points_awarded: number
          streak_at_time: number
          played_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target_sister: string
          guessed_sister: string
          clues_used: number
          multiplier: number
          points_awarded?: number
          streak_at_time?: number
          played_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target_sister?: string
          guessed_sister?: string
          clues_used?: number
          multiplier?: number
          points_awarded?: number
          streak_at_time?: number
          played_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
