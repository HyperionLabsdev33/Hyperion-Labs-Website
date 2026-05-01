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
    </div>
  )
}
