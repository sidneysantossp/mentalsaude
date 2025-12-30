/**
 * Supabase Database Types
 * 
 * Gerado automaticamente baseado no schema do Supabase
 * Execute: npx supabase gen types typescript --local > src/types/supabase.ts
 */

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
      profiles: {
        Row: {
          id: string
          email: string | null
          name: string | null
          role: 'USER' | 'ADMIN' | 'PROFESSIONAL'
          password_hash: string | null
          date_of_birth: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email?: string | null
          name?: string | null
          role?: 'USER' | 'ADMIN' | 'PROFESSIONAL'
          password_hash?: string | null
          date_of_birth?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          name?: string | null
          role?: 'USER' | 'ADMIN' | 'PROFESSIONAL'
          password_hash?: string | null
          date_of_birth?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tests: {
        Row: {
          id: string
          title: string
          slug: string | null
          description: string
          short_description: string | null
          category: 'DEPRESSION' | 'ANXIETY' | 'BURNOUT' | 'ADHD' | 'OCD' | 'STRESS' | 'SLEEP' | 'SELF_ESTEEM'
          instructions: string
          time_limit: number | null
          is_premium: boolean
          card_image: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug?: string | null
          description: string
          short_description?: string | null
          category: 'DEPRESSION' | 'ANXIETY' | 'BURNOUT' | 'ADHD' | 'OCD' | 'STRESS' | 'SLEEP' | 'SELF_ESTEEM'
          instructions: string
          time_limit?: number | null
          is_premium?: boolean
          card_image?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string | null
          description?: string
          short_description?: string | null
          category?: 'DEPRESSION' | 'ANXIETY' | 'BURNOUT' | 'ADHD' | 'OCD' | 'STRESS' | 'SLEEP' | 'SELF_ESTEEM'
          instructions?: string
          time_limit?: number | null
          is_premium?: boolean
          card_image?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          test_id: string
          text: string
          type: 'MULTIPLE_CHOICE' | 'LIKERT_SCALE' | 'YES_NO' | 'TEXT'
          order: number
          options: string | null
          created_at: string
        }
        Insert: {
          id?: string
          test_id: string
          text: string
          type: 'MULTIPLE_CHOICE' | 'LIKERT_SCALE' | 'YES_NO' | 'TEXT'
          order: number
          options?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          test_id?: string
          text?: string
          type?: 'MULTIPLE_CHOICE' | 'LIKERT_SCALE' | 'YES_NO' | 'TEXT'
          order?: number
          options?: string | null
          created_at?: string
        }
      }
      answers: {
        Row: {
          id: string
          question_id: string
          test_result_id: string
          value: string
          score: number
          created_at: string
        }
        Insert: {
          id?: string
          question_id: string
          test_result_id: string
          value: string
          score: number
          created_at?: string
        }
        Update: {
          id?: string
          question_id?: string
          test_result_id?: string
          value?: string
          score?: number
          created_at?: string
        }
      }
      test_results: {
        Row: {
          id: string
          user_id: string
          test_id: string
          total_score: number
          category: string
          interpretation: string
          recommendations: string | null
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          test_id: string
          total_score: number
          category: string
          interpretation: string
          recommendations?: string | null
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          test_id?: string
          total_score?: number
          category?: string
          interpretation?: string
          recommendations?: string | null
          completed_at?: string
        }
      }
      professionals: {
        Row: {
          id: string
          name: string
          email: string
          specialty: string
          credentials: string
          bio: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          specialty: string
          credentials: string
          bio?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          specialty?: string
          credentials?: string
          bio?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          professional_id: string
          scheduled_for: string
          status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          professional_id: string
          scheduled_for: string
          status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          professional_id?: string
          scheduled_for?: string
          status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      professional_reviews: {
        Row: {
          id: string
          test_result_id: string
          professional_id: string
          user_id: string
          review: string
          recommendations: string | null
          reviewed_at: string
        }
        Insert: {
          id?: string
          test_result_id: string
          professional_id: string
          user_id: string
          review: string
          recommendations?: string | null
          reviewed_at?: string
        }
        Update: {
          id?: string
          test_result_id?: string
          professional_id?: string
          user_id?: string
          review?: string
          recommendations?: string | null
          reviewed_at?: string
        }
      }
      educational_resources: {
        Row: {
          id: string
          title: string
          content: string
          type: 'ARTICLE' | 'VIDEO' | 'PODCAST' | 'EXERCISE' | 'TIP'
          category: string
          url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          type: 'ARTICLE' | 'VIDEO' | 'PODCAST' | 'EXERCISE' | 'TIP'
          category: string
          url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          type?: 'ARTICLE' | 'VIDEO' | 'PODCAST' | 'EXERCISE' | 'TIP'
          category?: string
          url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'USER' | 'ADMIN' | 'PROFESSIONAL'
      test_category: 'DEPRESSION' | 'ANXIETY' | 'BURNOUT' | 'ADHD' | 'OCD' | 'STRESS' | 'SLEEP' | 'SELF_ESTEEM'
      question_type: 'MULTIPLE_CHOICE' | 'LIKERT_SCALE' | 'YES_NO' | 'TEXT'
      appointment_status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
      resource_type: 'ARTICLE' | 'VIDEO' | 'PODCAST' | 'EXERCISE' | 'TIP'
    }
  }
}
