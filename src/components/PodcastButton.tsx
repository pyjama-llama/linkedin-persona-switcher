'use client'

import { useState } from 'react'

interface PodcastButtonProps {
    personaColor: string
    onGenerate: () => void
    isLoading: boolean
    hasAudio: boolean
}

export function PodcastButton({
    personaColor,
    onGenerate,
    isLoading,
    hasAudio,
}: PodcastButtonProps) {
    const [hovered, setHovered] = useState(false)

    return (
        <button
            onClick={onGenerate}
            disabled={isLoading}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Generate persona podcast briefing"
            style={{
                background: hovered && !isLoading
                    ? personaColor
                    : 'transparent',
                borderColor: personaColor,
                color: hovered && !isLoading ? '#fff' : personaColor,
                transition: 'all 0.2s ease',
                opacity: isLoading ? 0.7 : 1,
            }}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border text-xs font-semibold cursor-pointer disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <>
                    {/* Animated waveform bars */}
                    <span className="flex items-end gap-0.5 h-3.5">
                        {[1, 2, 3, 4].map((i) => (
                            <span
                                key={i}
                                className="w-0.5 rounded-full animate-bounce"
                                style={{
                                    background: personaColor,
                                    height: `${[10, 14, 8, 12][i - 1]}px`,
                                    animationDelay: `${(i - 1) * 0.1}s`,
                                    animationDuration: '0.7s',
                                }}
                            />
                        ))}
                    </span>
                    Generating briefing…
                </>
            ) : (
                <>
                    <span className="text-sm">{hasAudio ? '🔄' : '🎙'}</span>
                    {hasAudio ? 'New Briefing' : 'Listen to Briefing'}
                </>
            )}
        </button>
    )
}
