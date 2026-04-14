import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { supabase } from '../../../lib/supabase';
import { motion } from 'motion/react';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setDone(true);
    }
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">New Password</h1>
            <p className="text-gray-400">Choose a new password for your account</p>
          </div>

          <div className="bg-[#1F2937] rounded-2xl p-8 border border-gray-800">
            {done ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                <p className="font-semibold">Password updated</p>
                <p className="text-sm text-gray-400">Your password has been changed successfully.</p>
                <button
                  onClick={() => navigate('/login')}
                  className="mt-2 text-sm text-[#F59E0B] hover:text-[#F59E0B]/80 transition-colors"
                >
                  Sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="new-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                      placeholder="At least 8 characters"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                      placeholder="Repeat your password"
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
                  <span>{loading ? 'Saving...' : 'Set New Password'}</span>
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
