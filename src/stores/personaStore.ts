import { create } from 'zustand'
import { Persona } from '@/types'

interface PersonaState {
  currentPersona: Persona | null
  userPersonas: Persona[]
  personaWeights: Record<string, number>
  setCurrentPersona: (persona: Persona | string) => void
  updateUserPersonas: (personas: Persona[]) => void
  adjustPersonaWeight: (personaId: string, weight: number) => void
  initializePersonas: (personas: Persona[]) => void
}

export const usePersonaStore = create<PersonaState>((set, get) => ({
  currentPersona: null,
  userPersonas: [],
  personaWeights: {},

  setCurrentPersona: (persona) => {
    if (typeof persona === 'string') {
      // Find persona by ID
      const foundPersona = get().userPersonas.find(p => p.id === persona)
      if (foundPersona) {
        set({ currentPersona: foundPersona })
      }
    } else {
      set({ currentPersona: persona })
    }
  },

  updateUserPersonas: (personas) => set({ userPersonas: personas }),

  adjustPersonaWeight: (personaId, weight) => 
    set((state) => ({
      personaWeights: {
        ...state.personaWeights,
        [personaId]: weight
      }
    })),

  initializePersonas: (personas) => {
    const initialWeights: Record<string, number> = {}
    personas.forEach(persona => {
      initialWeights[persona.id] = 1.0
    })
    set({ 
      userPersonas: personas,
      currentPersona: personas[0],
      personaWeights: initialWeights 
    })
  }
}))
