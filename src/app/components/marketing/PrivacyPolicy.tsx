import { Link } from "react-router";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Navigation */}
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-[#9CA3AF] text-sm mb-10">Last updated: April 6, 2026</p>

        <div className="space-y-10 text-[#D1D5DB] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              Welcome to RodeoPro ("we," "our," or "us"). We are committed to protecting your
              personal information and your right to privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use our application
              and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              We may collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#9CA3AF]">
              <li>Account information such as your name and email address</li>
              <li>Profile data including horses, arenas, and run records you create</li>
              <li>Payment information processed securely through Stripe</li>
              <li>Usage data and analytics to improve the application</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 text-[#9CA3AF]">
              <li>Provide, operate, and maintain RodeoPro</li>
              <li>Process transactions and manage subscriptions</li>
              <li>Send you technical notices and support messages</li>
              <li>Improve and personalize your experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Sharing of Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may
              share data with trusted service providers (such as Stripe for payment processing)
              solely for the purpose of operating our services, and only under strict
              confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to
              provide services. You may request deletion of your account and associated data at
              any time by contacting us at{" "}
              <a
                href="mailto:support@rodeoproapp.com"
                className="text-[#F59E0B] hover:underline"
              >
                support@rodeoproapp.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Security</h2>
            <p>
              We implement industry-standard security measures to protect your information.
              However, no method of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Children's Privacy</h2>
            <p>
              RodeoPro is not intended for children under the age of 13. We do not knowingly
              collect personal information from children under 13. If you believe we have
              inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page with an updated revision
              date. Your continued use of RodeoPro after changes are posted constitutes your
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a
                href="mailto:support@rodeoproapp.com"
                className="text-[#F59E0B] hover:underline"
              >
                support@rodeoproapp.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0F1117] py-8 px-4 sm:px-6 lg:px-8 border-t border-[#374151] mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9CA3AF]">© 2026 RodeoPro. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-[#F59E0B]">Privacy Policy</Link>
            <Link to="/terms" className="text-[#9CA3AF] hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/" className="text-[#9CA3AF] hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
