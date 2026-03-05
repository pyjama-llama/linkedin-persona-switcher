'use client'

/**
 * page.tsx — single source of truth for the root page.
 *
 * Hydration strategy:
 * - Server renders the skeleton (isMounted=false branch).
 * - Client initial render also hits the skeleton (isMounted starts false).
 *   → Server and client output are identical → zero hydration mismatch.
 * - useEffect runs after hydration, sets isMounted=true, reads localStorage,
 *   and transitions to either the onboarding screen or the full app.
 *
 * Why NOT dynamic({ ssr: false })?
 * That pattern causes Next.js App Router to produce a <Suspense> wrapper on
 * the client while the server renders the loading: skeleton div directly.
 * The structural mismatch triggers the hydration error every time.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { NavBar } from '@/components/NavBar'
import { PersonaSwitcher } from '@/components/PersonaSwitcher'
import { Composer } from '@/components/Composer'
import { Feed } from '@/components/Feed'
import { PodcastPlayer, type PodcastPlayerHandle } from '@/components/PodcastPlayer'
import { PodcastButton } from '@/components/PodcastButton'
import { usePersonaStore } from '@/stores/personaStore'
import { useFeedStore } from '@/stores/feedStore'
import { posts, personas } from '@/lib/dummy-data-fixed'
import { personaTopics, defaultTopics } from '@/lib/persona-topics'

// ── Skeleton shown while client-side JS initialises ─────────────────────────
function PageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <div className="md:col-span-1">
          <div className="bg-card rounded-xl border border-border h-52 animate-pulse" />
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="bg-card rounded-xl border border-border h-24 animate-pulse" />
          <div className="bg-card rounded-xl border border-border h-48 animate-pulse" />
          <div className="bg-card rounded-xl border border-border h-48 animate-pulse" />
        </div>
        <div className="md:col-span-1">
          <div className="bg-card rounded-xl border border-border h-64 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// ── Root page component ─────────────────────────────────────────────────────
export default function Home() {
  const { initializePersonas, setCurrentPersona, currentPersona } = usePersonaStore()
  const { initializeFeed } = useFeedStore()

  // isMounted stays false on the server and on the first client render.
  // After useEffect fires (post-hydration), it becomes true and we can
  // safely read localStorage.
  const [isMounted, setIsMounted] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [podcastLoading, setPodcastLoading] = useState(false)
  const [podcastHasAudio, setPodcastHasAudio] = useState(false)
  const playerRef = useRef<PodcastPlayerHandle>(null)

  // ── All hooks declared before any conditional returns ────────────────────
  const handlePodcastStateChange = useCallback((loading: boolean, hasAudio: boolean) => {
    setPodcastLoading(loading)
    setPodcastHasAudio(hasAudio)
  }, [])

  const handleGeneratePodcast = useCallback(() => {
    playerRef.current?.generate()
  }, [])

  const handleStartOnboarding = useCallback(() => {
    initializePersonas(personas)
    initializeFeed(posts)
    setCurrentPersona('data-viz')
    localStorage.setItem('onboarding-completed', 'true')
    setShowOnboarding(false)
  }, [initializePersonas, initializeFeed, setCurrentPersona])

  const handleSkipOnboarding = useCallback(() => {
    initializePersonas(personas)
    initializeFeed(posts)
    setCurrentPersona('data-viz')
    localStorage.setItem('onboarding-completed', 'true')
    setShowOnboarding(false)
  }, [initializePersonas, initializeFeed, setCurrentPersona])

  // Runs once, after hydration — safe to read localStorage here.
  useEffect(() => {
    const hasCompleted = localStorage.getItem('onboarding-completed')
    if (!hasCompleted) {
      setShowOnboarding(true)
    } else {
      initializePersonas(personas)
      initializeFeed(posts)
      setCurrentPersona('data-viz')
    }
    setIsMounted(true)
  }, [initializePersonas, initializeFeed, setCurrentPersona])

  const activeTopics = currentPersona
    ? personaTopics[currentPersona.id] ?? defaultTopics
    : defaultTopics

  // ── Render ────────────────────────────────────────────────────────────────

  // Server + first client render: identical skeleton → no hydration mismatch.
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <PageSkeleton />
      </div>
    )
  }

  // ── Onboarding ───────────────────────────────────────────────────────────
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
              Experience the future of professional networking with personalised content contexts.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">New User?</h3>
              <p className="text-gray-600 mb-6">
                Take our 2-minute quiz to discover your professional personas and get personalised content from day one.
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

  // ── Main App ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {currentPersona && (
        <PodcastPlayer
          ref={playerRef}
          personaId={currentPersona.id}
          personaName={currentPersona.name}
          personaColor={currentPersona.color}
          onStateChange={handlePodcastStateChange}
        />
      )}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">

          {/* Left Sidebar — Persona Switcher */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl shadow-sm md:sticky top-16 border border-border">
              <div className="p-3 border-b border-border">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">My Personas</h3>
              </div>
              <PersonaSwitcher />
            </div>
          </div>

          {/* Main Feed */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <Composer />
              <Feed />
            </div>
          </div>

          {/* Right Sidebar — Trending + Audio */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl shadow-sm md:sticky top-16 border border-border">
              <div className="p-3 border-b border-border">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Trending in{' '}
                  <span style={{ color: currentPersona?.color ?? '#6366f1' }}>
                    {currentPersona?.name ?? 'your context'}
                  </span>
                </h3>
              </div>
              <div className="p-3 space-y-2">
                {activeTopics.slice(0, 5).map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <span className="text-xs text-foreground font-medium truncate flex-1 mr-2">{t.topic}</span>
                    <span className="text-[10px] font-semibold text-emerald-600 flex-shrink-0">↑{t.trend}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Audio Briefing</h3>
                <PodcastButton
                  isLoading={podcastLoading}
                  hasAudio={podcastHasAudio}
                  onGenerate={handleGeneratePodcast}
                  personaColor={currentPersona?.color ?? '#6366f1'}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
