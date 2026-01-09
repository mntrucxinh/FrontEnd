'use client'

import { useEffect, useMemo } from 'react'
import { ThemeProvider } from 'next-themes'

type SeasonTheme = 'spring' | 'early-summer' | 'rainy' | 'autumn' | 'tet'

function getSeason(date: Date): SeasonTheme {
  const m = date.getMonth() + 1
  const d = date.getDate()
  if ((m === 12 && d >= 16) || m === 1) return 'tet'
  if (m === 2 || m === 3) return 'spring'
  if (m === 4 || m === 5 || (m === 6 && d <= 15)) return 'early-summer'
  if ((m === 6 && d >= 16) || m === 7 || m === 8 || m === 9) return 'rainy'
  return 'autumn'
}

function computeSeason(): SeasonTheme {
  if (typeof window === 'undefined') return getSeason(new Date())

  return getSeason(new Date())
}

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const forcedTheme = useMemo(() => computeSeason(), [])

  useEffect(() => {
    try {
      window.localStorage.setItem('theme', forcedTheme)
    } catch {}
  }, [forcedTheme])

  return (
    <ThemeProvider
      attribute='class'
      enableSystem={false}
      storageKey='theme'
      themes={['spring', 'early-summer', 'rainy', 'autumn', 'tet']}
      forcedTheme={forcedTheme}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
