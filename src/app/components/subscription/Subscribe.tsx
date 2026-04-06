import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (replace with your actual publishable key)
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 9.99,
    interval: 'month',
    priceId: 'price_monthly_demo', // Replace with actual Stripe Price ID
    features: [
      'Unlimited run tracking',
      'Multiple horses & arenas',
      'Performance analytics',
      'Photo & video uploads',
      'PR tracking & badges',
      'Payout calculator',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    price: 99.99,
    interval: 'year',
    priceId: 'price_annual_demo', // Replace with actual Stripe Price ID
    popular: true,
    savings: 'Save $20',
    features: [
      'Everything in Monthly',
      '2 months free',
      'Priority support',
      'Early access to features',
      'Export your data',
      'Advanced statistics',
    ],
  },
];

export default function Subscribe() {
  const navigate = useNavigate();
  const { user, updateSubscription } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/signup');
      return;
    }

    setLoading(true);

    try {
      // In production, this would call your backend to create a Checkout Session
      // For demo purposes, we'll simulate the purchase
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate successful subscription
      updateSubscription('active', selectedPlan);
      
      // Navigate to app
      navigate('/app');
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to process subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStripeCheckout = async () => {
    // This is how you would integrate real Stripe Checkout
    // Uncomment and modify when ready for production
    
    /*
    const stripe = await stripePromise;
    
    // Call your backend to create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: plans.find(p => p.id === selectedPlan)?.priceId,
        userId: user?.id,
      }),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      alert(result.error.message);
    }
    */
    
    // For now, use the demo flow
    handleSubscribe();
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-0 text-2xl font-bold">
            <span className="text-white">RODEO</span>
            <span className="text-[#F59E0B]">PRO</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-gray-400 text-lg">
              {user ? `Welcome ${user.name}! ` : ''}Select a subscription to unlock all features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedPlan(plan.id as 'monthly' | 'annual')}
                className={`relative bg-[#1F2937] rounded-2xl p-8 border-2 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-[#F59E0B] shadow-lg shadow-[#F59E0B]/20'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F59E0B] to-[#0D9488] text-[#111827] px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                    {plan.savings && (
                      <span className="text-[#0D9488] text-sm font-semibold">
                        {plan.savings}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">${plan.price}</div>
                    <div className="text-gray-400 text-sm">per {plan.interval}</div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#0D9488] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`w-6 h-6 rounded-full border-2 mx-auto ${
                    selectedPlan === plan.id
                      ? 'bg-[#F59E0B] border-[#F59E0B]'
                      : 'border-gray-600'
                  } flex items-center justify-center`}
                >
                  {selectedPlan === plan.id && (
                    <Check className="w-4 h-4 text-[#111827]" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <button
              onClick={handleStripeCheckout}
              disabled={loading}
              className="bg-[#F59E0B] text-[#111827] px-12 py-4 rounded-lg font-semibold hover:bg-[#F59E0B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-3 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>

            <p className="text-gray-400 text-sm mt-6">
              Secure payment powered by Stripe. Cancel anytime.
            </p>
          </motion.div>

          {/* Security Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex items-center justify-center space-x-8 text-gray-500 text-sm"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
              </svg>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              <span>Cancel Anytime</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}