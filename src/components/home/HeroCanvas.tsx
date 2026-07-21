'use client'

import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W: number, H: number
    const particles: { x: number; y: number; r: number; a: number; da: number; dx: number; dy: number }[] = []
    const lines: { x1: number; y1: number; x2: number; y2: number; a: number; da: number }[] = []

    function resize() {
      W = canvas!.width = canvas!.offsetWidth
      H = canvas!.height = canvas!.offsetHeight
    }
    window.addEventListener('resize', resize)
    resize()

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * 2000, y: Math.random() * 1200,
        r: Math.random() * 1.4 + .3, a: Math.random(), da: .002 + Math.random() * .006,
        dx: (Math.random() - .5) * .08, dy: (Math.random() - .5) * .06,
      })
    }
    for (let i = 0; i < 14; i++) {
      lines.push({
        x1: Math.random() * 2000, y1: Math.random() * 1200,
        x2: Math.random() * 2000, y2: Math.random() * 1200,
        a: .04 + Math.random() * .08, da: .001 + Math.random() * .003,
      })
    }

    let raf: number
    function draw() {
      ctx!.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy; p.a += p.da
        if (p.a > 1 || p.a < 0) p.da *= -1
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(245,215,142,${p.a * .65})`
        ctx!.fill()
      })
      lines.forEach(l => {
        l.a += l.da; if (l.a > .12 || l.a < 0) l.da *= -1
        ctx!.beginPath()
        ctx!.moveTo((l.x1 / 2000) * W, (l.y1 / 1200) * H)
        ctx!.lineTo((l.x2 / 2000) * W, (l.y2 / 1200) * H)
        ctx!.strokeStyle = `rgba(200,155,60,${l.a})`
        ctx!.lineWidth = .5; ctx!.stroke()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-50" />
}
