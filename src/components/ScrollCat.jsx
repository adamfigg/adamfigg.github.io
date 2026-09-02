import { useEffect, useRef } from 'react'

// Easter egg (desktop only): a white cat that peeks up from the bottom edge as
// you scroll. It appears at the far bottom-right once the Experience section
// scrolls into view, showing only ears, eyes, and the top of its nose — low
// enough to never block content. As you keep scrolling it slowly creeps
// sideways toward the contact area, and only at the very bottom does the body
// spring up so the cat can bap a contact link with an L-shaped arm. Hovering
// any of the four contact links makes it drop the arm, scurry under that link,
// and reach out again — the two left links get the left arm, the two right
// links the right arm. Its eyes follow the cursor the whole time.
//
// Drawn as wobbly hand-sketched line art: white fill, dark ink outlines.
// Everything is pointer-events-none, so it never intercepts a click.

const BOTTOM_AT = 0.995 // "the very bottom": where the body springs up
const FACE_Y = 59 // translateY% showing ears, eyes, and half the nose
const BODY_Y = 20 // translateY% of the sprung-up pose (mid-belly)
const TAP_MS = 3000 // bap-bap, then a pause
const SIDE_OFFSET = 1.0 // cat parks this far (in cat widths) beside its target
const BOW = 0.35 // how strongly the arm arches, as a fraction of its length

const INK = '#0f172a'

// Eye centers in the SVG's 220x300 coordinate space, for cursor tracking.
const EYE_L = { x: 82, y: 92 }
const EYE_R = { x: 149, y: 90 }

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (t) => Math.min(1, Math.max(0, t))

// Quadratic bezier point and tangent, for the arm's arch.
const bez = (a, c, b, t) => {
  const u = 1 - t
  return {
    x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
  }
}
const bezTan = (a, c, b, t) => ({
  x: 2 * (1 - t) * (c.x - a.x) + 2 * t * (b.x - c.x),
  y: 2 * (1 - t) * (c.y - a.y) + 2 * t * (b.y - c.y),
})

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
    const slideEase = reduceMotion ? 1 : 0.08
    // The body position runs on a slightly underdamped spring so the jump to
    // the full pose lands with a bounce instead of a glide.
    const spring = { k: 170, damp: 0.92 }
    // r is the arm's extension (0 retracted, 1 reaching the target). Changing
    // targets drives r to 0 first, so the arm drops before reaching out again.
    const shown = { x: null, y: 100, vy: 0, r: 0, bx: 0, by: 0 }
    const gaze = { x: 0, y: 0 }
    const pointer = { x: null, y: null }
    let armSide = null
    let last = performance.now()
    let raf

    const onPointerMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // Once the cat is up, hovering any contact link makes it scurry over and
    // bap that one. Leaving the links keeps the cat on the last one hovered.
    const hover = { el: null, lastEl: null }
    const links = Array.from(document.querySelectorAll('#contact a'))
    const onEnter = (e) => {
      hover.el = e.currentTarget
      hover.lastEl = e.currentTarget
    }
    const onLeave = (e) => {
      if (hover.el === e.currentTarget) hover.el = null
    }
    links.forEach((l) => {
      l.addEventListener('pointerenter', onEnter)
      l.addEventListener('pointerleave', onLeave)
    })

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(Math.max((now - last) / 1000, 1 / 120), 1 / 30)
      last = now

      const cat = catRef.current
      const arm = armRef.current
      if (!cat || !arm) return

      // Mobile browsers hide/show their URL bar while scrolling, and a fixed
      // inset-0 overlay tracks the layout viewport, not the visible one. Pin
      // the overlay's height to the visual viewport so bottom-0 always means
      // the visible bottom. (Skipped mid pinch-zoom, where it looks jittery.)
      const vv = window.visualViewport
      const vvOk = vv && Math.abs(vv.scale - 1) < 0.02
      const viewBottom = vvOk ? vv.height + vv.offsetTop : window.innerHeight
      if (vvOk) {
        overlayRef.current.style.height = `${viewBottom}px`
      }

      const vh = window.innerHeight
      const vw = window.innerWidth
      const max = document.documentElement.scrollHeight - vh
      const sy = window.scrollY
      const p = max > 0 ? clamp01(sy / max) : 0
      const isMobile = vw < 640

      const rect = cat.getBoundingClientRect()
      const catW = rect.width || 100

      // The active target: the hovered link wins, then the last hovered one,
      // then the email button. The two left links use the cat's left arm and
      // the two right links its right arm, with the cat parked beside the
      // target so the L-shaped reach reads clearly.
      const btn =
        hover.el || hover.lastEl || document.querySelector('#contact a[href^="mailto:"]')
      const bRect = btn && btn.getBoundingClientRect()
      const btnIdx = btn ? links.indexOf(btn) : 0
      const side = btnIdx >= 2 ? 'right' : 'left' // which arm reaches
      const btnCx = bRect ? bRect.left + bRect.width / 2 : vw / 2
      const xRight = vw - catW - 8
      // Left arm: park to the right of the target; right arm: to the left.
      const xUnder = btnCx - catW / 2 + (side === 'left' ? 1 : -1) * SIDE_OFFSET * catW

      // Vertical reveal is anchored to the Experience section ("where I've
      // worked"): the face creeps in as that section scrolls into view.
      const exp = document.getElementById('experience')
      const expTop = exp ? exp.getBoundingClientRect().top + sy : max * 0.5
      const s0 = expTop - vh * 0.75 // face starts creeping in
      const s1 = expTop - vh * 0.35 // face fully peeked, holding
      const sEnd = max * BOTTOM_AT

      let ty, tq
      if (isMobile || max < vh * 0.75) {
        // No cat on mobile: the bottom edge is too crowded to share.
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
      // cat sits beside its contact-link target at the bottom.
      const u = sEnd > s1 ? clamp01((sy - s1) / (sEnd - s1)) : 1
      const tx = lerp(xRight, xUnder, u)

      if (shown.x === null) shown.x = tx
      // The creep is slow; the hover-chasing scurry at the bottom is quick.
      const xEase = tq === 1 && !reduceMotion ? 0.16 : slideEase
      shown.x = lerp(shown.x, tx, xEase)
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

      cat.style.transform = `translate(${shown.x}px, ${shown.y}%)`

      if (isMobile) {
        arm.style.opacity = '0'
        return
      }

      // Eyes follow the cursor; with no pointer yet they eye their target.
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

      // Arm extension: retract only when switching SIDES (left arm to right
      // arm). Moving between two same-side links keeps the arm up — the cat
      // scurries and the reach glides over. A retracted arm waits for the
      // scurry to finish before reaching out again.
      if (armSide !== side && shown.r < 0.05) armSide = side
      const settled = Math.abs(shown.x - tx) < 40
      const rT = tq === 1 && armSide === side && (shown.r >= 0.5 || settled) ? 1 : 0
      shown.r = lerp(shown.r, rT, reduceMotion ? 1 : 0.12)
      if (Math.abs(shown.r - rT) < 0.004) shown.r = rT

      // The reach anchor eases toward the current target so a same-side
      // retarget glides instead of snapping. The paw sits ON the buttons'
      // bottom line, so the anchor is the underside itself.
      const bx = btnCx
      const by = bRect ? bRect.bottom : vh * 0.5
      if (shown.r < 0.05) {
        shown.bx = bx
        shown.by = by
      } else {
        shown.bx = lerp(shown.bx, bx, reduceMotion ? 1 : 0.15)
        shown.by = lerp(shown.by, by, reduceMotion ? 1 : 0.15)
      }

      if (shown.r <= 0.01 || !bRect) {
        arm.style.opacity = '0'
        return
      }
      arm.style.opacity = '1'

      // The reach: a smooth arch out of the near shoulder, low on the body,
      // bowing up and over, with the paw landing on the buttons' bottom line.
      const S = {
        x: rect.left + rect.width * (armSide === 'left' ? 0.18 : 0.82),
        y: rect.top + rect.height * 0.72,
      }

      // Two soft baps lift the paw briefly off the line onto the button.
      let w = 0
      if (!reduceMotion && shown.r > 0.9) {
        const tu = (now % TAP_MS) / TAP_MS
        if (tu < 0.18) w = Math.sin(Math.PI * (tu / 0.18))
        else if (tu >= 0.24 && tu < 0.42) w = Math.sin(Math.PI * ((tu - 0.24) / 0.18))
        w *= clamp01((shown.r - 0.9) / 0.1)
      }

      const E = { x: shown.bx, y: shown.by - 10 * w }
      const chord = { x: E.x - S.x, y: E.y - S.y }
      const len = Math.hypot(chord.x, chord.y) || 1
      // Perpendicular that points downward: the arm sweeps out and low, then
      // curls up so the paw lands on the button from underneath.
      let n = { x: -chord.y / len, y: chord.x / len }
      if (n.y < 0) n = { x: -n.x, y: -n.y }
      const C = { x: (S.x + E.x) / 2 + n.x * len * BOW, y: (S.y + E.y) / 2 + n.y * len * BOW }
      const qe = easeInOut(shown.r)
      const tip = bez(S, C, E, qe)
      // Left segment of the curve split at qe: same start, control slid along.
      const c1 = { x: lerp(S.x, C.x, qe), y: lerp(S.y, C.y, qe) }
      const d = `M ${S.x} ${S.y} Q ${c1.x} ${c1.y} ${tip.x} ${tip.y}`
      const tan = bezTan(S, C, E, qe)
      const deg = (Math.atan2(tan.y, tan.x) * 180) / Math.PI
      limbInkRef.current.setAttribute('d', d)
      limbRef.current.setAttribute('d', d)
      pawRef.current.setAttribute('transform', `translate(${tip.x} ${tip.y}) rotate(${deg})`)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      links.forEach((l) => {
        l.removeEventListener('pointerenter', onEnter)
        l.removeEventListener('pointerleave', onLeave)
      })
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
        <path ref={limbInkRef} d="" fill="none" stroke={INK} strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
        <path ref={limbRef} d="" fill="none" stroke="#fff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
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
