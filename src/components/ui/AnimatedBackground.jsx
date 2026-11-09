import { useEffect, useRef } from 'react'

/**
 * AnimatedBackground — Komponen latar belakang bertema samudera dinamis.
 * 
 * Varian:
 * - 'hero': Gelombang laut berlapis bergerak dinamis + partikel bioluminescent bercahaya.
 * - 'subtle': Pola kontur batimetri laut halus + bias cahaya cyan lembut untuk seluruh halaman/section.
 */
export default function AnimatedBackground({ variant = 'subtle', className = '' }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (variant !== 'hero') return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = null
    let isVisible = true
    let width = 0
    let height = 0
    let time = 0

    // Cek preferensi pengguna untuk reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Inisialisasi partikel bioluminescent laut
    const particleCount = 32
    const particles = []

    const initParticles = (w, h) => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: 1.2 + Math.random() * 2.0,
          speedY: 0.15 + Math.random() * 0.35,
          speedXFactor: 0.5 + Math.random() * 1.5,
          driftOffset: Math.random() * Math.PI * 2,
          baseAlpha: 0.2 + Math.random() * 0.5,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          color: Math.random() > 0.3 ? '#38bdf8' : '#0ea5e9',
        })
      }
    }

    const resize = () => {
      width = container.offsetWidth || window.innerWidth
      height = container.offsetHeight || window.innerHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      if (particles.length === 0) {
        initParticles(width, height)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // IntersectionObserver: Jeda animasi jika Hero keluar dari viewport layar untuk hemat GPU
    let observer = null
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting
          if (isVisible && !animationFrameId && !prefersReducedMotion) {
            animationFrameId = requestAnimationFrame(render)
          }
        },
        { threshold: 0.05 }
      )
      observer.observe(container)
    }

    // Render gelombang laut berlapis & partikel
    const render = () => {
      if (!isVisible && !prefersReducedMotion) {
        animationFrameId = null
        return
      }

      time += 0.012
      ctx.clearRect(0, 0, width, height)

      // --- LAYER 1: Deep Ocean Swell (Gelombang Dalam - Paling Lambat) ---
      const wave1Grad = ctx.createLinearGradient(0, height * 0.6, 0, height)
      wave1Grad.addColorStop(0, 'rgba(12, 24, 51, 0.35)')
      wave1Grad.addColorStop(0.5, 'rgba(8, 16, 36, 0.65)')
      wave1Grad.addColorStop(1, 'rgba(10, 14, 26, 0.95)')

      ctx.beginPath()
      ctx.moveTo(0, height)
      for (let x = 0; x <= width; x += 6) {
        const y =
          height * 0.72 +
          Math.sin(x * 0.0022 + time * 0.5) * 28 +
          Math.sin(x * 0.0048 - time * 0.25) * 12
        ctx.lineTo(x, y)
      }
      ctx.lineTo(width, height)
      ctx.closePath()
      ctx.fillStyle = wave1Grad
      ctx.fill()

      // --- LAYER 2: Mid Ocean Surge (Gelombang Tengah - Kecepatan Sedang) ---
      const wave2Grad = ctx.createLinearGradient(0, height * 0.7, 0, height)
      wave2Grad.addColorStop(0, 'rgba(14, 165, 233, 0.12)')
      wave2Grad.addColorStop(0.4, 'rgba(8, 28, 56, 0.45)')
      wave2Grad.addColorStop(1, 'rgba(10, 14, 26, 0.9)')

      ctx.beginPath()
      ctx.moveTo(0, height)
      for (let x = 0; x <= width; x += 6) {
        const y =
          height * 0.78 +
          Math.sin(x * 0.0032 + time * 0.8) * 22 +
          Math.cos(x * 0.0055 + time * 0.4) * 10
        ctx.lineTo(x, y)
      }
      ctx.lineTo(width, height)
      ctx.closePath()
      ctx.fillStyle = wave2Grad
      ctx.fill()

      // Garis puncak gelombang tengah
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)'
      ctx.lineWidth = 1.2
      ctx.stroke()

      // --- LAYER 3: Surface Wave Crest (Gelombang Permukaan - Paling Cepat) ---
      const wave3Grad = ctx.createLinearGradient(0, height * 0.82, 0, height)
      wave3Grad.addColorStop(0, 'rgba(56, 189, 248, 0.08)')
      wave3Grad.addColorStop(1, 'rgba(10, 14, 26, 0.85)')

      ctx.beginPath()
      ctx.moveTo(0, height)
      for (let x = 0; x <= width; x += 6) {
        const y =
          height * 0.84 +
          Math.sin(x * 0.0042 - time * 1.1) * 16 +
          Math.sin(x * 0.0085 + time * 0.6) * 7
        ctx.lineTo(x, y)
      }
      ctx.lineTo(width, height)
      ctx.closePath()
      ctx.fillStyle = wave3Grad
      ctx.fill()

      // Garis cahaya cyan di puncak gelombang permukaan
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.35)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // --- BIOLUMINESCENT PARTICLES (Partikel Mengapung Bercahaya) ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!prefersReducedMotion) {
          p.y -= p.speedY
          p.x += Math.sin(time * 0.8 + p.driftOffset) * (0.35 * p.speedXFactor)

          // Reset saat keluar batas atas layar
          if (p.y < -10) {
            p.y = height + 10
            p.x = Math.random() * width
          }
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
        }

        const pulse = 0.7 + 0.3 * Math.sin(time * 2 + i)
        const alpha = Math.min(1, Math.max(0, p.baseAlpha * pulse))

        // Lingkaran partikel dengan glow halo
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.8)
        glow.addColorStop(0, p.color === '#38bdf8' ? `rgba(56, 189, 248, ${alpha})` : `rgba(14, 165, 233, ${alpha})`)
        glow.addColorStop(0.5, p.color === '#38bdf8' ? `rgba(56, 189, 248, ${alpha * 0.3})` : `rgba(14, 165, 233, ${alpha * 0.3})`)
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2)
        ctx.fill()

        // Inti titik partikel
        ctx.fillStyle = `rgba(226, 232, 240, ${alpha * 0.9})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // Hentikan loop animasi bila pengguna meminta reduced motion
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      if (observer) observer.disconnect()
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [variant])

  if (variant === 'hero') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block opacity-90 transition-opacity duration-1000"
          style={{ willChange: 'transform' }}
        />
      </div>
    )
  }

  // Variant 'subtle' & 'bathymetry': Pola kontur kedalaman laut + gradasi pencahayaan cyan lembut
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
    >
      {/* Bias Cahaya Cyan Lembut (Ambient Glow) */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#0ea5e9]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[600px] h-[600px] bg-[#0284c7]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] bg-[#0ea5e9]/4 rounded-full blur-[150px] pointer-events-none" />

      {/* Pola Garis Kontur Batimetri Samudera (Isobaths) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <path
          d="M-50,120 Q300,80 650,180 T1500,100"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.5"
        />
        <path
          d="M-50,220 Q360,160 720,290 T1500,210"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.2"
        />
        <path
          d="M-50,340 Q400,280 800,420 T1500,320"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
        />
        <path
          d="M-50,470 Q450,390 880,560 T1500,440"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.4"
        />
        <path
          d="M-50,610 Q500,520 950,710 T1500,580"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.2"
        />
        <path
          d="M-50,750 Q560,650 1020,850 T1500,720"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <path
          d="M-50,880 Q620,780 1100,980 T1500,860"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  )
}

