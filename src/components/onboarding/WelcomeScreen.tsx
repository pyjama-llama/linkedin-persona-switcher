'use client'

import { useState } from 'react'
import { ArrowRight, Target, Filter, Layers } from 'lucide-react'
import { onboardingSteps } from '@/lib/dummy-data-fixed'

interface WelcomeScreenProps {
  onNext: () => void
  currentStep: number
}

export function WelcomeScreen({ onNext, currentStep }: WelcomeScreenProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    setIsAnimating(true)
    setTimeout(() => { onNext() }, 300)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0a66c2] to-[#0055a4] rounded-2xl mb-6 shadow-lg">
            <Layers className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
            Professional Context Switching
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            LinkedIn shows you everything. This shows you what matters —
            filtered by the professional context you're in right now.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
            <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5">
              <Layers className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Multiple Professional Hats
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You're not just one thing at work. Set up personas for each role you wear —
              strategist, builder, creator, analyst — and switch between them instantly.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
            <div className="w-11 h-11 bg-purple-500/10 rounded-xl flex items-center justify-center mb-5">
              <Filter className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Signal Over Noise
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every post is scored for relevance to your active context.
              No more scrolling past startup hustle posts when you're in deep analysis mode.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-7 shadow-sm">
            <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5">
              <Target className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Reach the Right Audience
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When your post is tagged to a persona context, it surfaces to the people
              who are actually in that headspace — not just your whole network.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            {onboardingSteps.map((step, index) => (
              <div
                key={step.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${index <= currentStep
                    ? 'bg-[#0a66c2] w-8'
                    : 'bg-border w-2'
                  }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Step {currentStep + 1} of {onboardingSteps.length}
          </p>

          <button
            onClick={handleNext}
            className={`inline-flex items-center gap-2 bg-[#0a66c2] hover:bg-[#0055a4] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-md hover:shadow-lg ${isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
              }`}
          >
            Discover Your Professional Personas
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm text-muted-foreground mt-4">
            Takes 2 minutes · No sign-up required for the demo
          </p>
        </div>
      </div>
    </div>
  )
}
