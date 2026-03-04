'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, BarChart3, Briefcase, Palette, Cpu, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { personas } from '@/lib/dummy-data-fixed'

interface PersonaResultsProps {
  results: {
    scores: Record<string, number>
    primaryPersona: string
    secondaryPersona?: string
  }
  onNext: () => void
  onBack: () => void
}

export function PersonaResults({ results, onNext, onBack }: PersonaResultsProps) {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([
    results.primaryPersona,
    ...(results.secondaryPersona ? [results.secondaryPersona] : [])
  ])

  const primaryPersona = personas.find(p => p.id === results.primaryPersona)
  const secondaryPersona = results.secondaryPersona 
    ? personas.find(p => p.id === results.secondaryPersona)
    : null

  const togglePersona = (personaId: string) => {
    setSelectedPersonas(prev => {
      if (prev.includes(personaId)) {
        // Don't allow deselecting primary persona
        if (personaId === results.primaryPersona) return prev
        return prev.filter(id => id !== personaId)
      } else {
        // Allow max 3 personas
        if (prev.length >= 3) return prev
        return [...prev, personaId]
      }
    })
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-6 h-6" />
      case 'Briefcase': return <Briefcase className="w-6 h-6" />
      case 'Palette': return <Palette className="w-6 h-6" />
      case 'Cpu': return <Cpu className="w-6 h-6" />
      default: return <Users className="w-6 h-6" />
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-sans font-bold text-gray-900 mb-4">
            Your Professional Personas
          </h1>
          <p className="text-xl font-sans text-gray-600 max-w-2xl mx-auto mb-8">
            Based on your quiz responses, we've identified your professional personas. Select which ones you'd like to activate.
          </p>
        </div>

        {/* Primary Persona */}
        {primaryPersona && (
          <div className="mb-8">
            <h2 className="text-2xl font-sans font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              Primary Persona
            </h2>
            <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-8">
              <div className="flex items-start space-x-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: primaryPersona.color }}
                >
                  <div className="text-white">
                    {getIcon(primaryPersona.icon)}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-sans font-semibold text-gray-900 mb-4">
                    {primaryPersona.name}
                  </h2>
                  <p className="font-sans text-gray-600 mb-4">
                    {primaryPersona.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {primaryPersona.skills.slice(0, 4).map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Persona */}
        {secondaryPersona && (
          <div className="mb-8">
            <h2 className="text-xl font-sans font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                <Users className="w-3 h-3 text-blue-600" />
              </div>
              Secondary Persona
            </h2>
            <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: secondaryPersona.color }}
                >
                  <div className="text-white text-sm">
                    {getIcon(secondaryPersona.icon)}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-sans font-semibold text-gray-900 mb-2">
                    {secondaryPersona.name}
                  </h3>
                  <p className="font-sans text-gray-700">
                    {secondaryPersona.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Personas Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-sans font-semibold text-gray-900 mb-4">
            Choose Your Active Personas
          </h2>
          <p className="text-sm font-sans text-gray-500">
            Select up to 3 personas to customize your feed. Your primary persona will have the most influence.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {personas.map((persona) => {
              const score = results.scores[persona.id] || 0
              const isSelected = selectedPersonas.includes(persona.id)
              const isPrimary = persona.id === results.primaryPersona
              const isSecondary = persona.id === results.secondaryPersona

              return (
                <button
                  key={persona.id}
                  onClick={() => togglePersona(persona.id)}
                  disabled={isPrimary}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : isPrimary
                      ? 'border-green-500 bg-green-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isPrimary ? 'ring-2 ring-green-400' : ''
                      }`}
                      style={{ backgroundColor: persona.color }}
                    >
                      <div className="text-white">
                        {getIcon(persona.icon)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-sans font-semibold text-gray-900">
                          {persona.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {isPrimary && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              Primary
                            </span>
                          )}
                          {isSecondary && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              Secondary
                            </span>
                          )}
                          {isSelected && (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </div>
                      <p className="font-sans text-sm text-gray-600 mb-2">
                        {persona.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {persona.skills.slice(0, 3).map((skill) => (
                            <span 
                              key={skill}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          Score: {score}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={onNext}
            disabled={selectedPersonas.length === 0}
            size="lg"
            className="px-8"
          >
            Continue to Profile Setup
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          You can always adjust your personas later in settings
        </p>
      </div>
    </div>
  )
}
