'use client'

import { useState, useEffect } from 'react'
import { PersonaSwitcher } from '@/components/PersonaSwitcher'
import { Composer } from '@/components/Composer'
import { Feed } from '@/components/Feed'
import { ThemeToggle } from '@/components/ThemeToggle'
import { NavBar } from '@/components/NavBar'
import { usePersonaStore } from '@/stores/personaStore'
import { useFeedStore } from '@/stores/feedStore'
import { users, posts, personas } from '@/lib/dummy-data-fixed'

const personaTopics: Record<string, { topic: string; trend: string }[]> = {
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
}

const defaultTopics = [
  { topic: 'AI & Machine Learning', trend: '+23%' },
  { topic: 'Data Visualization', trend: '+18%' },
  { topic: 'Business Strategy', trend: '+14%' },
  { topic: 'UX Design', trend: '+21%' },
]

export default function Home() {
  const { initializePersonas, setCurrentPersona, currentPersona } = usePersonaStore()
  const { initializeFeed } = useFeedStore()
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding-completed')

    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    } else {
      initializePersonas(personas)
      initializeFeed(posts)
      setCurrentPersona('data-viz')
    }
  }, [initializePersonas, initializeFeed, setCurrentPersona])

  const handleStartOnboarding = () => {
    window.location.href = '/onboarding'
  }

  const handleSkipOnboarding = () => {
    try {
      localStorage.setItem('onboarding-completed', 'true')
      setShowOnboarding(false)
      if (personas?.length > 0) {
        initializePersonas(personas)
        setCurrentPersona(personas[0].id)
      }
      if (posts?.length > 0) {
        initializeFeed(posts)
      }
    } catch (error) {
      console.error('Error during skip onboarding:', error)
      setShowOnboarding(false)
    }
  }

  const activeTopics = currentPersona
    ? personaTopics[currentPersona.id] || defaultTopics
    : defaultTopics

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
              <span className="text-white text-2xl font-bold">PC</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Professional Context Switching
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience the future of professional networking with personalized content contexts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">New User?</h3>
              <p className="text-gray-600 mb-6">
                Take our 2-minute quiz to discover your professional personas and get personalized content from day one.
              </p>
              <button
                onClick={handleStartOnboarding}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Start Onboarding
              </button>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Already Know Your Personas?</h3>
              <p className="text-gray-600 mb-6">
                Skip the quiz and jump directly to the platform with default settings.
              </p>
              <button
                onClick={handleSkipOnboarding}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Skip to Platform
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500">You can always take the quiz later in Settings</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
          {/* Left Sidebar - Persona Switcher */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-sm sticky top-18 border border-border">
              <div className="p-3 border-b border-border flex justify-between items-center">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">My Personas</h3>
                <ThemeToggle />
              </div>
              <PersonaSwitcher />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <Composer />
              <Feed />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-sm sticky top-18 border border-border">
              <div className="p-3 border-b border-border">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Trending in{' '}
                  <span style={{ color: currentPersona?.color || '#0a66c2' }}>
                    {currentPersona?.name || 'Your Context'}
                  </span>
                </h3>
              </div>
              <div className="p-3 space-y-4">
                {/* Dynamic Topics */}
                <div className="space-y-1">
                  {activeTopics.map((item) => (
                    <div
                      key={item.topic}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <span className="text-xs font-medium text-foreground">{item.topic}</span>
                      <span className="text-xs font-semibold text-green-600">{item.trend}</span>
                    </div>
                  ))}
                </div>

                {/* Suggested Connections */}
                <div className="border-t border-border pt-3">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                    People to Follow
                  </h4>
                  <div className="space-y-3">
                    {users.slice(0, 4).map((user) => (
                      <div key={user.id} className="flex items-center gap-2 group">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {user.avatar}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate line-clamp-1">{user.headline}</p>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex-shrink-0 border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-full px-2 py-0.5 transition-colors">
                          + Follow
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
