import { useState, useEffect, useRef } from 'react'
import SectionHeader from '../ui/SectionHeader'

const messages = [
  {
    role: 'ai',
    text: "Thanks for calling Bella Hair Studio! I'm the virtual receptionist here. How can I help you today?",
    delay: 500,
  },
  {
    role: 'customer',
    text: "Hi, I wanted to book a haircut and colour — do you have anything available this week?",
    delay: 2000,
  },
  {
    role: 'ai',
    text: "Absolutely! We have openings on Wednesday afternoon and Friday morning. A haircut and full colour with one of our senior stylists typically takes about 2.5 hours. Would either of those days work for you?",
    delay: 4000,
  },
  {
    role: 'customer',
    text: "Wednesday works — what times have you got?",
    delay: 6500,
  },
  {
    role: 'ai',
    text: "On Wednesday we have 1:00 PM and 3:30 PM available. Which would you prefer?",
    delay: 8000,
  },
  {
    role: 'customer',
    text: "1 PM please — and can I request Sarah?",
    delay: 10000,
  },
  {
    role: 'ai',
    text: "Of course! I'll book you in with Sarah on Wednesday at 1:00 PM for a haircut and full colour. Can I grab your name and a contact number to confirm?",
    delay: 11500,
  },
  {
    role: 'customer',
    text: "It's Emily — 0412 345 678.",
    delay: 13500,
  },
  {
    role: 'ai',
    text: "Perfect, Emily! You're all booked in with Sarah this Wednesday at 1 PM. We'll send a confirmation text shortly. Is there anything else I can help you with?",
    delay: 15000,
  },
  {
    role: 'customer',
    text: "That's great, thank you!",
    delay: 17000,
  },
  {
    role: 'ai',
    text: "Wonderful — we look forward to seeing you Wednesday. Have a great day! 😊",
    delay: 18000,
  },
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  )
}

function Message({ msg }) {
  const isAI = msg.role === 'ai'
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}>
      {isAI && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1"
          style={{
            background: 'rgba(0,212,255,0.15)',
            border: '1px solid rgba(0,212,255,0.3)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
            <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="#00d4ff" opacity="0.5" />
          </svg>
        </div>
      )}
      <div
        className="max-w-xs px-4 py-3 text-sm leading-relaxed"
        style={
          isAI
            ? {
                background: 'rgba(0,212,255,0.07)',
                border: '1px solid rgba(0,212,255,0.18)',
                borderRadius: '18px 18px 18px 4px',
                color: '#f0f0ff',
              }
            : {
                background: '#1e1e3a',
                border: '1px solid #2a2a4a',
                borderRadius: '18px 18px 4px 18px',
                color: '#f0f0ff',
              }
        }
      >
        {msg.text}
      </div>
    </div>
  )
}

export default function DemoConversation() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const sectionRef = useRef(null)
  const transcriptRef = useRef(null)
  const timersRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )
    const el = sectionRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [started])

  useEffect(() => {
    if (!started) return

    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    messages.forEach((msg, index) => {
      const showTypingTimer = setTimeout(() => {
        if (msg.role === 'ai') setShowTyping(true)
      }, msg.delay - 600)

      const showMsgTimer = setTimeout(() => {
        setShowTyping(false)
        setVisibleCount(index + 1)
      }, msg.delay)

      timersRef.current.push(showTypingTimer, showMsgTimer)
    })

    return () => timersRef.current.forEach(clearTimeout)
  }, [started])

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [visibleCount, showTyping])

  const callouts = [
    'Booked in 90 seconds',
    'No staff required',
    'Works at 2 AM too',
  ]

  return (
    <section id="demo" ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="See It In Action"
          heading="Natural Conversations. Real Results."
          subtext="Watch how your AI receptionist handles a typical booking call — professionally, instantly, every time."
        />

        <div className="flex flex-col items-center">
          {/* Call header */}
          <div
            className="w-full max-w-md mb-4 px-4 py-2 rounded-xl flex items-center justify-between"
            style={{ background: '#0f0f1a', border: '1px solid #1e1e3a' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: started ? '#00ff88' : '#555577',
                  boxShadow: started ? '0 0 8px rgba(0,255,136,0.8)' : 'none',
                  transition: 'all 0.5s ease',
                }}
              />
              <span className="text-xs font-semibold" style={{ color: started ? '#00ff88' : '#555577' }}>
                {started ? 'INCOMING CALL' : 'WAITING FOR CALL'}
              </span>
            </div>
            <span className="text-xs font-medium" style={{ color: '#8888aa' }}>
              Bella Hair Studio
            </span>
          </div>

          {/* Phone frame */}
          <div
            className="w-full max-w-md rounded-3xl overflow-hidden"
            style={{
              background: '#0a0a0f',
              border: '1px solid rgba(0,212,255,0.15)',
              boxShadow: '0 0 60px rgba(0,212,255,0.06), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* AI label bar */}
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ borderBottom: '1px solid #1e1e3a', background: '#0f0f1a' }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: '#00d4ff', boxShadow: '0 0 6px rgba(0,212,255,0.8)' }}
              />
              <span className="text-xs font-semibold" style={{ color: '#00d4ff' }}>
                Hyperion AI Receptionist
              </span>
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}
              >
                Custom AI
              </span>
            </div>

            {/* Messages */}
            <div
              className="p-4 overflow-y-auto"
              style={{ height: '420px', scrollBehavior: 'smooth' }}
            >
              {messages.slice(0, visibleCount).map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}

              {showTyping && (
                <div className="flex justify-start mb-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1"
                    style={{
                      background: 'rgba(0,212,255,0.15)',
                      border: '1px solid rgba(0,212,255,0.3)',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div
                    style={{
                      background: 'rgba(0,212,255,0.07)',
                      border: '1px solid rgba(0,212,255,0.18)',
                      borderRadius: '18px 18px 18px 4px',
                    }}
                  >
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Callout pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {callouts.map((text) => (
              <span
                key={text}
                className="px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  border: '1px solid rgba(0,212,255,0.25)',
                  background: 'rgba(0,212,255,0.06)',
                  color: '#00d4ff',
                }}
              >
                ✓ {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
