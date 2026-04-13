import { useEffect, useRef } from 'react'

const brands = [
  'MultiPhase Digital',
  'MultiPhase Times',
  'Zee Music Co',
  'T-Series',
  'PVR Cinemas',
  'Jio Studios',
  'ABP News',
  'NBC',
  'Shedan Media',
  'VKonnect',
  'Shark Tank India',
]

export default function BrandsSlider() {
  // Triple the array to ensure a seamless infinite scroll loop on large screens
  const items = [...brands, ...brands, ...brands]

  return (
    <section style={{
      position: 'relative',
      padding: '40px 0',
      background: '#040406',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
      overflow: 'hidden',
      zIndex: 10
    }}>
      {/* ──── Fade edges ──── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 140,
        background: 'linear-gradient(to right, #040406 10%, transparent 100%)',
        zIndex: 10, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 140,
        background: 'linear-gradient(to left, #040406 10%, transparent 100%)',
        zIndex: 10, pointerEvents: 'none'
      }} />

      {/* ──── Label ──── */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{
          margin: 0, fontSize: 10, letterSpacing: '0.4em',
          color: '#555', textTransform: 'uppercase', fontWeight: 600
        }}>
          Associated With
        </p>
      </div>

      {/* ──── Marquee ──── */}
      <div style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
        <div className="animate-marquee" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          {items.map((brand, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                margin: '0 32px'
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#C9A84C', opacity: 0.5,
                boxShadow: '0 0 8px rgba(201,168,76,0.4)'
              }} />
              <span style={{
                color: '#888', fontSize: 13, letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 600,
                transition: 'color 0.3s ease', cursor: 'default'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
