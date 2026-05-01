import { Phone } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'Demo', href: '#demo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#080810', borderTop: '1px solid #1e1e3a' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-2">
            <Logo height={30} variant="full" />
            <p className="text-xs max-w-xs" style={{ color: '#555577' }}>
              AI Receptionist Solutions for Australian Businesses.
              <br />
              hyperionlabs.com.au
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium transition-colors duration-200"
                style={{ color: '#555577' }}
                onMouseEnter={(e) => (e.target.style.color = '#f0f0ff')}
                onMouseLeave={(e) => (e.target.style.color = '#555577')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold flex-shrink-0 transition-all duration-200"
            style={{ background: '#00d4ff', color: '#0a0a0f' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00b8d9'
              e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00d4ff'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Phone size={13} />
            Book a Free Call
          </a>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#333355' }}>
            © 2025 Hyperion Labs. All rights reserved. ABN pending.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs transition-colors"
              style={{ color: '#333355' }}
              onMouseEnter={(e) => (e.target.style.color = '#555577')}
              onMouseLeave={(e) => (e.target.style.color = '#333355')}
            >
              Privacy Policy
            </a>
            <span style={{ color: '#333355' }}>·</span>
            <a
              href="#"
              className="text-xs transition-colors"
              style={{ color: '#333355' }}
              onMouseEnter={(e) => (e.target.style.color = '#555577')}
              onMouseLeave={(e) => (e.target.style.color = '#333355')}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
