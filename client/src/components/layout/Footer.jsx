import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-950 text-gray-400 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-7 h-7 rounded-lg bg-purple-700 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </span>
            <p className="font-bold text-xl text-white">Rory <span className="text-purple-400">Dev</span></p>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            Building premium digital experiences for ambitious brands. From concept to launch.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-4">Pages</p>
          <ul className="flex flex-col gap-2 text-sm">
            {[['/', 'Home'], ['/services', 'Services'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-4">Services</p>
          <ul className="flex flex-col gap-2 text-sm">
            {['Web Development', 'Branding', 'Graphic Design', 'Marketing', 'UI/UX Design'].map((s) => (
              <li key={s}><Link to="/services" className="hover:text-white transition-colors">{s}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} Rory Dev. All rights reserved.</p>
        <Link to="/admin" className="text-gray-600 hover:text-gray-400 transition-colors">Admin</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
