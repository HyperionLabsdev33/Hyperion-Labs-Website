export default function GlowCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`bg-card rounded-xl border border-card-border card-glow-hover ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
