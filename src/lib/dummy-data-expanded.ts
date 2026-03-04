// Expanded dummy data with more variation in profiles for each context

export interface Persona {
  id: string
  name: string
  description: string
  icon: string
  color: string
  keywords: string[]
  skills: string[]
  interests: string[]
  contentTypes: string[]
  careerLevel: string[]
  industries: string[]
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
}

export interface Education {
  id: string
  degree: string
  school: string
  year: string
  field: string
}

export interface Post {
  id: string
  author: User
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  personaRelevance: Record<string, number>
  tags: string[]
  media?: string[]
  engagement: {
    views: number
    clickThroughRate: number
    shares: number
    comments: number
    likes: number
  }
  contentType: 'text' | 'image' | 'video' | 'article' | 'poll'
}

// Expanded Personas with more variation
export const personas: Persona[] = [
  {
    id: 'data-viz',
    name: 'Data Visualization',
    description: 'Focus on data-driven insights, analytics, and visual storytelling',
    icon: 'BarChart3',
    color: '#3B82F6',
    keywords: ['data', 'analytics', 'visualization', 'insights', 'metrics', 'dashboard'],
    skills: ['Data Analysis', 'Tableau', 'Power BI', 'Python', 'SQL', 'Statistics', 'Excel'],
    interests: ['Big Data', 'Machine Learning', 'Business Intelligence', 'Data Storytelling'],
    contentTypes: ['case studies', 'tutorials', 'industry reports', 'tool reviews'],
    careerLevel: ['analyst', 'scientist', 'manager', 'director'],
    industries: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing']
  },
  {
    id: 'business-strategy',
    name: 'Business Strategy',
    description: 'Strategic planning, market analysis, and business development',
    icon: 'Briefcase',
    color: '#10B981',
    keywords: ['strategy', 'planning', 'growth', 'innovation', 'leadership', 'management'],
    skills: ['Strategic Planning', 'Market Analysis', 'Business Development', 'Leadership', 'Project Management', 'Financial Analysis'],
    interests: ['Market Trends', 'Competitive Intelligence', 'Digital Transformation', 'M&A'],
    contentTypes: ['thought leadership', 'case studies', 'industry analysis', 'executive insights'],
    careerLevel: ['manager', 'director', 'vp', 'executive'],
    industries: ['Consulting', 'Technology', 'Finance', 'Healthcare', 'Manufacturing']
  },
  {
    id: 'creative-design',
    name: 'Creative Design',
    description: 'UI/UX design, visual communication, and creative problem-solving',
    icon: 'Palette',
    color: '#F59E0B',
    keywords: ['design', 'creativity', 'ui', 'ux', 'visual', 'innovation'],
    skills: ['UI Design', 'UX Research', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'Design Systems'],
    interests: ['Design Trends', 'User Experience', 'Brand Strategy', 'Creative Technology'],
    contentTypes: ['portfolio pieces', 'design tutorials', 'case studies', 'trend analysis'],
    careerLevel: ['designer', 'lead', 'manager', 'director'],
    industries: ['Technology', 'Advertising', 'Media', 'E-commerce', 'Entertainment']
  },
  {
    id: 'tech-innovation',
    name: 'Tech Innovation',
    description: 'Emerging technologies, software development, and digital transformation',
    icon: 'Cpu',
    color: '#8B5CF6',
    keywords: ['technology', 'innovation', 'development', 'ai', 'cloud', 'digital'],
    skills: ['Software Development', 'Cloud Architecture', 'AI/ML', 'DevOps', 'System Design', 'Agile'],
    interests: ['Emerging Tech', 'Open Source', 'Digital Transformation', 'Tech Leadership'],
    contentTypes: ['technical tutorials', 'project showcases', 'tech trends', 'code reviews'],
    careerLevel: ['developer', 'engineer', 'architect', 'cto'],
    industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce', 'Automotive']
  }
]

// Expanded Users with more variation
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
    bio: 'Passionate about turning complex data into actionable insights. 10+ years in analytics across tech and healthcare.',
    experience: [
      {
        id: 'exp1',
        title: 'Senior Data Scientist',
        company: 'TechCorp',
        duration: '2020 - Present',
        description: 'Leading analytics initiatives for product optimization',
        skills: ['Python', 'Machine Learning', 'Tableau', 'SQL'],
        industry: 'Technology',
        companySize: '1000-5000'
      },
      {
        id: 'exp2',
        title: 'Data Analyst',
        company: 'HealthTech Inc',
        duration: '2018 - 2020',
        description: 'Healthcare data analysis and visualization',
        skills: ['R', 'Power BI', 'Statistics', 'Healthcare Analytics'],
        industry: 'Healthcare',
        companySize: '500-1000'
      }
    ],
    skills: ['Data Science', 'Machine Learning', 'Tableau', 'Python', 'SQL', 'Statistics'],
    education: [
      {
        id: 'edu1',
        degree: 'MS Data Science',
        school: 'Stanford University',
        year: '2018',
        field: 'Data Science'
      }
    ],
    industry: 'Technology',
    companySize: '1000-5000',
    careerStage: 'senior'
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
    bio: 'Helping businesses make data-driven decisions through compelling visualizations and insights.',
    experience: [
      {
        id: 'exp3',
        title: 'Business Intelligence Analyst',
        company: 'FinanceHub',
        duration: '2021 - Present',
        description: 'Creating dashboards and reports for financial analysis',
        skills: ['Power BI', 'Excel', 'Financial Analysis', 'DAX'],
        industry: 'Finance',
        companySize: '500-1000'
      }
    ],
    skills: ['Power BI', 'Excel', 'DAX', 'Financial Analysis', 'Data Modeling'],
    education: [
      {
        id: 'edu2',
        degree: 'BS Business Analytics',
        school: 'NYU Stern',
        year: '2021',
        field: 'Business Analytics'
      }
    ],
    industry: 'Finance',
    companySize: '500-1000',
    careerStage: 'mid'
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
    bio: 'Consultant specializing in data storytelling and visual communication. Making data beautiful and understandable.',
    experience: [
      {
        id: 'exp4',
        title: 'Data Visualization Consultant',
        company: 'Visual Insights LLC',
        duration: '2019 - Present',
        description: 'Consulting with Fortune 500 companies on data visualization strategy',
        skills: ['Tableau', 'D3.js', 'Design Thinking', 'Consulting'],
        industry: 'Consulting',
        companySize: '50-100'
      }
    ],
    skills: ['Tableau', 'D3.js', 'Data Storytelling', 'Design Thinking', 'Consulting'],
    education: [
      {
        id: 'edu3',
        degree: 'MA Information Design',
        school: 'Carnegie Mellon',
        year: '2019',
        field: 'Information Design'
      }
    ],
    industry: 'Consulting',
    companySize: '50-100',
    careerStage: 'senior'
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
    bio: 'Strategic leader with 15+ years in business development and M&A. Helping companies scale and transform.',
    experience: [
      {
        id: 'exp5',
        title: 'VP Strategy',
        company: 'GlobalTech',
        duration: '2018 - Present',
        description: 'Leading corporate strategy and M&A initiatives',
        skills: ['Strategic Planning', 'M&A', 'Business Development', 'Leadership'],
        industry: 'Technology',
        companySize: '5000+'
      }
    ],
    skills: ['Strategic Planning', 'M&A', 'Business Development', 'Leadership', 'Financial Modeling'],
    education: [
      {
        id: 'edu4',
        degree: 'MBA',
        school: 'Harvard Business School',
        year: '2008',
        field: 'Business Administration'
      }
    ],
    industry: 'Technology',
    companySize: '5000+',
    careerStage: 'executive'
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
    bio: 'Helping organizations navigate digital transformation and innovation challenges.',
    experience: [
      {
        id: 'exp6',
        title: 'Senior Strategy Consultant',
        company: 'McKinsey & Company',
        duration: '2020 - Present',
        description: 'Digital transformation and innovation consulting',
        skills: ['Digital Strategy', 'Innovation', 'Change Management', 'Consulting'],
        industry: 'Consulting',
        companySize: '1000-5000'
      }
    ],
    skills: ['Digital Strategy', 'Innovation', 'Change Management', 'Consulting', 'Agile'],
    education: [
      {
        id: 'edu5',
        degree: 'MS Engineering Management',
        school: 'MIT',
        year: '2020',
        field: 'Engineering Management'
      }
    ],
    industry: 'Consulting',
    companySize: '1000-5000',
    careerStage: 'senior'
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
    bio: 'Design leader passionate about creating intuitive and beautiful user experiences.',
    experience: [
      {
        id: 'exp7',
        title: 'UX Design Director',
        company: 'DesignHub',
        duration: '2019 - Present',
        description: 'Leading UX team and design system development',
        skills: ['UX Design', 'Design Systems', 'User Research', 'Team Leadership'],
        industry: 'Technology',
        companySize: '1000-5000'
      }
    ],
    skills: ['UX Design', 'UI Design', 'Figma', 'Design Systems', 'User Research'],
    education: [
      {
        id: 'edu6',
        degree: 'BFA Graphic Design',
        school: 'ArtCenter College of Design',
        year: '2015',
        field: 'Graphic Design'
      }
    ],
    industry: 'Technology',
    companySize: '1000-5000',
    careerStage: 'senior'
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
    bio: 'Bridging the gap between design and technology to create innovative products.',
    experience: [
      {
        id: 'exp8',
        title: 'Senior Product Designer',
        company: 'InnovateTech',
        duration: '2021 - Present',
        description: 'Product design for emerging technologies',
        skills: ['Product Design', 'Prototyping', 'Creative Technology', 'Brand Design'],
        industry: 'Technology',
        companySize: '100-500'
      }
    ],
    skills: ['Product Design', 'Figma', 'Prototyping', 'Creative Technology', 'Brand Design'],
    education: [
      {
        id: 'edu7',
        degree: 'MS Interaction Design',
        school: 'Carnegie Mellon',
        year: '2021',
        field: 'Interaction Design'
      }
    ],
    industry: 'Technology',
    companySize: '100-500',
    careerStage: 'mid'
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
    bio: 'Technology leader focused on cloud architecture and artificial intelligence solutions.',
    experience: [
      {
        id: 'exp9',
        title: 'CTO',
        company: 'CloudFirst',
        duration: '2019 - Present',
        description: 'Leading technology strategy and cloud transformation',
        skills: ['Cloud Architecture', 'AI/ML', 'Leadership', 'DevOps'],
        industry: 'Technology',
        companySize: '500-1000'
      }
    ],
    skills: ['Cloud Architecture', 'AI/ML', 'DevOps', 'System Design', 'Leadership'],
    education: [
      {
        id: 'edu8',
        degree: 'MS Computer Science',
        school: 'UC Berkeley',
        year: '2010',
        field: 'Computer Science'
      }
    ],
    industry: 'Technology',
    companySize: '500-1000',
    careerStage: 'executive'
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
    bio: 'Passionate developer building innovative solutions and contributing to open source.',
    experience: [
      {
        id: 'exp10',
        title: 'Senior Full Stack Developer',
        company: 'TechStartup',
        duration: '2020 - Present',
        description: 'Full stack development for innovative tech products',
        skills: ['React', 'Node.js', 'Python', 'Cloud Services', 'Open Source'],
        industry: 'Technology',
        companySize: '50-100'
      }
    ],
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Open Source', 'Full Stack Development'],
    education: [
      {
        id: 'edu9',
        degree: 'BS Computer Science',
        school: 'University of Washington',
        year: '2020',
        field: 'Computer Science'
      }
    ],
    industry: 'Technology',
    companySize: '50-100',
    careerStage: 'mid'
  }
]

// Expanded Posts with more variation
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
      clickThroughRate: 6.5,
      shares: 12,
      comments: 23,
      likes: 156
    },
    contentType: 'text'
  },
  {
    id: '2',
    author: users[1], // Michael Rodriguez
    content: 'Power BI Tip Tuesday! 🚀 Did you know you can create dynamic tooltips that change based on the data point? This small feature can dramatically improve user experience. Check out my latest tutorial on implementing this in your reports. #PowerBI #DataAnalytics #Tips',
    timestamp: '5 hours ago',
    likes: 89,
    comments: 15,
    shares: 8,
    personaRelevance: {
      'data-viz': 90,
      'business-strategy': 50,
      'creative-design': 35,
      'tech-innovation': 55
    },
    tags: ['powerbi', 'data-analytics', 'tips'],
    engagement: {
      views: 1200,
      clickThroughRate: 7.4,
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
      clickThroughRate: 8.2,
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
    content: 'Strategic insight: Companies that invest in digital transformation during economic downturns emerge 40% stronger. The key isn\'t just technology adoption - it\'s cultural change. My latest analysis of 100+ companies reveals the 3 critical success factors. #DigitalTransformation #Strategy #Leadership',
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
      clickThroughRate: 9.1,
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
      clickThroughRate: 7.8,
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
      clickThroughRate: 8.5,
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
      clickThroughRate: 8.9,
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
      clickThroughRate: 7.2,
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
      clickThroughRate: 8.1,
      shares: 14,
      comments: 27,
      likes: 156
    },
    contentType: 'article'
  }
]
