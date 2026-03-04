import { User, Persona, Post } from '@/types'

export const dummyPersonas: Persona[] = [
  {
    id: '1',
    name: 'Data Visualization Specialist',
    description: 'Focus on charts, graphs, analytics insights, and data tools',
    keywords: ['data', 'visualization', 'charts', 'analytics', 'graphs', 'dashboard'],
    icon: '📊',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Business Strategist',
    description: 'Market trends, leadership insights, and case studies',
    keywords: ['business', 'strategy', 'leadership', 'market', 'management', 'growth'],
    icon: '💼',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Creative Professional',
    description: 'Portfolio work, creative techniques, and industry trends',
    keywords: ['creative', 'design', 'art', 'portfolio', 'technique', 'inspiration'],
    icon: '🎨',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Technology Expert',
    description: 'Software development, AI, and emerging technologies',
    keywords: ['technology', 'software', 'AI', 'programming', 'development', 'innovation'],
    icon: '💻',
    created_at: new Date().toISOString()
  }
]

export const dummyUsers: User[] = [
  {
    id: '1',
    email: 'sarah.chen@techcorp.com',
    full_name: 'Sarah Chen',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    email: 'mike.rodriguez@dataviz.io',
    full_name: 'Mike Rodriguez',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    email: 'emma.wilson@creative.studio',
    full_name: 'Emma Wilson',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    email: 'alex.kumar@tech.startup',
    full_name: 'Alex Kumar',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const dummyPosts: Post[] = [
  {
    id: '1',
    user_id: '1',
    content: 'Just shipped a new dashboard that reduced client reporting time by 60%! The key was using real-time data visualization with D3.js and implementing smart caching strategies. What\'s your biggest data viz win this month? 📊\n\nKey takeaways:\n• Real-time updates increase engagement 3x\n• Interactive charts beat static reports\n• Performance optimization is crucial',
    content_type: 'text',
    media_urls: [],
    ai_tags: ['data', 'visualization', 'dashboard', 'performance', 'd3.js'],
    persona_scores: {
      '1': 0.95, // Data Visualization Specialist
      '2': 0.3,  // Business Strategist
      '3': 0.1,  // Creative Professional
      '4': 0.7   // Technology Expert
    },
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    user: dummyUsers[0]
  },
  {
    id: '2',
    user_id: '2',
    content: 'Hot take: Most "data-driven decisions" are actually "data-justified decisions." We collect tons of metrics but still rely on gut feeling. True data literacy means knowing when to trust the data AND when to question it.\n\nThe best analysts I\'ve worked with aren\'t just number crunchers - they\'re storytellers who can separate signal from noise. 🎯\n\nWhat\'s your experience with data-driven culture?',
    content_type: 'text',
    media_urls: [],
    ai_tags: ['data', 'analytics', 'decision-making', 'culture', 'storytelling'],
    persona_scores: {
      '1': 0.85, // Data Visualization Specialist
      '2': 0.8,  // Business Strategist
      '3': 0.2,  // Creative Professional
      '4': 0.4   // Technology Expert
    },
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    user: dummyUsers[1]
  },
  {
    id: '3',
    user_id: '3',
    content: 'Just finished this brand identity project for a sustainable fashion startup. The challenge was creating something that felt both eco-conscious and luxury. We used a minimalist approach with earth tones and clean typography.\n\nDesign process:\n1. Deep dive into sustainability values\n2. Mood board with natural elements\n3. Sketch iterations (47 versions!)\n4. Digital refinement\n5. Brand guidelines documentation\n\nSometimes the best designs come from the tightest constraints. 🌿✨',
    content_type: 'text',
    media_urls: [],
    ai_tags: ['design', 'branding', 'sustainability', 'minimalism', 'creative-process'],
    persona_scores: {
      '1': 0.1,  // Data Visualization Specialist
      '2': 0.4,  // Business Strategist
      '3': 0.95, // Creative Professional
      '4': 0.2   // Technology Expert
    },
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    user: dummyUsers[2]
  },
  {
    id: '4',
    user_id: '4',
    content: 'AI is changing how we code, but not in the way everyone thinks. It\'s not about replacing developers - it\'s about augmenting our capabilities.\n\nMy workflow with AI assistants:\n• Boilerplate generation: 10x faster\n• Code reviews: Catch issues I miss\n• Documentation: Actually gets written\n• Learning: Instant explanations for complex concepts\n\nThe developers who embrace AI as a co-pilot will outpace those who see it as competition. The future isn\'t AI vs humans, it\'s AI + humans. 🤖+👥\n\nWhat\'s your take on AI in development?',
    content_type: 'text',
    media_urls: [],
    ai_tags: ['AI', 'programming', 'development', 'workflow', 'future-of-work'],
    persona_scores: {
      '1': 0.3,  // Data Visualization Specialist
      '2': 0.5,  // Business Strategist
      '3': 0.2,  // Creative Professional
      '4': 0.9   // Technology Expert
    },
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    user: dummyUsers[3]
  },
  {
    id: '5',
    user_id: '1',
    content: 'Leadership isn\'t about being the smartest person in the room. It\'s about creating an environment where the smartest people can do their best work.\n\nThis week I learned:\n• Ask better questions, don\'t just give answers\n• Your team\'s success is your success\n• Vulnerability builds trust\n• Micromanagement kills innovation\n\nBest leadership decision I made? Promoting someone who challenged my ideas. They made the entire team better. 💪\n\n#Leadership #TeamBuilding #GrowthMindset',
    content_type: 'text',
    media_urls: [],
    ai_tags: ['leadership', 'team-building', 'management', 'growth', 'trust'],
    persona_scores: {
      '1': 0.2,  // Data Visualization Specialist
      '2': 0.9,  // Business Strategist
      '3': 0.3,  // Creative Professional
      '4': 0.4   // Technology Expert
    },
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    user: dummyUsers[0]
  }
]
