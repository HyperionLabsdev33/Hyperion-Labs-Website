/**
 * Hyperion Labs brand mark.
 *
 * Concept: An industrial-tech "H" built from two chamfered vertical pillars
 * connected by a cyan signal bar, topped with small antenna pips — evoking
 * the angular, corporate-futuristic aesthetic of the Borderlands universe
 * without copying it. Works as mark-only or with the full wordmark lockup.
 */
export default function Logo({ height = 40, variant = 'full', dark = false }) {
  const textFill = dark ? '#0d0d14' : '#f0f0ff'
  const pillarFill = dark ? '#0d0d14' : '#e8e8f4'
  const pillarFill2 = dark ? '#101018' : '#b8b8cc'
  const sepFill = dark ? 'rgba(0,0,0,0.15)' : '#1e1e3a'

  // Mark is drawn on a 52 × 64 internal grid then scaled to height
  const markW = 52
  const markH = 64
  const fullW = 272
  const fullH = 64

  const viewBox =
    variant === 'mark'
      ? `0 0 ${markW} ${markH}`
      : `0 0 ${fullW} ${fullH}`

  const displayH = height
  const displayW =
    variant === 'mark'
      ? (markW / markH) * height
      : (fullW / fullH) * height

  return (
    <svg
      width={displayW}
      height={displayH}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hyperion Labs"
      role="img"
    >
      <defs>
        {/* Vertical gradient for the pillars */}
        <linearGradient id="hl-pillar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={pillarFill} />
          <stop offset="100%" stopColor={pillarFill2} />
        </linearGradient>
        {/* Cyan glow gradient for crossbar */}
        <linearGradient id="hl-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.7" />
          <stop offset="30%" stopColor="#00d4ff" />
          <stop offset="70%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* ─── MARK ─────────────────────────────────── */}

      {/* Top antenna pips — two small chamfered squares */}
      <rect x="2"  y="2" width="9" height="7" rx="1.5" fill="#00d4ff" />
      <rect x="41" y="2" width="9" height="7" rx="1.5" fill="#00d4ff" />

      {/*
        Left pillar: 14px wide, full height.
        Chamfer: top-left corner cut at 45° — 9px diagonal.
        Shape: start at chamfer point, across top, down, back, up on left with chamfer.
      */}
      <path
        d="M9,11 L15,11 L15,64 L0,64 L0,20 Z"
        fill="url(#hl-pillar)"
      />

      {/*
        Right pillar: mirror of left.
        Chamfer: top-right corner cut at 45°.
      */}
      <path
        d="M37,11 L43,11 L52,20 L52,64 L37,64 Z"
        fill="url(#hl-pillar)"
      />

      {/*
        Cyan signal crossbar — spans full mark width at 45% height.
        Thin, precise, high contrast.
      */}
      <rect x="0" y="32" width="52" height="8" fill="url(#hl-bar)" />

      {/*
        Small inner detail: two tiny notch cuts on crossbar ends
        creating a sense of precision engineering / panel separation.
      */}
      <rect x="13" y="32" width="2" height="8" fill={dark ? 'rgba(0,0,0,0.25)' : 'rgba(10,10,15,0.35)'} />
      <rect x="37" y="32" width="2" height="8" fill={dark ? 'rgba(0,0,0,0.25)' : 'rgba(10,10,15,0.35)'} />

      {/* ─── WORDMARK (full variant only) ────────── */}
      {variant === 'full' && (
        <>
          {/* Vertical separator rule */}
          <rect x="63" y="9" width="1" height="46" fill={sepFill} />

          {/* HYPERION — heavy, tracked */}
          <text
            x="76"
            y="36"
            fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
            fontWeight="800"
            fontSize="21"
            fill={textFill}
            letterSpacing="3.5"
          >
            HYPERION
          </text>

          {/* LABS — lighter, wider tracking, cyan */}
          <text
            x="78"
            y="55"
            fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
            fontWeight="500"
            fontSize="11.5"
            fill="#00d4ff"
            letterSpacing="9"
          >
            LABS
          </text>
        </>
      )}
    </svg>
  )
}
