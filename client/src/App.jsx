import { Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

import Home from './pages/public/Home';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Leads from './pages/admin/Leads';
import LeadDetail from './pages/admin/LeadDetail';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center text-center px-6">
    <div>
      <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 text-sm mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="text-purple-700 text-sm font-medium hover:underline">Go home</a>
    </div>
  </div>
);

const App = () => (
  <Routes>
    {/* Public */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Route>

    {/* Admin */}
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="leads" element={<Leads />} />
      <Route path="leads/:id" element={<LeadDetail />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="settings" element={<Settings />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
