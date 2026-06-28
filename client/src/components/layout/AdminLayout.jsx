import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <span className="h-8 w-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto bg-gray-50/50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
