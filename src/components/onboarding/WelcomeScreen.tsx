'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { onboardingSteps } from '@/lib/dummy-data-complete'

interface WelcomeScreenProps {
  onNext: () => void
  currentStep: number
}

export function WelcomeScreen({ onNext, currentStep }: WelcomeScreenProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onNext()
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-sans font-bold text-gray-900 mb-4">
            Welcome to Professional Context Switching
          </h1>
          <p className="text-xl font-sans text-gray-600 max-w-2xl mx-auto mb-8">
            Transform your professional networking with AI-powered context awareness. 
            Get the right content in the right context, every time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-sans font-semibold text-gray-900 mb-2">
              Personalized Personas
            </h3>
            <p className="font-sans text-gray-600">
              Switch between professional contexts like Data Visualization, Business Strategy, Creative Design, and Tech Innovation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-sans font-semibold text-gray-900 mb-2">
              3x Better Engagement
            </h3>
            <p className="font-sans text-gray-600">
              Our context-aware algorithm delivers 3x higher engagement than traditional professional networks.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-sans font-semibold text-gray-900 mb-2">
              Smart Content Filtering
            </h3>
            <p className="font-sans text-gray-600">
              AI-powered filtering ensures you only see content relevant to your current work context.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {onboardingSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 w-2'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm font-sans text-gray-500">
              Step {currentStep + 1} of {onboardingSteps.length}
            </p>
          </div>

          <Button
            onClick={handleNext}
            size="lg"
            className={`px-8 py-4 text-lg transition-all duration-300 ${
              isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
            }`}
          >
            Discover Your Professional Personas
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <p className="text-sm font-sans text-gray-500 mt-4">
            Takes 2 minutes • No credit card required
          </p>
        </div>
      </div>
    </div>
  )
}
