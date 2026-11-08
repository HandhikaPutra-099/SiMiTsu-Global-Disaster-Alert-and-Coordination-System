import { useState, useEffect, useRef } from 'react'
import { RotateCcw, ChevronDown, ChevronUp, Sparkles, AlertCircle, Info, X } from 'lucide-react'

export default function CausesSection() {
  const [activeModal, setActiveModal] = useState(null)
  const [expandedCards, setExpandedCards] = useState({ 0: false, 1: false, 2: false, 3: false })

  const canvasRefs = useRef([])
  const animTimes = useRef([0, 0, 0, 0])
  const animFrames = useRef([null, null, null, null])

  const causesData = [
    {
      id: 0,
      title: 'Gempa Subduksi (Megathrust)',
      tag: 'Tektonik',
      accentColor: '#0ea5e9',
      borderColor: 'border-[#0ea5e9]/40',
      badgeColor: 'bg-[#0ea5e9]/10 text-[#38bdf8] border-[#0ea5e9]/30',
      shortDesc:
        'Lempeng samudra menunjam ke bawah lempeng benua. Terjadinya pelepasan energi akumulatif secara mendadak mengangkat dasar laut hingga beberapa meter, menggerakkan seluruh kolom air.',
      details: [
        'Lempeng tektonik bergerak perlahan (3–7 cm per tahun), mengunci regangan di zona megathrust selama ratusan tahun.',
        'Patahan elastis tiba-tiba (elastic rebound) mendisplesi kolom air secara vertikal dalam hitungan detik.',
        'Gelombang tsunami merambat ke segala arah dengan panjang gelombang mencapai lebih dari 100–200 kilometer.',
        'Contoh peristiwa nyata: Tsunami Aceh 2004 (M9.1), Tsunami Nias 2005 (M8.6), Tsunami Mentawai 2010 (M7.8).',
      ],
      caution: 'Merupakan pemicu lebih dari 85% kejadian tsunami di kawasan Samudera Hindia dan busur Sunda.',
    },
    {
      id: 1,
      title: 'Erupsi Vulkanik',
      tag: 'Vulkanik',
      accentColor: '#f97316',
      borderColor: 'border-[#f97316]/40',
      badgeColor: 'bg-[#f97316]/10 text-[#fb923c] border-[#f97316]/30',
      shortDesc:
        'Letusan gunung api bawah laut yang eksplosif atau keruntuhan sisi tubuh gunung (flank collapse) langsung ke laut memindahkan volume air secara masif.',
      details: [
        'Terjadi akibat ledakan piroklastik bawah air atau kolaps kaldera (runtuhnya kawah gunung berapi).',
        'Seringkali terjadi tanpa didahului gempa daratan berdurasi panjang, sehingga waktu evakuasi mandiri sangat singkat.',
        'Massa material vulkanik yang masuk ke air membentuk gelombang kejut radial berkekuatan destruktif tinggi.',
        'Contoh peristiwa bersejarah: Letusan Krakatau 1883 (ketinggian gelombang 40 m) dan Kolaps Anak Krakatau 2018 di Selat Sunda.',
      ],
      caution: 'Tsunami vulkanik dapat terjadi tanpa sinyal gempa bumi terdeteksi oleh sistem seismik konvensional.',
    },
    {
      id: 2,
      title: 'Longsor Bawah Laut',
      tag: 'Geomorfologi',
      accentColor: '#8b5cf6',
      borderColor: 'border-[#8b5cf6]/40',
      badgeColor: 'bg-[#8b5cf6]/10 text-[#a78bfa] border-[#8b5cf6]/30',
      shortDesc:
        'Longsoran sedimen atau tebing lereng bawah laut (submarine landslide) meluncur dengan kecepatan tinggi menuruni palung, memindahkan massa air secara instan.',
      details: [
        'Sering kali dipicu oleh gempa tektonik lokal berkekuatan sedang atau sedimentasi jenuh di tepi paparan benua.',
        'Perpindahan sedimen jutaan ton memicu pembentukan gelombang lokal dengan amplitudo sangat tinggi.',
        'Radius jangkauan umumnya terlokalisasi di sekitar teluk/palung, namun kedatangan gelombang hanya beberapa menit setelah pemicu.',
        'Contoh peristiwa: Teluk Palu 2018 (kombinasi sesar mendatar, likuefaksi pantai, dan longsor dasar laut), Papua Nugini 1998.',
      ],
      caution: 'Dapat menghasilkan gelombang ekstrem lokal dalam hitungan 2–5 menit pasca guncangan awal.',
    },
    {
      id: 3,
      title: 'Tumbukan Objek Luar Angkasa',
      tag: 'Teoretis / Langka',
      accentColor: '#ef4444',
      borderColor: 'border-[#ef4444]/40',
      badgeColor: 'bg-[#ef4444]/10 text-[#f87171] border-[#ef4444]/30',
      shortDesc:
        'Jatuhnya meteorit atau asteroid besar langsung ke badan samudra. Merupakan mekanisme teoretis berskala kosmologis dengan energi kinetik luar biasa.',
      details: [
        'Kinetik tumbukan benda antariksa dengan kecepatan puluhan kilometer per detik menguapkan air laut dan membentuk kawah tumbukan transien.',
        'Runtuhnya rongga air dan ekspansi gelombang kejut menimbulkan gelombang megatsunami melingkar.',
        'Sangat langka dalam skala waktu geologi modern dan TIDAK tercatat dalam riwayat rekaman sejarah modern Indonesia.',
        'Dikaji dalam pemodelan ilmiah oseanografi dan astrofisika global untuk studi pertahanan planet bumi.',
      ],
      caution: 'Peristiwa hipotesis/teoretis; tidak ada rekaman instrumen modern tsunami Indonesia dari penyebab ini.',
    },
  ]

  // Animation triggers & canvas rendering
  const replayCause = (idx) => {
    animTimes.current[idx] = 0
  }

  const toggleDetails = (idx) => {
    setExpandedCards((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  useEffect(() => {
    // 0: Gempa Subduksi
    const canvas0 = canvasRefs.current[0]
    if (canvas0) {
      const ctx = canvas0.getContext('2d')
      const render0 = () => {
        const W = canvas0.width
        const H = canvas0.height
        let t = animTimes.current[0]
        animTimes.current[0] += 0.02
        if (animTimes.current[0] > 12) animTimes.current[0] = 0

        // Clear & Background
        const bgGrad = ctx.createLinearGradient(0, 0, 0, H)
        bgGrad.addColorStop(0, '#020c18')
        bgGrad.addColorStop(1, '#041828')
        ctx.fillStyle = bgGrad
        ctx.fillRect(0, 0, W, H)

        const phase = t
        const quaking = phase > 3.5 && phase < 6.5
        const qShake = quaking ? Math.sin(phase * 30) * 3 : 0
        const seaRise = phase > 4.5 ? Math.min((phase - 4.5) * 8, 24) : 0
        const waveSpd = phase > 5 ? Math.min((phase - 5) * 1.5, 1) : 0

        // Oceanic plate (left)
        ctx.save()
        ctx.translate(0, qShake * 0.5)
        const platGrad = ctx.createLinearGradient(0, H * 0.5, 0, H)
        platGrad.addColorStop(0, '#8B5A2B')
        platGrad.addColorStop(1, '#4a2e10')
        ctx.fillStyle = platGrad
        ctx.beginPath()
        ctx.moveTo(0, H * 0.78)
        ctx.lineTo(W * 0.5, H * 0.62)
        ctx.lineTo(W * 0.5, H)
        ctx.lineTo(0, H)
        ctx.closePath()
        ctx.fill()

        // Plate arrows
        for (let a = 0; a < 3; a++) {
          const ax = (W * 0.08 + a * W * 0.12 + (phase * 0.4 * W * 0.08) % (W * 0.38))
          const ay = H * 0.75 - (ax / (W * 0.5)) * H * 0.15
          ctx.fillStyle = `rgba(239,80,80,${0.4 + a * 0.2})`
          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(ax + 10, ay - 4)
          ctx.lineTo(ax + 10, ay + 4)
          ctx.closePath()
          ctx.fill()
        }
        ctx.restore()

        // Continental plate (right)
        ctx.save()
        ctx.translate(0, -seaRise * 0.4 + qShake * 0.3)
        const contGrad = ctx.createLinearGradient(0, H * 0.4, 0, H)
        contGrad.addColorStop(0, '#3a5e2a')
        contGrad.addColorStop(1, '#1e3015')
        ctx.fillStyle = contGrad
        ctx.beginPath()
        ctx.moveTo(W * 0.5, H * 0.62 - seaRise)
        ctx.bezierCurveTo(W * 0.65, H * 0.52 - seaRise * 0.8, W * 0.82, H * 0.44 - seaRise * 0.5, W, H * 0.4 - seaRise * 0.3)
        ctx.lineTo(W, H)
        ctx.lineTo(W * 0.5, H)
        ctx.closePath()
        ctx.fill()

        if (quaking && Math.sin(phase * 20) > 0.3) {
          ctx.strokeStyle = 'rgba(255,200,50,0.9)'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(W * 0.5, H * 0.62 - seaRise)
          ctx.lineTo(W * 0.5, H)
          ctx.stroke()
        }
        ctx.restore()

        // Water layer
        const waterTop = H * 0.34 - seaRise * 0.75
        const waterGrad = ctx.createLinearGradient(0, waterTop, 0, H * 0.6)
        waterGrad.addColorStop(0, 'rgba(4,100,160,0.85)')
        waterGrad.addColorStop(1, 'rgba(2,40,80,0.92)')
        ctx.fillStyle = waterGrad
        ctx.fillRect(0, 0, W, waterTop)

        // Wave surface
        if (waveSpd > 0) {
          const wAmp = Math.min(waveSpd * 24, 24)
          ctx.strokeStyle = '#38bdf8'
          ctx.lineWidth = 2.5
          ctx.beginPath()
          for (let xi = 0; xi <= W; xi += 2) {
            const envelope = Math.exp(-Math.pow(xi / W - 0.5, 2) * 5) * wAmp
            const wy = waterTop - envelope * Math.sin((xi / W) * 10 - phase * 4)
            xi === 0 ? ctx.moveTo(xi, wy) : ctx.lineTo(xi, wy)
          }
          ctx.stroke()
        }

        ctx.strokeStyle = 'rgba(14,165,233,0.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, waterTop)
        ctx.lineTo(W, waterTop)
        ctx.stroke()

        // Texts
        ctx.font = '10px sans-serif'
        ctx.fillStyle = '#94a3b8'
        ctx.fillText('Lempeng Samudra (Subduksi)', 8, H * 0.88)
        ctx.fillText('Lempeng Benua', W * 0.65, H * 0.5)

        if (quaking) {
          ctx.fillStyle = '#f59e0b'
          ctx.font = 'bold 11px sans-serif'
          ctx.fillText('PATAHAN MEGATHRUST TERLEPAS!', W * 0.22, 24)
        }

        animFrames.current[0] = requestAnimationFrame(render0)
      }
      render0()
    }

    // 1: Erupsi Vulkanik
    const canvas1 = canvasRefs.current[1]
    if (canvas1) {
      const ctx = canvas1.getContext('2d')
      const render1 = () => {
        const W = canvas1.width
        const H = canvas1.height
        let t = animTimes.current[1]
        animTimes.current[1] += 0.02
        const cycle = t % 10
        const erupting = cycle > 2.5
        const erupt = erupting ? Math.min((cycle - 2.5) * 15, 75) : 0
        const waveProp = erupting && erupt > 20 ? Math.min((cycle - 4.5) * 1.2, 1) : 0

        ctx.fillStyle = '#020810'
        ctx.fillRect(0, 0, W, H)

        // Sea
        const seaGrad = ctx.createLinearGradient(0, 0, 0, H)
        seaGrad.addColorStop(0, 'rgba(2,20,40,0.95)')
        seaGrad.addColorStop(1, 'rgba(2,10,25,1)')
        ctx.fillStyle = seaGrad
        ctx.fillRect(0, 0, W, H * 0.65)

        // Volcano
        const vx = W * 0.5
        const vy0 = H * 0.88
        const volcGrad = ctx.createLinearGradient(vx - 80, vy0, vx, vy0 - 70)
        volcGrad.addColorStop(0, '#4a2810')
        volcGrad.addColorStop(1, '#2a1408')
        ctx.fillStyle = volcGrad
        ctx.beginPath()
        ctx.moveTo(vx - 80, vy0)
        ctx.lineTo(vx - 18, vy0 - 70)
        ctx.lineTo(vx + 18, vy0 - 70)
        ctx.lineTo(vx + 80, vy0)
        ctx.closePath()
        ctx.fill()

        if (erupting) {
          // Glow
          const glowR = ctx.createRadialGradient(vx, vy0 - 70, 2, vx, vy0 - 70, 25 + erupt * 0.4)
          glowR.addColorStop(0, 'rgba(255,180,30,0.9)')
          glowR.addColorStop(0.5, 'rgba(239,68,68,0.5)')
          glowR.addColorStop(1, 'rgba(239,68,68,0)')
          ctx.fillStyle = glowR
          ctx.beginPath()
          ctx.arc(vx, vy0 - 70, 25 + erupt * 0.4, 0, Math.PI * 2)
          ctx.fill()

          // Column
          const colGrad = ctx.createLinearGradient(vx, vy0 - 70 - erupt, vx, vy0 - 70)
          colGrad.addColorStop(0, 'rgba(200,80,20,0)')
          colGrad.addColorStop(0.4, 'rgba(239,68,68,0.8)')
          colGrad.addColorStop(1, 'rgba(255,160,30,0.95)')
          ctx.fillStyle = colGrad
          ctx.beginPath()
          ctx.ellipse(vx, vy0 - 70 - erupt * 0.5, 12 + erupt * 0.25, erupt * 0.5, 0, 0, Math.PI * 2)
          ctx.fill()
        }

        const wSurf = H * 0.65
        ctx.strokeStyle = 'rgba(14,165,233,0.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, wSurf)
        ctx.lineTo(W, wSurf)
        ctx.stroke()

        if (waveProp > 0) {
          for (let ring = 0; ring < 3; ring++) {
            const ringR = (waveProp * 1.6 * W * 0.5 - ring * 50) % (W * 0.6)
            if (ringR > 0) {
              const alpha = Math.max(0, 0.8 - ring * 0.25) * waveProp
              ctx.strokeStyle = `rgba(56,189,248,${alpha})`
              ctx.lineWidth = 2 - ring * 0.4
              ctx.beginPath()
              ctx.ellipse(vx, wSurf, ringR, ringR * 0.25, 0, 0, Math.PI * 2)
              ctx.stroke()
            }
          }
        }

        ctx.font = '10px sans-serif'
        ctx.fillStyle = '#94a3b8'
        ctx.fillText('Gunung Api Bawah Laut', vx - 55, H * 0.95)
        if (erupting) {
          ctx.fillStyle = '#f97316'
          ctx.font = 'bold 11px sans-serif'
          ctx.fillText('ERUPSI / KOLAPS TUBUH GUNUNG', vx - 80, 24)
        }

        animFrames.current[1] = requestAnimationFrame(render1)
      }
      render1()
    }

    // 2: Longsor Bawah Laut
    const canvas2 = canvasRefs.current[2]
    if (canvas2) {
      const ctx = canvas2.getContext('2d')
      const render2 = () => {
        const W = canvas2.width
        const H = canvas2.height
        let t = animTimes.current[2]
        animTimes.current[2] += 0.018
        const cycle = t % 11
        const sliding = cycle > 2
        const slideAmt = sliding ? Math.min((cycle - 2) * 10, 80) : 0
        const waveAmt = slideAmt > 25 ? Math.min((slideAmt - 25) / 55, 1) : 0

        ctx.fillStyle = '#020c18'
        ctx.fillRect(0, 0, W, H)

        // Shelf
        const shelfGrad = ctx.createLinearGradient(0, H * 0.4, 0, H)
        shelfGrad.addColorStop(0, '#3a5c2a')
        shelfGrad.addColorStop(1, '#1e3015')
        ctx.fillStyle = shelfGrad
        ctx.beginPath()
        ctx.moveTo(W * 0.52, H * 0.45)
        ctx.lineTo(W, H * 0.35)
        ctx.lineTo(W, H)
        ctx.lineTo(W * 0.52, H)
        ctx.closePath()
        ctx.fill()

        // Slope
        const slopeGrad = ctx.createLinearGradient(0, H * 0.6, 0, H)
        slopeGrad.addColorStop(0, '#1a2a3a')
        slopeGrad.addColorStop(1, '#0d1822')
        ctx.fillStyle = slopeGrad
        ctx.beginPath()
        ctx.moveTo(0, H * 0.8)
        ctx.lineTo(W * 0.52, H * 0.45)
        ctx.lineTo(W * 0.52, H)
        ctx.lineTo(0, H)
        ctx.closePath()
        ctx.fill()

        // Slide mass
        const sX = slideAmt * 1.4
        const sY = slideAmt * 0.7
        const startX = W * 0.52 - 60
        if (startX + sX < W * 0.52 + 30) {
          const slideAlpha = Math.min(0.5 + slideAmt / 100, 0.9)
          ctx.fillStyle = `rgba(139,92,246,${slideAlpha})`
          ctx.beginPath()
          ctx.moveTo(startX + sX, H * 0.44)
          ctx.lineTo(startX + sX + 75, H * 0.44)
          ctx.lineTo(startX + sX + 55, H * 0.44 + 40 + sY)
          ctx.lineTo(startX + sX - 15, H * 0.44 + 40 + sY)
          ctx.closePath()
          ctx.fill()
        }

        const wTop = H * 0.35
        ctx.strokeStyle = 'rgba(14,165,233,0.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, wTop)
        ctx.lineTo(W, wTop)
        ctx.stroke()

        if (waveAmt > 0) {
          const wCX = W * 0.52 + sX * 0.3
          for (let wr = 0; wr < 3; wr++) {
            const wRad = (waveAmt * W * 0.55 - wr * 55) % (W * 0.58)
            if (wRad > 5) {
              ctx.strokeStyle = `rgba(56,189,248,${Math.max(0, 0.8 - wr * 0.25)})`
              ctx.lineWidth = 2.5 - wr * 0.5
              ctx.beginPath()
              ctx.ellipse(wCX, wTop, wRad, wRad * 0.3, 0, Math.PI, Math.PI * 2)
              ctx.stroke()
            }
          }
        }

        ctx.font = '10px sans-serif'
        ctx.fillStyle = '#94a3b8'
        ctx.fillText('Paparan Benua', W * 0.6, H * 0.42)
        ctx.fillText('Lereng Bawah Laut', 12, H * 0.75)
        if (slideAmt > 10) {
          ctx.fillStyle = '#a78bfa'
          ctx.font = 'bold 11px sans-serif'
          ctx.fillText('LONGSORAN SEDIMEN BAWAH LAUT', W * 0.2, 24)
        }

        animFrames.current[2] = requestAnimationFrame(render2)
      }
      render2()
    }

    // 3: Tumbukan Objek Luar Angkasa
    const canvas3 = canvasRefs.current[3]
    if (canvas3) {
      const ctx = canvas3.getContext('2d')
      const render3 = () => {
        const W = canvas3.width
        const H = canvas3.height
        let t = animTimes.current[3]
        animTimes.current[3] += 0.02
        const cycle = t % 8
        const impacting = cycle > 1.8 && cycle < 3.2
        const afterShock = cycle >= 3.2

        ctx.fillStyle = '#020810'
        ctx.fillRect(0, 0, W, H)

        // Space sky gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.6)
        skyGrad.addColorStop(0, '#000005')
        skyGrad.addColorStop(1, '#051020')
        ctx.fillStyle = skyGrad
        ctx.fillRect(0, 0, W, H * 0.6)

        // Water
        const wTop = H * 0.6
        const waterGrad = ctx.createLinearGradient(0, wTop, 0, H)
        waterGrad.addColorStop(0, 'rgba(4,70,120,0.9)')
        waterGrad.addColorStop(1, 'rgba(2,20,50,0.98)')
        ctx.fillStyle = waterGrad
        ctx.fillRect(0, wTop, W, H - wTop)

        const impactX = W * 0.5

        if (cycle < 2.0) {
          // Falling asteroid with fire trail
          const prog = cycle / 2.0
          const ax = impactX - (1 - prog) * 120
          const ay = prog * wTop
          ctx.save()
          // Trail
          ctx.strokeStyle = 'rgba(249,115,22,0.6)'
          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.moveTo(ax - 50, ay - 40)
          ctx.lineTo(ax, ay)
          ctx.stroke()
          // Core
          ctx.fillStyle = '#ef4444'
          ctx.beginPath()
          ctx.arc(ax, ay, 6, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        } else if (impacting) {
          // Flash & Explosion
          const expR = (cycle - 1.8) * 60
          const expGlow = ctx.createRadialGradient(impactX, wTop, 2, impactX, wTop, expR)
          expGlow.addColorStop(0, 'rgba(255,255,200,1)')
          expGlow.addColorStop(0.3, 'rgba(239,68,68,0.8)')
          expGlow.addColorStop(1, 'rgba(249,115,22,0)')
          ctx.fillStyle = expGlow
          ctx.beginPath()
          ctx.arc(impactX, wTop, expR, 0, Math.PI * 2)
          ctx.fill()
        } else if (afterShock) {
          // Expanding megawaves
          const waveP = (cycle - 3.2) / 4.8
          for (let wr = 0; wr < 4; wr++) {
            const rad = (waveP * W * 0.7 - wr * 45) % (W * 0.75)
            if (rad > 0) {
              const alpha = Math.max(0, 0.9 - (rad / (W * 0.75)))
              ctx.strokeStyle = `rgba(56,189,248,${alpha})`
              ctx.lineWidth = 3
              ctx.beginPath()
              ctx.ellipse(impactX, wTop, rad, rad * 0.22, 0, 0, Math.PI * 2)
              ctx.stroke()
            }
          }
        }

        ctx.strokeStyle = 'rgba(14,165,233,0.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, wTop)
        ctx.lineTo(W, wTop)
        ctx.stroke()

        ctx.font = '10px sans-serif'
        ctx.fillStyle = '#94a3b8'
        ctx.fillText('Permukaan Samudra Terbuka', 12, wTop - 6)
        if (impacting || afterShock) {
          ctx.fillStyle = '#ef4444'
          ctx.font = 'bold 11px sans-serif'
          ctx.fillText('TUMBUKAN KOSMIK (TEORETIS / LANGKA)', W * 0.2, 24)
        }

        animFrames.current[3] = requestAnimationFrame(render3)
      }
      render3()
    }

    const frames = animFrames.current
    return () => {
      frames.forEach((frameId) => {
        if (frameId) cancelAnimationFrame(frameId)
      })
    }
  }, [])

  return (
    <section id="penyebab" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-xs font-semibold text-[#38bdf8] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Edukasi Geologi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Penyebab Tsunami
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#94a3b8] max-w-2xl">
            Tsunami dipicu oleh pergeseran volume air laut berskala besar secara mendadak. Kenali empat mekanisme geologis dan fisis di bawah ini.
          </p>
        </div>
      </div>

      {/* 4 Causes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {causesData.map((item) => {
          const isExpanded = expandedCards[item.id]
          return (
            <div
              key={item.id}
              className={`rounded-2xl bg-[#111827] border ${item.borderColor} overflow-hidden shadow-xl flex flex-col transition-all duration-300 hover:border-[#0ea5e9]/60`}
            >
              {/* Canvas Preview Container */}
              <div className="relative h-48 bg-[#020d1a] border-b border-[#1e293b] flex items-center justify-center overflow-hidden">
                <canvas
                  ref={(el) => {
                    canvasRefs.current[item.id] = el
                  }}
                  width={640}
                  height={192}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => replayCause(item.id)}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0e1a]/85 hover:bg-[#0a0e1a] text-white border border-[#1e293b] text-xs font-medium transition-colors shadow-lg hover:border-[#0ea5e9]"
                  aria-label={`Putar ulang animasi ${item.title}`}
                >
                  <RotateCcw className="w-3 h-3 text-[#0ea5e9]" />
                  <span>Putar Ulang</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-xs text-[#64748b] font-mono">0{item.id + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#94a3b8] leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Card Controls & Details Drawer */}
                <div className="mt-5 pt-4 border-t border-[#1e293b]">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleDetails(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0ea5e9] hover:text-[#38bdf8] transition-colors focus:outline-none"
                    >
                      <span>{isExpanded ? 'Tutup Penjelasan' : 'Detail Penyebab'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setActiveModal(item)}
                      className="text-xs text-[#64748b] hover:text-white transition-colors"
                    >
                      Buka Modal
                    </button>
                  </div>

                  {/* Expandable Section */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-[#1e293b]/60 text-xs space-y-2 text-[#cbd5e1] animate-in fade-in duration-200">
                      <p className="font-semibold text-white mb-1">Mekanisme Pembentukan:</p>
                      <ul className="space-y-1.5 list-disc list-inside text-[#94a3b8]">
                        {item.details.map((point, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 p-2 rounded-lg bg-[#0a0e1a] border border-[#1e293b] text-[#f59e0b] flex items-start gap-1.5 text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{item.caution}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Physics Cards (Wave Physics Section) */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#111827] border border-[#1e293b] shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 text-[#0ea5e9]" />
          <h3 className="text-xl font-bold text-white">
            Fisika Perambatan Gelombang Tsunami
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#94a3b8] mb-6">
          Karakteristik fisik perambatan gelombang sangat bergantung pada kedalaman batimetri laut dan geometri pesisir. Angka bersifat aproksimatif dan kontekstual.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1: Laut Dalam */}
          <div className="p-5 rounded-xl bg-[#1a2234] border border-[#1e293b]">
            <span className="text-xs font-semibold text-[#0ea5e9] uppercase tracking-wider block mb-1">
              Di Laut Dalam
            </span>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight my-1">
              ~800 <span className="text-base font-normal text-[#94a3b8]">km/jam</span>
            </div>
            <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
              Kecepatan setara pesawat jet komersial (<span className="font-mono text-[#cbd5e1]">v = √(g × d)</span>). Ketinggian gelombang di laut dalam kurang dari 1 meter sehingga tidak dirasakan oleh kapal di tengah samudra.
            </p>
          </div>

          {/* Card 2: Mendekati Pantai */}
          <div className="p-5 rounded-xl bg-[#1a2234] border border-[#1e293b]">
            <span className="text-xs font-semibold text-[#f59e0b] uppercase tracking-wider block mb-1">
              Mendekati Pantai
            </span>
            <div className="text-3xl font-extrabold text-[#f59e0b] font-mono tracking-tight my-1">
              50–80 <span className="text-base font-normal text-[#94a3b8]">km/jam</span>
            </div>
            <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
              Mengalami fenomena pendangkalan (<em>shoaling</em>). Gesekan dengan dasar laut memperlambat gelombang, namun energi terkompresi hingga ketinggian gelombang membubung tinggi.
            </p>
          </div>

          {/* Card 3: Amplifikasi Teluk */}
          <div className="p-5 rounded-xl bg-[#1a2234] border border-[#1e293b]">
            <span className="text-xs font-semibold text-[#ef4444] uppercase tracking-wider block mb-1">
              Amplifikasi Teluk
            </span>
            <div className="text-3xl font-extrabold text-[#ef4444] font-mono tracking-tight my-1">
              1.5–3× <span className="text-base font-normal text-[#94a3b8]">lipat</span>
            </div>
            <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
              Geometri teluk sempit dan muara sungai memfokuskan energi hidrodinamis, melipatgandakan tinggi rayapan air (<em>run-up</em>) jauh lebih tinggi dibanding garis pantai terbuka.
            </p>
          </div>
        </div>
      </div>

      {/* Accessible Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#111827] border border-[#1e293b] rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 text-[#94a3b8] hover:text-white rounded-lg hover:bg-[#1a2234]"
              aria-label="Tutup modal detail"
            >
              <X className="w-5 h-5" />
            </button>

            <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-3 ${activeModal.badgeColor}`}>
              {activeModal.tag}
            </span>

            <h3 className="text-xl font-bold text-white mb-2">
              {activeModal.title}
            </h3>

            <p className="text-sm text-[#cbd5e1] mb-4 leading-relaxed">
              {activeModal.shortDesc}
            </p>

            <div className="space-y-2 mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                Poin Edukasi Utama:
              </h4>
              <ul className="space-y-2 text-xs text-[#94a3b8] list-disc list-inside">
                {activeModal.details.map((pt, i) => (
                  <li key={i} className="leading-relaxed">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-[#0a0e1a] border border-[#1e293b] text-xs text-[#f59e0b] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{activeModal.caution}</span>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-[#28354b] text-white text-xs font-semibold transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
