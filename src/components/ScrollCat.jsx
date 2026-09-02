import { useEffect, useRef } from 'react'

// Easter egg: a white cat that peeks up from the bottom edge as you scroll.
// It appears at the far bottom-right once the Experience section scrolls into
// view, showing only ears, eyes, and the top of its nose — low enough to never
// block content. As you keep scrolling it slowly creeps sideways until it sits
// directly under the contact email button, and only at the very bottom does
// the body spring up so the cat can bap the button from below. Its eyes follow
// the cursor the whole time. The reward for scrolling all the way down.
//
// Drawn as wobbly hand-sketched line art: white fill, dark ink outlines.
// Everything is pointer-events-none, so it never intercepts a click.

const BOTTOM_AT = 0.995 // "the very bottom": where the body springs up
const FACE_Y = 59 // translateY% showing ears, eyes, and half the nose
const BODY_Y = 20 // translateY% of the sprung-up pose (mid-belly)
const TAP_MS = 3000 // bap-bap, then a pause

const INK = '#0f172a'

// Eye centers in the SVG's 220x300 coordinate space, for cursor tracking.
const EYE_L = { x: 82, y: 92 }
const EYE_R = { x: 149, y: 90 }

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (t) => Math.min(1, Math.max(0, t))

export default function ScrollCat() {
  const overlayRef = useRef(null)
  const catRef = useRef(null)
  const armRef = useRef(null)
  const limbInkRef = useRef(null)
  const limbRef = useRef(null)
  const pawRef = useRef(null)
  const pupilLRef = useRef(null)
  const pupilRRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const armEase = reduceMotion ? 1 : 0.14
    const slideEase = reduceMotion ? 1 : 0.08
    // The body position runs on a slightly underdamped spring so the jump to
    // the full pose lands with a bounce instead of a glide.
    const spring = { k: 170, damp: 0.92 }
    const shown = { x: null, y: 100, vy: 0, q: 0 }
    const gaze = { x: 0, y: 0 }
    const pointer = { x: null, y: null }
    let last = performance.now()
    let raf

    const onPointerMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(Math.max((now - last) / 1000, 1 / 120), 1 / 30)
      last = now

      const cat = catRef.current
      const arm = armRef.current
      if (!cat || !arm) return

      // Mobile browsers hide/show their URL bar while scrolling, and a fixed
      // inset-0 overlay tracks the layout viewport, not the visible one — the
      // cat would float above the real bottom edge. Pin the overlay's height
      // to the visual viewport so bottom-0 always means the visible bottom.
      // (Skipped mid pinch-zoom, where chasing the viewport looks jittery.)
      const vv = window.visualViewport
      if (vv && Math.abs(vv.scale - 1) < 0.02) {
        overlayRef.current.style.height = `${vv.height + vv.offsetTop}px`
      }

      const vh = window.innerHeight
      const vw = window.innerWidth
      const max = document.documentElement.scrollHeight - vh
      const sy = window.scrollY
      const p = max > 0 ? clamp01(sy / max) : 0

      const rect = cat.getBoundingClientRect()
      const catW = rect.width || 100
      const btn = document.querySelector('#contact a[href^="mailto:"]')
      const bRect = btn && btn.getBoundingClientRect()
      const btnCx = bRect ? bRect.left + bRect.width / 2 : vw / 2
      const xRight = vw - catW - 8
      const xUnder = btnCx - catW / 2

      // Vertical reveal is anchored to the Experience section ("where I've
      // worked"): the face creeps in as that section scrolls into view.
      const exp = document.getElementById('experience')
      const expTop = exp ? exp.getBoundingClientRect().top + sy : max * 0.5
      const s0 = expTop - vh * 0.75 // face starts creeping in
      const s1 = expTop - vh * 0.35 // face fully peeked, holding
      const sEnd = max * BOTTOM_AT

      let ty, tq
      if (max < vh * 0.75) {
        ty = 100
        tq = 0
      } else if (p >= BOTTOM_AT) {
        ty = BODY_Y
        tq = 1
      } else {
        if (sy <= s0) ty = 100
        else if (sy <= s1) ty = 100 - ((sy - s0) / Math.max(s1 - s0, 1)) * (100 - FACE_Y)
        else ty = FACE_Y
        tq = 0
      }
      // Sideways creep: far right while peeking in, then slowly over until the
      // cat sits directly under the email button at the bottom.
      const u = sEnd > s1 ? clamp01((sy - s1) / (sEnd - s1)) : 1
      const tx = lerp(xRight, xUnder, u)

      if (shown.x === null) shown.x = tx
      shown.x = lerp(shown.x, tx, slideEase)
      if (Math.abs(shown.x - tx) < 0.1) shown.x = tx
      if (reduceMotion) {
        shown.y = ty
      } else {
        shown.vy += (ty - shown.y) * spring.k * dt
        shown.vy *= spring.damp
        shown.y += shown.vy * dt
        if (Math.abs(shown.vy) < 0.05 && Math.abs(ty - shown.y) < 0.05) {
          shown.y = ty
          shown.vy = 0
        }
      }
      shown.q = lerp(shown.q, tq, armEase)
      if (Math.abs(shown.q - tq) < 0.002) shown.q = tq

      cat.style.transform = `translate(${shown.x}px, ${shown.y}%)`

      // Eyes follow the cursor; with no pointer yet they eye the email button.
      const boxH = rect.height || catW * (300 / 220)
      const scale = catW / 220
      const lookAt = pointer.x !== null ? pointer : { x: btnCx, y: bRect ? bRect.top : vh * 0.5 }
      const aim = (eye) => {
        const ex = rect.left + eye.x * scale
        const ey = rect.top + (eye.y / 300) * boxH
        const a = Math.atan2(lookAt.y - ey, lookAt.x - ex)
        return { x: Math.cos(a) * 9, y: Math.sin(a) * 5.5 }
      }
      const gl = aim(EYE_L)
      gaze.x = lerp(gaze.x, gl.x, reduceMotion ? 1 : 0.2)
      gaze.y = lerp(gaze.y, gl.y, reduceMotion ? 1 : 0.2)
      const gr = aim(EYE_R)
      pupilLRef.current.setAttribute('transform', `translate(${gaze.x} ${gaze.y})`)
      // Both eyes share the smoothed offset direction; the right eye just
      // re-aims from its own center so the gaze converges naturally.
      pupilRRef.current.setAttribute(
        'transform',
        `translate(${gaze.x + (gr.x - gl.x)} ${gaze.y + (gr.y - gl.y)})`,
      )

      if (shown.q <= 0.004) {
        arm.style.opacity = '0'
        return
      }
      arm.style.opacity = '1'

      // Shoulder on the cat's LEFT side; the paw baps the button's underside,
      // wherever it actually is right now, so the hit connects at any size.
      const S = { x: rect.left + rect.width * 0.22, y: rect.top + rect.height * 0.45 }
      const T = bRect
        ? { x: btnCx, y: bRect.bottom - 4 }
        : { x: vw / 2, y: vh * 0.5 }

      // Two quick baps, then a pause. Skipped under reduced motion.
      let w = 0
      if (!reduceMotion) {
        const tu = (now % TAP_MS) / TAP_MS
        if (tu < 0.18) w = Math.sin(Math.PI * (tu / 0.18))
        else if (tu >= 0.24 && tu < 0.42) w = Math.sin(Math.PI * ((tu - 0.24) / 0.18))
      }

      const dist = Math.hypot(T.x - S.x, T.y - S.y)
      const angle = Math.atan2(T.y - S.y, T.x - S.x)
      // Hover just short of the button; each bap pushes the paw onto it.
      const len = (dist - 24 + 30 * w) * easeInOut(shown.q)
      const E = { x: S.x + Math.cos(angle) * len, y: S.y + Math.sin(angle) * len }
      // Bow the arm gently to the side, like a relaxed limb.
      const n = dist > 1 ? { x: (E.y - S.y) / dist, y: -(E.x - S.x) / dist } : { x: 0, y: 0 }
      const C = {
        x: (S.x + E.x) / 2 + n.x * len * 0.15,
        y: (S.y + E.y) / 2 + n.y * len * 0.15,
      }
      const d = `M ${S.x} ${S.y} Q ${C.x} ${C.y} ${E.x} ${E.y}`
      limbInkRef.current.setAttribute('d', d)
      limbRef.current.setAttribute('d', d)
      const deg = (Math.atan2(E.y - C.y, E.x - C.x) * 180) / Math.PI
      pawRef.current.setAttribute('transform', `translate(${E.x} ${E.y}) rotate(${deg})`)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-screen overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* The arm, drawn in viewport pixels. Rendered before the cat so the
          shoulder end hides behind the body. */}
      <svg
        ref={armRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0, filter: 'drop-shadow(0 0 5px rgba(2, 6, 23, 0.55))' }}
      >
        {/* a plain long tube — the rounded cap is the paw itself */}
        <path ref={limbInkRef} d="" fill="none" stroke={INK} strokeWidth="21" strokeLinecap="round" />
        <path ref={limbRef} d="" fill="none" stroke="#fff" strokeWidth="16" strokeLinecap="round" />
        {/* toe beans drawn inside the tip of the tube */}
        <g ref={pawRef} fill="#fff" stroke={INK} strokeWidth="1.8">
          <ellipse cx="-8" cy="0" rx="3.6" ry="4.2" />
          <circle cx="-1" cy="-4.5" r="2.6" />
          <circle cx="1" cy="0" r="2.6" />
          <circle cx="-1" cy="4.5" r="2.6" />
        </g>
      </svg>

      {/* The cat; translate does the reveal and the sideways creep. The torso
          runs past the sprung pose so the spring's overshoot never shows a
          cut edge. */}
      <div
        ref={catRef}
        className="absolute bottom-0 left-0"
        style={{ width: 'clamp(88px, 9vw, 120px)', transform: 'translate(0px, 100%)' }}
      >
        <svg
          viewBox="0 0 220 300"
          className="block h-auto w-full"
          style={{ filter: 'drop-shadow(0 0 5px rgba(2, 6, 23, 0.55))' }}
        >
          {/* one wobbly outline for ears, boxy head, and body down the torso */}
          <path
            d="M 24 300
               Q 20 220 32 150
               Q 28 112 42 62
               L 56 52 L 66 6 L 98 38
               Q 112 46 126 42
               L 162 2 L 182 52
               Q 192 62 194 96
               Q 199 128 193 158
               Q 202 220 200 300
               Z"
            fill="#fff"
            stroke={INK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* big almond eyes; the slit pupils follow the cursor and blink
              (see .cat-eye in index.css) */}
          <g className="cat-eye">
            <path d="M 56 94 Q 80 70 108 92 Q 82 114 56 94 Z" fill="#fff" stroke={INK} strokeWidth="3" />
            <ellipse ref={pupilLRef} cx={EYE_L.x} cy={EYE_L.y} rx="2.6" ry="9" fill={INK} />
          </g>
          <g className="cat-eye">
            <path d="M 122 92 Q 148 68 176 92 Q 150 112 122 92 Z" fill="#fff" stroke={INK} strokeWidth="3" />
            <ellipse ref={pupilRRef} cx={EYE_R.x} cy={EYE_R.y} rx="2.6" ry="9" fill={INK} />
          </g>
          {/* squarish little nose, slightly crooked, and a chin scribble */}
          <rect x="106" y="116" width="20" height="15" rx="4" fill="#fff" stroke={INK} strokeWidth="3" transform="rotate(-3 116 123)" />
          <path d="M 116 132 Q 115 138 118 142" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          {/* whiskers, angled downward; hidden until the body springs up */}
          <g stroke={INK} strokeWidth="2.5" strokeLinecap="round">
            <path d="M 98 124 L 38 132" />
            <path d="M 98 132 L 46 152" />
            <path d="M 100 140 L 58 168" />
            <path d="M 126 124 L 186 134" />
            <path d="M 126 132 L 178 152" />
            <path d="M 124 140 L 168 166" />
          </g>
        </svg>
      </div>
    </div>
  )
}
