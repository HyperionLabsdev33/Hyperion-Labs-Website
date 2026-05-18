import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import GlowCard from '../ui/GlowCard'
import GridBackground from '../ui/GridBackground'

const benefits = [
  'Get a personalised quote for your business',
  'See a live demo of your AI receptionist',
  'No tech knowledge required',
  'No lock-in contracts',
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <GridBackground variant="lines" className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            label="Get Started"
            heading="Ready to Never Miss a Call Again?"
            subtext="Book a free 30-minute discovery call. No pressure, no commitment — just a conversation about what's possible for your business."
          />

          <GlowCard
            className="p-8 flex flex-col gap-6"
            style={{ borderTop: '2px solid rgba(0,212,255,0.3)' }}
          >
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: '#f0f0ff' }}>
                Get in Touch
              </h3>
              <p className="text-sm" style={{ color: '#555577' }}>
                We respond to all enquiries within 1 business day.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:jude@hyperionlabs.com.au"
                className="flex items-center gap-3"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
                >
                  <Mail size={15} style={{ color: '#00d4ff' }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: '#555577' }}>Email</div>
                  <div className="text-sm font-medium" style={{ color: '#f0f0ff' }}>
                    jude@hyperionlabs.com.au
                  </div>
                </div>
              </a>

              <a
                href="tel:0426950094"
                className="flex items-center gap-3"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
                >
                  <Phone size={15} style={{ color: '#00d4ff' }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: '#555577' }}>Phone</div>
                  <div className="text-sm font-medium" style={{ color: '#f0f0ff' }}>
                    0426 950 094
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
                >
                  <MapPin size={15} style={{ color: '#00d4ff' }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: '#555577' }}>Location</div>
                  <div className="text-sm font-medium" style={{ color: '#f0f0ff' }}>
                    Australia-wide
                  </div>
                </div>
              </div>
            </div>

            <div
              className="pt-5 flex flex-col gap-3"
              style={{ borderTop: '1px solid #1e1e3a' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#555577' }}>
                Why book a call?
              </p>
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle size={14} style={{ color: '#00d4ff', flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: '#8888aa' }}>
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </GridBackground>
    </section>
  )
}
