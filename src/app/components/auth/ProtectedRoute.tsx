import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  if (user.subscriptionStatus === 'pending') {
    return <Navigate to="/subscribe" replace />;
  }

  if (user.subscriptionStatus === 'inactive') {
    return <Navigate to="/subscribe" replace />;
  }

  return <Outlet />;
}
