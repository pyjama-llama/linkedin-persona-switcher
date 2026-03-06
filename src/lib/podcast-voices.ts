/**
 * ElevenLabs voice assignments per persona.
 *
 * All voices below are free "premade" voices available on every ElevenLabs plan.
 * You can browse and swap IDs at: https://elevenlabs.io/voice-library
 *
 * Selected for calm, measured delivery with Nordic / Northern-European character.
 */

export interface PersonaVoice {
  voiceId: string
  name: string
  description: string
  stability: number       // 0–1, higher = more consistent (less expressive)
  similarityBoost: number // 0–1, higher = closer to original voice
  style: number           // 0–1, 0 = neutral tone (best for calm reads)
}

export const PERSONA_VOICES: Record<string, PersonaVoice> = {
  'data-viz': {
    // Lily – velvety British female, calm and confident — great for narration
    voiceId: 'pFZP5JQG7iQjIQuC4Bku',
    name: 'Lily',
    description: 'Velvety, calm British female narrator',
    stability: 0.78,
    similarityBoost: 0.75,
    style: 0,
  },
  'business-strategy': {
    // Liam – energetic, confident American male
    voiceId: 'TX3LPaxmHKxFdv7VOQHJ',
    name: 'Liam',
    description: 'Clear and composed male',
    stability: 0.80,
    similarityBoost: 0.75,
    style: 0,
  },
  'creative-design': {
    // Matilda – professional American female with pleasing alto pitch
    voiceId: 'XrExE9yKIg1WjnnlVkGX',
    name: 'Matilda',
    description: 'Professional, knowledgeable American female',
    stability: 0.75,
    similarityBoost: 0.75,
    style: 0,
  },
  'tech-innovation': {
    // Eric – smooth, trustworthy American male
    voiceId: 'cjVigY5qzO86Huf0OWal',
    name: 'Eric',
    description: 'Measured and analytical male',
    stability: 0.78,
    similarityBoost: 0.75,
    style: 0,
  },
  'chief-of-staff': {
    // Sarah - Calm, professional, great for narration
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah pre-made voice ID
    name: 'Sarah',
    description: 'Professional, articulate female',
    stability: 0.78,
    similarityBoost: 0.75,
    style: 0,
  },
}

/** Fallback voice if persona not found */
export const DEFAULT_VOICE: PersonaVoice = PERSONA_VOICES['business-strategy']

export function getVoiceForPersona(personaId: string): PersonaVoice {
  return PERSONA_VOICES[personaId] ?? DEFAULT_VOICE
}
