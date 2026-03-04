'use client'

import { useThemeStore } from '@/stores/themeStore'
import { Sun, Moon } from 'lucide-react'
import { useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  // Apply .dark class to <html> on every change
  useEffect(() => {
    const root = document.documentElement
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    root.classList.toggle('dark', isDark)
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
