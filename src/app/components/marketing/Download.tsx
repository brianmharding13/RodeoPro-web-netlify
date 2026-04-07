import { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Smartphone } from "lucide-react";

// TODO: replace with real store URLs before launch
const APP_STORE_URL = "https://apps.apple.com/app/rodeoproapp";
const PLAY_STORE_URL = "https://play.google.com/store/apps/rodeoproapp";

function getDeviceOS(): "ios" | "android" | "unknown" {
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "unknown";
}

export default function Download() {
  useEffect(() => {
    const os = getDeviceOS();
    if (os === "ios") window.location.href = APP_STORE_URL;
    else if (os === "android") window.location.href = PLAY_STORE_URL;
  }, []);

  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col">
      {/* Nav */}
      <nav className="bg-[#111827] border-b border-[#374151]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center gap-0 text-xl font-bold">
              <span className="text-white">RODEO</span>
              <span className="text-[#F59E0B]">PRO</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md w-full"
        >
          <Smartphone className="w-16 h-16 text-[#F59E0B] mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-3">Get the App</h1>
          <p className="text-[#9CA3AF] text-lg mb-10">
            Track every run, manage your horses and arenas, and view your
            performance — all from your phone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* App Store */}
            <a
              href={APP_STORE_URL}
              className="flex items-center justify-center gap-3 bg-white text-[#111827] px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-500 leading-none mb-0.5">Download on the</div>
                <div className="text-base font-bold leading-none">App Store</div>
              </div>
            </a>

            {/* Google Play */}
            <a
              href={PLAY_STORE_URL}
              className="flex items-center justify-center gap-3 bg-white text-[#111827] px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.65.19.98.07l12.09-6.98-2.64-2.64L3.18 23.76zM.75 1.4C.28 1.85 0 2.56 0 3.46v17.08c0 .9.28 1.61.75 2.06l.11.1 9.57-9.57v-.23L.86 3.3.75 1.4zM20.27 9.9l-2.56-1.48-2.94 2.94 2.94 2.94 2.57-1.48c.73-.42.73-1.5-.01-1.92zM4.16.18l12.09 6.98-2.64 2.64L3.18.25c.33-.13.69-.1.98.07" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-500 leading-none mb-0.5">Get it on</div>
                <div className="text-base font-bold leading-none">Google Play</div>
              </div>
            </a>
          </div>

          <p className="text-[#6B7280] text-sm mt-10">
            Already have the app?{" "}
            <a href="rodeoproapp://" className="text-[#F59E0B] hover:underline">
              Open it directly
            </a>
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-[#374151] text-center">
        <p className="text-xs text-[#6B7280]">© 2026 RodeoPro. All rights reserved.</p>
      </footer>
    </div>
  );
}
