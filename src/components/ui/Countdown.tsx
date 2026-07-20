'use client'

import { useState, useEffect, useRef } from 'react'

interface FlipDigitProps {
  value: number
  pad?: number
  color?: string
  label: string
}

function FlipDigit({ value, pad = 2, color = 'navy', label }: FlipDigitProps) {
  const prevRef = useRef(value)
  const [display, setDisplay] = useState(value)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlipping(true)
      const t1 = setTimeout(() => setDisplay(value), 160)
      const t2 = setTimeout(() => setFlipping(false), 400)
      prevRef.current = value
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [value])

  const padded = String(display).padStart(pad, '0')

  return (
    <div className="flex gap-2 sm:gap-3 items-center">
      <div className="text-center min-w-[56px] rounded-lg overflow-hidden" style={{ background: 'rgba(6,21,36,.06)' }}>
        <div
          className="relative py-1.5"
          style={{ perspective: '200px' }}
        >
          <span
            className={`block font-display text-[32px] font-bold leading-none transition-transform duration-300 ${flipping ? 'scale-y-90 opacity-70' : 'scale-y-100 opacity-100'}`}
            style={{
              color: `var(--${color})`,
              transformOrigin: 'center top',
              transitionTimingFunction: 'var(--ease-spring)',
            }}
          >
            {padded}
          </span>
        </div>
        <label className="text-[7px] font-bold tracking-[2px] uppercase block" style={{ color: `var(--${color}, rgba(6,21,36,.4))` }}>{label}</label>
      </div>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const target = new Date('2026-12-17T10:00:00')
    function tick() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [])

  const units = [
    { val: time.d, label: 'Jours' },
    { val: time.h, label: 'Heures' },
    { val: time.m, label: 'Minutes' },
    { val: time.s, label: 'Secondes' },
  ]

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #C89B3C 0%, #a07a1e 50%, #C89B3C 100%)' }}
      role="timer"
      aria-label="Compte à rebours jusqu'à l'ouverture"
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(6,21,36,.15) 24px, rgba(6,21,36,.15) 25px)' }} aria-hidden="true" />
      <div className="relative flex items-center justify-center gap-5 sm:gap-8 py-4 px-[clamp(16px,4vw,60px)] flex-wrap">
        <span className="text-[9px] font-bold tracking-[4px] uppercase text-[rgba(6,21,36,.5)]">Ouverture dans</span>
        <div className="flex gap-2 sm:gap-3 items-center">
          {units.map((u, i) => (
            <div key={u.label} className="flex gap-2 sm:gap-3 items-center">
              {i > 0 && <span className="font-display text-xl font-light text-[rgba(6,21,36,.2)] mb-3" aria-hidden="true">:</span>}
              <FlipDigit value={u.val} label={u.label} color="navy" />
            </div>
          ))}
        </div>
        <span className="text-[9px] font-bold tracking-[3px] text-[rgba(6,21,36,.35)]">#FÉCOA2026</span>
      </div>
    </div>
  )
}
