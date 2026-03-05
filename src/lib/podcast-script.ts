/**
 * Generates persona-tailored podcast scripts.
 *
 * Scripts are ~30-45 second reads (≈ 80-120 words) written in a calm,
 * broadcast-style voice. They reference the live trending topics so the
 * output feels current when ElevenLabs generates audio.
 */

export interface PodcastScript {
    title: string
    body: string
    /** approximate reading duration in seconds */
    estimatedSeconds: number
}

type TrendingTopic = { topic: string; trend: string }

export function generateScript(
    personaId: string,
    trendingTopics: TrendingTopic[]
): PodcastScript {
    const top = trendingTopics.slice(0, 3)

    switch (personaId) {
        case 'data-viz':
            return {
                title: 'Data & Visualisation Briefing',
                estimatedSeconds: 35,
                body: `
Good morning. Here is your data visualisation briefing.

The most active discussions this week centre around ${top[0]?.topic ?? 'data storytelling'}, 
trending up ${top[0]?.trend ?? '40 percent'}. 
${top[1]?.topic ?? 'Dashboard design'} is also gaining momentum, rising ${top[1]?.trend ?? '28 percent'}, 
as practitioners focus on clarity over complexity.

Rounding out the top three, ${top[2]?.topic ?? 'SQL analytics'} continues to grow steadily 
at ${top[2]?.trend ?? '15 percent'} — a reminder that strong foundations still matter.

Stay curious, stay precise. That is your briefing for today.
        `.trim(),
            }

        case 'business-strategy':
            return {
                title: 'Business Strategy Briefing',
                estimatedSeconds: 38,
                body: `
Welcome to your strategy briefing.

This week, ${top[0]?.topic ?? 'OKR frameworks'} is the most talked-about topic in executive circles, 
up ${top[0]?.trend ?? '52 percent'}. Leaders are revisiting goal-setting structures 
as market conditions shift.

${top[1]?.topic ?? 'Chief of Staff'} roles are surging — up ${top[1]?.trend ?? '61 percent'} — 
signalling a growing need for operational clarity close to the top.

And ${top[2]?.topic ?? 'go-to-market playbooks'} round out the week, rising ${top[2]?.trend ?? '38 percent'} 
as teams prepare Q2 launches.

Think long, act precise. End of briefing.
        `.trim(),
            }

        case 'creative-design':
            return {
                title: 'Creative & Design Briefing',
                estimatedSeconds: 36,
                body: `
Hello, and welcome to your creative briefing.

${top[0]?.topic ?? 'Figma variables'} is leading the conversation this week, trending up ${top[0]?.trend ?? '74 percent'}. 
Designers are embracing token-based systems to build more adaptable, scalable interfaces.

${top[1]?.topic ?? 'Design systems'} follow closely, up ${top[1]?.trend ?? '43 percent'}, 
as the industry leans toward shared language and consistency across product lines.

Finally, ${top[2]?.topic ?? 'motion design'} is having a quiet renaissance — up ${top[2]?.trend ?? '29 percent'} — 
adding life to interfaces without distracting from the story.

Design with intention. That is your briefing.
        `.trim(),
            }

        case 'tech-innovation':
            return {
                title: 'Tech & Innovation Briefing',
                estimatedSeconds: 34,
                body: `
Your technology briefing.

${top[0]?.topic ?? 'AI agents'} dominate the conversation this week — up ${top[0]?.trend ?? '112 percent'}. 
Engineers are moving beyond single-model pipelines and into orchestrated, multi-step reasoning systems.

${top[1]?.topic ?? 'RAG architecture'} is up ${top[1]?.trend ?? '67 percent'}, 
reflecting a shift from fine-tuning toward retrieval-augmented approaches for grounding language models.

And ${top[2]?.topic ?? 'LLM engineering'} continues its climb at ${top[2]?.trend ?? '89 percent'} — 
the role is becoming a discipline of its own.

Move fast, build carefully. Briefing complete.
        `.trim(),
            }

        default:
            return {
                title: 'Professional Briefing',
                estimatedSeconds: 30,
                body: `
Your professional briefing is ready.

This week's top trends include ${top.map(t => t.topic).join(', ')}. 
Each of these areas is seeing significant growth, reflecting where professional conversations 
are heading right now.

Stay informed, stay ahead. That is your briefing.
        `.trim(),
            }
    }
}
