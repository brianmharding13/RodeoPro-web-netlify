import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${globalThis.location.origin}/reset-password`,
    });
    setResetLoading(false);
    if (error) {
      setResetError(error.message);
    } else {
      setResetSent(true);
    }
  };

  const handleBackToLogin = () => {
    setShowForgot(false);
    setResetEmail('');
    setResetSent(false);
    setResetError('');
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center">
            <img src="/images/rodeoProWhite.svg" alt="RodeoPro" className="h-8" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {showForgot ? (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                  <p className="text-gray-400">We'll send you a link to reset your password</p>
                </div>

                <div className="bg-[#1F2937] rounded-2xl p-8 border border-gray-800">
                  {resetSent ? (
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        <CheckCircle className="w-12 h-12 text-green-400" />
                      </div>
                      <p className="font-semibold">Check your email</p>
                      <p className="text-sm text-gray-400">
                        We sent a password reset link to <span className="text-white">{resetEmail}</span>.
                      </p>
                      <button
                        onClick={handleBackToLogin}
                        className="text-sm text-[#F59E0B] hover:text-[#F59E0B]/80 transition-colors"
                      >
                        Back to sign in
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-6">
                      <div>
                        <label htmlFor="reset-email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="reset-email"
                            type="email"
                            required
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      {resetError && (
                        <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 text-red-500 text-sm">
                          {resetError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={resetLoading}
                        className="w-full bg-[#F59E0B] text-[#111827] py-3 rounded-lg font-semibold hover:bg-[#F59E0B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <span>{resetLoading ? 'Sending...' : 'Send Reset Link'}</span>
                        {!resetLoading && <ArrowRight className="w-5 h-5" />}
                      </button>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleBackToLogin}
                          className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          Back to sign in
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                  <p className="text-gray-400">Sign in to access your account</p>
                </div>

                <div className="bg-[#1F2937] rounded-2xl p-8 border border-gray-800">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="password" className="block text-sm font-medium">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => { setResetEmail(formData.email); setShowForgot(true); }}
                          className="text-xs text-gray-400 hover:text-[#F59E0B] transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="password"
                          type="password"
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 text-red-500 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#F59E0B] text-[#111827] py-3 rounded-lg font-semibold hover:bg-[#F59E0B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                      {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>
                  </form>

                  <div className="mt-6 text-center text-sm">
                    <span className="text-gray-400">Don't have an account? </span>
                    <Link to="/signup" className="text-[#F59E0B] hover:text-[#F59E0B]/80 font-semibold transition-colors">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
