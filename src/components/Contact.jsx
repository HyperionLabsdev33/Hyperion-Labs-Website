import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle, ArrowRight, Send } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import GlowCard from '../ui/GlowCard'
import GridBackground from '../ui/GridBackground'

const industries = [
  'Hair & Beauty',
  'Restaurants & Cafes',
  'Dental & Medical',
  'Gyms & Fitness',
  'Trades & Services',
  'Real Estate',
  'Allied Health',
  'Automotive',
  'Other',
]

const benefits = [
  'Get a personalised quote for your business',
  'See a live demo of your AI receptionist',
  'No tech knowledge required',
  'No lock-in contracts',
]

const inputStyle = {
  background: '#12121f',
  border: '1px solid #1e1e3a',
  borderRadius: '10px',
  padding: '12px 16px',
  color: '#f0f0ff',
  fontSize: '0.9rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
}

function FormInput({ label, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: '#8888aa', letterSpacing: '0.05em' }}>
        {label}
      </label>
      <input
        {...props}
        style={{
          ...inputStyle,
          borderColor: focused ? 'rgba(0,212,255,0.4)' : '#1e1e3a',
          boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.08)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

function FormSelect({ label, children, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: '#8888aa', letterSpacing: '0.05em' }}>
        {label}
      </label>
      <select
        {...props}
        style={{
          ...inputStyle,
          borderColor: focused ? 'rgba(0,212,255,0.4)' : '#1e1e3a',
          boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.08)' : 'none',
          cursor: 'pointer',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </select>
    </div>
  )
}

function FormTextarea({ label, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: '#8888aa', letterSpacing: '0.05em' }}>
        {label}
      </label>
      <textarea
        {...props}
        style={{
          ...inputStyle,
          resize: 'vertical',
          minHeight: '100px',
          borderColor: focused ? 'rgba(0,212,255,0.4)' : '#1e1e3a',
          boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.08)' : 'none',
          fontFamily: 'inherit',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    industry: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Enquiry from ${form.name} — ${form.business}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nPhone: ${form.phone}\nEmail: ${form.email}\nIndustry: ${form.industry}\n\n${form.message}`
    )
    window.location.href = `mailto:jude@hyperionlabs.com.au?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <GridBackground variant="lines" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="Get Started"
            heading="Ready to Never Miss a Call Again?"
            subtext="Book a free 30-minute discovery call. No pressure, no commitment — just a conversation about what's possible for your business."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center text-center p-12 rounded-2xl h-full"
                  style={{ background: '#0f0f1a', border: '1px solid rgba(0,212,255,0.2)' }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}
                  >
                    <CheckCircle size={28} style={{ color: '#00d4ff' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#f0f0ff' }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: '#8888aa', fontSize: '0.9rem' }}>
                    Thanks for reaching out. We'll be in touch within one business day to schedule your free discovery call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Full Name *"
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Business Name *"
                      name="business"
                      type="text"
                      placeholder="Smith Plumbing"
                      required
                      value={form.business}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Phone Number *"
                      name="phone"
                      type="tel"
                      placeholder="04XX XXX XXX"
                      required
                      value={form.phone}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Email Address *"
                      name="email"
                      type="email"
                      placeholder="john@smithplumbing.com.au"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <FormSelect
                    label="Your Industry"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                  >
                    <option value="" style={{ background: '#12121f' }}>Select your industry...</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind} style={{ background: '#12121f' }}>
                        {ind}
                      </option>
                    ))}
                  </FormSelect>
                  <FormTextarea
                    label="Tell us about your business"
                    name="message"
                    placeholder="Briefly describe your business and what you're hoping to achieve with an AI receptionist..."
                    value={form.message}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-base transition-all duration-200"
                    style={{ background: '#00d4ff', color: '#0a0a0f' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#00b8d9'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.4)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#00d4ff'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <Send size={16} />
                    Book My Free Discovery Call
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-center text-xs" style={{ color: '#555577' }}>
                    No commitment. No spam. We'll respond within 1 business day.
                  </p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-6">
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
                    className="flex items-center gap-3 group"
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
          </div>
        </div>
      </GridBackground>
    </section>
  )
}
