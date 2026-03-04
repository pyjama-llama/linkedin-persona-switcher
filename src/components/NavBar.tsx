'use client'

import { usePersonaStore } from '@/stores/personaStore'
import { Search, Bell, MessageSquare, Briefcase, BarChart3, Palette, Cpu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const personaColors: Record<string, string> = {
    'data-viz': '#3B82F6',
    'business-strategy': '#10B981',
    'creative-design': '#8B5CF6',
    'tech-innovation': '#F59E0B',
}

const PersonaIcon = ({ personaId, size = 14 }: { personaId: string; size?: number }) => {
    const props = { style: { width: size, height: size } }
    switch (personaId) {
        case 'data-viz': return <BarChart3 {...props} />
        case 'business-strategy': return <Briefcase {...props} />
        case 'creative-design': return <Palette {...props} />
        case 'tech-innovation': return <Cpu {...props} />
        default: return null
    }
}

export function NavBar() {
    const { currentPersona } = usePersonaStore()
    const color = currentPersona ? personaColors[currentPersona.id] || '#0a66c2' : '#0a66c2'

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

                {/* LinkedIn-style Logo */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="34" rx="6" fill="#0a66c2" />
                        <path d="M8 13h4v13H8V13zm2-6.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM14 13h3.8v1.8h.05C18.45 13.5 20 12.4 22.1 12.4c4.3 0 5.1 2.83 5.1 6.5V26h-4v-6.3c0-1.5-.02-3.43-2.09-3.43-2.1 0-2.42 1.63-2.42 3.32V26H14V13z" fill="white" />
                    </svg>
                    <span className="text-sm font-bold text-foreground hidden sm:block">
                        Context<span className="text-[#0a66c2]">Switch</span>
                    </span>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xs hidden md:flex items-center gap-2 bg-muted rounded-md px-3 py-1.5 text-sm text-muted-foreground">
                    <Search className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-xs">Search posts, people, topics...</span>
                </div>

                {/* Active Persona Pill */}
                {currentPersona && (
                    <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold flex-shrink-0"
                        style={{ backgroundColor: color }}
                    >
                        <PersonaIcon personaId={currentPersona.id} size={13} />
                        <span className="hidden sm:inline">{currentPersona.name}</span>
                    </div>
                )}

                {/* Nav Icons */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button className="flex flex-col items-center p-2 rounded-md hover:bg-muted transition-colors group">
                        <Briefcase className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                        <span className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">Jobs</span>
                    </button>
                    <button className="flex flex-col items-center p-2 rounded-md hover:bg-muted transition-colors group relative">
                        <MessageSquare className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                        <span className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">Messages</span>
                    </button>
                    <button className="flex flex-col items-center p-2 rounded-md hover:bg-muted transition-colors group relative">
                        <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                        <span className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">Alerts</span>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <div className="ml-1 border-l border-border pl-2">
                        <ThemeToggle />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ml-1">
                        V
                    </div>
                </div>
            </div>
        </header>
    )
}
