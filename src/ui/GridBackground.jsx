export default function GridBackground({ variant = 'lines', children, className = '' }) {
  const patternClass = variant === 'dots' ? 'dot-grid' : 'grid-lines'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 ${patternClass}`}
        style={{
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
