import { useEffect, useRef } from 'react'
import { Building2, Newspaper, Tv, Music, Clapperboard, Trophy } from 'lucide-react'

const partners = [
  { name: 'MultiPhase Digital', tagline: 'Asia\'s Leading PR Agency', icon: Building2 },
  { name: 'MultiPhase Times', tagline: 'Media Publishing Platform', icon: Newspaper },
  { name: 'Shedan Media', tagline: 'Strategic Media Partner', icon: Tv },
  { name: 'Zee Music Co', tagline: 'Entertainment Partner', icon: Music },
  { name: 'Jio Studios', tagline: 'Content & OTT Collaboration', icon: Clapperboard },
  { name: 'VKonnect Events', tagline: 'Event & Awards Partner', icon: Trophy },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = 'translateY(0)'
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Partners() {
  const titleRef = useReveal()

  return (
    <section style={{
      position: 'relative', padding: '120px 24px', background: '#040406', overflow: 'hidden'
    }}>
      {/* Animated Mesh Gradient */}
      <div 
        className="animate-aurora"
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(at top center, rgba(201,168,76,0.04) 0%, transparent 60%)',
          pointerEvents: 'none', zIndex: 0,
          opacity: 0.8
        }}
      />

      {/* Floating Light Orb */}
      <div 
        className="animate-drift"
        style={{
          position: 'absolute', top: '30%', left: '10%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
          filter: 'blur(100px)'
        }} 
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={titleRef} style={{
          textAlign: 'center', marginBottom: 60,
          opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <p style={{
            color: '#C9A84C', fontSize: 11, tracking: '0.4em', textTransform: 'uppercase',
            margin: '0 0 16px 0', letterSpacing: '0.4em', fontWeight: 600
          }}>
            Ecosystem
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 900, color: '#fff', margin: '0 0 24px 0', lineHeight: 1.1
          }}>
            Partnered <span style={{ color: '#C9A84C' }}>With</span>
          </h2>
          <p style={{ color: '#666', fontSize: 16, lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
            A powerful ecosystem of media houses, brands, and strategic partners driving the MultiPhase vision.
          </p>
        </div>

        {/* Partners Grid */}
        <div style={{
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px 32px', 
          cursor: 'default'
        }}>
          {partners.map((partner, i) => {
            const ref = useReveal()
            return (
              <div
                key={i}
                ref={ref}
                style={{
                  width: 200,
                  opacity: 0, transform: 'translateY(30px)',
                  transition: 'opacity 0.8s ease, transform 0.8s ease',
                  transitionDelay: `${i * 80}ms`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', 
                  gap: 16, textAlign: 'center'
                }}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.icon-wrapper').style.transform = 'scale(1.1) translateY(-4px)'
                  e.currentTarget.querySelector('.icon-wrapper').style.background = 'rgba(201,168,76,0.1)'
                  e.currentTarget.querySelector('.icon-wrapper').style.boxShadow = '0 10px 20px rgba(201,168,76,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.icon-wrapper').style.transform = 'scale(1) translateY(0)'
                  e.currentTarget.querySelector('.icon-wrapper').style.background = 'rgba(201,168,76,0.03)'
                  e.currentTarget.querySelector('.icon-wrapper').style.boxShadow = 'none'
                }}
              >
                <div 
                  className="icon-wrapper"
                  style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(201,168,76,0.03)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  <partner.icon size={28} color="#C9A84C" strokeWidth={1.5} />
                </div>
                <div>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 700, margin: '0 0 4px 0', letterSpacing: '0.05em' }}>
                    {partner.name}
                  </p>
                  <p style={{ color: '#666', fontSize: 11, margin: 0, letterSpacing: '0.02em' }}>
                    {partner.tagline}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Divider & Featured In */}
        <div style={{
          marginTop: 100, borderTop: '1px solid rgba(201,168,76,0.06)', paddingTop: 50
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: '#C9A84C', fontSize: 11, tracking: '0.4em', textTransform: 'uppercase',
              margin: '0 0 24px 0', letterSpacing: '0.4em', fontWeight: 600
            }}>
              Featured In
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, alignItems: 'center' }}>
              {['ABP News', 'NBC', 'Forbes India', 'Business Today', 'ET Now', 'NDTV'].map((media, i) => (
                <span
                  key={i}
                  style={{
                    color: '#666', fontSize: 13, letterSpacing: '0.25em', 
                    textTransform: 'uppercase', cursor: 'default', fontWeight: 600,
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                  onMouseLeave={e => e.currentTarget.style.color = '#666'}
                >
                  {media}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
