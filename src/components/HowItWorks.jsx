import { useEffect, useRef } from 'react'
import { ClipboardList, Settings, PhoneIncoming } from 'lucide-react'
import GridBackground from '../ui/GridBackground'
import SectionHeader from '../ui/SectionHeader'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'We Learn About Your Business',
    description:
      "We start with a 30-minute onboarding call. You tell us your services, pricing, team, and how you like things handled. We take detailed notes so the AI knows your business inside out.",
  },
  {
    number: '02',
    icon: Settings,
    title: 'We Build Your AI Receptionist',
    description:
      "Our team configures, trains, and tests your custom AI receptionist. We connect it to your existing phone number and calendar system. You don't lift a finger.",
  },
  {
    number: '03',
    icon: PhoneIncoming,
    title: 'It Starts Answering Your Calls',
    description:
      "Go live in days. Your AI receptionist handles every call from day one. You'll receive daily summaries of all interactions so you're always across what's happening.",
  },
]

function StepCard({ number, icon: Icon, title, description, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (ref.current) ref.current.classList.add('visible')
          }, index * 150)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [index])

  return (
    <div ref={ref} className="fade-in-up relative flex flex-col items-center text-center px-4">
      {/* Big number background */}
      <div
        className="absolute -top-4 left-1/2 font-black select-none pointer-events-none"
        style={{
          fontSize: '8rem',
          lineHeight: 1,
          color: '#00d4ff',
          opacity: 0.04,
          transform: 'translateX(-50%)',
          letterSpacing: '-0.05em',
        }}
      >
        {number}
      </div>

      {/* Icon circle */}
      <div
        className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.2)',
          boxShadow: '0 0 20px rgba(0,212,255,0.08)',
        }}
      >
        <Icon size={24} style={{ color: '#00d4ff' }} />
        <div
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: '#00d4ff', color: '#0a0a0f', fontSize: '0.65rem' }}
        >
          {number}
        </div>
      </div>

      <h3 className="font-bold mb-3 text-lg" style={{ color: '#f0f0ff' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#8888aa' }}>
        {description}
      </p>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <GridBackground variant="dots" className="py-24 bg-background" style={{}}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="The Process"
            heading="Up and Running in Days, Not Weeks."
            subtext="A simple, done-for-you process. From onboarding call to live AI receptionist in as little as 3 business days."
          />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Connector line — desktop only */}
            <div
              className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, #1e1e3a 20%, #1e1e3a 80%, transparent 100%)',
                top: '4rem',
              }}
            />
            <div
              className="hidden md:block absolute h-px pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)',
                top: '4rem',
                left: '25%',
                right: '25%',
              }}
            />

            {steps.map((step, index) => (
              <StepCard key={step.number} {...step} index={index} />
            ))}
          </div>
        </div>
      </GridBackground>
    </section>
  )
}
