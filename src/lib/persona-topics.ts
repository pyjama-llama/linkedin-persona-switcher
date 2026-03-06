/**
 * Trending topics per persona – single source of truth.
 * Used by both the front-end sidebar and the /api/podcast route.
 */

export type TrendingTopic = { topic: string; trend: string }

export const personaTopics: Record<string, TrendingTopic[]> = {
    'data-viz': [
        { topic: 'Tableau Public', trend: '+41%' },
        { topic: 'D3.js v7', trend: '+28%' },
        { topic: 'Dashboard Design', trend: '+19%' },
        { topic: 'SQL Analytics', trend: '+15%' },
        { topic: 'Data Storytelling', trend: '+34%' },
    ],
    'business-strategy': [
        { topic: 'OKR Frameworks', trend: '+52%' },
        { topic: 'M&A Strategy', trend: '+23%' },
        { topic: 'GTM Playbooks', trend: '+38%' },
        { topic: 'Chief of Staff', trend: '+61%' },
        { topic: 'P&L Management', trend: '+17%' },
    ],
    'creative-design': [
        { topic: 'Figma Variables', trend: '+74%' },
        { topic: 'Design Systems', trend: '+43%' },
        { topic: 'Motion Design', trend: '+29%' },
        { topic: 'UX Research', trend: '+22%' },
        { topic: 'Brand Identity', trend: '+18%' },
    ],
    'tech-innovation': [
        { topic: 'LLM Engineering', trend: '+89%' },
        { topic: 'RAG Architecture', trend: '+67%' },
        { topic: 'AI Agents', trend: '+112%' },
        { topic: 'MLOps', trend: '+31%' },
        { topic: 'Open Source LLMs', trend: '+58%' },
    ],
    'chief-of-staff': [
        { topic: 'Operational Excellence', trend: '+84%' },
        { topic: 'AI-First Marketing', trend: '+76%' },
        { topic: 'Cross-Functional Alignment', trend: '+45%' },
        { topic: 'Executive Advisory', trend: '+39%' },
        { topic: 'Solutions Marketing', trend: '+52%' },
    ],
}

export const defaultTopics: TrendingTopic[] = [
    { topic: 'AI & Machine Learning', trend: '+23%' },
    { topic: 'Data Visualization', trend: '+18%' },
    { topic: 'Business Strategy', trend: '+14%' },
    { topic: 'UX Design', trend: '+21%' },
]
