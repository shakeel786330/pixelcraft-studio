export interface Service {
  id: string
  title: string
  description: string
  icon: string
  order: number
  created_at: string
  updated_at: string
}

export interface PortfolioProject {
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

export interface PricingPackage {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  order: number
  created_at: string
  updated_at: string
}

export interface Testimonial {
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

export interface ContactMessage {
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

export interface ProjectRequest {
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

export interface User {
  id: string
  email: string
  user_metadata?: {
    is_admin?: boolean
  }
}
