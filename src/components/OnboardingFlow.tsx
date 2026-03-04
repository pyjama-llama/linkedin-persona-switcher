'use client'

import { useState } from 'react'
import { onboardingSteps } from '@/lib/dummy-data-fixed'
import { WelcomeScreen } from './onboarding/WelcomeScreen'
import { PersonaQuiz } from './onboarding/PersonaQuiz'
import { PersonaResults } from './onboarding/PersonaResults'
import { ProfileSetup } from './onboarding/ProfileSetup'
import { PlatformDemo } from './onboarding/PlatformDemo'

interface OnboardingFlowProps {
  onComplete: () => void
}

interface PersonaQuizResults {
  scores: Record<string, number>
  primaryPersona: string
  secondaryPersona?: string
}

interface ProfileData {
  name: string
  headline: string
  location: string
  bio: string
  experience: string
  education: string
  skills: string
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [personaResults, setPersonaResults] = useState<PersonaQuizResults | null>(null)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([])

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handlePersonaResults = (results: PersonaQuizResults) => {
    setPersonaResults(results)
    const personas = [results.primaryPersona]
    if (results.secondaryPersona) {
      personas.push(results.secondaryPersona)
    }
    setSelectedPersonas(personas)
    handleNext()
  }

  const handleProfileComplete = (data: ProfileData) => {
    setProfileData(data)
    handleNext()
  }

  const renderCurrentStep = () => {
    switch (onboardingSteps[currentStep].component) {
      case 'WelcomeScreen':
        return (
          <WelcomeScreen
            onNext={handleNext}
            currentStep={currentStep}
          />
        )

      case 'PersonaQuiz':
        return (
          <PersonaQuiz
            onNext={handlePersonaResults}
            onBack={handleBack}
          />
        )

      case 'PersonaResults':
        return (
          <PersonaResults
            results={personaResults!}
            onNext={handleNext}
            onBack={handleBack}
          />
        )

      case 'ProfileSetup':
        return (
          <ProfileSetup
            onNext={handleProfileComplete}
            onBack={handleBack}
          />
        )

      case 'PlatformDemo':
        return (
          <PlatformDemo
            onComplete={onComplete}
            onBack={handleBack}
            selectedPersonas={selectedPersonas}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {renderCurrentStep()}
    </div>
  )
}
