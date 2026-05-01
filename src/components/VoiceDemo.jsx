import { useState, useRef, useEffect } from 'react'
import { Phone, PhoneOff, Play, Square, Volume2 } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const script = [
  {
    role: 'ai',
    label: 'Hyperion AI',
    text: "Thanks for calling Smith's Auto Repairs! I'm the virtual receptionist. How can I help you today?",
  },
  {
    role: 'customer',
    label: 'Caller',
    text: "Hi, I need to book my car in for a service — it's been making a weird noise.",
  },
  {
    role: 'ai',
    label: 'Hyperion AI',
    text: "Of course, happy to help with that! What type of vehicle do you have and roughly when did the noise start?",
  },
  {
    role: 'customer',
    label: 'Caller',
    text: "It's a 2019 Toyota Camry, started about a week ago. Kind of a grinding sound when I brake.",
  },
  {
    role: 'ai',
    label: 'Hyperion AI',
    text: "Got it — a grinding on braking definitely needs a look. I can get you in for a brake inspection and full service. We have availability this Thursday at 8 AM or Friday at 10 AM. Which suits you better?",
  },
  {
    role: 'customer',
    label: 'Caller',
    text: "Thursday morning works great.",
  },
  {
    role: 'ai',
    label: 'Hyperion AI',
    text: "Perfect! I've got you booked in for Thursday at 8 AM for a full service and brake inspection. Can I grab your name and best contact number?",
  },
  {
    role: 'customer',
    label: 'Caller',
    text: "Sure — it's Mark, 0411 222 333.",
  },
  {
    role: 'ai',
    label: 'Hyperion AI',
    text: "Brilliant, Mark! All confirmed for Thursday at 8 AM. We'll send you a reminder the night before. Is there anything else I can help with?",
  },
  {
    role: 'customer',
    label: 'Caller',
    text: "No, that's perfect. Thanks so much!",
  },
  {
    role: 'ai',
    label: 'Hyperion AI',
    text: "Our pleasure! We'll see you Thursday morning. Have a great day!",
  },
]

function Waveform({ active }) {
  const bars = [4, 8, 14, 10, 18, 12, 20, 9, 16, 11, 19, 7, 13, 10, 17, 8, 12, 15, 6, 11]
  return (
    <div className="flex items-center gap-0.5 h-8">
      {bars.map((h, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: '3px',
            height: active ? `${h}px` : '3px',
            background: '#00d4ff',
            opacity: active ? 0.7 + (i % 3) * 0.1 : 0.3,
            transition: `height ${0.3 + (i % 5) * 0.08}s ease-in-out, opacity 0.3s ease`,
            animation: active ? `typing ${0.6 + (i % 6) * 0.15}s ease-in-out ${i * 0.04}s infinite` : 'none',
          }}
        />
      ))}
    </div>
  )
}

export default function VoiceDemo() {
  const [status, setStatus] = useState('idle') // idle | calling | playing | done
  const [currentLine, setCurrentLine] = useState(-1)
  const [visibleLines, setVisibleLines] = useState([])
  const [speakerActive, setSpeakerActive] = useState(false)
  const [supported, setSupported] = useState(true)
  const synthRef = useRef(null)
  const timersRef = useRef([])
  const transcriptRef = useRef(null)

  useEffect(() => {
    if (!window.speechSynthesis) setSupported(false)
    return () => stopAll()
  }, [])

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [visibleLines])

  const stopAll = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setSpeakerActive(false)
  }

  const getBestVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    const preferred = [
      'Microsoft Aria Online (Natural)',
      'Microsoft Guy Online (Natural)',
      'Microsoft Jenny Online (Natural)',
      'Google UK English Female',
      'Google US English',
      'Microsoft Zira',
      'Microsoft David',
      'Alex',
    ]
    for (const name of preferred) {
      const match = voices.find((v) => v.name.includes(name.split(' ')[1]))
      if (match) return match
    }
    return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null
  }

  const speakLine = (line, onEnd) => {
    if (!window.speechSynthesis) { onEnd(); return }
    window.speechSynthesis.cancel()

    const utter = new SpeechSynthesisUtterance(line.text)
    const voice = getBestVoice()
    if (voice) utter.voice = voice

    if (line.role === 'ai') {
      utter.rate = 0.92
      utter.pitch = 1.05
      utter.volume = 1
    } else {
      utter.rate = 1.0
      utter.pitch = 0.95
      utter.volume = 0.85
    }

    utter.onstart = () => setSpeakerActive(true)
    utter.onend = () => {
      setSpeakerActive(false)
      onEnd()
    }
    utter.onerror = () => {
      setSpeakerActive(false)
      onEnd()
    }

    window.speechSynthesis.speak(utter)
  }

  const playScript = (index = 0) => {
    if (index >= script.length) {
      setStatus('done')
      setCurrentLine(-1)
      return
    }

    setCurrentLine(index)
    setVisibleLines((prev) => [...prev, index])

    speakLine(script[index], () => {
      const pause = script[index].role === 'ai' ? 600 : 400
      const t = setTimeout(() => playScript(index + 1), pause)
      timersRef.current.push(t)
    })
  }

  const handlePlay = () => {
    if (!supported) return
    stopAll()
    setStatus('calling')
    setVisibleLines([])
    setCurrentLine(-1)

    // Short "ringing" pause before starting
    const t = setTimeout(() => {
      setStatus('playing')
      // Wait for voices to load
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => playScript(0)
      } else {
        playScript(0)
      }
    }, 1200)
    timersRef.current.push(t)
  }

  const handleStop = () => {
    stopAll()
    setStatus('idle')
    setCurrentLine(-1)
    setVisibleLines([])
  }

  const isPlaying = status === 'playing' || status === 'calling'

  return (
    <section id="voice-demo" className="py-24" style={{ background: '#0f0f1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Hear It In Action"
          heading="Listen to a Real Demo Call."
          subtext="Press play and hear exactly how your AI receptionist sounds on a live call — natural, professional, and instant."
        />

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center max-w-5xl mx-auto">
          {/* Left — controls */}
          <div className="flex flex-col items-center gap-6 lg:w-72 flex-shrink-0">
            {/* Phone visual */}
            <div
              className="relative flex flex-col items-center justify-center rounded-3xl p-8 w-full"
              style={{
                background: '#12121f',
                border: `1px solid ${isPlaying ? 'rgba(0,212,255,0.3)' : '#1e1e3a'}`,
                boxShadow: isPlaying ? '0 0 40px rgba(0,212,255,0.08)' : 'none',
                transition: 'all 0.5s ease',
              }}
            >
              {/* Animated ring when calling */}
              {isPlaying && (
                <>
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      border: '1px solid rgba(0,212,255,0.15)',
                      animation: 'pulseGlow 2s ease-in-out infinite',
                      transform: 'scale(1.04)',
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      border: '1px solid rgba(0,212,255,0.08)',
                      animation: 'pulseGlow 2s ease-in-out 0.4s infinite',
                      transform: 'scale(1.09)',
                    }}
                  />
                </>
              )}

              {/* Status dot + label */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: isPlaying ? '#00ff88' : status === 'done' ? '#00d4ff' : '#555577',
                    boxShadow: isPlaying ? '0 0 8px rgba(0,255,136,0.8)' : 'none',
                    transition: 'all 0.4s ease',
                  }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color: isPlaying ? '#00ff88' : status === 'done' ? '#00d4ff' : '#555577',
                  }}
                >
                  {status === 'idle' && 'Ready'}
                  {status === 'calling' && 'Connecting...'}
                  {status === 'playing' && 'Live Call'}
                  {status === 'done' && 'Call Ended'}
                </span>
              </div>

              {/* Business name */}
              <div className="text-center mb-5">
                <div className="text-xs mb-1" style={{ color: '#555577' }}>Demo business</div>
                <div className="font-semibold" style={{ color: '#f0f0ff' }}>
                  Smith's Auto Repairs
                </div>
              </div>

              {/* Waveform */}
              <div className="mb-6">
                <Waveform active={isPlaying && speakerActive} />
              </div>

              {/* Play / Stop button */}
              {!isPlaying ? (
                <button
                  onClick={handlePlay}
                  disabled={!supported}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 w-full justify-center"
                  style={{
                    background: supported ? '#00d4ff' : '#1e1e3a',
                    color: supported ? '#0a0a0f' : '#555577',
                    cursor: supported ? 'pointer' : 'not-allowed',
                  }}
                  onMouseEnter={(e) => {
                    if (!supported) return
                    e.currentTarget.style.background = '#00b8d9'
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(0,212,255,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = supported ? '#00d4ff' : '#1e1e3a'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Play size={14} fill="currentColor" />
                  {status === 'done' ? 'Play Again' : 'Play Demo Call'}
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 w-full justify-center"
                  style={{
                    background: 'rgba(255,68,102,0.15)',
                    border: '1px solid rgba(255,68,102,0.3)',
                    color: '#ff6680',
                    cursor: 'pointer',
                  }}
                >
                  <PhoneOff size={14} />
                  End Call
                </button>
              )}

              {!supported && (
                <p className="text-xs text-center mt-3" style={{ color: '#555577' }}>
                  Voice not supported in this browser. Try Chrome or Edge.
                </p>
              )}
            </div>

            {/* Volume hint */}
            <div className="flex items-center gap-2">
              <Volume2 size={13} style={{ color: '#555577' }} />
              <span className="text-xs" style={{ color: '#555577' }}>
                Turn up your volume
              </span>
            </div>
          </div>

          {/* Right — live transcript */}
          <div className="flex-1 min-w-0">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#0a0a0f',
                border: '1px solid #1e1e3a',
              }}
            >
              {/* Header */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ borderBottom: '1px solid #1e1e3a', background: '#0f0f1a' }}
              >
                <div className="flex items-center gap-2">
                  <Phone size={13} style={{ color: '#00d4ff' }} />
                  <span className="text-xs font-semibold" style={{ color: '#8888aa' }}>
                    Live Transcript
                  </span>
                </div>
                {isPlaying && (
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#ff4466', animation: 'pulseGlow 1s ease-in-out infinite' }}
                    />
                    <span className="text-xs font-semibold" style={{ color: '#ff4466' }}>
                      REC
                    </span>
                  </div>
                )}
              </div>

              {/* Transcript lines */}
              <div
                ref={transcriptRef}
                className="p-5 flex flex-col gap-4 overflow-y-auto"
                style={{ minHeight: '340px', maxHeight: '400px' }}
              >
                {status === 'idle' && (
                  <div className="flex flex-col items-center justify-center h-48 gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}
                    >
                      <Play size={18} style={{ color: '#00d4ff' }} />
                    </div>
                    <p className="text-sm text-center" style={{ color: '#555577' }}>
                      Press play to hear the demo call
                    </p>
                  </div>
                )}

                {status === 'calling' && (
                  <div className="flex flex-col items-center justify-center h-48 gap-3">
                    <div className="flex items-center gap-1">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                    <p className="text-sm" style={{ color: '#555577' }}>
                      Connecting call...
                    </p>
                  </div>
                )}

                {visibleLines.map((lineIndex) => {
                  const line = script[lineIndex]
                  const isAI = line.role === 'ai'
                  const isCurrent = currentLine === lineIndex
                  return (
                    <div
                      key={lineIndex}
                      className="flex flex-col gap-1"
                      style={{
                        animation: 'fadeUp 0.35s ease-out forwards',
                        alignItems: isAI ? 'flex-start' : 'flex-end',
                      }}
                    >
                      <span
                        className="text-xs font-semibold px-1"
                        style={{ color: isAI ? '#00d4ff' : '#8888aa' }}
                      >
                        {line.label}
                      </span>
                      <div
                        className="max-w-sm px-4 py-2.5 text-sm leading-relaxed"
                        style={
                          isAI
                            ? {
                                background: 'rgba(0,212,255,0.07)',
                                border: `1px solid ${isCurrent ? 'rgba(0,212,255,0.3)' : 'rgba(0,212,255,0.12)'}`,
                                borderRadius: '16px 16px 16px 4px',
                                color: '#f0f0ff',
                                boxShadow: isCurrent ? '0 0 12px rgba(0,212,255,0.1)' : 'none',
                                transition: 'all 0.3s ease',
                              }
                            : {
                                background: '#1e1e3a',
                                border: `1px solid ${isCurrent ? '#3a3a5a' : '#2a2a4a'}`,
                                borderRadius: '16px 16px 4px 16px',
                                color: '#f0f0ff',
                                transition: 'all 0.3s ease',
                              }
                        }
                      >
                        {line.text}
                      </div>
                    </div>
                  )
                })}

                {status === 'done' && (
                  <div
                    className="flex items-center justify-center gap-2 py-3 rounded-xl mt-2"
                    style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}
                  >
                    <Phone size={13} style={{ color: '#00d4ff' }} />
                    <span className="text-xs font-semibold" style={{ color: '#00d4ff' }}>
                      Call complete — appointment booked
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
