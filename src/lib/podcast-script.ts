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

        case 'chief-of-staff':
            return {
                title: 'Chief of Staff Pitch - Victor Birgisson',
                estimatedSeconds: 50,
                body: `
Welcome back to the podcast. Today, we're doing something a little different. We are looking at a very specific role: the Chief of Staff for the LinkedIn Sales Solutions Marketing team, and we're looking at a standout candidate for that exact position—Victor Birgisson.

What makes Victor's profile so compelling for this LSS Marketing role is how perfectly his background aligns with what LinkedIn is asking for. They need a highly strategic, operationally sound thought partner for the VP of Marketing. Someone with an AI-first mindset who can drive the day-to-day execution of key priorities. Victor isn't just checking those boxes; he’s literally building the tech to prove it. I mean, the fact that you’re listening to this custom audio right now is because Victor built this dynamic, AI-powered Persona Switcher to demonstrate his capabilities.

He's an AI-first builder with over fifteen years of experience turning complex data into executive narratives at companies like Google, Meta, and Vodafone. At Google Cloud UK, he led EMEA financial processes, mitigating revenue risks for multimillion-dollar accounts. At Meta, he transformed the Finance and Credit operations from a perceived bottleneck into a strategic growth advisor for the Sales team. He knows how to bridge the gap between deep analytics and C-suite strategy.

And look at the core requirements for the LinkedIn role: Operational Excellence and Cross-Functional Alignment. At Allied Irish Banks, Victor designed a workflow system that seamlessly connected Marketing and Analytics across more than a hundred stakeholders. He builds repeatable, scalable models that flex to business needs—which is exactly what the LSS Marketing team needs to maintain their rhythm of business.

He's also got that rare mix of technical depth and solutions marketing expertise. He understands the intersection of cutting-edge technology and best-in-class marketing because he’s lived it. He can handle highly sensitive information, manage complex budgets, and most importantly, he brings a culture of trust, inclusion, and a builder's mindset. He's ready to act as a trusted advisor and help shape the future of LinkedIn Sales Solutions.

If you want a Chief of Staff who doesn't just manage the status quo, but completely elevates the strategic narrative using AI and data, Victor is your guy.
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
