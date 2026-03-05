import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/lib/podcast-script'
import { getVoiceForPersona } from '@/lib/podcast-voices'
import { personaTopics, defaultTopics } from '@/lib/persona-topics'

export async function POST(req: NextRequest) {
    try {
        const { personaId } = await req.json()

        if (!personaId || typeof personaId !== 'string') {
            return NextResponse.json({ error: 'personaId is required' }, { status: 400 })
        }

        const topics = personaTopics[personaId] ?? defaultTopics
        const script = generateScript(personaId, topics)
        const voice = getVoiceForPersona(personaId)

        const apiKey = process.env.ELEVENLABS_API_KEY

        // ── MOCK FALLBACK ──────────────────────────────────────────────────────
        // If no API key is set, return the script text as JSON.
        // The client-side PodcastPlayer will use the browser's SpeechSynthesis
        // API to read the script aloud — no pre-baked MP3 files needed.
        if (!apiKey) {
            return NextResponse.json(
                {
                    mock: true,
                    title: script.title,
                    voiceName: voice.name,
                    script: script.body,
                    estimatedSeconds: script.estimatedSeconds,
                },
                {
                    status: 200,
                    headers: { 'X-Podcast-Mock': 'true' },
                }
            )
        }

        // ── LIVE ELEVENLABS ────────────────────────────────────────────────────
        const elevenLabsRes = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voice.voiceId}`,
            {
                method: 'POST',
                headers: {
                    'xi-api-key': apiKey,
                    'Content-Type': 'application/json',
                    Accept: 'audio/mpeg',
                },
                body: JSON.stringify({
                    text: script.body,
                    model_id: 'eleven_turbo_v2_5', // faster, higher quality, all our voices support it
                    voice_settings: {
                        stability: voice.stability,
                        similarity_boost: voice.similarityBoost,
                        style: voice.style,
                        use_speaker_boost: true,
                    },
                }),
            }
        )

        if (!elevenLabsRes.ok) {
            const errText = await elevenLabsRes.text()
            console.error('ElevenLabs API error:', elevenLabsRes.status, errText)
            return NextResponse.json(
                { error: 'ElevenLabs API error', detail: errText },
                { status: elevenLabsRes.status }
            )
        }

        const audioBuffer = await elevenLabsRes.arrayBuffer()

        return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'audio/mpeg',
                'X-Podcast-Mock': 'false',
                'X-Podcast-Title': script.title,
                'X-Podcast-Voice': voice.name,
            },
        })
    } catch (err) {
        console.error('Podcast route error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
