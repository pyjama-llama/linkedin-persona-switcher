'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, BarChart3, Briefcase, Palette, Cpu, CheckCircle, TrendingUp, FileText, Image as ImageIcon, Code, PieChart, Target, Brush, Terminal, Database, Rocket, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { personas, QuizQuestion } from '@/lib/dummy-data-fixed'

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What best describes your primary work focus?',
    options: [
      { id: 'a', text: 'Analyzing data and creating insights', icon: 'BarChart3' },
      { id: 'b', text: 'Developing strategic plans and business growth', icon: 'Briefcase' },
      { id: 'c', text: 'Creating visual designs and user experiences', icon: 'Palette' },
      { id: 'd', text: 'Building and implementing technology solutions', icon: 'Cpu' }
    ],
    personaWeights: {
      'data-viz': { a: 3, b: 1, c: 0, d: 2 },
      'business-strategy': { a: 1, b: 3, c: 1, d: 1 },
      'creative-design': { a: 0, b: 1, c: 3, d: 1 },
      'tech-innovation': { a: 2, b: 1, c: 1, d: 3 }
    }
  },
  {
    id: 'q2',
    question: 'What type of content do you most enjoy creating or consuming?',
    options: [
      { id: 'a', text: 'Data visualizations and analytics reports', icon: 'TrendingUp' },
      { id: 'b', text: 'Business case studies and market analysis', icon: 'FileText' },
      { id: 'c', text: 'Design portfolios and creative showcases', icon: 'ImageIcon' },
      { id: 'd', text: 'Technical tutorials and code reviews', icon: 'Code' }
    ],
    personaWeights: {
      'data-viz': { a: 3, b: 2, c: 0, d: 1 },
      'business-strategy': { a: 2, b: 3, c: 1, d: 0 },
      'creative-design': { a: 0, b: 1, c: 3, d: 1 },
      'tech-innovation': { a: 1, b: 0, c: 1, d: 3 }
    }
  },
  {
    id: 'q3',
    question: 'Which skills are most critical to your role?',
    options: [
      { id: 'a', text: 'Data analysis, statistics, and visualization tools', icon: 'PieChart' },
      { id: 'b', text: 'Strategic thinking, leadership, and business acumen', icon: 'Target' },
      { id: 'c', text: 'Design thinking, creativity, and visual communication', icon: 'Brush' },
      { id: 'd', text: 'Programming, system architecture, and problem-solving', icon: 'Terminal' }
    ],
    personaWeights: {
      'data-viz': { a: 3, b: 1, c: 0, d: 2 },
      'business-strategy': { a: 1, b: 3, c: 1, d: 0 },
      'creative-design': { a: 0, b: 1, c: 3, d: 1 },
      'tech-innovation': { a: 2, b: 0, c: 1, d: 3 }
    }
  },
  {
    id: 'q4',
    question: 'What\'s your ideal work environment?',
    options: [
      { id: 'a', text: 'Data-driven organization focused on metrics and insights', icon: 'Database' },
      { id: 'b', text: 'Strategic leadership role with growth responsibilities', icon: 'TrendingUp' },
      { id: 'c', text: 'Creative studio or design-focused team', icon: 'Sparkles' },
      { id: 'd', text: 'Technology company or innovation lab', icon: 'Rocket' }
    ],
    personaWeights: {
      'data-viz': { a: 3, b: 1, c: 0, d: 2 },
      'business-strategy': { a: 1, b: 3, c: 1, d: 1 },
      'creative-design': { a: 0, b: 1, c: 3, d: 1 },
      'tech-innovation': { a: 2, b: 1, c: 1, d: 3 }
    }
  }
]

interface PersonaQuizProps {
  onNext: (results: PersonaQuizResults) => void
  onBack: () => void
}

interface PersonaQuizResults {
  scores: Record<string, number>
  primaryPersona: string
  secondaryPersona?: string
}

export function PersonaQuiz({ onNext, onBack }: PersonaQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [isAnimating, setIsAnimating] = useState(false)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setAnswers(prev => ({
      ...prev,
      [question.id]: optionId
    }))
  }

  const handleNext = () => {
    if (!selectedOption) return

    if (currentQuestion < quizQuestions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOption('')
        setIsAnimating(false)
      }, 300)
    } else {
      // Calculate results
      const results = calculateResults()
      setIsAnimating(true)
      setTimeout(() => {
        onNext(results)
      }, 300)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedOption(answers[quizQuestions[currentQuestion - 1].id] || '')
    } else {
      onBack()
    }
  }

  const calculateResults = (): PersonaQuizResults => {
    const scores: Record<string, number> = {
      'data-viz': 0,
      'business-strategy': 0,
      'creative-design': 0,
      'tech-innovation': 0
    }

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = quizQuestions.find(q => q.id === questionId)
      if (question) {
        Object.entries(question.personaWeights).forEach(([persona, weights]) => {
          if (typeof weights === 'object' && answerId in weights) {
            scores[persona] += weights[answerId]
          }
        })
      }
    })

    // Find primary and secondary personas
    const sortedPersonas = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([persona]) => persona)

    return {
      scores,
      primaryPersona: sortedPersonas[0],
      secondaryPersona: sortedPersonas[1] !== sortedPersonas[0] ? sortedPersonas[1] : undefined
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-6 h-6" />
      case 'Briefcase': return <Briefcase className="w-6 h-6" />
      case 'Palette': return <Palette className="w-6 h-6" />
      case 'Cpu': return <Cpu className="w-6 h-6" />
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />
      case 'FileText': return <FileText className="w-6 h-6" />
      case 'ImageIcon': return <ImageIcon className="w-6 h-6" />
      case 'Code': return <Code className="w-6 h-6" />
      case 'PieChart': return <PieChart className="w-6 h-6" />
      case 'Target': return <Target className="w-6 h-6" />
      case 'Brush': return <Brush className="w-6 h-6" />
      case 'Terminal': return <Terminal className="w-6 h-6" />
      case 'Database': return <Database className="w-6 h-6" />
      case 'Rocket': return <Rocket className="w-6 h-6" />
      case 'Sparkles': return <Sparkles className="w-6 h-6" />
      default: return <BarChart3 className="w-6 h-6" />
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4 font-sans">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-sans font-bold text-gray-900 mb-6">
              Discover Your Professional Personas
            </h2>
            <p className="text-sm font-sans text-gray-500 mb-8">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 ${
          isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
        }`}>
          <div className="mb-8">
            <h3 className="text-lg font-sans font-semibold text-gray-900 mb-4">
              {question.question}
            </h3>
            <p className="font-sans text-gray-600 mb-8">
              Answer 4 quick questions to help us understand your professional context and preferences.
            </p>
          </div>

          {/* Options */}
          <div className="grid gap-4 mb-8">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedOption === option.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedOption === option.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.icon && getIcon(option.icon)}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-sans font-medium text-gray-900">
                      {option.text}
                    </p>
                  </div>
                  {selectedOption === option.id && (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              size="lg"
              className="px-8"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Persona Preview */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {personas.map((persona) => (
            <div
              key={persona.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedOption && 
                question.personaWeights[persona.id] && 
                typeof question.personaWeights[persona.id] === 'object' &&
                question.personaWeights[persona.id][selectedOption] > 0
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-100 bg-white'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: persona.color }}
                >
                  {getIcon(persona.icon)}
                </div>
                <span className="font-sans text-gray-900">{persona.name}</span>
              </div>
              {selectedOption && 
                question.personaWeights[persona.id] && 
                typeof question.personaWeights[persona.id] === 'object' &&
                question.personaWeights[persona.id][selectedOption] > 0 && (
                <div className="text-xs text-blue-600">
                  +{question.personaWeights[persona.id][selectedOption]} points
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
