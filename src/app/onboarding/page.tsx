'use client'

import { OnboardingFlow } from '@/components/OnboardingFlow'

export default function OnboardingPage() {
  const handleOnboardingComplete = () => {
    // Redirect to main app after onboarding
    window.location.href = '/'
  }

  return (
    <OnboardingFlow onComplete={handleOnboardingComplete} />
  )
}
