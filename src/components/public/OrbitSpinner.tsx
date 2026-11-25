import React, { useCallback, useEffect, useRef } from 'react'

/* ------------------------------------------------------------------ */
/*  CosmicImageFrame v2 – Galaxy-matched 3D HUD frame                  */
/* ------------------------------------------------------------------ */

const COSMIC = {
  arm:  '#a6ccff',
  hii:  '#ff86c8',
  core: '#ffd49a',
  bg:   '#050810',
}

const CSS = `
  .cif-wrap {
    --c-arm:  #a6ccff;
    --c-hii:  #ff86c8;
    --c-core: #ffd49a;

    position: relative;
    width: 100%;
    height: 100%;
    perspective: 1200px;
    overflow: hidden;
    border-radius: var(--br, 16px);
    background: rgba(5, 8, 16, 0.35);
    backdrop-filter: blur(2px);
    isolation: isolate;
  }

  /* ---- 3D tilt card ---- */
  .cif-card {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    transform-style: preserve-3d;
    transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    transition: transform 0.18s cubic-bezier(.2,.8,.2,1);
    will-change: transform;
  }

  /* breathing gradient border */
  .cif-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      var(--c-arm) 0%,
      transparent 38%,
      transparent 62%,
      var(--c-hii) 100%
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    opacity: 0.55;
    pointer-events: none;
    animation: cif-breathe 4s ease-in-out infinite;
  }

  /* ---- content ---- */
  .cif-content {
    position: absolute;
    inset: 8px;
    border-radius: calc(var(--br, 16px) - 6px);
    overflow: hidden;
    background: rgba(5, 8, 16, 0.4);
    transform: translateZ(20px);
  }
  .cif-content > * {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }

  /* ---- overlays (all at different depths → parallax on tilt) ---- */
  .cif-vignette {
    position: absolute; inset: 0; pointer-events: none;
    border-radius: inherit;
    background: radial-gradient(ellipse at center,
      transparent 50%, rgba(5, 8, 16, 0.6) 100%);
    transform: translateZ(22px);
  }
  .cif-scanlines {
    position: absolute; inset: 0; pointer-events: none;
    border-radius: inherit;
    background: repeating-linear-gradient(
      0deg,
      rgba(166, 204, 255, 0.045) 0px,
      rgba(166, 204, 255, 0.045) 1px,
      transparent 1px,
      transparent 3px
    );
    mix-blend-mode: overlay;
    opacity: 0.6;
    transform: translateZ(26px);
  }
  .cif-glare {
    position: absolute; inset: 0; pointer-events: none;
    border-radius: inherit;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%),
      rgba(166, 204, 255, 0.22), transparent 42%);
    mix-blend-mode: screen;
    transform: translateZ(30px);
  }
  .cif-svg {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    overflow: visible;
    transform: translateZ(35px);
  }

  /* ---- SVG rings & brackets ---- */
  .cif-ring-a { transform-origin: center; animation: cif-spin 24s linear infinite; }
  .cif-ring-b { transform-origin: center; animation: cif-spin 40s linear infinite reverse; }
  .cif-ticks  { transform-origin: center; animation: cif-spin 60s linear infinite reverse; }

  .cif-corner-path {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 28;
    stroke-dashoffset: 28;
    animation: cif-dash 6s ease-in-out infinite;
    filter: drop-shadow(0 0 2px currentColor);
  }
  .cif-corner-dot {
    animation: cif-pulse 2.4s ease-in-out infinite;
    filter: drop-shadow(0 0 4px currentColor);
  }

  /* ---- orbiting stars ---- */
  .cif-particle-wrap {
    position: absolute; inset: 0;
    pointer-events: none;
    transform: translateZ(40px);
    animation: cif-spin 20s linear infinite;
  }
  .cif-particle {
    position: absolute;
    top: 3.5%; left: 50%;
    width: 4px; height: 4px;
    margin-left: -2px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 6px currentColor, 0 0 12px currentColor;
  }

  /* ---- telemetry ---- */
  .cif-telemetry {
    position: absolute;
    font-family: 'JetBrains Mono', 'SF Mono', ui-monospace, Menlo, monospace;
    font-size: 8px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    pointer-events: none;
    transform: translateZ(38px);
    text-shadow: 0 0 6px currentColor;
  }
  .cif-tl { top: 12px;    left: 14px;  color: var(--c-arm); }
  .cif-tr { top: 12px;    right: 14px; color: var(--c-hii); }
  .cif-bl { bottom: 12px; left: 14px;  color: var(--c-arm); }
  .cif-br { bottom: 12px; right: 14px; color: var(--c-core); }

  @keyframes cif-spin   { to { transform: rotate(360deg); } }
  @keyframes cif-dash {
    0%   { stroke-dashoffset: 28; opacity: 0.3; }
    30%  { stroke-dashoffset: 0;  opacity: 1;   }
    70%  { stroke-dashoffset: 0;  opacity: 1;   }
    100% { stroke-dashoffset: -28; opacity: 0.3; }
  }
  @keyframes cif-pulse {
    0%, 100% { opacity: 0.45; }
    50%      { opacity: 1;    }
  }
  @keyframes cif-breathe {
    0%, 100% { opacity: 0.35; }
    50%      { opacity: 0.75; }
  }
`

interface CosmicImageFrameProps {
  children: React.ReactNode
  width?: number | string
  height?: number | string
  borderRadius?: string
  /** Max tilt in degrees (0 disables the 3D effect) */
  tilt?: number
  /** Toggle the corner HUD labels */
  showTelemetry?: boolean
}

export default function CosmicImageFrame({
  children,
  width = 300,
  height = 300,
  borderRadius = '16px',
  tilt = 10,
  showTelemetry = true,
}: CosmicImageFrameProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el || tilt === 0) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--rx', `${(-py * tilt).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(px * tilt).toFixed(2)}deg`)
      el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`)
    },
    [tilt]
  )

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '3deg')
    el.style.setProperty('--ry', '3deg')
    el.style.setProperty('--mx', '80%')
    el.style.setProperty('--my', '20%')
  }, [])

  useEffect(()=>{handleLeave()},[])

  return (
    <div
      ref={ref}
      className="cif-wrap"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        width,
        height,
        ['--br' as string]: borderRadius,
      } as React.CSSProperties}
    >
      <style>{CSS}</style>

      <div className="cif-card">
        {/* image / content */}
        <div className="cif-content">{children}</div>

        {/* overlays */}
        <div className="cif-vignette" />
        <div className="cif-scanlines" />
        <div className="cif-glare" />

        {/* telemetry */}
        {showTelemetry && (
          <>
            <div className="cif-telemetry cif-tl">M31 · AND</div>
            <div className="cif-telemetry cif-tr">SCAN·01</div>
            <div className="cif-telemetry cif-bl">SEC·04</div>
            <div className="cif-telemetry cif-br">P·07</div>
          </>
        )}

        {/* SVG rings + corner brackets */}
        <svg
          className="cif-svg"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle className="cif-ring-a" cx="50" cy="50" r="47"
            stroke={COSMIC.arm} strokeWidth="0.4"
            strokeDasharray="1.5 4" opacity="0.45" />
          <circle className="cif-ring-b" cx="50" cy="50" r="43"
            stroke={COSMIC.hii} strokeWidth="0.3"
            strokeDasharray="0.5 3" opacity="0.35" />
          <circle className="cif-ticks" cx="50" cy="50" r="40"
            stroke={COSMIC.core} strokeWidth="0.5"
            strokeDasharray="0.5 4" opacity="0.5" />

          {/* Top-Left (arm blue) */}
          <g color={COSMIC.arm}>
            <path className="cif-corner-path" d="M 8 22 L 8 8 L 22 8"
              stroke="currentColor" strokeWidth="1" />
            <circle className="cif-corner-dot" cx="8" cy="8" r="1"
              fill="currentColor" />
          </g>
          {/* Top-Right (HII pink) */}
          <g color={COSMIC.hii}>
            <path className="cif-corner-path" d="M 78 8 L 92 8 L 92 22"
              stroke="currentColor" strokeWidth="1"
              style={{ animationDelay: '0.4s' }} />
            <circle className="cif-corner-dot" cx="92" cy="8" r="1"
              fill="currentColor" style={{ animationDelay: '0.4s' }} />
          </g>
          {/* Bottom-Right (core gold) */}
          <g color={COSMIC.core}>
            <path className="cif-corner-path" d="M 92 78 L 92 92 L 78 92"
              stroke="currentColor" strokeWidth="1"
              style={{ animationDelay: '0.8s' }} />
            <circle className="cif-corner-dot" cx="92" cy="92" r="1"
              fill="currentColor" style={{ animationDelay: '0.8s' }} />
          </g>
          {/* Bottom-Left (arm blue) */}
          <g color={COSMIC.arm}>
            <path className="cif-corner-path" d="M 22 92 L 8 92 L 8 78"
              stroke="currentColor" strokeWidth="1"
              style={{ animationDelay: '1.2s' }} />
            <circle className="cif-corner-dot" cx="8" cy="92" r="1"
              fill="currentColor" style={{ animationDelay: '1.2s' }} />
          </g>
        </svg>

        {/* orbiting stars */}
        <div className="cif-particle-wrap"
          style={{ color: COSMIC.arm, animationDuration: '16s' }}>
          <span className="cif-particle" />
        </div>
        <div className="cif-particle-wrap"
          style={{ color: COSMIC.hii, animationDuration: '24s', animationDelay: '-9s' }}>
          <span className="cif-particle" />
        </div>
        <div className="cif-particle-wrap"
          style={{ color: COSMIC.core, animationDuration: '20s', animationDelay: '-5s' }}>
          <span className="cif-particle" />
        </div>
      </div>
    </div>
  )
}