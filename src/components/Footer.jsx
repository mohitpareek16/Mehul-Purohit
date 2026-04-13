import { Mail, MapPin, Phone } from 'lucide-react'
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" style={{
      position: 'relative', background: '#080808', overflow: 'hidden',
      borderTop: '1px solid rgba(201,168,76,0.06)'
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
          position: 'absolute', bottom: '-20%', right: '10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
          filter: 'blur(100px)'
        }} 
      />
      {/* Top subtle glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: 1,
        background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)'
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div 
          className="footer-grid"
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 60, marginBottom: 80
          }}
        >
          
          {/* Brand */}
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 900,
                color: '#fff', margin: '0 0 8px 0', letterSpacing: '0.1em'
              }}>
                MEHUL PUROHIT
              </h3>
              <p style={{
                color: '#C9A84C', fontSize: 10, letterSpacing: '0.25em',
                textTransform: 'uppercase', margin: 0, fontWeight: 600
              }}>
                Founder & CEO · MultiPhase Digital
              </p>
            </div>
            <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
              Entrepreneur. Storyteller. Visionary. Building Asia's most powerful PR empire, one story at a time.
            </p>

            {/* Social Icons (Borderless) */}
            <div className="footer-socials" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {[
                { icon: InstagramIcon, href: 'https://www.instagram.com/mehulpurohit8', label: 'Instagram' },
                { icon: YoutubeIcon, href: '#podcasts', label: 'YouTube' },
                { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    color: '#666', transition: 'all 0.3s ease', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 8
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#C9A84C'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#666'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation & Contact Wrapper for mobile side-by-side layout */}
          <div className="nav-contact-wrapper" style={{ display: 'contents' }}>
            {/* Quick Links */}
            <div className="footer-col">
              <p style={{
                color: '#fff', fontSize: 11, letterSpacing: '0.25em',
                textTransform: 'uppercase', marginBottom: 24, fontWeight: 600
              }}>
                Navigation
              </p>
              <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'The Journey', href: '#journey' },
                  { label: 'Awards', href: '#awards' },
                  { label: 'Podcasts & Media', href: '#podcasts' },
                  { label: 'MultiPhase Digital', href: 'https://multiphasedigital.com', external: true },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="footer-link-item"
                    style={{
                      color: '#666', fontSize: 13, textDecoration: 'none',
                      transition: 'color 0.3s ease', display: 'flex', alignItems: 'center', gap: 12
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#C9A84C'
                      const dot = e.currentTarget.querySelector('.nav-dot');
                      if (dot) dot.style.background = '#C9A84C'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#666'
                      const dot = e.currentTarget.querySelector('.nav-dot');
                      if (dot) dot.style.background = '#333'
                    }}
                  >
                    <span className="nav-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: '#333', transition: 'background 0.3s' }} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <p style={{
                color: '#fff', fontSize: 11, letterSpacing: '0.25em',
                textTransform: 'uppercase', marginBottom: 24, fontWeight: 600
              }}>
                Contact
              </p>
              <div className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <MapPin size={16} color="#C9A84C" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>
                    Mumbai · Noida · Bengaluru<br />Jaipur · Chandigarh · Surat
                  </span>
                </div>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Mail size={16} color="#C9A84C" />
                  <a href="mailto:info@multiphasedigital.com" style={{ color: '#666', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#666'}
                  >
                    info@multiphasedigital.com
                  </a>
                </div>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Phone size={16} color="#C9A84C" />
                  <a href="tel:+919999999999" style={{ color: '#666', fontSize: 14, textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#666'}
                  >
                    +91 99999 99999
                  </a>
                </div>
              </div>

              {/* CTA Button (Borderless style) */}
              <a
                href="https://www.instagram.com/mehulpurohit8"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cta"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '12px 24px', background: 'transparent',
                  border: '1px solid #C9A84C', color: '#C9A84C',
                  fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontWeight: 700, marginTop: 32, textDecoration: 'none',
                  borderRadius: 40, transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#C9A84C'
                  e.currentTarget.style.color = '#000'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#C9A84C'
                }}
              >
                Work With Mehul
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 32,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16
        }}>
          <p style={{ color: '#444', fontSize: 11, letterSpacing: '0.15em', margin: 0 }}>
            © {year} Mehul Purohit — All Rights Reserved
          </p>
          <p style={{ color: '#444', fontSize: 11, letterSpacing: '0.15em', margin: 0, textTransform: 'uppercase' }}>
            Building Empires · Shaping Stories
          </p>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
              text-align: center !important;
              gap: 40px !important;
            }
            /* Brand stays full width and centered */
            .footer-col:first-child {
              align-items: center !important;
              margin-bottom: 20px;
            }
            .footer-socials {
              justify-content: center !important;
            }
            /* Navigation and Contact - Side by Side in 2 Columns on mobile */
            .footer-grid {
              display: flex !important;
              flex-direction: column !important;
            }
            .nav-contact-wrapper {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 24px !important;
              text-align: left !important;
              width: 100%;
            }
            .footer-col {
              align-items: flex-start !important;
            }
            .footer-links {
              align-items: flex-start !important;
            }
            .footer-link-item {
              justify-content: flex-start !important;
            }
            .contact-item {
              justify-content: flex-start !important;
              text-align: left !important;
            }
            .footer-bottom {
              flex-direction: column !important;
              text-align: center !important;
              gap: 12px !important;
            }
          }
        `}</style>
      </div>
    </footer>
  )
}
