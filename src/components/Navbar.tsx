import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-primary/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">PixelCraft</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={clsx(
                    'px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-white hover:bg-primary/5'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* CTA and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/project-request"
              className="hidden sm:block btn-primary text-sm"
            >
              Start Project
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary/10">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'block px-4 py-2 rounded-lg transition-all duration-300 font-medium',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-300 hover:text-white hover:bg-primary/5'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Link
                to="/project-request"
                onClick={() => setIsOpen(false)}
                className="block btn-primary text-center mt-4"
              >
                Start Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
