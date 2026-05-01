import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const faqs = [
  {
    q: 'How does the AI receptionist actually work?',
    a: "Your business gets a dedicated phone number (or we port your existing one) that connects to your custom AI receptionist. The AI is trained on everything about your business — your services, pricing, team, FAQs, and booking policies. When a customer calls, the AI answers in a natural, conversational voice, handles their request, and updates your calendar in real time.",
  },
  {
    q: 'How much does it cost?',
    a: "Hyperion Labs uses a straightforward monthly subscription model with no lock-in contracts. Pricing is tailored to your call volume and requirements — most small businesses are set up from $297/month. Book a free discovery call and we'll give you an exact quote based on your specific needs.",
  },
  {
    q: 'What languages does it support?',
    a: "Your AI receptionist can be configured to speak and understand English, Mandarin, Cantonese, Hindi, Spanish, Vietnamese, and more. It auto-detects the caller's language in many configurations. This is a genuine differentiator for businesses in multicultural areas across Australia.",
  },
  {
    q: "What happens if the AI can't answer a question?",
    a: "The AI is trained to gracefully handle edge cases. If a caller asks something outside its knowledge base, it will offer to take a message or transfer the call to you directly. Nothing gets dropped. You also receive a daily summary of all calls so you're always across what's happening.",
  },
  {
    q: 'How long does setup take?',
    a: "Most businesses are live within 3–5 business days of their onboarding call. The process is entirely handled by our team — you provide us with information about your business, we handle the rest. You don't need any technical knowledge whatsoever.",
  },
  {
    q: 'Will it sound robotic or unnatural?',
    a: "No. We use advanced conversational AI with natural speech synthesis that sounds professional and warm — not a robotic phone tree. Callers often don't realise they're speaking with an AI. The voice, tone, and personality are all customised to match your brand.",
  },
]

function FAQItem({ q, a, index, isOpen, onToggle }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: '#12121f',
        border: `1px solid ${isOpen ? 'rgba(0,212,255,0.25)' : '#1e1e3a'}`,
        transition: 'border-color 0.3s ease',
      }}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}
      >
        <span className="font-semibold pr-4 text-base" style={{ color: '#f0f0ff' }}>
          {q}
        </span>
        <ChevronDown
          size={18}
          style={{
            color: '#00d4ff',
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </button>
      <div
        style={{
          maxHeight: isOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p
          className="px-6 pb-5 text-sm leading-relaxed"
          style={{ color: '#8888aa' }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24" style={{ background: '#0f0f1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Common Questions"
          heading="Everything You Need to Know."
          subtext="Still have questions? Reach out directly and we'll get back to you within one business day."
        />

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p style={{ color: '#555577', fontSize: '0.9rem' }}>
            Have a question not covered here?{' '}
            <a
              href="#contact"
              style={{ color: '#00d4ff' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              Ask us directly →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
