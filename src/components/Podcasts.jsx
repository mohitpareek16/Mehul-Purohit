import { useEffect, useRef } from 'react'
import { YoutubeIcon } from './SocialIcons'

const podcasts = [
  {
    title: 'What is Negative PR? & Why It Works',
    guest: 'Mehul Purohit on Hustle Tank',
    videoId: 'Dkv_1U3guz0', 
    description: 'An insightful breakdown of "Negative PR"—how it works, why brands use it, and the strategic edge it can provide in a competitive market.',
  },
  {
    title: 'The Dark Secrets of PR Exposed',
    guest: 'Mehul Purohit with Zeeshan Shaikh',
    videoId: '-fbfB82jGIw', 
    description: 'Mehul reveals the hidden mechanics of celebrity PR, from paid paparazzi cultures to how icons are built in the digital age.',
  },
  {
    title: "Bollywood's Viral PR Game",
    guest: 'Mehul Purohit on Hustle Tank',
    videoId: 'bLrIWmY_H9k', 
    description: 'A deep dive into the Ambani wedding hype, Saiyaara trends, and the meticulous strategies behind Bollywood\'s biggest viral moments.',
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
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return ref
}

function PodcastCard({ podcast, index }) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        transitionDelay: `${index * 120}ms`,
        display: 'flex', flexDirection: 'column', gap: 24,
      }}
    >
      {/* Thumbnail / Embed */}
      <div style={{
        position: 'relative', width: '100%', paddingBottom: '56.25%',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.1)'
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${podcast.videoId}?rel=0&modestbranding=1`}
          title={podcast.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <YoutubeIcon size={14} className="text-[#C9A84C]" />
          <span style={{ fontSize: 10, letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', fontWeight: 600 }}>
            Podcast
          </span>
        </div>
        <h3 style={{
          color: '#fff', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700,
          fontFamily: 'Playfair Display, serif', margin: 0, lineHeight: 1.3
        }}>
          {podcast.title}
        </h3>
        <p style={{ color: '#888', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
          {podcast.description}
        </p>
        <p style={{
          color: '#555', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
          marginTop: 8, fontWeight: 600
        }}>
          {podcast.guest}
        </p>
      </div>
    </div>
  )
}

export default function Podcasts() {
  const titleRef = useReveal()

  return (
    <section id="podcasts" style={{
      position: 'relative', padding: '120px 24px', background: '#080808', overflow: 'hidden'
    }}>
      {/* Mesh Gradient */}
      <div 
        className="animate-aurora"
        style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(at bottom left, rgba(201,168,76,0.06) 0%, transparent 60%)
          `,
          pointerEvents: 'none', zIndex: 0,
          opacity: 0.8
        }}
      />

      {/* Kinetic Grid Backdrop */}
      <div 
        className="animate-grid"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.5
        }} 
      />

      {/* Floating scanning light orbs */}
      {[...Array(2)].map((_, i) => (
        <div 
          key={i}
          className="animate-drift"
          style={{
            position: 'absolute',
            bottom: '10%',
            right: `${20 + i * 40}%`,
            width: 500, height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none', zIndex: 0,
            animationDelay: `${i * 4}s`
          }}
        />
      ))}

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={titleRef} style={{
          textAlign: 'center', marginBottom: 80,
          opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          <p style={{
            color: '#C9A84C', fontSize: 11, tracking: '0.4em', textTransform: 'uppercase',
            margin: '0 0 16px 0', letterSpacing: '0.4em', fontWeight: 600
          }}>
            Media Appearances
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 900, color: '#fff', margin: '0 0 24px 0', lineHeight: 1.1
          }}>
            Podcasts & <span style={{ color: '#C9A84C' }}>Interviews</span>
          </h2>
          <p style={{ color: '#666', fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            Watch Mehul share insights on entrepreneurship, PR strategies, and building a media empire on leading platforms.
          </p>
          <div style={{
            width: 4, height: 4, borderRadius: '50%',
            background: '#C9A84C', margin: '40px auto 0'
          }} />
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
          {podcasts.map((p, i) => (
            <PodcastCard key={i} podcast={p} index={i} />
          ))}
        </div>


      </div>
    </section>
  )
}
