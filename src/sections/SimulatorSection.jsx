import { useState, useEffect, useRef, useMemo } from 'react'
import { Play, RotateCcw, Activity, Eye, Sliders, Waves, Compass } from 'lucide-react'

// Static Helper Functions for Pseudo-3D Canvas
function project3D(wx, wy, wz, cam, canvasW, canvasH) {
  const baseDist = 220 * cam.dist
  const cx = baseDist * Math.sin(cam.phi) * Math.sin(cam.theta) - cam.px * Math.cos(cam.theta)
  const cz = baseDist * Math.sin(cam.phi) * Math.cos(cam.theta) + cam.px * Math.sin(cam.theta)
  const cy = baseDist * Math.cos(cam.phi) + cam.py
  const rx = wx - cx
  const ry = wy - cy
  const rz = wz - cz
  const fwdLen = Math.sqrt(cx * cx + cy * cy + cz * cz)
  const fx = -cx / fwdLen
  const fy = -cy / fwdLen
  const fz = -cz / fwdLen

  let rx2 = fy * 0 - fz * 1
  let ry2 = fz * 0 - fx * 0
  let rz2 = fx * 1 - fy * 0
  const rl = Math.sqrt(rx2 * rx2 + ry2 * ry2 + rz2 * rz2)
  if (rl < 0.00001) {
    rx2 = 1
    ry2 = 0
    rz2 = 0
  } else {
    rx2 /= rl
    ry2 /= rl
    rz2 /= rl
  }
  const uux = ry2 * fz - rz2 * fy
  const uuy = rz2 * fx - rx2 * fz
  const uuz = rx2 * fy - ry2 * fx
  const camX = rx * rx2 + ry * ry2 + rz * rz2
  const camY = rx * uux + ry * uuy + rz * uuz
  const camZ = rx * fx + ry * fy + rz * fz
  if (camZ <= 0.1) return null
  const fov = canvasH * 1.15
  return {
    x: canvasW * 0.5 + (camX / camZ) * fov,
    y: canvasH * 0.5 - (camY / camZ) * fov,
    z: camZ,
  }
}

function shadeColor(hex, pct) {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + pct))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + pct))
  const b = Math.min(255, Math.max(0, (num & 0xff) + pct))
  return `rgb(${r},${g},${b})`
}

function waveAt(wx, wz, phase, t, s) {
  const h = s.waveH
  const swellAmp = 0.4 + Math.max(0, (s.mag - 6) * 0.12)
  const swellFreq = s.dep < 30 ? 0.07 : s.dep < 70 ? 0.05 : 0.035
  const propSpeed = s.loc === 'trench' ? 20 : s.loc === 'shallow' ? 13 : 18

  if (phase === 0) {
    return (
      swellAmp * Math.sin(wx * swellFreq + t * 0.9) +
      swellAmp * 0.7 * Math.sin(wz * 0.04 + t * 0.65) +
      swellAmp * 0.4 * Math.sin((wx + wz) * 0.03 + t * 1.1)
    )
  } else if (phase === 1) {
    const shockAmp = Math.max(1.0, (s.mag - 5.5) * 1.2)
    const spread = 400 + s.dep * 8
    const shock = shockAmp * Math.max(0, Math.sin(t * 14)) * Math.exp(-(wx * wx + wz * wz) / spread)
    return shock + swellAmp * Math.sin(wx * swellFreq + t) * 0.6
  } else if (phase === 2) {
    const d = Math.sqrt(wx * wx + wz * wz)
    const radialAmp = h * 0.18 * Math.max(0.5, s.mag / 9.5)
    return radialAmp * Math.exp((-d * d) / 1600) * Math.cos(d * 0.08 - t * 3) + swellAmp * Math.sin(wx * swellFreq + t) * 0.4
  } else if (phase === 3) {
    const propOff = -(s.dist / 120) * 5
    return h * 0.08 * Math.sin((wx + propOff - t * propSpeed) * 0.035) + swellAmp * Math.sin(wx * swellFreq + t) * 0.3
  } else if (phase === 4) {
    const coastAmp = { open: 1.0, bay: 1.8, cliff: 0.8, mangrove: 0.6 }[s.coast] || 1.0
    const depthAmp = 1 + Math.max(0, (wx + 50) / 55) * (3 + coastAmp)
    return h * 0.055 * depthAmp * Math.sin((wx - t * 13) * 0.055) + swellAmp * Math.sin(wx * swellFreq + t) * 0.2
  } else {
    if (wx < 55) {
      const inlandFactor = Math.max(0, 1 + (wx + 65) / (100 + s.inland * 8))
      const coastFactor = { open: 0.32, bay: 0.48, cliff: 0.22, mangrove: 0.18 }[s.coast] || 0.32
      const impAmp = h * coastFactor * inlandFactor
      return impAmp * Math.sin((wx - t * 9) * 0.08) + swellAmp * 0.1 * Math.sin(wx * swellFreq + t)
    }
    return 0
  }
}

function drawHuman(ctx, sp, scale, color, running, t) {
  if (!sp) return
  const s = scale || 1
  const x = sp.x
  const y = sp.y
  const alpha = Math.min(1, 3 / sp.z)
  if (alpha < 0.05) return
  ctx.save()
  ctx.globalAlpha = alpha

  const legSwing = running ? Math.sin(t * 8 + x * 0.5) * 4 * s : 0
  const bodyBob = running ? Math.abs(Math.sin(t * 8 + x * 0.5)) * 1.5 * s : 0
  const bodyH = 8 * s
  const headR = 3.5 * s

  ctx.fillStyle = color || '#f4c06f'
  ctx.strokeStyle = color || '#f4c06f'
  ctx.lineWidth = 1.8 * s
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x - 2 * s + legSwing * 0.5, y + bodyH * 0.7)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + 2 * s - legSwing * 0.5, y + bodyH * 0.7)
  ctx.stroke()

  ctx.fillStyle = color === '#fca5a5' ? '#ef4444' : color === '#86efac' ? '#22c55e' : '#2563eb'
  ctx.fillRect(x - 2.5 * s, y - bodyH * 0.85 - bodyBob, 5 * s, bodyH * 0.75)

  ctx.fillStyle = '#f4c06f'
  ctx.beginPath()
  ctx.arc(x, y - bodyH - headR * 0.5 - bodyBob, headR, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawBuilding3D(ctx, b, floodWave, cam, canvasW, canvasH, phase) {
  let floodH = 0
  if (phase === 5) {
    floodH = Math.max(0, floodWave * Math.max(0, 1 - (b.x - 55) / 55))
    if (floodH > b.h) floodH = b.h
  }
  const by = floodH
  const w = b.w
  const d = b.d || b.w

  const base = [
    project3D(b.x, by, b.z, cam, canvasW, canvasH),
    project3D(b.x + w, by, b.z, cam, canvasW, canvasH),
    project3D(b.x + w, by, b.z + d, cam, canvasW, canvasH),
    project3D(b.x, by, b.z + d, cam, canvasW, canvasH),
  ]
  const top = [
    project3D(b.x, by + b.h, b.z, cam, canvasW, canvasH),
    project3D(b.x + w, by + b.h, b.z, cam, canvasW, canvasH),
    project3D(b.x + w, by + b.h, b.z + d, cam, canvasW, canvasH),
    project3D(b.x, by + b.h, b.z + d, cam, canvasW, canvasH),
  ]

  if (!base[0] || !top[0]) return

  if (top[0] && top[1] && base[1] && base[0]) {
    ctx.beginPath()
    ctx.moveTo(top[0].x, top[0].y)
    ctx.lineTo(top[1].x, top[1].y)
    ctx.lineTo(base[1].x, base[1].y)
    ctx.lineTo(base[0].x, base[0].y)
    ctx.closePath()
    ctx.fillStyle = b.col || '#3b4f6e'
    ctx.fill()
    ctx.strokeStyle = 'rgba(0,0,0,0.4)'
    ctx.lineWidth = 0.8
    ctx.stroke()
  }

  if (top[1] && top[2] && base[2] && base[1]) {
    ctx.beginPath()
    ctx.moveTo(top[1].x, top[1].y)
    ctx.lineTo(top[2].x, top[2].y)
    ctx.lineTo(base[2].x, base[2].y)
    ctx.lineTo(base[1].x, base[1].y)
    ctx.closePath()
    ctx.fillStyle = shadeColor(b.col || '#3b4f6e', -30)
    ctx.fill()
    ctx.strokeStyle = 'rgba(0,0,0,0.3)'
    ctx.lineWidth = 0.8
    ctx.stroke()
  }

  if (top[0] && top[1] && top[2] && top[3]) {
    if (b.gable) {
      const rpx = (top[0].x + top[1].x) * 0.5
      const rpy = top[0].y - Math.abs(top[0].y - base[0].y) * 0.18
      ctx.beginPath()
      ctx.moveTo(top[0].x, top[0].y)
      ctx.lineTo(top[1].x, top[1].y)
      ctx.lineTo(rpx, rpy)
      ctx.closePath()
      ctx.fillStyle = b.roofCol || '#8B3030'
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.moveTo(top[0].x, top[0].y)
      ctx.lineTo(top[1].x, top[1].y)
      ctx.lineTo(top[2].x, top[2].y)
      ctx.lineTo(top[3].x, top[3].y)
      ctx.closePath()
      ctx.fillStyle = shadeColor(b.col || '#3b4f6e', 25)
      ctx.fill()
    }
  }
}

function drawPalmTree(ctx, wx, wz, height, cam, canvasW, canvasH) {
  const base = project3D(wx, 0, wz, cam, canvasW, canvasH)
  const top = project3D(wx, height, wz, cam, canvasW, canvasH)
  if (!base || !top) return
  const alpha = Math.min(1, 4 / base.z)
  if (alpha < 0.05) return

  ctx.save()
  ctx.globalAlpha = alpha
  const midX = (base.x + top.x) * 0.5
  ctx.strokeStyle = '#8B6914'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(base.x, base.y)
  ctx.quadraticCurveTo(midX, (base.y + top.y) * 0.5, top.x, top.y)
  ctx.stroke()

  const fLen = height * 3.5
  for (let fi = 0; fi < 5; fi++) {
    const ang = (fi / 5) * Math.PI * 2
    ctx.strokeStyle = '#22863a'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(top.x, top.y)
    ctx.lineTo(top.x + Math.cos(ang) * fLen * 0.6, top.y + Math.sin(ang) * fLen * 0.3 - fLen * 0.15)
    ctx.stroke()
  }
  ctx.restore()
}

export default function SimulatorSection() {
  // Input parameters
  const [mag, setMag] = useState(7.5)
  const [dep, setDep] = useState(30)
  const [dist, setDist] = useState(80)
  const [loc, setLoc] = useState('trench')
  const [coast, setCoast] = useState('open')
  const [time, setTime] = useState('day')

  // Simulation phase
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  // Canvas & render refs
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const autoPlayTimerRef = useRef(null)

  // Simulation internal state for animation loop
  const simStateRef = useRef({
    mag: 7.5,
    dep: 30,
    dist: 80,
    loc: 'trench',
    coast: 'open',
    time: 'day',
    height: 8.0,
    eta: 24,
    speed: 420,
    inland: 2.0,
    level: 'medium',
    phase: 0,
    waveH: 10,
  })

  // Camera state for pseudo-3D canvas
  const camRef = useRef({
    theta: 0.45,
    phi: 0.55,
    dist: 1.0,
    px: 0,
    py: 0,
  })

  const dragRef = useRef({
    active: false,
    btn: 0,
    lx: 0,
    ly: 0,
  })

  const pinchRef = useRef({
    active: false,
    dist: 0,
  })

  const simTimeRef = useRef(0)

  // Calculate physics outputs via useMemo (avoids ref access in render)
  const outputs = useMemo(() => {
    let baseH
    if (mag >= 9.0) baseH = 25 + (mag - 9.0) * 15
    else if (mag >= 8.0) baseH = 10 + (mag - 8.0) * 15
    else if (mag >= 7.0) baseH = 3 + (mag - 7.0) * 7
    else baseH = 0.5 + (mag - 5.0) * 1.25

    // Depth factor
    baseH *= dep < 30 ? 1.4 : dep < 70 ? 1.0 : 0.6

    // Location factor
    const locFactors = { shallow: 1.5, trench: 1.2, deep: 0.8 }
    baseH *= locFactors[loc] || 1.0

    // Coast amplification
    const coastFactors = { open: 1.0, bay: 1.8, cliff: 0.7, mangrove: 0.6 }
    const cFact = coastFactors[coast] || 1.0
    baseH *= cFact

    const calculatedHeight = Math.max(0.2, baseH)
    const waveSpeedMs = Math.sqrt(9.8 * Math.max(200, 4000 - dist * 3))
    const waveSpeedKmh = Math.round(waveSpeedMs * 3.6)
    const calculatedEta = Math.round((dist / Math.max(waveSpeedKmh, 1)) * 60)
    const calculatedInland = baseH * 0.25 * cFact

    let level = 'low'
    let alertClass = 'bg-[#166534] text-[#86efac] border-[#22c55e]/30'
    let alertText = 'ℹ️ WASPADA RENDAH — Pantau Informasi Resmi'

    if (baseH >= 20) {
      level = 'extreme'
      alertClass = 'bg-[#4c0519] text-[#fda4af] border-[#ef4444]/40'
      alertText = '🚨 BAHAYA EKSTREM — Evakuasi Mandiri Segera!'
    } else if (baseH >= 7) {
      level = 'high'
      alertClass = 'bg-[#7f1d1d] text-[#fca5a5] border-[#ef4444]/40'
      alertText = '⛔ PERINGATAN TINGGI — Segera Menjauh dari Pantai!'
    } else if (baseH >= 2) {
      level = 'medium'
      alertClass = 'bg-[#92400e] text-[#fde68a] border-[#f59e0b]/40'
      alertText = '⚠️ WASPADA MENENGAH — Siaga & Siapkan Tas Evakuasi'
    }

    const sim3dHeight = Math.max(2, Math.min(30, calculatedHeight * 0.9))

    return {
      heightValue: calculatedHeight,
      sim3dHeight,
      heightFormatted: `${calculatedHeight.toFixed(1)} m`,
      etaValue: calculatedEta,
      etaFormatted: calculatedEta < 5 ? '< 5 mnt' : `~${calculatedEta} mnt`,
      speedValue: waveSpeedKmh,
      speedFormatted: `${waveSpeedKmh} km/jam`,
      inlandValue: calculatedInland,
      inlandFormatted: `${calculatedInland.toFixed(1)} km`,
      level,
      alertClass,
      alertText,
    }
  }, [mag, dep, dist, loc, coast])

  // Synchronize simStateRef inside useEffect
  useEffect(() => {
    simStateRef.current = {
      mag,
      dep,
      dist,
      loc,
      coast,
      time,
      height: outputs.heightValue,
      eta: outputs.etaValue,
      speed: outputs.speedValue,
      inland: outputs.inlandValue,
      level: outputs.level,
      phase: currentPhase,
      waveH: outputs.sim3dHeight,
    }
  }, [mag, dep, dist, loc, coast, time, currentPhase, outputs])

  // Phase explanations
  const getPhaseDescription = (phaseIdx) => {
    const coastName = { open: 'pantai terbuka', bay: 'teluk/muara', cliff: 'tebing pantai', mangrove: 'hutan mangrove' }[coast] || 'pantai'
    const timeNote = time === 'night' ? ' (Malam hari: visibilitas rendah, gunakan senter)' : ''
    const epiDist = dist < 50 ? `sangat dekat (${dist} km)` : dist < 150 ? `jarak menengah (${dist} km)` : `jauh (${dist} km)`

    const descriptions = [
      `Kondisi ${coastName} normal${timeNote}. Episentrum berjarak ${epiDist}. Menunjukkan kondisi batas darat-laut sebelum pergerakan lempeng tektonik.`,
      `Gempa M${mag.toFixed(1)} melepaskan energi pada kedalaman ${dep} km! Dasar laut terangkat mendadak, mengganggu keseimbangan kolom air.`,
      `Gelombang tsunami terbentuk dari pusat gempa. Di laut dalam amplitudo permukaan masih rendah, namun membawa massa energi raksasa.`,
      `Propagasi gelombang menjalar dengan kecepatan ~${outputs.speedFormatted}. Menuju ke arah garis pantai terdekat. Perkiraan waktu tiba: ${outputs.etaFormatted}.`,
      `Efek pendangkalan (shoaling): Gelombang memasuki perairan dangkal di ${coastName}. Kecepatan berkurang namun energi terangkat menjadi dinding air tinggi.`,
      `Gelombang setinggi ${outputs.heightFormatted} menghantam pesisir! Jangkauan genangan daratan diperkirakan hingga ${outputs.inlandFormatted}. Lakukan evakuasi ke tempat tinggi sekarang!`,
    ]
    return descriptions[phaseIdx] || ''
  }

  // Phase changer
  const handleSelectPhase = (p) => {
    if (isAutoPlaying) {
      clearInterval(autoPlayTimerRef.current)
      setIsAutoPlaying(false)
    }
    setCurrentPhase(p)
    simStateRef.current.phase = p
  }

  // Auto play sequence
  const handleAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
    }
    setIsAutoPlaying(true)
    let p = 0
    setCurrentPhase(0)
    simStateRef.current.phase = 0

    autoPlayTimerRef.current = setInterval(() => {
      p += 1
      if (p > 5) {
        clearInterval(autoPlayTimerRef.current)
        setIsAutoPlaying(false)
        return
      }
      setCurrentPhase(p)
      simStateRef.current.phase = p
    }, 4500)
  }

  const handleResetPhase = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
      setIsAutoPlaying(false)
    }
    setCurrentPhase(0)
    simStateRef.current.phase = 0
  }

  // Canvas render loop setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth || 800
      canvas.height = 560
    }
    resize()
    window.addEventListener('resize', resize)

    // Mouse & Touch events
    const onMouseDown = (e) => {
      dragRef.current.active = true
      dragRef.current.btn = e.button
      dragRef.current.lx = e.clientX
      dragRef.current.ly = e.clientY
    }
    const onMouseUp = () => {
      dragRef.current.active = false
    }
    const onMouseMove = (e) => {
      if (!dragRef.current.active) return
      const dx = e.clientX - dragRef.current.lx
      const dy = e.clientY - dragRef.current.ly
      dragRef.current.lx = e.clientX
      dragRef.current.ly = e.clientY

      if (dragRef.current.btn === 0) {
        camRef.current.theta -= dx * 0.008
        camRef.current.phi = Math.max(0.15, Math.min(1.4, camRef.current.phi + dy * 0.006))
      } else {
        camRef.current.px += dx * 0.3
        camRef.current.py += dy * 0.3
      }
    }

    const onWheel = (e) => {
      e.preventDefault()
      camRef.current.dist = Math.max(0.4, Math.min(3.0, camRef.current.dist + e.deltaY * 0.001))
    }

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        dragRef.current.active = true
        dragRef.current.btn = 0
        dragRef.current.lx = e.touches[0].clientX
        dragRef.current.ly = e.touches[0].clientY
      } else if (e.touches.length === 2) {
        dragRef.current.active = false
        pinchRef.current.active = true
        pinchRef.current.dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        )
      }
    }

    const onTouchMove = (e) => {
      if (dragRef.current.active && e.touches.length === 1) {
        const dx = e.touches[0].clientX - dragRef.current.lx
        const dy = e.touches[0].clientY - dragRef.current.ly
        dragRef.current.lx = e.touches[0].clientX
        dragRef.current.ly = e.touches[0].clientY
        camRef.current.theta -= dx * 0.008
        camRef.current.phi = Math.max(0.15, Math.min(1.4, camRef.current.phi + dy * 0.006))
      } else if (pinchRef.current.active && e.touches.length === 2) {
        const nd = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        )
        camRef.current.dist = Math.max(0.4, Math.min(3.0, camRef.current.dist - (nd - pinchRef.current.dist) * 0.003))
        pinchRef.current.dist = nd
      }
    }

    const onTouchEnd = () => {
      dragRef.current.active = false
      pinchRef.current.active = false
    }

    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('touchend', onTouchEnd)
    canvas.addEventListener('contextmenu', (e) => e.preventDefault())

    // Render loop
    const renderLoop = () => {
      simTimeRef.current += 0.022
      const W = canvas.width
      const H = canvas.height
      const s = simStateRef.current
      const phase = s.phase
      const t = simTimeRef.current
      const isNight = s.time === 'night'
      const cam = camRef.current

      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6)
      if (phase >= 5) {
        sky.addColorStop(0, isNight ? '#0d0003' : '#1a0508')
        sky.addColorStop(1, '#041428')
      } else if (phase === 1) {
        sky.addColorStop(0, '#0a0510')
        sky.addColorStop(1, '#041428')
      } else if (isNight) {
        sky.addColorStop(0, '#000005')
        sky.addColorStop(1, '#041428')
      } else {
        sky.addColorStop(0, '#020810')
        sky.addColorStop(0.5, '#041428')
        sky.addColorStop(1, '#062040')
      }
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, W, H)

      // Ocean Grid
      const COLS = 36
      const ROWS = 24
      const X0 = -120
      const X1 = 62
      const Z0 = -88
      const Z1 = 88
      const dx2 = (X1 - X0) / COLS
      const dz2 = (Z1 - Z0) / ROWS

      const pts = []
      for (let r = 0; r <= ROWS; r++) {
        pts[r] = []
        for (let c = 0; c <= COLS; c++) {
          const wx3 = X0 + c * dx2
          const wz3 = Z0 + r * dz2
          pts[r][c] = project3D(wx3, waveAt(wx3, wz3, phase, t, s), wz3, cam, W, H)
        }
      }

      // Painter's sorting back to front
      for (let r = ROWS - 1; r >= 0; r--) {
        for (let c = 0; c < COLS; c++) {
          const p00 = pts[r][c]
          const p10 = pts[r][c + 1]
          const p01 = pts[r + 1][c]
          const p11 = pts[r + 1][c + 1]
          if (!p00 || !p10 || !p01 || !p11) continue
          const wxc = X0 + (c + 0.5) * dx2
          const wzc = Z0 + (r + 0.5) * dz2
          if (wxc > 44) continue

          const wh = waveAt(wxc, wzc, phase, t, s)
          const depthFactor = Math.max(0, Math.min(1, 1 - (wxc + 120) / 162))
          const shoreFactor = Math.max(0, (wxc + 85) / 130)

          let rC = Math.round(8 + depthFactor * 12 + wh * 8)
          let gC = Math.round(60 + shoreFactor * 35 + wh * 12)
          let bC = Math.round(120 + depthFactor * 55 + wh * 18)
          if (isNight) {
            rC = Math.round(rC * 0.4)
            gC = Math.round(gC * 0.5)
            bC = Math.round(bC * 0.7)
          }

          ctx.beginPath()
          ctx.moveTo(p00.x, p00.y)
          ctx.lineTo(p10.x, p10.y)
          ctx.lineTo(p11.x, p11.y)
          ctx.lineTo(p01.x, p01.y)
          ctx.closePath()
          ctx.fillStyle = `rgba(${Math.min(255, rC)},${Math.min(255, gC)},${Math.min(255, bC)},0.9)`
          ctx.fill()
          ctx.strokeStyle = 'rgba(20,80,160,0.15)'
          ctx.lineWidth = 0.3
          ctx.stroke()
        }
      }

      // Beach
      for (let br = 0; br < 5; br++) {
        const bx0 = 43 + br * 2
        const bx1 = 45 + br * 2
        const bp = [
          project3D(bx0, 0, Z0, cam, W, H),
          project3D(bx1, 0, Z0, cam, W, H),
          project3D(bx1, 0, Z1, cam, W, H),
          project3D(bx0, 0, Z1, cam, W, H),
        ]
        if (bp[0] && bp[1] && bp[2] && bp[3]) {
          ctx.beginPath()
          ctx.moveTo(bp[0].x, bp[0].y)
          ctx.lineTo(bp[1].x, bp[1].y)
          ctx.lineTo(bp[2].x, bp[2].y)
          ctx.lineTo(bp[3].x, bp[3].y)
          ctx.closePath()
          ctx.fillStyle = isNight ? '#503820' : '#c29758'
          ctx.fill()
        }
      }

      // Inland terrain
      let floodWave = 0
      if (phase === 5) {
        floodWave = Math.max(0, Math.sin((55 - t * 9) * 0.075) * s.waveH * 0.3)
      }

      const lCols = 8
      const lRows = 6
      const ldx = (120 - 54) / lCols
      const ldz = (Z1 - Z0) / lRows
      for (let lr = 0; lr < lRows; lr++) {
        for (let lc = 0; lc < lCols; lc++) {
          const lx = 54 + lc * ldx
          const lz = Z0 + lr * ldz
          const ly = floodWave > 0 ? floodWave * Math.max(0, 1 - (lx - 54) / 45) : 0.3
          const lp = [
            project3D(lx, ly, lz, cam, W, H),
            project3D(lx + ldx, ly, lz, cam, W, H),
            project3D(lx + ldx, ly, lz + ldz, cam, W, H),
            project3D(lx, ly, lz + ldz, cam, W, H),
          ]
          if (lp[0] && lp[1] && lp[2] && lp[3]) {
            ctx.beginPath()
            ctx.moveTo(lp[0].x, lp[0].y)
            ctx.lineTo(lp[1].x, lp[1].y)
            ctx.lineTo(lp[2].x, lp[2].y)
            ctx.lineTo(lp[3].x, lp[3].y)
            ctx.closePath()
            ctx.fillStyle = ly > 0.5 ? 'rgba(10,70,120,0.85)' : isNight ? '#16331a' : '#2d6a36'
            ctx.fill()
          }
        }
      }

      // Trees
      const trees = [
        { x: 57, z: -30 },
        { x: 58, z: 10 },
        { x: 60, z: -10 },
        { x: 62, z: 30 },
      ]
      trees.forEach((tree) => {
        drawPalmTree(ctx, tree.x, tree.z, 6, cam, W, H)
      })

      // Buildings
      const buildings = [
        { x: 68, z: -40, w: 6, d: 6, h: 8, col: '#7a4020', gable: true },
        { x: 68, z: 20, w: 6, d: 6, h: 7, col: '#7a4020', gable: true },
        { x: 76, z: -20, w: 7, d: 7, h: 14, col: '#3a4f6e' },
        { x: 76, z: 15, w: 8, d: 8, h: 18, col: '#4a5f7e' },
        { x: 86, z: 0, w: 9, d: 9, h: 24, col: '#303848' },
      ]
      buildings.forEach((b) => {
        drawBuilding3D(ctx, b, floodWave, cam, W, H, phase)
      })

      // Humans
      const running = phase >= 4
      const humans = [
        { wx: 56, wz: -25, col: '#fbbf24' },
        { wx: 58, wz: 5, col: '#34d399' },
        { wx: 66, wz: -15, col: '#60a5fa' },
      ]
      humans.forEach((hObj, hi) => {
        const flee = running ? hi * 3 + (t * 5) % 30 : 0
        const sp = project3D(hObj.wx + flee, 0, hObj.wz, cam, W, H)
        drawHuman(ctx, sp, 0.7, hObj.col, running, t)
      })

      // HUD Overlay on Canvas
      ctx.fillStyle = 'rgba(10, 14, 26, 0.85)'
      if (ctx.roundRect) ctx.roundRect(14, 14, 200, 68, 8)
      else ctx.rect(14, 14, 200, 68)
      ctx.fill()
      ctx.strokeStyle = '#1e293b'
      ctx.stroke()

      ctx.font = 'bold 12px sans-serif'
      ctx.fillStyle = '#0ea5e9'
      ctx.fillText(`FASE ${phase + 1} / 6`, 26, 34)

      ctx.font = '11px sans-serif'
      ctx.fillStyle = '#cbd5e1'
      ctx.fillText(`M${s.mag.toFixed(1)} · ${s.dep} km · ${s.dist} km`, 26, 52)

      ctx.fillStyle = '#64748b'
      ctx.font = '9px sans-serif'
      ctx.fillText('Drag: putar kamera | Scroll: zoom', 26, 68)

      animFrameRef.current = requestAnimationFrame(renderLoop)
    }

    renderLoop()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('wheel', onWheel)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    }
  }, [])

  return (
    <section id="simulasi" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-xs font-semibold text-[#38bdf8] uppercase tracking-wider mb-3">
            <Waves className="w-3.5 h-3.5" />
            <span>Simulasi Interaktif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Simulasi Tsunami Indonesia
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#94a3b8] max-w-2xl">
            Eksplorasi pengaruh magnitudo gempa, kedalaman hiposentrum, jarak episentrum, dan konfigurasi pantai terhadap penjalaran gelombang tsunami secara visual.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Controls & Parameters */}
        <div className="lg:col-span-4 bg-[#111827] border border-[#1e293b] rounded-2xl p-5 shadow-xl space-y-6">
          {/* Section A: Earthquake Parameters */}
          <div>
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1e293b] text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
              <Activity className="w-4 h-4 text-[#0ea5e9]" />
              <span>Parameter Gempa</span>
            </div>

            <div className="mt-4 space-y-4">
              {/* Mag Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#cbd5e1] font-medium">Magnitudo Gempa</span>
                  <span className="font-mono font-bold text-[#0ea5e9] text-sm">
                    {mag.toFixed(1)} SR
                  </span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="9.5"
                  step="0.1"
                  value={mag}
                  onChange={(e) => setMag(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]"
                />
                <div className="flex justify-between text-[10px] text-[#64748b] mt-1 font-mono">
                  <span>5.0</span>
                  <span>7.0</span>
                  <span>8.0</span>
                  <span>9.5</span>
                </div>
              </div>

              {/* Depth Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#cbd5e1] font-medium">Kedalaman Gempa</span>
                  <span className="font-mono font-bold text-[#0ea5e9] text-sm">
                    {dep} km
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={dep}
                  onChange={(e) => setDep(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]"
                />
                <div className="flex justify-between text-[10px] text-[#64748b] mt-1">
                  <span>5 km (Dangkal)</span>
                  <span>200 km (Dalam)</span>
                </div>
              </div>

              {/* Distance Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#cbd5e1] font-medium">Jarak Episentrum ke Pantai</span>
                  <span className="font-mono font-bold text-[#0ea5e9] text-sm">
                    {dist} km
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={dist}
                  onChange={(e) => setDist(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]"
                />
                <div className="flex justify-between text-[10px] text-[#64748b] mt-1">
                  <span>10 km</span>
                  <span>500 km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Environmental Conditions */}
          <div>
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1e293b] text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
              <Sliders className="w-4 h-4 text-[#f97316]" />
              <span>Kondisi Lingkungan</span>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[#cbd5e1] mb-1.5 font-medium">
                  Zona Batimetri Laut
                </label>
                <select
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-[#e2e8f0] focus:border-[#0ea5e9] focus:outline-none"
                >
                  <option value="shallow">Perairan dangkal / Paparan benua</option>
                  <option value="trench">Zona subduksi (Palung laut Sunda)</option>
                  <option value="deep">Laut dalam (&gt; 3.000 meter)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#cbd5e1] mb-1.5 font-medium">
                  Morfologi Garis Pantai
                </label>
                <select
                  value={coast}
                  onChange={(e) => setCoast(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-[#e2e8f0] focus:border-[#0ea5e9] focus:outline-none"
                >
                  <option value="open">Pantai terbuka / landai</option>
                  <option value="bay">Teluk sempit / muara sungai (amplifikasi +80%)</option>
                  <option value="cliff">Tebing curam / berbukit (-30%)</option>
                  <option value="mangrove">Pesisir dengan hutan mangrove (-40%)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#cbd5e1] mb-1.5 font-medium">
                  Waktu Peristiwa
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1e293b] rounded-xl text-[#e2e8f0] focus:border-[#0ea5e9] focus:outline-none"
                >
                  <option value="day">Siang Hari (06:00 – 18:00)</option>
                  <option value="night">Malam / Dini Hari (Keterbatasan Visibilitas)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section C: Simulation Phases */}
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#1e293b] text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#22c55e]" />
                <span>Fase Simulasi</span>
              </span>
              <span className="text-[11px] text-[#0ea5e9]">
                {currentPhase + 1} / 6
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {[
                'Kondisi Normal',
                'Gempa — Deformasi',
                'Gelombang Lahir',
                'Propagasi Samudra',
                'Pendangkalan',
                'Hantaman Pesisir',
              ].map((name, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPhase(idx)}
                  className={`px-2.5 py-2 rounded-xl text-left font-medium transition-all duration-200 border ${
                    currentPhase === idx
                      ? 'bg-[#1a2234] border-[#0ea5e9] text-white shadow-sm'
                      : 'bg-[#0a0e1a] border-[#1e293b] text-[#94a3b8] hover:text-white hover:border-[#38bdf8]/50'
                  }`}
                >
                  <span className="font-mono text-[#0ea5e9] mr-1.5">{idx + 1}.</span>
                  {name}
                </button>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={handleAutoPlay}
                disabled={isAutoPlaying}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0ea5e9] hover:bg-[#38bdf8] text-[#0a0e1a] text-xs font-bold transition-colors disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isAutoPlaying ? 'Memutar...' : 'Auto Play'}</span>
              </button>
              <button
                onClick={handleResetPhase}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a2234] hover:bg-[#243048] text-white border border-[#1e293b] text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Phase Description Box */}
            <div className="mt-3 p-3 rounded-xl bg-[#0a0e1a] border border-[#1e293b] text-xs text-[#94a3b8] leading-relaxed">
              {getPhaseDescription(currentPhase)}
            </div>
          </div>
        </div>

        {/* Right Column: 3D pseudo-canvas + Results Panel */}
        <div className="lg:col-span-8 space-y-4">
          {/* Canvas Card */}
          <div className="relative rounded-2xl bg-[#020d1a] border border-[#1e293b] overflow-hidden shadow-2xl">
            <canvas
              ref={canvasRef}
              className="w-full h-[560px] cursor-grab active:cursor-grabbing block"
            />
            {/* Interactive hint floating */}
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-[#0a0e1a]/80 backdrop-blur-sm border border-[#1e293b] text-[11px] text-[#94a3b8] flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#0ea5e9]" />
              <span>Gunakan kursor mouse / sentuhan layar untuk memutar sudut pandang</span>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="rounded-2xl bg-[#111827] border border-[#1e293b] overflow-hidden shadow-xl">
            {/* Alert Status Banner */}
            <div className={`px-5 py-3 border-b text-xs sm:text-sm font-bold flex items-center justify-between ${outputs.alertClass}`}>
              <span>{outputs.alertText}</span>
              <span className="uppercase text-[11px] tracking-widest font-mono">
                Status: {outputs.level}
              </span>
            </div>

            {/* Metrics Output Grid */}
            <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-[#1a2234] border border-[#1e293b]">
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider block font-semibold mb-1">
                  Ketinggian Tsunami
                </span>
                <span className="text-2xl font-extrabold text-white font-mono">
                  {outputs.heightFormatted}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1a2234] border border-[#1e293b]">
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider block font-semibold mb-1">
                  Perkiraan Waktu Tiba
                </span>
                <span className="text-2xl font-extrabold text-[#38bdf8] font-mono">
                  {outputs.etaFormatted}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1a2234] border border-[#1e293b]">
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider block font-semibold mb-1">
                  Kecepatan Gelombang
                </span>
                <span className="text-2xl font-extrabold text-[#f59e0b] font-mono">
                  {outputs.speedFormatted}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1a2234] border border-[#1e293b]">
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider block font-semibold mb-1">
                  Jangkauan Daratan
                </span>
                <span className="text-2xl font-extrabold text-[#ef4444] font-mono">
                  {outputs.inlandFormatted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
