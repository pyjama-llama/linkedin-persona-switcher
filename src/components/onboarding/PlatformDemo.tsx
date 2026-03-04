'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, Play, Pause, BarChart3, Briefcase, Palette, Cpu, Eye, Heart, MessageCircle, Share2, TrendingUp, Users, Sparkles, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { posts, users, personas } from '@/lib/dummy-data-fixed'

interface PlatformDemoProps {
  onComplete: () => void
  onBack: () => void
  selectedPersonas: string[]
}

export function PlatformDemo({ onComplete, onBack, selectedPersonas }: PlatformDemoProps) {
  const [currentPersona, setCurrentPersona] = useState(selectedPersonas[0] || 'data-viz')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [showInsights, setShowInsights] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  const currentPersonaData = personas.find(p => p.id === currentPersona)
  const filteredPosts = posts.filter(post =>
    post.personaRelevance[currentPersona] >= 70
  )
  const currentPost = filteredPosts[currentPostIndex] || filteredPosts[0]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentPostIndex(prev => {
        const next = prev + 1
        return next >= filteredPosts.length ? 0 : next
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying, filteredPosts.length])

  const handlePersonaSwitch = (personaId: string) => {
    setCurrentPersona(personaId)
    setCurrentPostIndex(0)
    setShowInsights(false)
    stopReading()
  }

  const startReading = (text: string) => {
    if ('speechSynthesis' in window) {
      stopReading()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => setIsReading(false)
      utterance.onerror = () => setIsReading(false)

      speechRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(false)
      speechRef.current = null
    }
  }

  const toggleReading = (post: any) => {
    if (isReading) {
      stopReading()
    } else {
      const text = `${post.author.name} says: ${post.content}`
      startReading(text)
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />
      case 'Briefcase': return <Briefcase className="w-5 h-5" />
      case 'Palette': return <Palette className="w-5 h-5" />
      case 'Cpu': return <Cpu className="w-5 h-5" />
      default: return <Users className="w-5 h-5" />
    }
  }

  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-sans font-bold text-gray-900">
              Professional Context Demo
            </h1>
            <p className="font-sans text-gray-600">
              See how context switching transforms your feed
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowInsights(!showInsights)}
              className="px-4"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              {showInsights ? 'Hide Insights' : 'Show Insights'}
            </Button>
            <Button
              onClick={onComplete}
              className="px-6"
            >
              Complete Onboarding
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Persona Switcher */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6">
              <h3 className="text-lg font-sans font-semibold text-gray-900 mb-4">
                Your Personas
              </h3>
              <div className="space-y-3">
                {selectedPersonas.map((personaId) => {
                  const persona = personas.find(p => p.id === personaId)
                  if (!persona) return null

                  return (
                    <button
                      key={personaId}
                      onClick={() => handlePersonaSwitch(personaId)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${currentPersona === personaId
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                          style={{ backgroundColor: persona.color }}
                        >
                          {getIcon(persona.icon)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {persona.name}
                          </div>
                          <p className="font-sans text-sm text-gray-600 mb-4">
                            {persona.description}
                          </p>
                        </div>
                        {currentPersona === personaId && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-sans font-medium text-blue-900 mb-2">
                  Current Context
                </h4>
                <div className="text-sm text-blue-700">
                  {currentPersonaData?.name}
                </div>
                <p className="font-sans text-sm text-gray-600 mb-4">
                  Showing {filteredPosts.length} posts optimized for {currentPersonaData?.name?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content - Feed */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Feed Controls */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-sans font-semibold text-gray-900 mb-4">
                      {currentPersonaData?.name} Feed
                    </h2>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {filteredPosts.length} posts
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPostIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentPostIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPostIndex(prev => Math.min(filteredPosts.length - 1, prev + 1))}
                      disabled={currentPostIndex >= filteredPosts.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>

              {/* Multiple Posts Feed */}
              <div className="space-y-4">
                {filteredPosts.slice(0, 5).map((post, index) => (
                  <div
                    key={post.id}
                    className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${index === currentPostIndex
                      ? 'border-blue-500 shadow-xl scale-[1.02]'
                      : 'border-gray-100 hover:border-gray-300'
                      }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={post.author.profileImage}
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {post.author.name}
                              </h4>
                              <p className="font-sans text-sm text-gray-500">
                                {Math.round(post.personaRelevance[currentPersona] * 100)}% relevant
                              </p>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(post.personaRelevance[currentPersona])}`}>
                              {post.personaRelevance[currentPersona]}% relevant
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-sans text-gray-900 whitespace-pre-wrap leading-relaxed">
                          {post.content}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{post.timestamp}</span>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => toggleReading(post)}
                            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${isReading
                              ? 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              }`}
                          >
                            <Volume2 className="w-4 h-4" />
                            <span className="font-sans text-gray-600 text-sm">
                              {post.author.name} • {post.timestamp}
                            </span>
                          </button>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.engagement.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.engagement.comments}
                          </span>
                          <span className="flex items-center">
                            <Share2 className="w-4 h-4 mr-1" />
                            {post.engagement.shares}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Insights */}
          <div className="lg:col-span-1">
            {showInsights && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                  Context Insights
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Engagement Boost
                    </h4>
                    <div className="text-2xl font-bold text-blue-600">
                      3x higher
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      vs traditional feed
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">
                      Time Saved
                    </h4>
                    <div className="text-2xl font-bold text-green-600">
                      12.4 min/day
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      finding relevant content
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">
                      Content Quality
                    </h4>
                    <div className="text-2xl font-bold text-purple-600">
                      85%
                    </div>
                    <p className="text-sm text-purple-700 mt-1">
                      relevance score
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      How it Works
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• AI analyzes content relevance</li>
                      <li>• Filters by professional context</li>
                      <li>• Adapts to your preferences</li>
                      <li>• Learns from engagement</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
