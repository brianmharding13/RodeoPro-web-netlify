import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { 
  User, 
  Trophy, 
  MapPin, 
  Star, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Camera,
  Mail,
  Phone
} from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import { runs, horses, arenas } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState(user?.name || "Sarah Mitchell");
  const [userEmail, setUserEmail] = useState(user?.email || "sarah.mitchell@example.com");
  const [userPhone, setUserPhone] = useState("(555) 123-4567");
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Calculate stats
  const totalRuns = runs.length;
  const cleanRuns = runs.filter(r => r.isClean).length;
  const bestTime = Math.min(...runs.map(r => r.time));
  const totalEarnings = runs.reduce((sum, run) => sum + (run.payout || 0), 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111827] transition-colors pb-20">
      {/* Header with Profile Card */}
      <div className="bg-gradient-to-b from-gray-50 dark:from-[#1F2937] to-white dark:to-[#111827] border-b border-gray-200 dark:border-[#374151] px-4 pt-6 pb-8 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            RODEO<span className="text-[#F59E0B]">PRO</span>
          </div>
          <Link to="/app/runs" className="text-sm text-[#0D9488] font-semibold">
            Done
          </Link>
        </div>

        {/* Profile Photo & Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white text-3xl font-bold">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#0D9488] flex items-center justify-center text-white shadow-lg hover:bg-[#0F766E] transition-all active:scale-95">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#374151] border border-gray-300 dark:border-[#4B5563] rounded-lg px-3 py-2 text-gray-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-colors"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {userName}
              </h2>
            )}
            <p className="text-sm text-gray-500 dark:text-[#9CA3AF]">Barrel Racer</p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200 dark:border-[#374151] transition-colors">
            <div className="text-3xl font-bold font-mono text-[#F59E0B] mb-1">
              {totalRuns}
            </div>
            <div className="text-xs text-gray-500 dark:text-[#9CA3AF] font-medium">Total Runs</div>
          </div>
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200 dark:border-[#374151] transition-colors">
            <div className="text-3xl font-bold font-mono text-[#10B981] mb-1">
              {cleanRuns}
            </div>
            <div className="text-xs text-gray-500 dark:text-[#9CA3AF] font-medium">Clean Runs</div>
          </div>
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200 dark:border-[#374151] transition-colors">
            <div className="text-3xl font-bold font-mono text-[#0D9488] mb-1">
              {bestTime.toFixed(2)}s
            </div>
            <div className="text-xs text-gray-500 dark:text-[#9CA3AF] font-medium">Best Time</div>
          </div>
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200 dark:border-[#374151] transition-colors">
            <div className="text-3xl font-bold font-mono text-[#F59E0B] mb-1">
              ${totalEarnings.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-[#9CA3AF] font-medium">Earnings</div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-bold text-gray-400 dark:text-[#6B7280] uppercase tracking-wider mb-3">
          Contact Information
        </h3>
        <div className="bg-gray-50 dark:bg-[#1F2937] rounded-xl border border-gray-200 dark:border-[#374151] overflow-hidden transition-colors">
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-[#374151] transition-colors border-b border-gray-200 dark:border-[#374151]">
            <div className="w-10 h-10 rounded-full bg-[#0D9488]/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#0D9488]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs text-gray-500 dark:text-[#9CA3AF] mb-0.5">Email</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userEmail}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-[#6B7280]" />
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-[#374151] transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs text-gray-500 dark:text-[#9CA3AF] mb-0.5">Phone</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userPhone}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-bold text-gray-400 dark:text-[#6B7280] uppercase tracking-wider mb-3">
          Preferences
        </h3>
        <div className="bg-gray-50 dark:bg-[#1F2937] rounded-xl border border-gray-200 dark:border-[#374151] overflow-hidden transition-colors">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-[#374151]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 flex items-center justify-center flex-shrink-0">
                <Settings className="w-5 h-5 text-[#6366F1]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
                <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">Switch between light & dark</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Notifications</p>
                <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">PR alerts & reminders</p>
              </div>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-7 rounded-full transition-all ${
                notificationsEnabled ? "bg-[#10B981]" : "bg-gray-300 dark:bg-[#4B5563]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  notificationsEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* My Data Section */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-bold text-gray-400 dark:text-[#6B7280] uppercase tracking-wider mb-3">
          Subscription
        </h3>
        <div className="bg-gray-50 dark:bg-[#1F2937] rounded-xl border border-gray-200 dark:border-[#374151] overflow-hidden transition-colors">
          <div className="px-4 py-4 border-b border-gray-200 dark:border-[#374151]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Current Plan</span>
              <span className="bg-[#10B981] text-white text-xs px-2 py-1 rounded font-bold">
                {user?.subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">
              {user?.subscriptionPlan === 'monthly' ? 'Monthly - $9.99/month' : 'Annual - $6.99/month'}
            </p>
          </div>
          <a
            href="https://billing.stripe.com/p/login/test_XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-[#374151] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-[#6366F1]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Manage Subscription</p>
              <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">Update payment or cancel</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-[#6B7280]" />
          </a>
        </div>
      </div>

      {/* My Data Section */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-bold text-gray-400 dark:text-[#6B7280] uppercase tracking-wider mb-3">
          My Data
        </h3>
        <div className="bg-gray-50 dark:bg-[#1F2937] rounded-xl border border-gray-200 dark:border-[#374151] overflow-hidden transition-colors">
          <Link
            to="/app/horses"
            className="flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-[#374151] transition-colors border-b border-gray-200 dark:border-[#374151]"
          >
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">My Horses</p>
              <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">{horses.length} horses</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-[#6B7280]" />
          </Link>
          
          <Link
            to="/app/arenas"
            className="flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-[#374151] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#0D9488]/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#0D9488]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">My Arenas</p>
              <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">{arenas.length} arenas</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-[#6B7280]" />
          </Link>
        </div>
      </div>

      {/* Support Section */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-bold text-gray-400 dark:text-[#6B7280] uppercase tracking-wider mb-3">
          Support
        </h3>
        <div className="bg-gray-50 dark:bg-[#1F2937] rounded-xl border border-gray-200 dark:border-[#374151] overflow-hidden transition-colors">
          <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-[#374151] transition-colors border-b border-gray-200 dark:border-[#374151]">
            <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-[#6366F1]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Help & FAQ</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-[#6B7280]" />
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-[#374151] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#EF4444]/20 flex items-center justify-center flex-shrink-0">
              <LogOut className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-[#EF4444]">Sign Out</p>
            </div>
          </button>
        </div>
      </div>

      {/* App Version */}
      <div className="px-4 py-8 text-center">
        <p className="text-xs text-gray-400 dark:text-[#6B7280]">
          RodeoPro v1.0.0
        </p>
        <p className="text-xs text-gray-400 dark:text-[#6B7280] mt-1">
          Built for barrel racers, by barrel racers 🤠
        </p>
      </div>
    </div>
  );
}