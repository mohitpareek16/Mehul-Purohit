import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Journey', href: '#journey' },
  { label: 'Awards', href: '#awards' },
  { label: 'Podcasts', href: '#podcasts' },
  { label: 'Connect', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {/* Inner container — same max-width and padding as the hero grid */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 48px',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
        className="navbar-inner"
      >
        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '0.18em',
            color: '#C9A84C',
          }}>
            MEHUL PUROHIT
          </span>
          <span style={{
            fontSize: 9,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#666',
          }}>
            Founder & CEO · MultiPhase Digital
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: '#aaa',
                textDecoration: 'none',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'color 0.25s ease',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#aaa' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://www.instagram.com/mehulpurohit8"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          style={{
            padding: '9px 22px',
            border: '1px solid #C9A84C',
            borderRadius: 999,
            color: '#C9A84C',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#080808' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C' }}
        >
          Get In Touch
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#C9A84C', display: 'none', padding: 4,
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(8,8,8,0.97)',
              borderBottom: '1px solid rgba(201,168,76,0.15)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: '#aaa', textDecoration: 'none',
                    fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.instagram.com/mehulpurohit8"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 0', borderTop: '1px solid rgba(201,168,76,0.2)',
                  color: '#C9A84C', textDecoration: 'none',
                  fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
                }}
              >
                Get In Touch ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .navbar-inner { padding: 0 20px !important; }
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (max-width: 1024px) {
          .navbar-inner { padding: 0 32px !important; }
        }
      `}</style>
    </motion.nav>
  )
}
