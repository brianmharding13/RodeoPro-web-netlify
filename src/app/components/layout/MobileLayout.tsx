import { Outlet, useLocation, Link } from "react-router";
import { Timer, Star, MapPin, User } from "lucide-react";

export default function MobileLayout() {
  const location = useLocation();

  const tabs = [
    { path: "/app/runs", label: "Runs", icon: Timer },
    { path: "/app/horses", label: "Horses", icon: Star },
    { path: "/app/arenas", label: "Arenas", icon: MapPin },
    { path: "/app/account", label: "Account", icon: User },
  ];

  const isActive = (path: string) => {
    if (path === "/app/runs" && (location.pathname === "/app" || location.pathname === "/app/runs")) {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  // Hide bottom nav on add run page
  const showBottomNav = !location.pathname.includes("/add");

  return (
    <div className="min-h-screen bg-white dark:bg-[#111827] text-gray-900 dark:text-white flex flex-col max-w-md mx-auto relative transition-colors">
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>
      
      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-50 dark:bg-[#1F2937] border-t border-gray-200 dark:border-[#374151] max-w-md mx-auto transition-colors">
          <div className="flex items-center justify-around h-16">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.path);
              
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                    active ? "text-[#F59E0B]" : "text-gray-500 dark:text-[#9CA3AF] hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}