import { useEffect, useRef } from 'react'
import { Scissors, UtensilsCrossed, Stethoscope, Dumbbell, Wrench, Building2, Heart, Car } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const industries = [
  { icon: Scissors, label: 'Hair & Beauty' },
  { icon: UtensilsCrossed, label: 'Restaurants & Cafes' },
  { icon: Stethoscope, label: 'Dental & Medical' },
  { icon: Dumbbell, label: 'Gyms & Fitness' },
  { icon: Wrench, label: 'Trades & Services' },
  { icon: Building2, label: 'Real Estate' },
  { icon: Heart, label: 'Allied Health' },
  { icon: Car, label: 'Automotive' },
]

function IndustryCard({ icon: Icon, label, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (ref.current) ref.current.classList.add('visible')
          }, index * 60)
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
    <div
      ref={ref}
      className="fade-in-up group flex flex-col items-center gap-3 p-6 rounded-xl cursor-default"
      style={{
        background: '#12121f',
        border: '1px solid #1e1e3a',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'
        e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.1)'
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1e1e3a'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.15)',
          transition: 'background 0.3s ease',
        }}
      >
        <Icon size={20} style={{ color: '#00d4ff' }} />
      </div>
      <span className="text-sm font-medium text-center" style={{ color: '#c0c0d0' }}>
        {label}
      </span>
    </div>
  )
}

export default function Industries() {
  return (
    <section id="industries" className="py-24" style={{ background: '#0f0f1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Who We Work With"
          heading="Built for Busy Local Businesses."
          subtext="If your phone rings and missing a call costs you money, Hyperion Labs is for you."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.label} {...industry} index={index} />
          ))}
        </div>

        <div className="text-center mt-10">
          <p style={{ color: '#555577', fontSize: '0.9rem' }}>
            Don't see your industry?{' '}
            <a
              href="#contact"
              style={{ color: '#00d4ff' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              If you take calls, we can help.
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
