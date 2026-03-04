// Full data model used by dummy-data-fixed.ts and components

export interface User {
  id: string
  name: string
  email: string
  headline: string
  avatar: string
  profileImage: string
  backgroundImage: string
  location: string
  bio: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  socialLinks: SocialLink[]
  achievements: Achievement[]
  recommendations: Recommendation[]
  created_at: string
  updated_at: string
  // legacy Supabase fields (optional back-compat)
  full_name?: string
  avatar_url?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  duration: string
  description: string
  companyLogo?: string
}

export interface Education {
  id: string
  degree: string
  school: string
  year: string
  field: string
  schoolLogo?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  icon: string
}

export interface Recommendation {
  id: string
  author: string
  authorTitle: string
  authorCompany: string
  content: string
  date: string
  rating: number
}

export interface Persona {
  id: string
  name: string
  description: string
  color: string
  icon: string
  keywords: string[]
  skills: string[]
  contentTypes: string[]
  careerLevel: string[]
  industries: string[]
  quizQuestions: QuizQuestion[]
  created_at: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
  personaWeights: Record<string, Record<string, number>>
}

export interface QuizOption {
  id: string
  text: string
  icon?: string
}

export interface Post {
  id: string
  user_id: string
  content: string
  content_type: string
  media_urls: string[]
  ai_tags: string[]
  persona_scores: Record<string, number>
  personaRelevance: Record<string, number>
  created_at: string
  updated_at: string
  author: User
  timestamp: string
  likes: number
  comments: number
  shares: number
  engagement: {
    views: number
    likes: number
    comments: number
    shares: number
  }
  tags: string[]
  contentType: 'text' | 'image' | 'video' | 'article' | 'poll'
}

export interface UserPersona {
  id: string
  user_id: string
  persona_id: string
  is_primary: boolean
  weight: number
  created_at: string
}

export interface UserEngagement {
  id: string
  user_id: string
  post_id: string
  engagement_type: 'view' | 'like' | 'comment' | 'share'
  persona_context?: string
  duration_seconds?: number
  created_at: string
}

export interface FeedFilters {
  persona_id?: string
  limit?: number
  offset?: number
}
