'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, BarChart3, Briefcase, Palette, Cpu, CheckCircle2, TrendingUp, FileText, Image as ImageIcon, Code, PieChart, Target, Brush, Terminal, Database, Rocket, Sparkles, Check } from 'lucide-react'
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
    question: "What's your ideal work environment?",
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
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => {
      const next = prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
      setAnswers(a => ({ ...a, [question.id]: next }))
      return next
    })
  }

  const handleNext = () => {
    if (selectedOptions.length === 0) return
    if (currentQuestion < quizQuestions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOptions(answers[quizQuestions[currentQuestion + 1]?.id] || [])
        setIsAnimating(false)
      }, 250)
    } else {
      setIsAnimating(true)
      setTimeout(() => onNext(calculateResults()), 250)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      const prevQ = quizQuestions[currentQuestion - 1]
      setCurrentQuestion(prev => prev - 1)
      setSelectedOptions(answers[prevQ.id] || [])
    } else {
      onBack()
    }
  }

  const calculateResults = (): PersonaQuizResults => {
    const scores: Record<string, number> = {
      'data-viz': 0, 'business-strategy': 0, 'creative-design': 0, 'tech-innovation': 0
    }
    Object.entries(answers).forEach(([questionId, selectedIds]) => {
      const q = quizQuestions.find(q => q.id === questionId)
      if (!q) return
      selectedIds.forEach(answerId => {
        Object.entries(q.personaWeights).forEach(([persona, weights]) => {
          if (typeof weights === 'object' && answerId in weights) {
            scores[persona] += weights[answerId]
          }
        })
      })
    })
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a).map(([p]) => p)
    return { scores, primaryPersona: sorted[0], secondaryPersona: sorted[1] }
  }

  const getIcon = (iconName: string) => {
    const cls = "w-5 h-5"
    const map: Record<string, React.ReactNode> = {
      BarChart3: <BarChart3 className={cls} />, Briefcase: <Briefcase className={cls} />,
      Palette: <Palette className={cls} />, Cpu: <Cpu className={cls} />,
      TrendingUp: <TrendingUp className={cls} />, FileText: <FileText className={cls} />,
      ImageIcon: <ImageIcon className={cls} />, Code: <Code className={cls} />,
      PieChart: <PieChart className={cls} />, Target: <Target className={cls} />,
      Brush: <Brush className={cls} />, Terminal: <Terminal className={cls} />,
      Database: <Database className={cls} />, Rocket: <Rocket className={cls} />,
      Sparkles: <Sparkles className={cls} />,
    }
    return map[iconName] ?? <BarChart3 className={cls} />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-foreground">Discover Your Professional Personas</h2>
            <span className="text-sm font-medium text-muted-foreground">
              {currentQuestion + 1} / {quizQuestions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-[#0a66c2] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">Select all that apply — you can wear multiple hats</p>
        </div>

        {/* Question Card */}
        <div className={`bg-card border border-border rounded-2xl shadow-sm p-8 transition-all duration-250 ${isAnimating ? 'scale-98 opacity-60' : 'scale-100 opacity-100'
          }`}>
          <h3 className="text-lg font-semibold text-foreground mb-6">{question.question}</h3>

          <div className="grid gap-3 mb-8">
            {question.options.map((option) => {
              const isSelected = selectedOptions.includes(option.id)
              return (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-150 text-left flex items-center gap-4 ${isSelected
                      ? 'border-[#0a66c2] bg-blue-500/8'
                      : 'border-border hover:border-muted-foreground/40 hover:bg-muted/40'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-[#0a66c2] text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                    {option.icon && getIcon(option.icon)}
                  </div>
                  <p className="flex-1 text-base font-medium text-foreground">{option.text}</p>
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-[#0a66c2] border-[#0a66c2]' : 'border-border'
                    }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOptions.length === 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${selectedOptions.length === 0
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-[#0a66c2] hover:bg-[#0055a4] text-white shadow-sm'
                }`}
            >
              {currentQuestion === quizQuestions.length - 1 ? 'See My Personas' : 'Next question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hint */}
        {selectedOptions.length > 1 && (
          <div className="mt-4 flex items-center gap-2 text-sm text-[#0a66c2]">
            <CheckCircle2 className="w-4 h-4" />
            <span>{selectedOptions.length} selected — you'll get multiple personas</span>
          </div>
        )}
      </div>
    </div>
  )
}
