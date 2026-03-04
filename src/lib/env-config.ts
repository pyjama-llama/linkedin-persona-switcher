// Environment Configuration Template
// Copy this to .env.local and fill in your actual values

export const envConfig = {
  // Supabase Configuration
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'your_supabase_url_here',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here',
  
  // OpenAI Configuration (for AI content classification)
  openaiApiKey: process.env.OPENAI_API_KEY || 'your_openai_api_key_here',
  
  // NextAuth Configuration
  nextauthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  nextauthSecret: process.env.NEXTAUTH_SECRET || 'your_nextauth_secret_here',
}

// Development mode flag
export const isDevelopment = process.env.NODE_ENV === 'development'
