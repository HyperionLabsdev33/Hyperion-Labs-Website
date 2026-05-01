import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'Demo', href: '#demo' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10, 10, 15, 0.95)'
          : 'rgba(10, 10, 15, 0.7)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1e1e3a',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center" onClick={handleNavClick}>
          <Logo height={34} variant="full" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: '#8888aa' }}
              onMouseEnter={(e) => (e.target.style.color = '#f0f0ff')}
              onMouseLeave={(e) => (e.target.style.color = '#8888aa')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: '#00d4ff',
              color: '#0a0a0f',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00b8d9'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00d4ff'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Phone size={14} />
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: '#8888aa' }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: '#0a0a0f', borderColor: '#1e1e3a' }}
        >
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="py-3 text-sm font-medium border-b transition-colors"
                style={{ color: '#8888aa', borderColor: '#1e1e3a' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleNavClick}
              className="mt-4 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold"
              style={{ background: '#00d4ff', color: '#0a0a0f' }}
            >
              <Phone size={14} />
              Book a Call
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
