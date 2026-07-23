import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          order: number
          created_at: string
          updated_at: string
        }
      }
      portfolio_projects: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          image_url: string
          technologies: string[]
          project_url: string | null
          featured: boolean
          order: number
          created_at: string
          updated_at: string
        }
      }
      pricing_packages: {
        Row: {
          id: string
          name: string
          price: number
          description: string
          features: string[]
          order: number
          created_at: string
          updated_at: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          client_company: string
          content: string
          rating: number
          image_url: string | null
          order: number
          created_at: string
          updated_at: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          service: string
          budget: string
          message: string
          read: boolean
          created_at: string
        }
      }
      project_requests: {
        Row: {
          id: string
          name: string
          email: string
          country: string
          business_name: string
          service: string
          budget: string
          deadline: string
          description: string
          status: string
          read: boolean
          created_at: string
        }
      }
    }
  }
}
