'use client'

import { usePersonaStore } from '@/stores/personaStore'
import { Search, Bell, MessageSquare, Briefcase } from 'lucide-react'

const personaColors: Record<string, string> = {
    'data-viz': '#3B82F6',
    'business-strategy': '#10B981',
    'creative-design': '#8B5CF6',
    'tech-innovation': '#F59E0B',
}

const personaIcons: Record<string, string> = {
    'data-viz': '📊',
    'business-strategy': '💼',
    'creative-design': '🎨',
    'tech-innovation': '⚡',
}

export function NavBar() {
    const { currentPersona } = usePersonaStore()

    const color = currentPersona ? personaColors[currentPersona.id] || '#0a66c2' : '#0a66c2'
    const icon = currentPersona ? personaIcons[currentPersona.id] : null

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#0a66c2' }}>
                        in
                    </div>
                    <span className="text-sm font-semibold text-foreground hidden sm:block">
                        Context<span className="text-blue-600">Switch</span>
                    </span>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xs hidden md:flex items-center gap-2 bg-muted rounded-md px-3 py-1.5 text-sm text-muted-foreground">
                    <Search className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-xs">Search...</span>
                </div>

                {/* Active Persona Pill */}
                {currentPersona && (
                    <div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-semibold flex-shrink-0"
                        style={{ backgroundColor: color }}
                    >
                        <span>{icon}</span>
                        <span className="hidden sm:inline">{currentPersona.name}</span>
                        <span className="sm:hidden">Active</span>
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
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ml-1">
                        V
                    </div>
                </div>
            </div>
        </header>
    )
}
