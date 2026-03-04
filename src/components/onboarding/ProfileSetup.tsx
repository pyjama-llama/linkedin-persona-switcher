'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Upload, User, MapPin, Briefcase, GraduationCap, Link as LinkIcon, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProfileSetupProps {
  onNext: (profileData: ProfileData) => void
  onBack: () => void
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

export function ProfileSetup({ onNext, onBack }: ProfileSetupProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    headline: '',
    location: '',
    bio: '',
    experience: '',
    education: '',
    skills: ''
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const steps = [
    { title: 'Basic Info', icon: User },
    { title: 'Experience', icon: Briefcase },
    { title: 'Education', icon: GraduationCap },
    { title: 'Skills', icon: CheckCircle }
  ]

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    console.log('ProfileSetup - handleNext called', { currentStep, profileData, isValid: isStepValid() })
    if (currentStep < steps.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      console.log('ProfileSetup - completing with data:', profileData)
      onNext(profileData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(prev => prev - 1)
        setIsAnimating(false)
      }, 300)
    } else {
      onBack()
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return profileData.name.trim() !== '' && profileData.headline.trim() !== '' && profileData.location.trim() !== ''
      case 1: return profileData.experience.trim() !== ''
      case 2: return profileData.education.trim() !== ''
      case 3: return profileData.skills.trim() !== ''
      default: return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Headline
              </label>
              <input
                type="text"
                value={profileData.headline}
                onChange={(e) => handleInputChange('headline', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                placeholder="Senior Data Scientist | Analytics Leader"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                placeholder="Passionate about turning complex data into actionable insights..."
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Experience
              </label>
              <textarea
                value={profileData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                placeholder="Senior Data Scientist at TechCorp (2020 - Present)&#10;&#10;Leading analytics initiatives for product optimization and customer insights. Built predictive models that reduced churn by 25%."
              />
            </div>
            <p className="text-sm text-gray-500">
              Include your current role, company, and key responsibilities
            </p>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <textarea
                value={profileData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                placeholder="MS Data Science, Stanford University (2018)"
              />
            </div>
            <p className="font-sans text-gray-600 mb-8">
              Help us personalize your experience by adding your professional information.
            </p>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Skills
              </label>
              <textarea
                value={profileData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                placeholder="Data Science, Machine Learning, Tableau, Python, SQL, Statistics"
              />
            </div>
            <p className="font-sans text-gray-600 mb-8">
              Help us personalize your experience by adding your professional information.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-sans font-semibold text-blue-900 mb-2">
                Profile Completion Tips
              </h4>
              <ul className="font-sans text-sm text-blue-800 space-y-1">
                <li>• Add a professional photo to increase profile views by 21%</li>
                <li>• Complete all sections to appear in more searches</li>
                <li>• Include specific skills and achievements</li>
                <li>• Get recommendations from colleagues</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4 font-sans">
      <div className="max-w-2xl w-full">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div key={step.title} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    index <= currentStep
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-1 mx-4 transition-all duration-200 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
          <h1 className="font-sans text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h1>
        </div>

        {/* Form Content */}
        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 ${
          isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
        }`}>
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              className="px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 0 ? 'Back to Personas' : 'Previous'}
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              size="lg"
              className="px-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next Step'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {currentStep === 0 && "Your profile is your professional brand - make it count!"}
            {currentStep === 1 && "Be specific about your achievements and impact"}
            {currentStep === 2 && "Include your most relevant and recent education"}
            {currentStep === 3 && "Skills help recruiters find you for the right opportunities"}
          </p>
        </div>
      </div>
    </div>
  )
}
