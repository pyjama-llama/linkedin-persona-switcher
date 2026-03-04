// Complete dummy data with images for all profiles and user journey components

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

export interface User {
  id: string
  name: string
  avatar: string
  headline: string
  location: string
  connections: number
  followers: number
  personas: string[]
  bio: string
  experience: Experience[]
  skills: string[]
  education: Education[]
  industry: string
  companySize: string
  careerStage: 'early' | 'mid' | 'senior' | 'executive'
  profileImage: string
  backgroundImage?: string
  socialLinks: SocialLink[]
  achievements: Achievement[]
  recommendations: Recommendation[]
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
  type: 'certification' | 'award' | 'publication' | 'project'
}

export interface Recommendation {
  id: string
  author: string
  authorTitle: string
  authorCompany: string
  content: string
  date: string
  relationship: string
}

export interface Experience {
  id: string
  title: string
  company: string
  duration: string
  description: string
  skills: string[]
  industry: string
  companySize: string
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

export interface OnboardingStep {
  id: string
  title: string
  description: string
  component: string
  progress: number
  completed: boolean
}

// Quiz Questions for Persona Detection
const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What best describes your primary work focus?',
    options: [
      { id: 'a', text: 'Analyzing data and creating insights', icon: 'BarChart3' },
      { id: 'b', text: 'Developing strategic plans and business growth', icon: 'Briefcase' },
      { id: 'c', text: 'Creating visual designs and user experiences', icon: 'Palette' },
      { id: 'd', text: 'Building and implementing technology solutions', icon: 'Cpu' }
    ],
    personaWeights: {
      'data-viz': { a: 3, b: 1, c: 0, d: 2 },
      'business-strategy': { a: 1, b: 3, c: 1, d: 1 },
      'creative-design': { a: 0, b: 1, c: 3, d: 1 },
      'tech-innovation': { a: 2, b: 1, c: 1, d: 3 }
    }
  },
  {
    id: 'q2',
    question: 'What type of content do you most enjoy creating or consuming?',
    options: [
      { id: 'a', text: 'Data visualizations and analytics reports', icon: 'TrendingUp' },
      { id: 'b', text: 'Business case studies and market analysis', icon: 'FileText' },
      { id: 'c', text: 'Design portfolios and creative showcases', icon: 'Image' },
      { id: 'd', text: 'Technical tutorials and code reviews', icon: 'Code' }
    ],
    personaWeights: {
      'data-viz': { a: 3, b: 2, c: 0, d: 1 },
      'business-strategy': { a: 2, b: 3, c: 1, d: 0 },
      'creative-design': { a: 0, b: 1, c: 3, d: 1 },
      'tech-innovation': { a: 1, b: 0, c: 1, d: 3 }
    }
  },
  {
    id: 'q3',
    question: 'Which skills are most critical to your role?',
    options: [
      { id: 'a', text: 'Data analysis, statistics, and visualization tools', icon: 'PieChart' },
      { id: 'b', text: 'Strategic thinking, leadership, and business acumen', icon: 'Target' },
      { id: 'c', text: 'Design thinking, creativity, and visual communication', icon: 'Brush' },
      { id: 'd', text: 'Programming, system architecture, and problem-solving', icon: 'Terminal' }
    ],
    personaWeights: {
      'data-viz': { a: 3, b: 1, c: 0, d: 2 },
      'business-strategy': { a: 1, b: 3, c: 1, d: 0 },
      'creative-design': { a: 0, b: 1, c: 3, d: 1 },
      'tech-innovation': { a: 2, b: 0, c: 1, d: 3 }
    }
  },
  {
    id: 'q4',
    question: 'What\'s your ideal work environment?',
    options: [
      { id: 'a', text: 'Data-driven organization focused on metrics and insights', icon: 'Database' },
      { id: 'b', text: 'Strategic leadership role with growth responsibilities', icon: 'TrendingUp' },
      { id: 'c', text: 'Creative studio or design-focused team', icon: 'Sparkles' },
      { id: 'd', text: 'Technology company or innovation lab', icon: 'Rocket' }
    ],
    personaWeights: {
      'data-viz': { a: 3, b: 1, c: 0, d: 2 },
      'business-strategy': { a: 1, b: 3, c: 1, d: 1 },
      'creative-design': { a: 0, b: 1, c: 3, d: 1 },
      'tech-innovation': { a: 2, b: 1, c: 1, d: 3 }
    }
  }
]

// Complete Personas with Quiz
export const personas: Persona[] = [
  {
    id: 'data-viz',
    name: 'Data Visualization',
    description: 'Focus on analytics, data storytelling, and visual insights',
    color: '#3B82F6',
    icon: 'BarChart3',
    keywords: ['data', 'analytics', 'visualization', 'charts', 'insights'],
    skills: ['Tableau', 'Power BI', 'D3.js', 'Python', 'SQL', 'Statistics'],
    contentTypes: ['charts', 'graphs', 'dashboards', 'reports', 'infographics'],
    careerLevel: ['analyst', 'scientist', 'manager', 'director'],
    industries: ['technology', 'finance', 'healthcare', 'retail'],
    quizQuestions: [],
    created_at: new Date().toISOString()
  },
  {
    id: 'business-strategy',
    name: 'Business Strategy',
    description: 'Strategic planning, business development, and market analysis',
    color: '#10B981',
    icon: 'Briefcase',
    keywords: ['strategy', 'business', 'growth', 'planning', 'market'],
    skills: ['Strategic Planning', 'Market Analysis', 'Business Development', 'Leadership', 'Finance'],
    contentTypes: ['case-studies', 'whitepapers', 'analysis', 'reports', 'presentations'],
    careerLevel: ['manager', 'director', 'vp', 'executive'],
    industries: ['consulting', 'finance', 'technology', 'manufacturing'],
    quizQuestions: [],
    created_at: new Date().toISOString()
  },
  {
    id: 'creative-design',
    name: 'Creative Design',
    description: 'UI/UX design, visual arts, and creative problem-solving',
    color: '#8B5CF6',
    icon: 'Palette',
    keywords: ['design', 'creative', 'ui', 'ux', 'visual'],
    skills: ['Figma', 'Adobe Creative Suite', 'Design Thinking', 'Prototyping', 'User Research'],
    contentTypes: ['portfolios', 'case-studies', 'designs', 'mockups', 'prototypes'],
    careerLevel: ['designer', 'lead', 'manager', 'director'],
    industries: ['technology', 'agency', 'media', 'entertainment'],
    quizQuestions: [],
    created_at: new Date().toISOString()
  },
  {
    id: 'tech-innovation',
    name: 'Tech Innovation',
    description: 'Cutting-edge technology, software development, and innovation',
    color: '#F59E0B',
    icon: 'Cpu',
    keywords: ['technology', 'innovation', 'software', 'development', 'ai'],
    skills: ['Programming', 'AI/ML', 'Cloud Computing', 'DevOps', 'Architecture'],
    contentTypes: ['tutorials', 'code', 'projects', 'research', 'articles'],
    careerLevel: ['developer', 'engineer', 'architect', 'cto'],
    industries: ['technology', 'startups', 'research', 'education'],
    quizQuestions: [],
    created_at: new Date().toISOString()
  }
]

// Complete Users with Images and Full Profiles
export const users: User[] = [
  // Data Visualization Professionals
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'SC',
    headline: 'Senior Data Scientist | Analytics Leader | Tableau Expert',
    location: 'San Francisco, CA',
    connections: 2847,
    followers: 1250,
    personas: ['data-viz', 'business-strategy'],
    bio: 'Passionate about turning complex data into actionable insights. 10+ years in analytics across tech and healthcare. Currently leading data science team at TechCorp.',
    experience: [
      {
        id: 'exp1',
        title: 'Senior Data Scientist',
        company: 'TechCorp',
        duration: '2020 - Present',
        description: 'Leading analytics initiatives for product optimization and customer insights. Built predictive models that reduced churn by 25%.',
        skills: ['Python', 'Machine Learning', 'Tableau', 'SQL'],
        industry: 'Technology',
        companySize: '1000-5000',
        companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: 'exp2',
        title: 'Data Analyst',
        company: 'HealthTech Inc',
        duration: '2018 - 2020',
        description: 'Healthcare data analysis and visualization for patient outcomes improvement.',
        skills: ['R', 'Power BI', 'Statistics', 'Healthcare Analytics'],
        industry: 'Healthcare',
        companySize: '500-1000',
        companyLogo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop&crop=face'
      }
    ],
    skills: ['Data Science', 'Machine Learning', 'Tableau', 'Python', 'SQL', 'Statistics'],
    education: [
      {
        id: 'edu1',
        degree: 'MS Data Science',
        school: 'Stanford University',
        year: '2018',
        field: 'Data Science',
        schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=face'
      }
    ],
    industry: 'Technology',
    companySize: '1000-5000',
    careerStage: 'senior',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=200&h=200&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=300&fit=crop',
    socialLinks: [
      { platform: 'Twitter', url: 'https://twitter.com/sarahchen', icon: 'Twitter' },
      { platform: 'GitHub', url: 'https://github.com/sarahchen', icon: 'GitHub' },
      { platform: 'Personal', url: 'https://sarahchen.dev', icon: 'Globe' }
    ],
    achievements: [
      {
        id: 'ach1',
        title: 'Tableau Zen Master',
        description: 'Recognized as Tableau Zen Master for exceptional visualization skills',
        date: '2023',
        type: 'certification'
      },
      {
        id: 'ach2',
        title: 'Best Data Science Paper',
        description: 'Published award-winning paper on predictive analytics',
        date: '2022',
        type: 'publication'
      }
    ],
    recommendations: [
      {
        id: 'rec1',
        author: 'Michael Rodriguez',
        authorTitle: 'VP Analytics',
        authorCompany: 'TechCorp',
        content: 'Sarah is an exceptional data scientist who consistently delivers insights that drive business value. Her ability to communicate complex findings to stakeholders is unmatched.',
        date: '2023',
        relationship: 'Manager'
      }
    ]
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    avatar: 'MR',
    headline: 'Data Analyst | Business Intelligence | Power BI Specialist',
    location: 'New York, NY',
    connections: 1523,
    followers: 680,
    personas: ['data-viz'],
    bio: 'Helping businesses make data-driven decisions through compelling visualizations and insights. Specialized in financial analytics and risk management.',
    experience: [
      {
        id: 'exp3',
        title: 'Business Intelligence Analyst',
        company: 'FinanceHub',
        duration: '2021 - Present',
        description: 'Creating dashboards and reports for financial analysis and risk assessment.',
        skills: ['Power BI', 'Excel', 'Financial Analysis', 'DAX'],
        industry: 'Finance',
        companySize: '500-1000',
        companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face'
      }
    ],
    skills: ['Power BI', 'Excel', 'DAX', 'Financial Analysis', 'Data Modeling'],
    education: [
      {
        id: 'edu2',
        degree: 'BS Business Analytics',
        school: 'NYU Stern',
        year: '2021',
        field: 'Business Analytics',
        schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=face'
      }
    ],
    industry: 'Finance',
    companySize: '500-1000',
    careerStage: 'mid',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=300&fit=crop',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/michaelrodriguez', icon: 'LinkedIn' },
      { platform: 'Twitter', url: 'https://twitter.com/michaeldata', icon: 'Twitter' }
    ],
    achievements: [
      {
        id: 'ach3',
        title: 'Power BI Certified',
        description: 'Microsoft Certified: Data Analyst Associate',
        date: '2022',
        type: 'certification'
      }
    ],
    recommendations: []
  },
  {
    id: '3',
    name: 'Emily Watson',
    avatar: 'EW',
    headline: 'Data Visualization Consultant | Storytelling with Data',
    location: 'Chicago, IL',
    connections: 3421,
    followers: 2100,
    personas: ['data-viz', 'creative-design'],
    bio: 'Consultant specializing in data storytelling and visual communication. Making data beautiful and understandable for Fortune 500 companies.',
    experience: [
      {
        id: 'exp4',
        title: 'Data Visualization Consultant',
        company: 'Visual Insights LLC',
        duration: '2019 - Present',
        description: 'Consulting with Fortune 500 companies on data visualization strategy and implementation.',
        skills: ['Tableau', 'D3.js', 'Design Thinking', 'Consulting'],
        industry: 'Consulting',
        companySize: '50-100',
        companyLogo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop&crop=face'
      }
    ],
    skills: ['Tableau', 'D3.js', 'Data Storytelling', 'Design Thinking', 'Consulting'],
    education: [
      {
        id: 'edu3',
        degree: 'MA Information Design',
        school: 'Carnegie Mellon',
        year: '2019',
        field: 'Information Design',
        schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=face'
      }
    ],
    industry: 'Consulting',
    companySize: '50-100',
    careerStage: 'senior',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=300&fit=crop',
    socialLinks: [
      { platform: 'Portfolio', url: 'https://emilywatson.design', icon: 'Briefcase' },
      { platform: 'Twitter', url: 'https://twitter.com/emilyviz', icon: 'Twitter' },
      { platform: 'Dribbble', url: 'https://dribbble.com/emilywatson', icon: 'Dribbble' }
    ],
    achievements: [
      {
        id: 'ach4',
        title: 'Information Design Award',
        description: 'Winner of National Information Design Competition',
        date: '2023',
        type: 'award'
      }
    ],
    recommendations: []
  },

  // Business Strategy Professionals
  {
    id: '4',
    name: 'David Kim',
    avatar: 'DK',
    headline: 'VP Strategy | Business Development | M&A Expert',
    location: 'Boston, MA',
    connections: 5632,
    followers: 3200,
    personas: ['business-strategy'],
    bio: 'Strategic leader with 15+ years in business development and M&A. Helping companies scale and transform through strategic initiatives and partnerships.',
    experience: [
      {
        id: 'exp5',
        title: 'VP Strategy',
        company: 'GlobalTech',
        duration: '2018 - Present',
        description: 'Leading corporate strategy and M&A initiatives. Completed 5 successful acquisitions totaling $500M.',
        skills: ['Strategic Planning', 'M&A', 'Business Development', 'Leadership'],
        industry: 'Technology',
        companySize: '5000+',
        companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face'
      }
    ],
    skills: ['Strategic Planning', 'M&A', 'Business Development', 'Leadership', 'Financial Modeling'],
    education: [
      {
        id: 'edu4',
        degree: 'MBA',
        school: 'Harvard Business School',
        year: '2008',
        field: 'Business Administration',
        schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=face'
      }
    ],
    industry: 'Technology',
    companySize: '5000+',
    careerStage: 'executive',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b8b?w=800&h=300&fit=crop',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/davidkim', icon: 'LinkedIn' },
      { platform: 'Twitter', url: 'https://twitter.com/davidkim', icon: 'Twitter' }
    ],
    achievements: [
      {
        id: 'ach5',
        title: 'M&A Deal of the Year',
        description: 'Led acquisition recognized as Deal of the Year by Technology M&A Advisors',
        date: '2023',
        type: 'award'
      }
    ],
    recommendations: []
  },
  {
    id: '5',
    name: 'Jennifer Liu',
    avatar: 'JL',
    headline: 'Strategy Consultant | Digital Transformation | Innovation',
    location: 'Seattle, WA',
    connections: 2109,
    followers: 1450,
    personas: ['business-strategy', 'tech-innovation'],
    bio: 'Helping organizations navigate digital transformation and innovation challenges. Specialized in technology strategy and change management.',
    experience: [
      {
        id: 'exp6',
        title: 'Senior Strategy Consultant',
        company: 'McKinsey & Company',
        duration: '2020 - Present',
        description: 'Digital transformation and innovation consulting for Fortune 500 clients.',
        skills: ['Digital Strategy', 'Innovation', 'Change Management', 'Consulting'],
        industry: 'Consulting',
        companySize: '1000-5000',
        companyLogo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop&crop=face'
      }
    ],
    skills: ['Digital Strategy', 'Innovation', 'Change Management', 'Consulting', 'Agile'],
    education: [
      {
        id: 'edu5',
        degree: 'MS Engineering Management',
        school: 'MIT',
        year: '2020',
        field: 'Engineering Management',
        schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=face'
      }
    ],
    industry: 'Consulting',
    companySize: '1000-5000',
    careerStage: 'senior',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=200&h=200&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=300&fit=crop',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/jenniferliu', icon: 'LinkedIn' },
      { platform: 'Twitter', url: 'https://twitter.com/jenniferliu', icon: 'Twitter' }
    ],
    achievements: [
      {
        id: 'ach6',
        title: 'Digital Transformation Leader',
        description: 'Recognized as top digital transformation consultant under 40',
        date: '2023',
        type: 'award'
      }
    ],
    recommendations: []
  },

  // Creative Design Professionals
  {
    id: '6',
    name: 'Alex Thompson',
    avatar: 'AT',
    headline: 'UX Design Director | Design Systems | User Research',
    location: 'Los Angeles, CA',
    connections: 4156,
    followers: 2800,
    personas: ['creative-design'],
    bio: 'Design leader passionate about creating intuitive and beautiful user experiences. Building design systems that scale and delight users.',
    experience: [
      {
        id: 'exp7',
        title: 'UX Design Director',
        company: 'DesignHub',
        duration: '2019 - Present',
        description: 'Leading UX team and design system development. Improved user satisfaction by 40%.',
        skills: ['UX Design', 'Design Systems', 'User Research', 'Team Leadership'],
        industry: 'Technology',
        companySize: '1000-5000',
        companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face'
      }
    ],
    skills: ['UX Design', 'UI Design', 'Figma', 'Design Systems', 'User Research'],
    education: [
      {
        id: 'edu6',
        degree: 'BFA Graphic Design',
        school: 'ArtCenter College of Design',
        year: '2015',
        field: 'Graphic Design',
        schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=face'
      }
    ],
    industry: 'Technology',
    companySize: '1000-5000',
    careerStage: 'senior',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=300&fit=crop',
    socialLinks: [
      { platform: 'Portfolio', url: 'https://alexthompson.design', icon: 'Briefcase' },
      { platform: 'Dribbble', url: 'https://dribbble.com/alexthompson', icon: 'Dribbble' },
      { platform: 'Twitter', url: 'https://twitter.com/alexthompson', icon: 'Twitter' }
    ],
    achievements: [
      {
        id: 'ach7',
        title: 'UX Design Award',
        description: 'Winner of UX Design Awards for mobile app design',
        date: '2023',
        type: 'award'
      }
    ],
    recommendations: []
  },
  {
    id: '7',
    name: 'Maria Garcia',
    avatar: 'MG',
    headline: 'Product Designer | Creative Technologist | Brand Design',
    location: 'Austin, TX',
    connections: 1892,
    followers: 1200,
    personas: ['creative-design', 'tech-innovation'],
    bio: 'Bridging the gap between design and technology to create innovative products. Passionate about AR/VR and emerging technologies.',
    experience: [
      {
        id: 'exp8',
        title: 'Senior Product Designer',
        company: 'InnovateTech',
        duration: '2021 - Present',
        description: 'Product design for emerging technologies and innovative user experiences.',
        skills: ['Product Design', 'Prototyping', 'Creative Technology', 'Brand Design'],
        industry: 'Technology',
        companySize: '100-500',
        companyLogo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop&crop=face'
      }
    ],
    skills: ['Product Design', 'Figma', 'Prototyping', 'Creative Technology', 'Brand Design'],
    education: [
      {
        id: 'edu7',
        degree: 'MS Interaction Design',
        school: 'Carnegie Mellon',
        year: '2021',
        field: 'Interaction Design',
        schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=face'
      }
    ],
    industry: 'Technology',
    companySize: '100-500',
    careerStage: 'mid',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=300&fit=crop',
    socialLinks: [
      { platform: 'Portfolio', url: 'https://mariagarcia.design', icon: 'Briefcase' },
      { platform: 'Twitter', url: 'https://twitter.com/mariagarcia', icon: 'Twitter' },
      { platform: 'GitHub', url: 'https://github.com/mariagarcia', icon: 'GitHub' }
    ],
    achievements: [
      {
        id: 'ach8',
        title: 'Innovation in Design',
        description: 'Recognized for innovative AR/VR design work',
        date: '2023',
        type: 'award'
      }
    ],
    recommendations: []
  },

  // Tech Innovation Professionals
  {
    id: '8',
    name: 'Robert Chang',
    avatar: 'RC',
    headline: 'CTO | Cloud Architecture | AI/ML Expert',
    location: 'Denver, CO',
    connections: 6234,
    followers: 4100,
    personas: ['tech-innovation'],
    bio: 'Technology leader focused on cloud architecture and artificial intelligence solutions. Building scalable systems that power innovation.',
    experience: [
      {
        id: 'exp9',
        title: 'CTO',
        company: 'CloudFirst',
        duration: '2019 - Present',
        description: 'Leading technology strategy and cloud transformation. Built platform serving 10M+ users.',
        skills: ['Cloud Architecture', 'AI/ML', 'Leadership', 'DevOps'],
        industry: 'Technology',
        companySize: '500-1000',
        companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face'
      }
    ],
    skills: ['Cloud Architecture', 'AI/ML', 'DevOps', 'System Design', 'Leadership'],
    education: [
      {
        id: 'edu8',
        degree: 'MS Computer Science',
        school: 'UC Berkeley',
        year: '2010',
        field: 'Computer Science',
        schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=face'
      }
    ],
    industry: 'Technology',
    companySize: '500-1000',
    careerStage: 'executive',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=300&fit=crop',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/robertchang', icon: 'LinkedIn' },
      { platform: 'GitHub', url: 'https://github.com/robertchang', icon: 'GitHub' },
      { platform: 'Twitter', url: 'https://twitter.com/robertchang', icon: 'Twitter' }
    ],
    achievements: [
      {
        id: 'ach9',
        title: 'AWS Certified Solutions Architect',
        description: 'Professional level AWS certification',
        date: '2022',
        type: 'certification'
      }
    ],
    recommendations: []
  },
  {
    id: '9',
    name: 'Lisa Park',
    avatar: 'LP',
    headline: 'Full Stack Developer | Open Source Contributor | Tech Blogger',
    location: 'Portland, OR',
    connections: 1567,
    followers: 890,
    personas: ['tech-innovation', 'creative-design'],
    bio: 'Passionate developer building innovative solutions and contributing to open source. Love sharing knowledge through tech blogging and community involvement.',
    experience: [
      {
        id: 'exp10',
        title: 'Senior Full Stack Developer',
        company: 'TechStartup',
        duration: '2020 - Present',
        description: 'Full stack development for innovative tech products and platforms.',
        skills: ['React', 'Node.js', 'Python', 'Cloud Services', 'Open Source'],
        industry: 'Technology',
        companySize: '50-100',
        companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face'
      }
    ],
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Open Source', 'Full Stack Development'],
    education: [
      {
        id: 'edu9',
        degree: 'BS Computer Science',
        school: 'University of Washington',
        year: '2020',
        field: 'Computer Science',
        schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=face'
      }
    ],
    industry: 'Technology',
    companySize: '50-100',
    careerStage: 'mid',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=200&h=200&fit=crop&crop=face',
    backgroundImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=300&fit=crop',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/lisapark', icon: 'GitHub' },
      { platform: 'Twitter', url: 'https://twitter.com/lisapark', icon: 'Twitter' },
      { platform: 'Blog', url: 'https://lisapark.dev', icon: 'Globe' }
    ],
    achievements: [
      {
        id: 'ach10',
        title: 'Open Source Contributor',
        description: 'Top contributor to major React ecosystem projects',
        date: '2023',
        type: 'project'
      }
    ],
    recommendations: []
  }
]

// Onboarding Steps for User Journey
export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Professional Context Switching',
    description: 'Let\'s personalize your experience by understanding your professional interests and work contexts.',
    component: 'WelcomeScreen',
    progress: 0,
    completed: false
  },
  {
    id: 'quiz',
    title: 'Discover Your Professional Personas',
    description: 'Answer a few questions to identify your primary professional contexts and get personalized content.',
    component: 'PersonaQuiz',
    progress: 25,
    completed: false
  },
  {
    id: 'results',
    title: 'Your Professional Personas',
    description: 'Based on your answers, here are your recommended professional contexts. You can always adjust these later.',
    component: 'PersonaResults',
    progress: 50,
    completed: false
  },
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Add your professional information to enhance networking opportunities and content recommendations.',
    component: 'ProfileSetup',
    progress: 75,
    completed: false
  },
  {
    id: 'demo',
    title: 'See It in Action',
    description: 'Experience how context switching transforms your professional networking with personalized content.',
    component: 'PlatformDemo',
    progress: 100,
    completed: false
  }
]

// Posts remain the same but with enhanced user data
export const posts: Post[] = [
  // Data Visualization Posts
  {
    id: '1',
    author: users[0], // Sarah Chen
    content: 'Just completed a comprehensive dashboard for tracking customer churn predictions. The key insight? Customers who engage with 3+ features are 5x less likely to churn. Data visualization isn\'t just about pretty charts - it\'s about actionable insights that drive business decisions. #DataViz #BusinessIntelligence #CustomerAnalytics',
    timestamp: '2 hours ago',
    likes: 156,
    comments: 23,
    shares: 12,
    personaRelevance: {
      'data-viz': 95,
      'business-strategy': 75,
      'creative-design': 45,
      'tech-innovation': 60
    },
    tags: ['data-viz', 'business-intelligence', 'customer-analytics'],
    engagement: {
      views: 2400,
      shares: 12,
      comments: 23,
      likes: 156
    },
    contentType: 'text'
  },
  {
    id: '2',
    author: users[1], // Michael Rodriguez
    content: 'Power BI Tip Tuesday! 🚀 Did you know you can create dynamic tooltips that change based on data point? This small feature can dramatically improve user experience. Check out my latest tutorial on implementing this in your reports. #PowerBI #DataAnalytics #Tips',
    timestamp: '5 hours ago',
    likes: 89,
    comments: 12,
    shares: 5,
    engagement: {
      views: 2847,
      likes: 89,
      comments: 12,
      shares: 5
    },
    personaRelevance: {
      'data-viz': 90,
      'business-strategy': 50,
      'creative-design': 35,
      'tech-innovation': 55
    },
    tags: ['powerbi', 'data-analytics', 'tips'],
    engagement: {
      views: 1200,
      shares: 8,
      comments: 15,
      likes: 89
    },
    contentType: 'article'
  },
  {
    id: '3',
    author: users[2], // Emily Watson
    content: 'The art of data storytelling: How I transformed a complex 50-page report into a single, compelling visualization that got the entire leadership team on board. Sometimes less is truly more when it comes to data communication. #DataStorytelling #Visualization #Leadership',
    timestamp: '1 day ago',
    likes: 234,
    comments: 31,
    shares: 18,
    personaRelevance: {
      'data-viz': 88,
      'creative-design': 82,
      'business-strategy': 70,
      'tech-innovation': 40
    },
    tags: ['data-storytelling', 'visualization', 'leadership'],
    engagement: {
      views: 3200,
      shares: 18,
      comments: 31,
      likes: 234
    },
    contentType: 'image'
  },

  // Business Strategy Posts
  {
    id: '4',
    author: users[3], // David Kim
    content: 'Strategic insight: Companies that invest in digital transformation during economic downturns emerge 40% stronger. The key isn\'t just technology adoption - it\'s cultural change. My latest analysis of 100+ companies reveals 3 critical success factors. #DigitalTransformation #Strategy #Leadership',
    timestamp: '3 hours ago',
    likes: 312,
    comments: 47,
    shares: 28,
    personaRelevance: {
      'business-strategy': 95,
      'tech-innovation': 70,
      'data-viz': 55,
      'creative-design': 30
    },
    tags: ['digital-transformation', 'strategy', 'leadership'],
    engagement: {
      views: 4500,
      shares: 28,
      comments: 47,
      likes: 312
    },
    contentType: 'article'
  },
  {
    id: '5',
    author: users[4], // Jennifer Liu
    content: 'Innovation isn\'t just about technology - it\'s about mindset. Working with a Fortune 500 client, we discovered that their biggest barrier to innovation wasn\'t budget, but fear of failure. Here\'s how we built a culture that embraces experimentation. #Innovation #CultureChange #Consulting',
    timestamp: '6 hours ago',
    likes: 198,
    comments: 29,
    shares: 15,
    personaRelevance: {
      'business-strategy': 85,
      'tech-innovation': 78,
      'creative-design': 50,
      'data-viz': 45
    },
    tags: ['innovation', 'culture-change', 'consulting'],
    engagement: {
      views: 2800,
      shares: 15,
      comments: 29,
      likes: 198
    },
    contentType: 'text'
  },

  // Creative Design Posts
  {
    id: '6',
    author: users[5], // Alex Thompson
    content: 'Design systems aren\'t just about consistency - they\'re about enabling teams to move faster while maintaining quality. Just launched our new design system that reduced development time by 40%. Here\'s how we did it... #DesignSystems #UX #ProductDesign',
    timestamp: '4 hours ago',
    likes: 267,
    comments: 38,
    shares: 22,
    personaRelevance: {
      'creative-design': 92,
      'tech-innovation': 65,
      'business-strategy': 55,
      'data-viz': 35
    },
    tags: ['design-systems', 'ux', 'product-design'],
    engagement: {
      views: 3800,
      shares: 22,
      comments: 38,
      likes: 267
    },
    contentType: 'image'
  },
  {
    id: '7',
    author: users[6], // Maria Garcia
    content: 'The intersection of design and technology is where magic happens. Just prototyped an AR interface that could revolutionize how we interact with data. Sometimes the craziest ideas lead to the most innovative solutions. #AR #Design #Innovation #FutureTech',
    timestamp: '8 hours ago',
    likes: 145,
    comments: 24,
    shares: 19,
    personaRelevance: {
      'creative-design': 85,
      'tech-innovation': 90,
      'data-viz': 60,
      'business-strategy': 40
    },
    tags: ['ar', 'design', 'innovation', 'future-tech'],
    engagement: {
      views: 2100,
      shares: 19,
      comments: 24,
      likes: 145
    },
    contentType: 'video'
  },

  // Tech Innovation Posts
  {
    id: '8',
    author: users[7], // Robert Chang
    content: 'Cloud architecture patterns that scale: Just migrated a 10M user platform to microservices with 99.99% uptime. The key? Event-driven architecture and proper service mesh implementation. Technical deep dive coming soon... #Cloud #Architecture #Scalability',
    timestamp: '1 hour ago',
    likes: 189,
    comments: 33,
    shares: 16,
    personaRelevance: {
      'tech-innovation': 95,
      'data-viz': 50,
      'business-strategy': 45,
      'creative-design': 25
    },
    tags: ['cloud', 'architecture', 'scalability'],
    engagement: {
      views: 2900,
      shares: 16,
      comments: 33,
      likes: 189
    },
    contentType: 'text'
  },
  {
    id: '9',
    author: users[8], // Lisa Park
    content: 'Open source contribution highlight: Just shipped a major feature to React that improves bundle size by 15%. The power of community collaboration never ceases to amaze me. Contributing back is not just good karma - it makes everyone\'s products better. #OpenSource #React #WebDev',
    timestamp: '7 hours ago',
    likes: 156,
    comments: 27,
    shares: 14,
    personaRelevance: {
      'tech-innovation': 88,
      'creative-design': 40,
      'data-viz': 35,
      'business-strategy': 30
    },
    tags: ['open-source', 'react', 'webdev'],
    engagement: {
      views: 2300,
      shares: 14,
      comments: 27,
      likes: 156
    },
    contentType: 'article'
  }
]
