import { useEffect, useRef } from 'react'
import { Sprout, Rocket, Handshake, Globe, Newspaper, Trophy } from 'lucide-react'

const milestones = [
  {
    year: '2018',
    title: 'The Spark',
    description:
      'Mehul Purohit began his entrepreneurial journey with a vision to redefine PR in India — starting from scratch, with nothing but relentless ambition and a belief in the power of storytelling.',
    icon: Sprout,
  },
  {
    year: '2019',
    title: 'MultiPhase Digital Founded',
    description:
      'Founded MultiPhase Digital from the ground up, building a team and a vision that would go on to serve hundreds of brands across the country.',
    icon: Rocket,
  },
  {
    year: '2021',
    title: 'First Major Brands',
    description:
      'Onboarded marquee clients including Zee Music Co, Jio Studios, and prominent OTT platforms — establishing credibility in the media & entertainment space.',
    icon: Handshake,
  },
  {
    year: '2022',
    title: 'Pan-India Expansion',
    description:
      'Expanded physical presence across 6 Indian cities — Mumbai, Noida, Bengaluru, Jaipur, Chandigarh, and Surat — laying the foundation for Asia-wide dominance.',
    icon: Globe,
  },
  {
    year: '2023',
    title: 'MultiPhase Times Launched',
    description:
      'Launched MultiPhase Times, a media publication platform driving thought leadership and industry narratives — reinforcing the MultiPhase ecosystem.',
    icon: Newspaper,
  },
  {
    year: '2024–25',
    title: 'Asia\'s Leading PR Company',
    description:
      'Received multiple national and international awards. Photographed with Union Ministers, Bollywood celebrities, and global industry leaders. Recognised as Asia\'s #1 PR Company.',
    icon: Trophy,
  },
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
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return ref
}

function TimelineItem({ item, index, isLast }) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: '40px',
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        position: 'relative'
      }}
    >
      {/* ──── LEFT COLUMN: Timeline Track ──── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Glowing Icon Node */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#0a0a0e',
          border: '1px solid rgba(201,168,76,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
          boxShadow: '0 0 20px rgba(201,168,76,0.1), inset 0 0 10px rgba(201,168,76,0.05)',
          ...({ transition: 'all 0.3s ease' })
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.8)';
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(201,168,76,0.3), inset 0 0 10px rgba(201,168,76,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.1), inset 0 0 10px rgba(201,168,76,0.05)';
        }}
        >
          <item.icon size={22} color="#C9A84C" strokeWidth={1.5} />
        </div>

        {/* Vertical Line Connector */}
        {!isLast && (
          <div style={{
            width: 2, flexGrow: 1, minHeight: 60,
            background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), rgba(201,168,76,0.1))',
            marginTop: 10, marginBottom: 10
          }} />
        )}
      </div>

      {/* ──── RIGHT COLUMN: Content (No Boxes) ──── */}
      <div style={{ paddingBottom: isLast ? 0 : 48, paddingTop: 6, flex: 1 }}>
        <p style={{
          color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em',
          textTransform: 'uppercase', fontWeight: 600, margin: '0 0 8px 0'
        }}>
          {item.year}
        </p>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          color: '#ffffff', fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 800, margin: '0 0 14px 0', lineHeight: 1.2
        }}>
          {item.title}
        </h3>
        <p style={{
          color: '#888', fontSize: '16px', lineHeight: 1.8, margin: 0,
          fontWeight: 400, maxWidth: '600px'
        }}>
          {item.description}
        </p>
      </div>
    </div>
  )
}

export default function JourneyTimeline() {
  const titleRef = useReveal()

  return (
    <section id="journey" style={{
      position: 'relative',
      padding: '120px 24px',
      background: '#080808',
      overflow: 'hidden'
    }}>
      {/* Background radial glow - Pulse */}
      <div 
        className="animate-drift"
        style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 800, height: 800, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
          filter: 'blur(100px)'
        }} 
      />

      {/* Kinetic Background Grid (Subtle) */}
      <div 
        className="animate-grid"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          opacity: 0.3
        }} 
      />

      {/* Floating gold particles */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i} 
          className="animate-drift"
          style={{
            position: 'absolute',
            width: 2, height: 2, borderRadius: '50%',
            background: `rgba(201,168,76,${0.1 + (i % 3) * 0.1})`,
            top: `${(i * 12.5) % 90}%`,
            left: `${(i * 14.2) % 90}%`,
            animationDelay: `${i * 2}s`,
            pointerEvents: 'none', zIndex: 0,
            boxShadow: '0 0 10px rgba(201,168,76,0.3)',
          }} 
        />
      ))}

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: 'center', marginBottom: 80,
            opacity: 0, transform: 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          <p style={{
            color: '#C9A84C', fontSize: 11, tracking: '0.4em',
            textTransform: 'uppercase', margin: '0 0 16px 0', letterSpacing: '0.3em', fontWeight: 600
          }}>
            The Story
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, color: '#fff',
            margin: '0 0 24px 0', lineHeight: 1.1
          }}>
            The Journey
          </h2>
          <p style={{
            color: '#666', fontSize: 17, lineHeight: 1.8, maxWidth: 640,
            margin: '0 auto'
          }}>
            From a bold idea to building Asia's most recognised PR empire — every milestone, every step, every story.
          </p>
          {/* Elegant gold separator dot */}
          <div style={{
            width: 4, height: 4, borderRadius: '50%',
            background: '#C9A84C', margin: '40px auto 0'
          }} />
        </div>

        {/* Timeline Stack */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {milestones.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} isLast={index === milestones.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
