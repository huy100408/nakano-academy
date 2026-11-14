export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      lesson_progress: {
        Row: {
          attempts: number
          beats_done: number
          best_score: number
          check_passed: boolean
          completed: boolean
          completed_at: string | null
          lesson_id: string
          subject_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number
          beats_done?: number
          best_score?: number
          check_passed?: boolean
          completed?: boolean
          completed_at?: string | null
          lesson_id: string
          subject_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number
          beats_done?: number
          best_score?: number
          check_passed?: boolean
          completed?: boolean
          completed_at?: string | null
          lesson_id?: string
          subject_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      question_progress: {
        Row: {
          correct_count: number
          ease_factor: number
          id: string
          incorrect_count: number
          interval_days: number
          is_weak_spot: boolean
          last_answered_at: string
          next_review_at: string
          question_id: string
          subject_id: string
          user_id: string
        }
        Insert: {
          correct_count?: number
          ease_factor?: number
          id?: string
          incorrect_count?: number
          interval_days?: number
          is_weak_spot?: boolean
          last_answered_at?: string
          next_review_at?: string
          question_id: string
          subject_id: string
          user_id: string
        }
        Update: {
          correct_count?: number
          ease_factor?: number
          id?: string
          incorrect_count?: number
          interval_days?: number
          is_weak_spot?: boolean
          last_answered_at?: string
          next_review_at?: string
          question_id?: string
          subject_id?: string
          user_id?: string
        }
        Relationships: []
      }
      scrambled_eggs_logs: {
        Row: {
          clues_used: number
          guessed_sister: string
          id: string
          multiplier: number
          played_at: string
          points_awarded: number
          streak_at_time: number
          target_sister: string
          user_id: string
        }
        Insert: {
          clues_used: number
          guessed_sister: string
          id?: string
          multiplier: number
          played_at?: string
          points_awarded?: number
          streak_at_time?: number
          target_sister: string
          user_id: string
        }
        Update: {
          clues_used?: number
          guessed_sister?: string
          id?: string
          multiplier?: number
          played_at?: string
          points_awarded?: number
          streak_at_time?: number
          target_sister?: string
          user_id?: string
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          completed_at: string
          correct_answers: number
          difficulty_tier: string
          id: string
          items_used: Json
          maruo_delta: number
          score_earned: number
          sister_id: string
          subject_id: string
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          correct_answers?: number
          difficulty_tier: string
          id?: string
          items_used?: Json
          maruo_delta?: number
          score_earned?: number
          sister_id: string
          subject_id: string
          total_questions?: number
          user_id: string
        }
        Update: {
          completed_at?: string
          correct_answers?: number
          difficulty_tier?: string
          id?: string
          items_used?: Json
          maruo_delta?: number
          score_earned?: number
          sister_id?: string
          subject_id?: string
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          baseline_mastery: Json
          best_streak: number
          current_mastery: Json
          email: string | null
          exam_score: number
          full_name: string | null
          item_inventory: Json
          last_study_date: string | null
          maruo_approval: number
          preferred_sister: string
          scrambled_eggs_best_streak: number
          scrambled_eggs_high_score: number
          sfx_enabled: boolean
          study_streak: number
          updated_at: string
          user_id: string
          voice_enabled: boolean
          voice_speed: number
          voice_volume: number
        }
        Insert: {
          avatar_url?: string | null
          baseline_mastery?: Json
          best_streak?: number
          current_mastery?: Json
          email?: string | null
          exam_score?: number
          full_name?: string | null
          item_inventory?: Json
          last_study_date?: string | null
          maruo_approval?: number
          preferred_sister?: string
          scrambled_eggs_best_streak?: number
          scrambled_eggs_high_score?: number
          sfx_enabled?: boolean
          study_streak?: number
          updated_at?: string
          user_id: string
          voice_enabled?: boolean
          voice_speed?: number
          voice_volume?: number
        }
        Update: {
          avatar_url?: string | null
          baseline_mastery?: Json
          best_streak?: number
          current_mastery?: Json
          email?: string | null
          exam_score?: number
          full_name?: string | null
          item_inventory?: Json
          last_study_date?: string | null
          maruo_approval?: number
          preferred_sister?: string
          scrambled_eggs_best_streak?: number
          scrambled_eggs_high_score?: number
          sfx_enabled?: boolean
          study_streak?: number
          updated_at?: string
          user_id?: string
          voice_enabled?: boolean
          voice_speed?: number
          voice_volume?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
