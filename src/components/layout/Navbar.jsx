import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Beranda', path: '/', sectionId: '' },
  { name: 'Penyebab', path: '/', sectionId: 'penyebab' },
  { name: 'Simulasi', path: '/', sectionId: 'simulasi' },
  { name: 'Peta', path: '/peta', sectionId: '' },
  { name: 'Riwayat', path: '/riwayat', sectionId: '' },
  { name: 'Mitigasi', path: '/', sectionId: 'mitigasi' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      if (location.pathname === '/') {
        const sections = ['penyebab', 'simulasi', 'mitigasi']
        let current = ''
        for (const sec of sections) {
          const el = document.getElementById(sec)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 140 && rect.bottom >= 140) {
              current = sec
              break
            }
          }
        }
        setActiveSection(current)
      } else {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  // Scroll to anchor after navigation if hash exists
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.pathname, location.hash])

  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false)
    if (item.sectionId) {
      e.preventDefault()
      if (location.pathname !== '/') {
        navigate(`/#${item.sectionId}`)
      } else {
        const el = document.getElementById(item.sectionId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else if (item.path === '/' && location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const isLinkActive = (item) => {
    if (item.path === '/peta') return location.pathname === '/peta'
    if (item.path === '/riwayat') return location.pathname === '/riwayat'
    if (location.pathname === '/') {
      if (item.sectionId) {
        return activeSection === item.sectionId
      }
      return activeSection === ''
    }
    return false
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-[#0a0e1a]/85 backdrop-blur-sm'
      } border-b border-[#1e293b]`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16">
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] rounded-lg p-1"
        >
          <div className="relative w-8 h-8 rounded-lg bg-[#111827] border border-[#1e293b] flex items-center justify-center group-hover:border-[#0ea5e9]/60 transition-colors">
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <path d="M2 20 Q7 10 14 16 Q21 22 26 10" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M2 24 Q8 14 14 20 Q20 26 26 14" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
              <circle cx="14" cy="8" r="3" fill="#f97316" />
            </svg>
          </div>
          <span className="text-white font-extrabold text-xl group-hover:text-[#0ea5e9] transition-colors">
            SiMi<span className="text-[#0ea5e9]">Tsu</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const active = isLinkActive(item)
            return (
              <Link
                key={item.name}
                to={item.sectionId ? `/#${item.sectionId}` : item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] ${
                  active
                    ? 'text-[#0ea5e9] bg-[#111827] border border-[#0ea5e9]/40 shadow-sm shadow-[#0ea5e9]/20'
                    : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#111827]/60'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#111827] rounded-lg border border-transparent hover:border-[#1e293b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]"
          aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1322] border-b border-[#1e293b] px-4 py-3 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          {navLinks.map((item) => {
            const active = isLinkActive(item)
            return (
              <Link
                key={item.name}
                to={item.sectionId ? `/#${item.sectionId}` : item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-[#0ea5e9] bg-[#111827] border border-[#0ea5e9]/30 font-semibold'
                    : 'text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#111827]/70'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
