import { Link } from "react-router";

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-[#9CA3AF] text-sm mb-10">Last updated: April 6, 2026</p>

        <div className="space-y-10 text-[#D1D5DB] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using RodeoPro ("the Service"), you agree to be bound by these Terms
              of Service ("Terms"). If you do not agree to these Terms, please do not use the
              Service. We reserve the right to update these Terms at any time, and continued use
              of the Service constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Use of the Service</h2>
            <p className="mb-3">You agree to use RodeoPro only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 text-[#9CA3AF]">
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Upload or transmit any harmful, offensive, or malicious content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials
              and for all activity that occurs under your account. You agree to notify us
              immediately at{" "}
              <a
                href="mailto:rodeoproapp@gmail.com"
                className="text-[#F59E0B] hover:underline"
              >
                rodeoproapp@gmail.com
              </a>{" "}
              if you suspect any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Subscriptions and Billing</h2>
            <p className="mb-3">
              RodeoPro offers subscription plans billed on a monthly or annual basis. By
              subscribing, you authorize us to charge the payment method on file at the start of
              each billing period.
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#9CA3AF]">
              <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
              <li>Refunds are handled on a case-by-case basis</li>
              <li>Prices are subject to change with reasonable advance notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Intellectual Property</h2>
            <p>
              All content, features, and functionality of RodeoPro - including but not limited to
              text, graphics, logos, and software - are the exclusive property of RodeoPro and
              are protected by applicable intellectual property laws. You may not reproduce,
              distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. User Content</h2>
            <p>
              You retain ownership of any content you submit to RodeoPro (such as run records,
              photos, or notes). By submitting content, you grant us a non-exclusive, worldwide,
              royalty-free license to use, store, and display that content solely for the purpose
              of providing the Service to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Disclaimer of Warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind,
              either express or implied. We do not warrant that the Service will be uninterrupted,
              error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, RodeoPro shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your
              use of or inability to use the Service, even if we have been advised of the
              possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at our discretion,
              including if we believe you have violated these Terms. Upon termination, your right
              to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              State of Texas, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:rodeoproapp@gmail.com"
                className="text-[#F59E0B] hover:underline"
              >
                rodeoproapp@gmail.com
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
            <Link to="/privacy" className="text-[#9CA3AF] hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[#F59E0B]">Terms of Service</Link>
            <Link to="/" className="text-[#9CA3AF] hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
