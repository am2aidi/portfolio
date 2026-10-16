import React, { useEffect, useRef } from 'react'
import './IntroScreen.css'

export default function IntroScreen({ onFinish }) {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const preRef = useRef(null)
  const curtainRef = useRef(null)
  const nameRef = useRef(null)
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const tickRef = useRef(null)

  useEffect(() => {
    /* ============ SETTINGS: matching user snippet ============ */
    const NAME = 'KWIZERA'
    const TICKER = 'FULL STACK DEVELOPER  \u2022  REACT  \u2022  PYTHON  \u2022  FLASK  \u2022  JAVA  \u2022  MYSQL  \u2022  '
    const PRELOAD_MS = 2200   // how long the small name + red line shows
    const HOLD_MS = 7500      // how long the big name stays before going to the portfolio
    /* ========================================================== */

    const hero = heroRef.current
    const pre = preRef.current
    const curtain = curtainRef.current
    const nameEl = nameRef.current
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!hero || !pre || !curtain || !nameEl || !wrap || !canvas) return

    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (tickRef.current) {
      tickRef.current.textContent = TICKER + TICKER + TICKER + TICKER
    }

    // Clear any previous spans
    nameEl.innerHTML = ''
    const letters = NAME.split('').map((ch, i) => {
      const s = document.createElement('span')
      s.textContent = ch
      s.style.transitionDelay = (i * 90) + 'ms'
      nameEl.appendChild(s)
      return s
    })
    const n = letters.length

    /* ---- size the name to the container ---- */
    function fit() {
      if (!wrap || !nameEl) return
      const w = wrap.clientWidth
      const narrow = window.innerWidth < 600
      const fs = Math.min((w / n) * (narrow ? 1.55 : 1.95), window.innerHeight * 0.5)
      nameEl.style.fontSize = fs + 'px'
    }

    function resize() {
      if (!canvas || !ctx) return
      const d = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * d
      canvas.height = window.innerHeight * d
      ctx.setTransform(d, 0, 0, d, 0, 0)
      fit()
    }

    window.addEventListener('resize', resize)
    resize()

    /* ---- pointer (real, or a wandering virtual one when idle) ---- */
    const real = { x: window.innerWidth / 2, y: window.innerHeight / 2, t: -1e9 }
    function mv(e) {
      const p = e.touches ? e.touches[0] : e
      real.x = p.clientX
      real.y = p.clientY
      real.t = performance.now()
    }
    window.addEventListener('pointermove', mv, { passive: true })
    window.addEventListener('touchmove', mv, { passive: true })

    const cur = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let vx = 0
    function map(v, a, b, c, d) {
      return c + (d - c) * Math.min(1, Math.max(0, (v - a) / (b - a)))
    }

    let running = false
    let t0 = null
    let leaving = false
    let done = false
    let rafId = null
    let autoLeaveTimer = null
    let targetSection = null

    function frame(ts) {
      if (done) return
      if (t0 === null) t0 = ts
      const t = ts - t0

      // target = real pointer if recently moved, else a slow wander across the name
      let tx, ty
      const r = wrap ? wrap.getBoundingClientRect() : { left: 0, top: 0, width: 400, height: 200 }
      if (ts - real.t < 2500) {
        tx = real.x
        ty = real.y
      } else {
        tx = r.left + r.width * (0.5 + Math.sin(t * 0.00055) * 0.46 + Math.sin(t * 0.0017) * 0.04)
        ty = r.top + r.height * (0.5 + Math.sin(t * 0.0009 + 1.2) * 0.55)
      }
      const px = cur.x
      cur.x += (tx - cur.x) * 0.07
      cur.y += (ty - cur.y) * 0.07
      vx += ((cur.x - px) - vx) * 0.25

      // letters: closer to the pointer => heavier + wider (like the video)
      const maxD = r.width * 0.5
      const ghost = Math.max(-46, Math.min(46, vx * 3.2))
      for (let i = 0; i < n; i++) {
        if (!letters[i]) continue
        const b = letters[i].getBoundingClientRect()
        const dx = cur.x - (b.left + b.width / 2)
        const dy = (cur.y - (b.top + b.height / 2)) * 0.6
        const d = Math.sqrt(dx * dx + dy * dy)
        const wd = map(d, 0, maxD, 125, 25)
        const wg = map(d, 0, maxD, 900, 100)
        const near = 1 - Math.min(1, d / maxD)
        const el = letters[i]
        el.style.fontVariationSettings = '"wght" ' + wg.toFixed(0) + ',"wdth" ' + wd.toFixed(0)

        // horizontal echo trail on the heavy letters while the pointer moves
        if (near > 0.3 && Math.abs(ghost) > 3) {
          let s = ''
          for (let k = 1; k <= 4; k++) {
            s += (k > 1 ? ',' : '') + (-ghost * k * 0.55).toFixed(1) + 'px 0 0 rgba(255,255,255,' + (0.34 / k).toFixed(2) + ')'
          }
          el.style.textShadow = s
        } else {
          el.style.textShadow = 'none'
        }
      }

      // red smoke following the pointer
      if (ctx) {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillStyle = 'rgba(0,0,0,.055)'
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.globalCompositeOperation = 'lighter'
        const rad = Math.max(window.innerWidth, window.innerHeight) * 0.1
        const g = ctx.createRadialGradient(cur.x, cur.y - rad * 0.3, 0, cur.x, cur.y - rad * 0.3, rad)
        g.addColorStop(0, 'rgba(255,70,50,.55)')
        g.addColorStop(0.5, 'rgba(255,50,40,.22)')
        g.addColorStop(1, 'rgba(255,40,30,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cur.x, cur.y - rad * 0.3, rad, 0, 6.283)
        ctx.fill()
      }

      rafId = requestAnimationFrame(frame)
    }

    function go() {
      if (done) return
      done = true
      document.body.style.overflow = ''
      if (onFinish) onFinish(targetSection)
    }

    function leave(target) {
      if (leaving) return
      leaving = true
      if (target) targetSection = target
      curtain.classList.add('up')
      setTimeout(go, 950)
    }

    function begin() {
      if (running) return
      running = true
      pre.classList.add('out')
      setTimeout(() => {
        if (hero) hero.classList.add('show')
      }, 500)

      if (reduce) {
        letters.forEach((l) => {
          l.style.fontVariationSettings = '"wght" 500,"wdth" 60'
        })
        setTimeout(() => leave(), 2500)
        return
      }

      rafId = requestAnimationFrame(frame)
      autoLeaveTimer = setTimeout(() => leave(), HOLD_MS)
    }

    // Attach button events
    const exploreBtn = document.getElementById('intro-explore')
    const talkLink = document.getElementById('intro-talk')

    const handleExplore = () => leave()
    const handleTalk = (e) => {
      e.preventDefault()
      leave('contact')
    }

    if (exploreBtn) exploreBtn.addEventListener('click', handleExplore)
    if (talkLink) talkLink.addEventListener('click', handleTalk)

    let ready = false
    function kick() {
      if (ready) return
      ready = true
      setTimeout(begin, PRELOAD_MS)
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(kick)
      setTimeout(kick, 1800)
    } else {
      kick()
    }

    // Freeze background scroll while intro is playing
    document.body.style.overflow = 'hidden'

    return () => {
      done = true
      document.body.style.overflow = ''
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', mv)
      window.removeEventListener('touchmove', mv)
      if (exploreBtn) exploreBtn.removeEventListener('click', handleExplore)
      if (talkLink) talkLink.removeEventListener('click', handleTalk)
      if (rafId) cancelAnimationFrame(rafId)
      if (autoLeaveTimer) clearTimeout(autoLeaveTimer)
    }
  }, [onFinish])

  return (
    <div className="intro-root no-print" ref={containerRef}>
      {/* ---------- preloader: small name + red line ---------- */}
      <div className="intro-pre" ref={preRef}>
        <div className="intro-pre-in">
          <div className="intro-pre-name">KWIZERA ZAIDI</div>
          <div className="intro-pre-line">
            <i></i>
          </div>
        </div>
      </div>

      {/* ---------- hero (the name) ---------- */}
      <section className="intro-hero" ref={heroRef}>
        <canvas id="intro-smoke" className="intro-canvas-smoke" ref={canvasRef}></canvas>

        <div className="intro-wrap" ref={wrapRef}>
          <h1 className="intro-name" ref={nameRef} aria-label="Kwizera"></h1>
          <div className="intro-strike"></div>
          <div className="intro-ticker" aria-hidden="true">
            <div id="intro-tick" ref={tickRef}></div>
          </div>
        </div>

        <div className="intro-ui">
          <div className="intro-tl">
            <b>KZ</b>
            <small>Building ideas into software.</small>
          </div>
          <div className="intro-tr">Kigali, Rwanda</div>
          <p className="intro-bl">
            Full Stack Developer &amp; Information Systems graduate. Building fast, clean and reliable web products with React, Python and Flask.
          </p>
          <div className="intro-br">
            <button className="intro-pill" id="intro-explore" type="button">
              &#8599; Explore More
            </button>
            <a className="intro-link" id="intro-talk" href="#contact">
              Let&rsquo;s Talk &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ---------- exit curtain ---------- */}
      <div className="intro-curtain" ref={curtainRef}></div>
    </div>
  )
}
