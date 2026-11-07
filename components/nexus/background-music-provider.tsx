'use client'

import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

const MUSIC_SRC = '/audio/background-music.m4a'

const MUSIC_ROUTES = [
  '/',
  '/onboarding',
  '/onboarding/quiz',
  '/onboarding/analyzing',
  '/onboarding/results',
  '/onboarding/solution',
  '/onboarding/plans',
]

type BackgroundMusicContextValue = {
  isPlaying: boolean
  volume: number
  setVolume: (volume: number) => void
  play: () => void
  pause: () => void
  startMusic: () => Promise<void>
}

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | undefined>(undefined)

export function BackgroundMusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(1)
  const [hasStarted, setHasStarted] = useState(false)
  const userStartedRef = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC)
    audio.loop = true
    audio.volume = 1
    audio.preload = 'none'
    audio.setAttribute('playsinline', 'true')
    audioRef.current = audio

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!hasStarted) return
    const audio = audioRef.current
    if (!audio) return
    const allowed = MUSIC_ROUTES.includes(pathname)
    if (allowed && audio.paused) audio.play().catch(() => {})
    else if (!allowed && !audio.paused) audio.pause()
  }, [pathname, hasStarted])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden || !userStartedRef.current) return
      const audio = audioRef.current
      if (audio && MUSIC_ROUTES.includes(pathname) && audio.paused) audio.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [pathname])

  const startMusic = async () => {
    setHasStarted(true)
    userStartedRef.current = true
    const audio = audioRef.current
    if (!audio || !audio.paused) return
    try {
      if (audio.readyState < 2) {
        await new Promise<void>((resolve) => {
          const onCanPlay = () => {
            audio.removeEventListener('canplay', onCanPlay)
            resolve()
          }
          audio.addEventListener('canplay', onCanPlay)
          audio.load()
          setTimeout(resolve, 2000)
        })
      }
      await audio.play()
    } catch {
      setTimeout(() => {
        audioRef.current?.play().catch(() => {})
      }, 500)
    }
  }

  const value: BackgroundMusicContextValue = {
    isPlaying,
    volume,
    setVolume: (next) => {
      setVolumeState(next)
      if (audioRef.current) audioRef.current.volume = next
    },
    play: () => {
      if (audioRef.current?.paused) audioRef.current.play().catch(() => {})
    },
    pause: () => {
      if (audioRef.current && !audioRef.current.paused) audioRef.current.pause()
    },
    startMusic,
  }

  return <BackgroundMusicContext.Provider value={value}>{children}</BackgroundMusicContext.Provider>
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext)
  if (!context) throw new Error('useBackgroundMusic must be used within BackgroundMusicProvider')
  return context
}
