'use client'

import { usePersonaStore } from '@/stores/personaStore'
import { BarChart3, Briefcase, Palette, Cpu, CheckCircle2 } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  BarChart3,
  Briefcase,
  Palette,
  Cpu,
}

export function PersonaSwitcher() {
  const { currentPersona, userPersonas, setCurrentPersona } = usePersonaStore()

  return (
    <div className="p-3">
      <div className="mb-3 px-1">
        <p className="text-xs text-muted-foreground">Switch contexts to see relevant content</p>
      </div>

      <div className="space-y-1">
        {userPersonas.map((persona) => {
          const IconComponent = iconMap[persona.icon] ?? BarChart3
          const isActive = currentPersona?.id === persona.id

          return (
            <button
              key={persona.id}
              onClick={() => setCurrentPersona(persona)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-150 group ${isActive
                  ? 'border border-transparent'
                  : 'hover:bg-muted/60 border border-transparent'
                }`}
              style={isActive ? {
                backgroundColor: `${persona.color}18`,
                borderColor: `${persona.color}40`,
              } : {}}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    backgroundColor: isActive ? persona.color : `${persona.color}20`,
                  }}
                >
                  <IconComponent
                    className="w-4 h-4"
                    style={{ color: isActive ? '#fff' : persona.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold text-sm truncate"
                    style={{ color: isActive ? persona.color : undefined }}
                  >
                    {persona.name}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {persona.description}
                  </div>
                </div>
                {isActive && (
                  <CheckCircle2
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: persona.color }}
                  />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
