import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Industries from './components/Industries'
import DemoConversation from './components/DemoConversation'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const init = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/jude-hyperionlabs/discovery-call',
          text: 'Schedule time with me',
          color: '#0069ff',
          textColor: '#ffffff',
          branding: true,
        })
      }
    }
    const script = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')
    if (script && !window.Calendly) {
      script.addEventListener('load', init)
    } else {
      init()
    }
  }, [])

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Industries />
        <DemoConversation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  )
}
