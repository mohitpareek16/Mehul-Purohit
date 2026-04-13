import { useEffect, useRef } from 'react'

const awards = [
  {
    title: 'Outstanding Rotaractian',
    org: 'Rotaract District 3053',
    year: '2023',
    image: '/awards/award  (8).jpg',
    featured: true,
  },
  {
    title: 'Proud PR Partner Recognition',
    org: 'Sonu Sharma — Dream to Reality',
    year: '2024',
    image: '/awards/award  (9).jpg',
    featured: false,
  },
]

const celebPhotos = [
  { label: 'With Nitin Gadkari', sub: 'Union Minister of Road Transport & Highways', image: '/awards/celeb2.jpg' },
  { label: 'With Tamannaah Bhatia', sub: 'Bollywood Actress · IGA 2025', image: '/awards/celeb1.jpg' },
  { label: 'With Sonu Sood', sub: 'Actor & Philanthropist', image: '/awards/celeb5.jpg' },
  { label: 'Inspiring Leaders Awards 2024', sub: 'Industry Recognition', image: '/awards/celeb4.jpg' },
  { label: 'Excellence in PR', sub: 'Industry Recognition', image: '/awards/celeb3.jpg' },
]

const otherAwards = [
  { label: 'Eminence in PR', sub: 'Outstanding Recognition', image: '/awards/award  (7).jpg' },
  { label: 'Leadership Excellence', sub: 'Industry Honour', image: '/awards/award  (6).jpg' },
  { label: 'Youth Icon', sub: 'Regional Summit', image: '/awards/award  (5).jpg' },
  { label: 'Brand Strategist', sub: 'Annual Forum', image: '/awards/award  (4).webp' },
  { label: "India's Influencer Award", sub: 'Social Recognition', image: '/awards/award (1).png' },
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

function ImageCard({ item, index, isFeatured }) {
  const ref = useReveal()
  const isAward = 'org' in item

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        transitionDelay: `${index * 100}ms`,
        borderRadius: 16,
        overflow: 'hidden',
        background: '#111',
        height: 440,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.querySelector('.card-overlay').style.background = 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
      }}
      onMouseLeave={e => {
        e.currentTarget.querySelector('.card-overlay').style.background = 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%, transparent 100%)'
      }}
    >
      {/* Background Image */}
      <img 
        className="card-bg-img"
        src={item.image} 
        alt={item.title || item.label}
        style={{
          width: '100%', height: '100%', display: 'block', objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />

      {/* Gradient Overlay */}
      <div 
        className="card-overlay"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%, transparent 100%)',
          transition: 'background 0.4s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 24, zIndex: 1
        }}
      >
        {isAward ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
              <span style={{ 
                color: '#C9A84C', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600
              }}>
                {item.year}
              </span>
              {isFeatured && (
                <span style={{ 
                  background: 'rgba(201,168,76,0.15)', color: '#C9A84C', 
                  fontSize: 9, padding: '4px 8px', borderRadius: 20,
                  letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700
                }}>
                  Featured
                </span>
              )}
            </div>
            <h3 style={{ 
              color: '#fff', fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 800, 
              fontFamily: 'Playfair Display, serif', margin: '0 0 4px 0', lineHeight: 1.2
            }}>
              {item.title}
            </h3>
            <p style={{ color: '#aaa', fontSize: 12, margin: 0, tracking: '0.05em' }}>{item.org}</p>
          </>
        ) : (
          <>
            <h3 style={{ 
              color: '#fff', fontSize: 20, fontWeight: 700, 
              fontFamily: 'Playfair Display, serif', margin: '0 0 4px 0'
            }}>
              {item.label}
            </h3>
            <p style={{ color: '#aaa', fontSize: 13, margin: 0 }}>{item.sub}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default function AwardsGallery() {
  const title1Ref = useReveal()
  const title2Ref = useReveal()

  return (
    <section id="awards" style={{ position: 'relative',
      padding: '120px 24px', background: '#040406', overflow: 'hidden'
    }}>
      {/* Mesh Gradient Background */}
      <div 
        className="animate-aurora"
        style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(at 100% 0%, rgba(201,168,76,0.08) 0, transparent 50%),
            radial-gradient(at 0% 100%, rgba(201,168,76,0.05) 0, transparent 50%)
          `,
          pointerEvents: 'none', zIndex: 0,
          opacity: 0.6
        }} 
      />

      {/* Drifting Light Orbs */}
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="animate-drift"
          style={{
            position: 'absolute',
            top: `${20 + i * 30}%`,
            left: `${10 + i * 25}%`,
            width: 600, height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none', zIndex: 0,
            animationDelay: `${i * 3}s`
          }}
        />
      ))}

      {/* Bokeh Particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="animate-drift"
          style={{
            position: 'absolute',
            width: 4 + (i % 6),
            height: 4 + (i % 6),
            borderRadius: '50%',
            background: `rgba(201,168,76,${0.05 + (i % 5) * 0.05})`,
            top: `${(i * 7) % 100}%`,
            left: `${(i * 13) % 100}%`,
            animationDelay: `${i * 1}s`,
            pointerEvents: 'none', zIndex: 0,
            filter: 'blur(2px)',
          }} 
        />
      ))}

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* ──── Awards Header ──── */}
        <div ref={title1Ref} style={{
          textAlign: 'center', marginBottom: 60,
          opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <p style={{
            color: '#C9A84C', fontSize: 11, tracking: '0.4em',
            textTransform: 'uppercase', margin: '0 0 16px 0', letterSpacing: '0.3em', fontWeight: 600
          }}>
            Recognition
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, color: '#fff',
            margin: '0 0 24px 0', lineHeight: 1.1
          }}>
            Awards & <span style={{ color: '#C9A84C' }}>Gallery</span>
          </h2>
          <p style={{ color: '#666', fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            Milestones of excellence, celebrated by industry leaders and national platforms alike.
          </p>
        </div>

        {/* ──── Featured Awards Grid ──── */}
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24, marginBottom: 32,
        }}>
          {awards.map((award, i) => (
            <ImageCard key={i} item={award} index={i} isFeatured={award.featured} />
          ))}
        </div>

        {/* ──── Additional Awards Grid (3 - 2 Layout) ──── */}
        <div style={{
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 24, marginBottom: 100,
        }}>
          {otherAwards.map((award, i) => (
            <div key={i} style={{ flex: '1 1 calc(33.333% - 16px)', minWidth: 280, maxWidth: 380 }}>
              <ImageCard item={award} index={i + 2} />
            </div>
          ))}
        </div>

        {/* ──── Celeb Header ──── */}
        <div ref={title2Ref} style={{
          textAlign: 'center', marginBottom: 60,
          opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <p style={{
            color: '#C9A84C', fontSize: 11, tracking: '0.4em',
            textTransform: 'uppercase', margin: '0 0 16px 0', letterSpacing: '0.3em', fontWeight: 600
          }}>
            High-Profile Encounters
          </p>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#fff',
            margin: 0, lineHeight: 1.1
          }}>
            In The Company of Giants
          </h3>
        </div>

        {/* ──── Celeb Photo Grid (3 - 2 Layout) ──── */}
        <div style={{
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 24,
        }}>
          {celebPhotos.map((photo, i) => (
            <div key={i} style={{ flex: '1 1 calc(33.333% - 16px)', minWidth: 280, maxWidth: 380 }}>
              <ImageCard item={photo} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
