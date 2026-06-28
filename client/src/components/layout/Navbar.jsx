import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../ui/Button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-gray-900">
          <span className="w-7 h-7 rounded-lg bg-purple-700 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </span>
          Rory <span className="text-purple-700">Dev</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-purple-700' : 'text-gray-600 hover:text-gray-900'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            title="Admin login"
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-purple-700 transition-colors px-2 py-1.5 rounded-lg hover:bg-purple-50"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Admin
          </Link>
          <Link to="/contact">
            <Button variant="primary" size="sm">Get a quote</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 animate-slide-up">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-purple-700' : 'text-gray-600'}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            <Button variant="primary" size="sm" className="w-full">Get a quote</Button>
          </Link>
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-purple-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Admin login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
