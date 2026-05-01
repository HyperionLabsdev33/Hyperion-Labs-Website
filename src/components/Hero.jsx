import { useState, useEffect } from 'react'
import { ArrowRight, ChevronDown, Mic } from 'lucide-react'
import GridBackground from '../ui/GridBackground'
import AnimatedCounter from '../ui/AnimatedCounter'

function PhoneMockup() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  return (
    <div
      className="relative mx-auto"
      style={{ width: '220px' }}
    >
      {/* Glow behind phone */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)',
          transform: 'scale(1.3)',
        }}
      />
      {/* Phone frame */}
      <div
        className="relative rounded-3xl p-4 flex flex-col gap-3"
        style={{
          background: '#0f0f1a',
          border: '1px solid rgba(0,212,255,0.25)',
          boxShadow: '0 0 40px rgba(0,212,255,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Notch */}
        <div className="flex justify-center mb-1">
          <div
            className="rounded-full"
            style={{ width: '60px', height: '6px', background: '#1e1e3a' }}
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#00ff88',
              boxShadow: '0 0 8px rgba(0,255,136,0.8)',
              animation: 'pulseGlow 1.5s ease-in-out infinite',
            }}
          />
          <span className="text-xs font-semibold" style={{ color: '#00ff88' }}>
            LIVE CALL
          </span>
          <span className="text-xs ml-auto font-mono" style={{ color: '#8888aa' }}>
            {formatTime(seconds)}
          </span>
        </div>

        <div
          className="rounded-xl p-3"
          style={{ background: '#12121f', border: '1px solid #1e1e3a' }}
        >
          <div className="text-xs mb-1" style={{ color: '#8888aa' }}>
            Incoming call —
          </div>
          <div className="text-sm font-semibold" style={{ color: '#f0f0ff' }}>
            Bella Hair Studio
          </div>
          <div className="text-xs mt-1" style={{ color: '#00d4ff' }}>
            Handled by Hyperion AI
          </div>
        </div>

        {/* Waveform bars */}
        <div className="flex items-center justify-center gap-1 py-2">
          {[3, 6, 10, 8, 12, 7, 10, 5, 8, 11, 6, 9, 4].map((h, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: '3px',
                height: `${h}px`,
                background: '#00d4ff',
                opacity: 0.6 + (i % 3) * 0.13,
                animation: `typing ${0.8 + (i % 4) * 0.2}s ease-in-out ${i * 0.07}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="text-xs text-center" style={{ color: '#555577' }}>
          "How can I help you today?"
        </div>
      </div>
    </div>
  )
}

const stats = [
  { value: 24, suffix: '/7', label: 'Availability' },
  { value: 100, suffix: '%', label: 'Calls Answered' },
  { value: 5, suffix: '+', label: 'Languages' },
  { value: 3, suffix: ' days', label: 'To Go Live' },
]

export default function Hero() {
  return (
    <GridBackground variant="lines" className="min-h-screen bg-background">
      {/* Radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left column */}
          <div className="flex-1 flex flex-col items-start">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 text-xs font-semibold tracking-wide"
              style={{
                border: '1px solid rgba(0,212,255,0.3)',
                background: 'rgba(0,212,255,0.07)',
                color: '#00d4ff',
              }}
            >
              <Mic size={12} />
              AI Receptionist Agency — Australia
            </div>

            {/* Headline */}
            <h1
              className="font-black leading-none tracking-tight mb-6"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                letterSpacing: '-0.04em',
                color: '#f0f0ff',
              }}
            >
              Never Miss
              <br />
              A Business Call.
              <br />
              <span className="text-glow" style={{ color: '#00d4ff' }}>
                Ever Again.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="max-w-xl mb-10 leading-relaxed"
              style={{ color: '#8888aa', fontSize: '1.1rem' }}
            >
              Hyperion Labs builds custom AI receptionists that answer every call, book
              appointments, and handle enquiries — 24 hours a day, 7 days a week. You focus
              on your work. We handle the front desk.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all duration-200"
                style={{ background: '#00d4ff', color: '#0a0a0f' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#00b8d9'
                  e.currentTarget.style.boxShadow =
                    '0 0 20px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#00d4ff'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Book a Free Call
                <ArrowRight size={16} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200"
                style={{
                  border: '1px solid #1e1e3a',
                  color: '#8888aa',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'
                  e.currentTarget.style.color = '#f0f0ff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1e1e3a'
                  e.currentTarget.style.color = '#8888aa'
                }}
              >
                See How It Works
                <ChevronDown size={16} />
              </a>
            </div>

            {/* Stats strip */}
            <div
              className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
              style={{ borderTop: '1px solid #1e1e3a' }}
            >
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="flex flex-col">
                  <span
                    className="text-3xl font-black tracking-tight"
                    style={{ color: '#f0f0ff' }}
                  >
                    <AnimatedCounter value={value} suffix={suffix} />
                  </span>
                  <span className="text-xs mt-1" style={{ color: '#555577' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — phone mockup */}
          <div className="flex-shrink-0 hidden lg:block">
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0a0a0f)',
        }}
      />
    </GridBackground>
  )
}
