import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  return session ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
