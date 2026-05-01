import { useEffect, useRef } from 'react'
import { PhoneCall, CalendarCheck, Globe, Brain, Moon, Zap } from 'lucide-react'
import GlowCard from '../ui/GlowCard'
import SectionHeader from '../ui/SectionHeader'

const services = [
  {
    icon: PhoneCall,
    title: '24/7 Call Answering',
    description:
      'Your AI receptionist never sleeps, never calls in sick, and never puts a customer on hold. Every call answered, every time — even on public holidays.',
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Booking',
    description:
      'Seamlessly books appointments directly into your calendar. Customers get instant confirmation. No back-and-forth, no double bookings.',
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description:
      'Speaks English, Mandarin, Cantonese, Hindi, Spanish and more. Serve every customer in their preferred language without extra staff.',
  },
  {
    icon: Brain,
    title: 'Custom Knowledge Base',
    description:
      "Knows your pricing, services, team, FAQs, and policies inside out. Answers questions exactly how you would — because we trained it on your business.",
  },
  {
    icon: Moon,
    title: 'After-Hours Coverage',
    description:
      'Captures every after-hours enquiry that would otherwise go to voicemail and be forgotten. Every lead followed up, every time.',
  },
  {
    icon: Zap,
    title: 'Zero Management',
    description:
      "You don't touch a thing. Hyperion Labs handles full setup, configuration, testing, and ongoing updates. Set and forget.",
  },
]

function ServiceCard({ icon: Icon, title, description, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (ref.current) ref.current.classList.add('visible')
          }, index * 100)
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
    <div ref={ref} className="fade-in-up">
      <GlowCard className="p-6 h-full flex flex-col gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
        >
          <Icon size={18} style={{ color: '#00d4ff' }} />
        </div>
        <div>
          <h3 className="font-semibold mb-2" style={{ color: '#f0f0ff', fontSize: '1rem' }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#8888aa' }}>
            {description}
          </p>
        </div>
      </GlowCard>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ background: '#0f0f1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="What We Provide"
          heading="Everything Your Front Desk Does. Automatically."
          subtext="Our AI receptionist integrates seamlessly with your business. No hardware. No training. No headaches."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
