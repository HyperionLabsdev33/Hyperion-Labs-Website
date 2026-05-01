export default function SectionHeader({ label, heading, subtext, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col ${alignClass} mb-16`}>
      {label && (
        <span
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: '#00d4ff' }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #00d4ff)' }}
          />
          {label}
          <span
            className="inline-block w-8 h-px"
            style={{ background: 'linear-gradient(90deg, #00d4ff, transparent)' }}
          />
        </span>
      )}
      <h2
        className="font-bold leading-tight tracking-tight"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: '#f0f0ff',
          letterSpacing: '-0.02em',
        }}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className="mt-4 max-w-2xl leading-relaxed"
          style={{ color: '#8888aa', fontSize: '1.05rem' }}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}
