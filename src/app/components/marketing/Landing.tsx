import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Clock,
  Star,
  MapPin,
  TrendingUp,
  Camera,
  DollarSign,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// Animated section wrapper
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Landing() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#111827]/80 backdrop-blur-lg shadow-lg" : "bg-[#111827]"
        } border-b border-[#374151]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/images/rodeoProWhite.svg" alt="RodeoPro" className="h-8" />
            </Link>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-[#9CA3AF] hover:text-white transition-colors"
              >
                Pricing
              </button>
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-[#F59E0B] text-[#111827] px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-[#F59E0B]/90 transition-colors text-sm sm:text-base"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[#9CA3AF] hover:text-white transition-colors hidden sm:block"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#F59E0B] text-[#111827] px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-[#F59E0B]/90 transition-colors text-sm sm:text-base"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760041870271-496f3d0d46ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJyZWwlMjByYWNpbmclMjBzcGVlZCUyMGFjdGlvbnxlbnwxfHx8fDE3NzUxNDUzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Barrel Racing Hero"
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/90 via-[#111827]/80 to-[#1F2937]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F59E0B]/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Track Every Run.
                <br />
                Own Every Record.
              </h1>
              <p className="text-lg sm:text-xl text-[#9CA3AF] mb-8 max-w-2xl">
                RodeoPro gives barrel racers a professional-grade platform to log runs, analyze
                performance, and track earnings! All from your phone!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="https://apps.apple.com/app/rodeoproapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-black/90 transition-colors"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-bold -mt-1">App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.rodeopro.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-black/90 transition-colors"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-bold -mt-1">Google Play</div>
                  </div>
                </a>
              </div>

              <p className="text-sm text-[#9CA3AF]">
                Flexible plans · Cancel anytime
              </p>
            </motion.div>

            {/* Right: Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-[320px] h-[640px] bg-[#1F2937] rounded-[40px] border-8 border-[#111827] shadow-2xl overflow-hidden">
                {/* Phone content - mock runs screen */}
                <div className="bg-[#111827] h-full p-4 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Runs</h2>
                    <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#111827] font-bold">
                      +
                    </div>
                  </div>

                  {/* Run cards */}
                  <div className="space-y-3">
                    {[
                      { time: "13.842", horse: "Whiskey", arena: "Rodeo Austin", pr: true },
                      { time: "14.101", horse: "Rio", arena: "Fort Worth", pr: false },
                      { time: "14.276", horse: "Whiskey", arena: "Dallas Arena", pr: false },
                    ].map((run, i) => (
                      <div
                        key={i}
                        className="bg-[#1F2937] border border-[#374151] rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-3xl font-bold text-[#F59E0B]">
                            {run.time}s
                          </span>
                          {run.pr && (
                            <span className="bg-[#10B981] text-white text-xs px-2 py-1 rounded font-bold">
                              PR
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-[#9CA3AF]">
                          <div className="font-semibold text-white">{run.horse}</div>
                          <div>{run.arena}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <AnimatedSection>
        <section className="py-12 bg-[#1F2937] border-y border-[#374151]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#F59E0B] mb-2">2,400+</div>
                <div className="text-sm text-white">Runs Logged</div>
              </div>
              <div className="sm:border-l sm:border-r border-[#374151]">
                <div className="text-4xl font-bold text-[#F59E0B] mb-2">500+</div>
                <div className="text-sm text-white">Horses Tracked</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#F59E0B] mb-2">12</div>
                <div className="text-sm text-white">States</div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything You Need to Compete at Your Best
              </h2>
              <p className="text-lg text-[#9CA3AF]">
                Purpose-built tools for serious barrel racers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: "Run Logging",
                  description:
                    "Log every run with time, barrel status, payout, and media in seconds.",
                },
                {
                  icon: Star,
                  title: "Horse Profiles",
                  description:
                    "Track each horse's personal record, average time, and performance history across arenas.",
                },
                {
                  icon: MapPin,
                  title: "Arena Tracking",
                  description:
                    "See your record time and run count at every arena you've competed at.",
                },
                {
                  icon: TrendingUp,
                  title: "Performance Analytics",
                  description:
                    "Visualize trends and compare horses side-by-side to make smarter training decisions.",
                },
                {
                  icon: Camera,
                  title: "Media Gallery",
                  description:
                    "Attach photos and videos to every run to review your form and share your best moments.",
                },
                {
                  icon: DollarSign,
                  title: "Earnings Tracker",
                  description:
                    "Monitor competition payouts over time to see which horses and arenas are most profitable.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#1F2937] border border-[#374151] rounded-xl p-6 hover:border-[#F59E0B]/50 transition-colors"
                >
                  <feature.icon className="w-10 h-10 text-[#F59E0B] mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-[#9CA3AF]">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* See It In Action Section */}
      <AnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F2937] relative overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1723161134033-ece937266ae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJyZWwlMjByYWNpbmclMjByb2Rlb3xlbnwxfHx8fDE3NzUxNDUxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Barrel Racing Action"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937] via-[#1F2937]/80 to-[#1F2937]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">See It In Action</h2>
              <p className="text-lg text-[#9CA3AF]">
                From training to competition, RodeoPro is built for the arena.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-xl aspect-[4/5]"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1741665157800-6d64566c55f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2RlbyUyMGNvbXBldGl0aW9uJTIwYWN0aW9ufGVufDF8fHx8MTc3NTE0NTExOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Competition Action"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">Competition Ready</h3>
                  <p className="text-sm text-[#9CA3AF]">
                    Log times and track performance at every event
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-xl aspect-[4/5]"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1657554987210-59830c21a578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHJpZGluZyUyMGFyZW5hfGVufDF8fHx8MTc3NTE0NTExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Arena Training"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">Training Insights</h3>
                  <p className="text-sm text-[#9CA3AF]">
                    Analyze patterns and improve with data
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative overflow-hidden rounded-xl aspect-[4/5]"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1694941950578-3364241bf12f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMGNsb3NlJTIwdXAlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzUxMzMxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Horse Profile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">Know Your Horses</h3>
                  <p className="text-sm text-[#9CA3AF]">
                    Detailed profiles for every horse in your stable
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection>
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F2937]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Up and Running in Minutes</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  step: "1",
                  title: "Add Your Horses & Arenas",
                  description:
                    "Build your stable and save the arenas where you compete. Takes less than 2 minutes.",
                },
                {
                  step: "2",
                  title: "Log Your Runs",
                  description:
                    "After each run, enter your time, note any knocked barrels, add photos or video, and record your payout.",
                },
                {
                  step: "3",
                  title: "Track Your Progress",
                  description:
                    "Watch your personal records, clean run streaks, and earnings grow over time.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative text-center"
                >
                  {/* Connecting line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-[#F59E0B]/30" />
                  )}

                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#F59E0B] flex items-center justify-center text-4xl font-bold text-[#111827]">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-[#9CA3AF]">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/signup"
                className="inline-block bg-[#F59E0B] text-[#111827] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#F59E0B]/90 transition-colors"
              >
                View Plans
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection>
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-[#9CA3AF] mb-8">
                One plan. Everything included. No hidden fees.
              </p>


            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Monthly Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#1F2937] border border-[#374151] rounded-xl p-8"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-4">Monthly</h3>
                  <div className="text-4xl font-bold text-[#F59E0B] mb-2">
                    $9.99<span className="text-lg text-[#9CA3AF]">/month</span>
                  </div>
                  <p className="text-sm text-[#9CA3AF]">Billed monthly, cancel anytime.</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited run logging",
                    "Unlimited horses & arenas",
                    "Performance analytics & charts",
                    "Photo & video attachments",
                    "Earnings tracking",
                    "Personal record tracking",
                    "Clean run streaks",
                    "Dark & light mode",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <span className="text-[#9CA3AF]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={user ? "/subscribe" : "/signup"}
                  className="block w-full bg-[#0D9488] text-white py-3 rounded-lg font-semibold text-center hover:bg-[#0D9488]/90 transition-colors"
                >
                  {user ? "Subscribe Monthly" : "Get Started"}
                </Link>
              </motion.div>

              {/* Annual Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#1F2937] border-2 border-[#F59E0B] rounded-xl p-8 relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-[#111827] px-4 py-1 rounded-full text-sm font-bold">
                  Best Value
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-4">Annual</h3>
                  <div className="text-4xl font-bold text-[#F59E0B] mb-2">
                    $6.99<span className="text-lg text-[#9CA3AF]">/month</span>
                  </div>
                  <p className="text-sm text-[#9CA3AF]">Billed as $83.88 / year.</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited run logging",
                    "Unlimited horses & arenas",
                    "Performance analytics & charts",
                    "Photo & video attachments",
                    "Earnings tracking",
                    "Personal record tracking",
                    "Clean run streaks",
                    "Dark & light mode",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <span className="text-[#9CA3AF]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={user ? "/subscribe" : "/signup"}
                  className="block w-full bg-[#F59E0B] text-[#111827] py-3 rounded-lg font-semibold text-center hover:bg-[#F59E0B]/90 transition-colors"
                >
                  {user ? "Subscribe Annually" : "Get Started"}
                </Link>
              </motion.div>
            </div>

            <p className="text-center text-sm text-[#9CA3AF] mt-8 max-w-2xl mx-auto">
              Payments processed securely by Stripe. Your subscription can be cancelled at any time
              from your account settings.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F2937]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Built by Barrel Racers, for Barrel Racers
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "I used to keep notes in a paper notebook. RodeoPro replaced all of that and gives me stats I never could have tracked by hand.",
                  name: "Sarah M.",
                  location: "Texas",
                },
                {
                  quote:
                    "Being able to see my mare's times at each arena separately changed how I pick which events to enter.",
                  name: "Kayla R.",
                  location: "Oklahoma",
                },
                {
                  quote:
                    "The payout tracker alone is worth it. I finally know which competitions are actually worth the entry fee.",
                  name: "Brittany T.",
                  location: "Nevada",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#111827] border-l-4 border-[#F59E0B] rounded-lg p-6"
                >
                  <p className="text-[#9CA3AF] mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-[#9CA3AF]">{testimonial.location}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Final CTA Banner */}
      <AnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[#F59E0B]/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/20 rounded-full blur-[150px]" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Take Your Performance to the Next Level?
            </h2>
            <p className="text-lg text-[#9CA3AF] mb-8">
              Join hundreds of barrel racers already using RodeoPro.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="https://apps.apple.com/app/rodeoapro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-black/90 transition-colors"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-bold -mt-1">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.rodeoapro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-black/90 transition-colors"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-lg font-bold -mt-1">Google Play</div>
                </div>
              </a>
            </div>

            <div>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-[#F59E0B] hover:text-[#F59E0B]/80 transition-colors text-sm font-semibold"
              >
                View Pricing ↑
              </button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-[#0F1117] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#374151]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Left: Branding */}
            <div>
            <div className="flex items-center mb-3">
              <img src="/images/rodeoProWhite.svg" alt="RodeoPro" className="h-7" />
              </div>
              <p className="text-sm text-[#9CA3AF] mb-4">
                Track Every Run. Own Every Record.
              </p>
              <p className="text-xs text-[#9CA3AF]">
                © 2026 RodeoPro. All rights reserved.
              </p>
            </div>

            {/* Center: Links */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("features")}
                className="text-[#9CA3AF] hover:text-white transition-colors text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-[#9CA3AF] hover:text-white transition-colors text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-[#9CA3AF] hover:text-white transition-colors text-left"
              >
                Pricing
              </button>
              {user ? (
                <Link to="/dashboard" className="text-[#9CA3AF] hover:text-white transition-colors">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" className="text-[#9CA3AF] hover:text-white transition-colors">
                  Sign In
                </Link>
              )}
            </div>

            {/* Right: Contact */}
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <a
                href="mailto:support@rodeoproapp.com"
                className="text-[#9CA3AF] hover:text-white transition-colors block mb-2"
              >
                support@rodeoproapp.com
              </a>
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/privacy" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-[#9CA3AF] hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
