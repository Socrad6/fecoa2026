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

  return (
    <div className="bg-gradient-to-r from-gold to-[#9a6f1e] py-4 px-[clamp(16px,4vw,60px)] flex items-center justify-center gap-8 flex-wrap">
      <span className="text-[10px] font-semibold tracking-[3px] uppercase text-[rgba(6,21,36,.62)]">Ouverture dans</span>
      <div className="flex gap-4 items-center">
        {[
          { val: time.d, label: 'Jours' },
          { val: time.h, label: 'Heures' },
          { val: time.m, label: 'Minutes' },
          { val: time.s, label: 'Secondes' },
        ].map((u, i) => (
          <div key={u.label} className="flex gap-4 items-center">
            {i > 0 && <span className="font-display text-2xl font-light text-[rgba(6,21,36,.28)] mb-3">:</span>}
            <div className="text-center">
              <span className="block font-display text-[34px] font-bold text-navy leading-none">{pad(u.val)}</span>
              <label className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(6,21,36,.52)]">{u.label}</label>
            </div>
          </div>
        ))}
      </div>
      <span className="text-[10px] font-bold tracking-[2px] text-[rgba(6,21,36,.52)]">#FÉCOA2026</span>
    </div>
  )
}
