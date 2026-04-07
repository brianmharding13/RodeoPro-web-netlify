import { useEffect, useState } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const [subLoading, setSubLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // If Stripe just redirected back with ?success=true the webhook may not have
  // written to Supabase yet — trust the param and let AccountPage handle it.
  const justSubscribed = searchParams.get('success') === 'true';

  useEffect(() => {
    if (loading) return; // wait for auth to fully resolve before checking subscription
    if (!user || justSubscribed) {
      setSubLoading(false);
      return;
    }
    supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        setIsSubscribed(data?.status === 'active');
        setSubLoading(false);
      });
  }, [user, loading, justSubscribed]);

  if (loading || subLoading) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!justSubscribed && !isSubscribed) {
    return <Navigate to="/subscribe" replace />;
  }

  return <Outlet />;
}
