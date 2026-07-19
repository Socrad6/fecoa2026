'use client'

import { useState, useEffect } from 'react'

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

  const pad = (n: number) => String(n).padStart(2, '0')

  const units = [
    { val: time.d, label: 'Jours' },
    { val: time.h, label: 'Heures' },
    { val: time.m, label: 'Minutes' },
    { val: time.s, label: 'Secondes' },
  ]

  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #C89B3C 0%, #a07a1e 50%, #C89B3C 100%)' }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(6,21,36,.1) 20px, rgba(6,21,36,.1) 21px)' }} />
      <div className="relative flex items-center justify-center gap-6 sm:gap-10 py-5 px-[clamp(16px,4vw,60px)] flex-wrap">
        <span className="text-[10px] font-semibold tracking-[3px] uppercase text-[rgba(6,21,36,.55)]">Ouverture dans</span>
        <div className="flex gap-3 sm:gap-5 items-center">
          {units.map((u, i) => (
            <div key={u.label} className="flex gap-3 sm:gap-5 items-center">
              {i > 0 && <span className="font-display text-2xl font-light text-[rgba(6,21,36,.25)] mb-3">:</span>}
              <div className="text-center min-w-[52px]">
                <span className="block font-display text-[36px] font-bold text-navy leading-none mb-1">{pad(u.val)}</span>
                <label className="text-[8px] font-bold tracking-[2px] uppercase text-[rgba(6,21,36,.45)]">{u.label}</label>
              </div>
            </div>
          ))}
        </div>
        <span className="text-[10px] font-bold tracking-[2px] text-[rgba(6,21,36,.45)]">#FÉCOA2026</span>
      </div>
    </div>
  )
}
