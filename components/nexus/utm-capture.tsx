'use client'

import { useEffect } from 'react'
import { captureUtmsFromUrl } from '@/lib/utm'

export function UtmCapture() {
  useEffect(() => {
    captureUtmsFromUrl()
  }, [])
  return null
}
