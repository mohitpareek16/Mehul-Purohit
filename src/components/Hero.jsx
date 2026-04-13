import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons'
import { Trophy, Globe } from 'lucide-react'

/* ── Animated counter hook ── */
function useCounter(target, duration = 2, delay = 0.8) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const step = target / (duration * 60)
      const interval = setInterval(() => {
        start += step
        if (start >= target) { setDisplay(target); clearInterval(interval) }
        else setDisplay(Math.floor(start))
      }, 1000 / 60)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [target, duration, delay])
  return display
}

const words = ['Building', 'Empires.', 'Shaping', 'Stories.']
const goldWords = [false, true, false, false]

const socials = [
  { icon: InstagramIcon, href: 'https://www.instagram.com/mehulpurohit8', label: 'Instagram' },
  { icon: YoutubeIcon, href: '#podcasts', label: 'YouTube' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
]

/* ── Mouse spotlight hook ── */
function useMousePosition(ref) {
  const [pos, setPos] = useState({ x: 0.7, y: 0.3 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = e => {
      const rect = el.getBoundingClientRect()
      setPos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [ref])
  return pos
}

export default function Hero() {
  const sectionRef = useRef(null)
  const mouse = useMousePosition(sectionRef)
  const followers = useCounter(79, 2.2, 1)
  const brands = useCounter(500, 2, 1.1)
  const cities = useCounter(6, 1.5, 1.2)

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        width: '100%', minHeight: '100vh',
        background: '#06060a',
        paddingTop: 80,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ═══════════════ BACKGROUND ═══════════════ */}
      <div 
        className="animate-aurora"
        style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(at 0% 0%, rgba(201,168,76,0.12) 0, transparent 50%), 
            radial-gradient(at 50% 0%, rgba(201,168,76,0.06) 0, transparent 50%), 
            radial-gradient(at 100% 0%, rgba(201,168,76,0.12) 0, transparent 50%),
            radial-gradient(at 0% 100%, rgba(201,168,76,0.06) 0, transparent 50%),
            radial-gradient(at 100% 100%, rgba(201,168,76,0.12) 0, transparent 50%)
          `,
          pointerEvents: 'none', zIndex: 0,
          opacity: 0.8
        }} 
      />

      {/* Aurora blob 1 — moves with mouse */}
      <div style={{
        position: 'absolute',
        top: `${-10 + mouse.y * 15}%`,
        right: `${-5 + mouse.x * 10}%`,
        width: 800, height: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        transition: 'top 0.8s ease, right 0.8s ease',
        pointerEvents: 'none', zIndex: 0,
        animation: 'orbRotate 35s linear infinite'
      }} />

      {/* Subtle animated grid overlay */}
      <div 
        className="animate-grid"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.5
        }} 
      />

      {/* Noise texture for depth */}
      <div 
        className="noise-overlay"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          opacity: 0.15
        }} 
      />

      {/* Floating gold particles */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="animate-drift"
          style={{
            position: 'absolute',
            width: i % 2 === 0 ? 3 : 2,
            height: i % 2 === 0 ? 3 : 2,
            borderRadius: '50%',
            background: `rgba(201,168,76,${0.2 + (i % 5) * 0.1})`,
            top: `${10 + (i * 7.5) % 80}%`,
            left: `${5 + (i * 8.2) % 90}%`,
            animationDelay: `${i * 1.5}s`,
            pointerEvents: 'none', zIndex: 0,
            boxShadow: '0 0 10px rgba(201,168,76,0.4)',
          }} 
        />
      ))}

      {/* Bottom fade into next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 250,
        background: 'linear-gradient(to bottom, transparent, #080808)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ═══════════════ CONTENT ═══════════════ */}
      <div
        className="hero-grid"
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: 1280, margin: '0 auto',
          padding: '72px 48px 96px',
          display: 'grid',
          gridTemplateColumns: '1fr 460px',
          gap: 72,
          alignItems: 'center',
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        {/* ──── LEFT COLUMN ──── */}
        <div className="hero-content-left" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 20px', borderRadius: 999, width: 'fit-content',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))',
              border: '1px solid rgba(201,168,76,0.3)',
              boxShadow: '0 0 20px rgba(201,168,76,0.1), inset 0 0 20px rgba(201,168,76,0.03)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#C9A84C',
              boxShadow: '0 0 8px #C9A84C', animation: 'glowPulse 2s infinite',
            }} />
            <span style={{
              color: '#C9A84C', fontSize: 10, letterSpacing: '0.3em',
              textTransform: 'uppercase', fontWeight: 600,
            }}>
              Asia's Leading PR Entrepreneur
            </span>
          </motion.div>

          {/* Headline — word by word animation */}
          <div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 900, margin: 0,
              fontSize: 'clamp(50px, 5.8vw, 88px)',
              lineHeight: 1.06, letterSpacing: '-0.02em',
            }}>
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 28, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.65, delay: 0.2 + i * 0.13, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    display: 'inline-block',
                    marginRight: word.endsWith('.') ? '0.12em' : '0.22em',
                    ...(goldWords[i] ? {
                      background: 'linear-gradient(90deg, #C9A84C 0%, #F5D98A 40%, #E8C97A 60%, #C9A84C 100%)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'shimmer 4s linear infinite',
                      textShadow: 'none',
                    } : { color: '#ffffff' }),
                    transformOrigin: 'bottom center',
                    perspective: 800,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78 }}
            style={{
              color: '#888', fontSize: 17, lineHeight: 1.8,
              maxWidth: 460, margin: 0, fontWeight: 400,
            }}
          >
            Founder & CEO of{' '}
            <span style={{ color: '#C9A84C', fontWeight: 500 }}>MultiPhase Digital</span>
            {' '}&{' '}
            <span style={{ color: '#C9A84C', fontWeight: 500 }}>MultiPhase Times</span>.
            Transforming brands into iconic narratives across Asia through the power of PR, media, and relentless vision.
          </motion.p>

          {/* Organic Borderless Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.92 }}
            style={{
              display: 'flex', gap: 40,
              paddingTop: 16,
            }}
          >
            {[
              { value: followers, suffix: 'K+', label: 'Followers' },
              { value: brands, suffix: '+', label: 'Brands Served' },
              { value: cities, suffix: '+', label: 'City Offices' },
            ].map((s, i) => (
              <div key={s.label} style={{
                display: 'flex', flexDirection: 'column', gap: 6,
                position: 'relative'
              }}>
                <span style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 900, fontSize: 38,
                  color: '#C9A84C',
                  textShadow: '0 0 24px rgba(201,168,76,0.3)',
                  lineHeight: 1,
                }}>
                  {s.value}{s.suffix}
                </span>
                <span style={{ color: '#666', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {s.label}
                </span>
                {/* Subtle vertical separator dot instead of hard borders */}
                {i < 2 && (
                  <div style={{ position: 'absolute', right: -20, top: '40%', width: 3, height: 3, borderRadius: '50%', background: 'rgba(201,168,76,0.4)' }} />
                )}
              </div>
            ))}
          </motion.div>

          {/* CTA + Socials */}
          <motion.div
            className="hero-cta-group"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
          >
            <a
              href="https://multiphasedigital.com"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: '16px 36px',
                borderRadius: 999, /* Sleek pill shape */
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
                backgroundSize: '200% auto',
                color: '#080808', fontWeight: 800, fontSize: 11,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                textDecoration: 'none', display: 'inline-block',
                boxShadow: '0 0 30px rgba(201,168,76,0.25), 0 10px 20px rgba(0,0,0,0.5)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                animation: 'shimmer 3s linear infinite',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(201,168,76,0.6), 0 8px 30px rgba(0,0,0,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(201,168,76,0.35), 0 4px 20px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Explore Empire
            </a>

            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    border: '1px solid rgba(201,168,76,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#C9A84C', textDecoration: 'none',
                    background: 'rgba(201,168,76,0.05)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 0 transparent',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.7)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(201,168,76,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.05)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.boxShadow = '0 0 0 transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ──── RIGHT COLUMN: Organic Profile Image ──── */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Intense organic backlight behind the person */}
          <div style={{
            position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: '80%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.05) 50%, transparent 80%)',
            filter: 'blur(40px)', zIndex: 0,
            animation: 'pulseGlow 6s ease-in-out infinite alternate'
          }} />

          {/* Borderless Image Container with bottom fade mask */}
          <div style={{
            position: 'relative', zIndex: 1,
            width: '100%',
            maxWidth: 420,
            /* Use a CSS mask to fade out the hard bottom edge of the PNG */
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            animation: 'heroFloat 6s ease-in-out infinite',
          }}>
            <img
              src="https://multiphasedigital.com/assets/Mehul-Du0Io30Z.png"
              alt="Mehul Purohit"
              style={{
                width: '100%',
                display: 'block',
                /* Optional grayscale effect or drop shadow onto the transparent PNG itself */
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8)) contrast(1.05)',
              }}
            />
          </div>

          {/* Achievement text floated organically below the fade */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              display: 'flex', gap: 32, marginTop: -10, zIndex: 2,
              position: 'relative', width: '100%', justifyContent: 'center'
            }}
          >
            {[
              { icon: Trophy, title: 'Multiple Award Winner', sub: '2024 · 2025' },
              { icon: Globe, title: "Asia's #1 PR Brand", sub: '6 Cities · Pan India' },
            ].map(b => (
              <div key={b.title} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(201,168,76,0.1)'
                }}>
                  <b.icon size={18} color="#C9A84C" strokeWidth={1.5} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>{b.title}</span>
                  <span style={{ color: '#777', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{b.sub}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          zIndex: 2,
        }}
      >
        <span style={{ color: '#444', fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 26, height: 44, border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14,
            display: 'flex', justifyContent: 'center', paddingTop: 6,
          }}
        >
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 3, height: 8, borderRadius: 2, background: '#C9A84C' }}
          />
        </motion.div>
      </motion.div>

      {/* ═══════════════ KEYFRAMES ═══════════════ */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 6px #C9A84C; }
          50% { box-shadow: 0 0 14px #C9A84C, 0 0 24px rgba(201,168,76,0.4); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-20px) scale(1.4); opacity: 1; }
        }
        @keyframes pulseGlow {
          0% { transform: translateX(-50%) scale(1); opacity: 0.8; }
          100% { transform: translateX(-50%) scale(1.15); opacity: 1; }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes gridDrift {
          0% { background-position: 0 0; }
          100% { background-position: 72px 72px; }
        }
        @keyframes ringRotate {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @keyframes ringGlow {
          0%, 100% { box-shadow: 0 0 0 transparent; border-color: rgba(201,168,76,0.2); }
          50% { box-shadow: 0 0 20px rgba(201,168,76,0.15); border-color: rgba(201,168,76,0.45); }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 380px !important; padding: 56px 32px 80px !important; gap: 48px !important; }
        }
        /* Mobile */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 40px 20px 72px !important;
            gap: 44px !important;
          }
          .hero-content-left {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-stats {
            justify-content: center !important;
            width: 100% !important;
          }
          .hero-cta-group {
            justify-content: center !important;
            width: 100% !important;
          }
          .hero-scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
