'use client'

import {
    useState,
    useRef,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from 'react'
import { PodcastButton } from './PodcastButton'

export interface PodcastPlayerHandle {
    generate: () => void
    isLoading: boolean
    hasAudio: boolean
}

interface PodcastPlayerProps {
    personaId: string
    personaName: string
    personaColor: string
    onStateChange?: (isLoading: boolean, hasAudio: boolean) => void
}

type PlayerState = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error'

function formatTime(seconds: number): string {
    if (!isFinite(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
}

export const PodcastPlayer = forwardRef<PodcastPlayerHandle, PodcastPlayerProps>(
    function PodcastPlayer({ personaId, personaName, personaColor, onStateChange }, ref) {
        const [state, setState] = useState<PlayerState>('idle')
        const [title, setTitle] = useState('')
        const [voiceName, setVoiceName] = useState('')
        const [isMock, setIsMock] = useState(false)
        const [currentTime, setCurrentTime] = useState(0)
        const [duration, setDuration] = useState(0)
        const [visible, setVisible] = useState(false)
        const [minimised, setMinimised] = useState(false)
        // errorKind: 'transient' = server not ready yet, 'api' = bad key/permissions
        const [errorKind, setErrorKind] = useState<'transient' | 'api'>('transient')
        const retryCountRef = useRef(0)
        const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
        const audioRef = useRef<HTMLAudioElement | null>(null)
        const objectUrlRef = useRef<string | null>(null)
        const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

        // Cleanup object URL and any pending retry timer on unmount
        useEffect(() => {
            return () => {
                if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
                if (retryTimerRef.current) clearTimeout(retryTimerRef.current)
            }
        }, [])

        // Notify parent whenever state changes
        useEffect(() => {
            const isLoading = state === 'loading'
            const hasAudioNow = state === 'ready' || state === 'playing' || state === 'paused'
            onStateChange?.(isLoading, hasAudioNow)
        }, [state, onStateChange])

        // When persona changes, reset to idle
        useEffect(() => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.src = ''
            }
            setCurrentTime(0)
            setDuration(0)
            setState('idle')
            setTitle('')
            setVoiceName('')
            setIsMock(false)
        }, [personaId])

        const generate = useCallback(async () => {
            setState('loading')
            setVisible(true)
            setMinimised(false)

            // Cleanup previous audio
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current)
                objectUrlRef.current = null
            }
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.src = ''
            }
            // Cancel any ongoing SpeechSynthesis
            window.speechSynthesis?.cancel()

            try {
                const res = await fetch('/api/podcast', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ personaId }),
                })

                if (!res.ok) {
                    const json = await res.json().catch(() => ({}))
                    console.error('Podcast API error:', res.status, json)
                    // 401/403 = bad API key, anything else = likely transient
                    const isApiKeyError = res.status === 401 || res.status === 403
                    setErrorKind(isApiKeyError ? 'api' : 'transient')
                    // Auto-retry up to 2 times for transient errors (e.g. server cold start after refresh)
                    if (!isApiKeyError && retryCountRef.current < 2) {
                        retryCountRef.current += 1
                        retryTimerRef.current = setTimeout(() => generate(), 1500)
                        return
                    }
                    retryCountRef.current = 0
                    setState('error')
                    return
                }
                // Successful response — reset retry counter
                retryCountRef.current = 0

                const contentType = res.headers.get('Content-Type') ?? ''
                const isMockResponse = res.headers.get('X-Podcast-Mock') === 'true'

                // ── MOCK: browser SpeechSynthesis ──────────────────────────
                if (isMockResponse || contentType.includes('application/json')) {
                    const data = await res.json()
                    setTitle(data.title ?? 'Your Briefing')
                    setVoiceName(data.voiceName ? `${data.voiceName} · browser demo` : 'Browser TTS')
                    setIsMock(true)

                    const synth = window.speechSynthesis
                    if (!synth) {
                        console.error('SpeechSynthesis not supported')
                        setState('error')
                        return
                    }

                    const utterance = new SpeechSynthesisUtterance(data.script)
                    utterance.rate = 0.92  // slightly slower for a calm, measured read
                    utterance.pitch = 0.95

                    const estDuration = data.estimatedSeconds ?? 35
                    setDuration(estDuration)

                    // Track progress via a timer (SpeechSynthesis has no native progress event)
                    let progressInterval: ReturnType<typeof setInterval> | null = null
                    let startTime = 0

                    utterance.onstart = () => {
                        startTime = Date.now()
                        progressInterval = setInterval(() => {
                            const elapsed = (Date.now() - startTime) / 1000
                            setCurrentTime(Math.min(elapsed, estDuration))
                        }, 250)
                    }

                    utterance.onend = () => {
                        if (progressInterval) clearInterval(progressInterval)
                        setState('ready')
                        setCurrentTime(0)
                    }

                    utterance.onerror = () => {
                        if (progressInterval) clearInterval(progressInterval)
                        setState('error')
                    }

                    // Store the utterance so togglePlay can pause/resume
                    // We store it on a ref that togglePlay can check
                    utteranceRef.current = utterance
                    audioRef.current = null // no HTML audio for TTS
                    setState('ready')
                    return
                }

                // ── LIVE: ElevenLabs audio/mpeg ────────────────────────────
                setTitle(res.headers.get('X-Podcast-Title') ?? 'Your Briefing')
                setVoiceName(res.headers.get('X-Podcast-Voice') ?? '')
                setIsMock(false)
                utteranceRef.current = null

                const blob = await res.blob()
                const url = URL.createObjectURL(blob)
                objectUrlRef.current = url

                const audio = new Audio(url)
                audioRef.current = audio

                audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
                audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
                audio.addEventListener('ended', () => {
                    setState('ready')
                    setCurrentTime(0)
                })
                audio.addEventListener('error', () => setState('error'))

                setState('ready')
            } catch (err) {
                console.error('Failed to generate podcast:', err)
                // Network errors (server not ready yet) get the same auto-retry treatment
                setErrorKind('transient')
                if (retryCountRef.current < 2) {
                    retryCountRef.current += 1
                    retryTimerRef.current = setTimeout(() => generate(), 1500)
                    return
                }
                retryCountRef.current = 0
                setState('error')
            }
        }, [personaId])

        // Expose generate + status to parent via ref
        useImperativeHandle(ref, () => ({
            generate,
            get isLoading() { return state === 'loading' },
            get hasAudio() { return state === 'ready' || state === 'playing' || state === 'paused' },
        }), [generate, state])

        const togglePlay = () => {
            // SpeechSynthesis mode
            if (utteranceRef.current) {
                const synth = window.speechSynthesis
                if (state === 'playing') {
                    synth.pause()
                    setState('paused')
                } else if (state === 'paused' && synth.paused) {
                    synth.resume()
                    setState('playing')
                } else {
                    // First play — start speaking
                    synth.speak(utteranceRef.current)
                    setState('playing')
                }
                return
            }

            // HTML Audio mode
            const audio = audioRef.current
            if (!audio) return
            if (state === 'playing') {
                audio.pause()
                setState('paused')
            } else {
                audio.play()
                setState('playing')
            }
        }

        const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
            const audio = audioRef.current
            if (!audio) return
            audio.currentTime = Number(e.target.value)
            setCurrentTime(audio.currentTime)
        }

        const hasAudio = state === 'ready' || state === 'playing' || state === 'paused'
        const isGenerating = state === 'loading'

        if (!visible) return null

        return (
            <div className="fixed bottom-4 right-4 z-50" style={{ width: 300 }}>
                <style>{`
          @keyframes podcastSlideUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
                <div style={{ animation: 'podcastSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                    <div
                        className="rounded-2xl shadow-2xl border overflow-hidden"
                        style={{ background: 'var(--card, #fff)', borderColor: 'var(--border, #e5e7eb)' }}
                    >
                        {/* ── Header ── */}
                        <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{ background: personaColor }}
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="text-white text-base">🎙</span>
                                <div className="min-w-0">
                                    <p className="text-white text-xs font-bold truncate leading-tight">
                                        {title || `${personaName} Briefing`}
                                    </p>
                                    {voiceName && (
                                        <p className="text-white/70 text-[10px] leading-tight truncate">
                                            Voice: {voiceName}{isMock ? ' · demo' : ''}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                <button
                                    onClick={() => setMinimised(m => !m)}
                                    className="text-white/80 hover:text-white p-1 rounded"
                                    aria-label={minimised ? 'Expand' : 'Minimise'}
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        {minimised
                                            ? <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            : <path d="M2 9l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        }
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        audioRef.current?.pause()
                                        setState('idle')
                                        setVisible(false)
                                    }}
                                    className="text-white/80 hover:text-white p-1 rounded"
                                    aria-label="Close player"
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* ── Body ── */}
                        {!minimised && (
                            <div className="px-4 py-3 space-y-3">
                                {state === 'loading' && (
                                    <div className="flex items-center justify-center gap-3 py-4">
                                        <div className="flex items-end gap-1 h-6">
                                            {[16, 24, 12, 20, 14].map((h, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1 rounded-full animate-bounce"
                                                    style={{
                                                        background: personaColor,
                                                        height: `${h}px`,
                                                        animationDelay: `${i * 0.12}s`,
                                                        animationDuration: '0.8s',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground">Generating…</span>
                                    </div>
                                )}

                                {state === 'error' && (
                                    <div className="text-center py-3">
                                        <p className="text-xs text-red-500 font-medium">Generation failed</p>
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                            {errorKind === 'api'
                                                ? 'Check your ElevenLabs API key in .env.local'
                                                : 'Server not ready — please retry in a moment'}
                                        </p>
                                        <button
                                            onClick={() => { retryCountRef.current = 0; generate() }}
                                            className="mt-2 text-xs underline"
                                            style={{ color: personaColor }}
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}

                                {hasAudio && (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={togglePlay}
                                                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105"
                                                style={{ background: personaColor }}
                                                aria-label={state === 'playing' ? 'Pause' : 'Play'}
                                            >
                                                {state === 'playing' ? (
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                                                        <rect x="2" y="2" width="3.5" height="10" rx="1" />
                                                        <rect x="8.5" y="2" width="3.5" height="10" rx="1" />
                                                    </svg>
                                                ) : (
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                                                        <path d="M3 2.5l9 4.5-9 4.5z" />
                                                    </svg>
                                                )}
                                            </button>
                                            <div className="flex-1 min-w-0">
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={duration || 1}
                                                    step={0.1}
                                                    value={currentTime}
                                                    onChange={seek}
                                                    className="w-full h-1.5 rounded-full cursor-pointer"
                                                    style={{ accentColor: personaColor }}
                                                    aria-label="Seek"
                                                />
                                                <div className="flex justify-between mt-0.5">
                                                    <span className="text-[10px] text-muted-foreground tabular-nums">
                                                        {formatTime(currentTime)}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground tabular-nums">
                                                        {formatTime(duration)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <PodcastButton
                                            personaColor={personaColor}
                                            onGenerate={generate}
                                            isLoading={isGenerating}
                                            hasAudio={hasAudio}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
)
