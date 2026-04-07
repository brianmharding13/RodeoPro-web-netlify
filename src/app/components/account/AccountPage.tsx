import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { LogOut, CheckCircle, AlertCircle, Clock, Download, RefreshCw } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../lib/supabase";
import { post } from "../../../lib/api";

interface Subscription {
  status: string;
  plan: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

export default function AccountPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuth();

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subLoading, setSubLoading] = useState(true);
  const [subRefreshing, setSubRefreshing] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const success = searchParams.get("success") === "true";

  const fetchSubscription = useCallback(async (showRefreshing = false) => {
    if (!user) return;
    if (showRefreshing) setSubRefreshing(true);
    const { data } = await supabase
      .from("subscriptions")
      .select("status, plan, current_period_end, cancel_at_period_end")
      .eq("user_id", user.id)
      .maybeSingle();
    setSubscription(data ?? { status: "inactive", plan: null, current_period_end: null, cancel_at_period_end: false });
    setSubLoading(false);
    setSubRefreshing(false);
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const { url } = await post<{ url: string }>('/stripe/portal', {});
      globalThis.location.href = url;
    } catch {
      setPortalLoading(false);
    }
  };

  const isCancelling = subscription?.status === "active" && subscription?.cancel_at_period_end;
  const isActive = subscription?.status === "active";

  const periodEndDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // Derive the human-readable status line
  let statusLabel = "Inactive";
  let statusColor = "text-gray-400 bg-gray-400/10 border-gray-400/30";
  let periodLabel: string | null = null;

  if (subscription?.status === "active") {
    if (isCancelling && periodEndDate) {
      statusLabel = "Cancels on " + periodEndDate;
      statusColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    } else {
      statusLabel = "Active";
      statusColor = "text-green-400 bg-green-400/10 border-green-400/30";
      periodLabel = periodEndDate ? "Renews" : null;
    }
  } else if (subscription?.status === "past_due") {
    statusLabel = "Past Due";
    statusColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
  } else if (subscription?.status === "cancelled" || subscription?.status === "canceled") {
    statusLabel = "Cancelled";
    statusColor = "text-red-400 bg-red-400/10 border-red-400/30";
    periodLabel = periodEndDate ? "Ended" : null;
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col">
      {/* Nav */}
      <nav className="bg-[#111827] border-b border-[#374151]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-0 text-xl font-bold">
              <span className="text-white">RODEO</span>
              <span className="text-[#F59E0B]">PRO</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        {/* Success banner */}
        {success && (
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl px-4 py-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">Subscription activated! Welcome to RodeoPro.</p>
          </div>
        )}

        {/* Profile card */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">Account</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-[#111827] text-xl font-bold flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div>
              <p className="font-semibold text-lg">{user?.name}</p>
              <p className="text-[#9CA3AF] text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Subscription card */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Subscription</h2>
            <button
              onClick={() => fetchSubscription(true)}
              disabled={subRefreshing}
              className="text-[#6B7280] hover:text-[#9CA3AF] transition-colors disabled:opacity-50"
              title="Refresh subscription status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${subRefreshing ? "animate-spin" : ""}`} />
            </button>
          </div>

          {subLoading ? (
            <div className="flex items-center gap-2 text-[#9CA3AF]">
              <div className="w-4 h-4 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Loading…</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9CA3AF]">Status</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor}`}>
                  {statusLabel}
                </span>
              </div>

              {periodLabel && periodEndDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#9CA3AF]">{periodLabel}</span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    {periodEndDate}
                  </span>
                </div>
              )}

              {subscription?.plan && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#9CA3AF]">Plan</span>
                  <span className="text-sm font-medium capitalize">{subscription.plan}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#374151] space-y-3">
                {!isActive && (
                  <Link
                    to="/subscribe"
                    className="flex items-center justify-center w-full bg-[#F59E0B] text-[#111827] py-2.5 rounded-lg font-semibold hover:bg-[#F59E0B]/90 transition-colors text-sm"
                  >
                    Subscribe Now
                  </Link>
                )}
                {isActive && (
                  <button
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="flex items-center justify-center w-full border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#6B7280] py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {portalLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-[#9CA3AF] border-t-transparent rounded-full animate-spin" />{"Loading…"}
                      </span>
                    ) : 'Manage Subscription'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* App download card */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
          <h2 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">Mobile App</h2>
          <p className="text-sm text-[#9CA3AF] mb-4">
            Track your runs, manage horses and arenas — all from your phone.
          </p>
          {!isActive && (
            <div className="flex items-center gap-2 text-yellow-400 text-xs mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              An active subscription is required to use the mobile app.
            </div>
          )}
          <Link
            to="/download"
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              isActive
                ? "text-[#F59E0B] hover:text-[#F59E0B]/80"
                : "text-[#6B7280] cursor-not-allowed pointer-events-none"
            }`}
          >
            <Download className="w-4 h-4" />
            Download the App
          </Link>
        </div>

      </main>

      <footer className="py-6 border-t border-[#374151] text-center">
        <p className="text-xs text-[#6B7280]">© 2026 RodeoPro. All rights reserved.</p>
      </footer>
    </div>
  );
}
