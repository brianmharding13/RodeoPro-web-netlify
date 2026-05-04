import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';

export default function DeleteAccount() {

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Navigation */}
      <nav className="bg-[#111827] border-b border-[#374151]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center">
              <img src="/images/rodeoProWhite.svg" alt="RodeoPro" className="h-8" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-2">Delete Your Account</h1>
        <p className="text-[#9CA3AF] text-sm mb-10">Last updated: May 4, 2026</p>

        <div className="space-y-10 text-[#D1D5DB] leading-relaxed">
          {/* Steps Section */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">How to Delete Your Account</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#111827] flex items-center justify-center font-bold text-sm">1</div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Log in on the web</h3>
                  <p className="text-[#9CA3AF]">Visit the RodeoPro website and sign in with your account credentials.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#111827] flex items-center justify-center font-bold text-sm">2</div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Go to your account dashboard</h3>
                  <p className="text-[#9CA3AF]">Navigate to your account settings once logged in.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#111827] flex items-center justify-center font-bold text-sm">3</div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Scroll to the bottom</h3>
                  <p className="text-[#9CA3AF]">Scroll down to find the "Delete Account" option at the bottom of your dashboard.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Warning Banner */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-semibold text-red-400 mb-2">Warning: This action is permanent</h2>
                <p className="text-sm text-red-300/90">
                  Deleting your account cannot be undone. All your data, including runs, horses, arenas, and media will be permanently removed. Please make sure you want to proceed.
                </p>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What Happens When You Delete Your Account?</h2>
            <ul className="list-disc list-inside space-y-2 text-[#9CA3AF]">
              <li><span className="text-white">All your data is permanently deleted</span> - runs, horses, arenas, photos, videos, and statistics</li>
              <li><span className="text-white">Your subscription is cancelled immediately</span> - no further charges will occur</li>
              <li><span className="text-white">You lose access to RodeoPro</span> - you'll need to create a new account to use the app again</li>
              <li><span className="text-white">No refunds are issued</span> - we cannot refund payments for the current billing period</li>
              <li><span className="text-white">Email is released</span> - you'll be able to use this email to create a new account after deletion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How This Affects Your Subscription</h2>
            <div className="bg-[#1F2937] border border-[#374151] rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-[#F59E0B] mb-2">Immediate Cancellation</h3>
                <p>Your subscription will be cancelled immediately upon account deletion. Your Stripe subscription will be updated to reflect this.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#F59E0B] mb-2">No Additional Charges</h3>
                <p>You will not be charged for any future billing periods. If you delete your account mid-cycle, no partial refund is provided.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#F59E0B] mb-2">Lost Access</h3>
                <p>You will immediately lose access to all premium features. Any data saved only in RodeoPro (not exported) will be lost.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Before You Delete</h2>
            <p className="mb-3">Consider these options first:</p>
            <ul className="list-disc list-inside space-y-2 text-[#9CA3AF]">
              <li>Export your data from the mobile app if you haven't already</li>
              <li>Download or save any photos and videos associated with your runs</li>
              <li>Note down important statistics or personal records</li>
              <li>If you're having issues, contact us at{' '}
                <a href="mailto:rodeoproapp@gmail.com" className="text-[#F59E0B] hover:underline">
                  rodeoproapp@gmail.com
                </a>
                {' '}instead</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Questions?</h2>
            <p>
              If you have any questions about deleting your account or need support, please contact us at{' '}
              <a href="mailto:rodeoproapp@gmail.com" className="text-[#F59E0B] hover:underline">
                rodeoproapp@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

