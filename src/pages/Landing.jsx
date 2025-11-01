/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Landing Page
 * by PutuWistika
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';
import Button from '@components/ui/Button';
import {
  APP_NAME,
  APP_TAGLINE,
  ROUTES,
  LOTTIE_ANIMATIONS,
  ANIMATION_VARIANTS,
} from '@utils/constants';

const Landing = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Features data
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Quick QR scanning and instant guest verification',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Multi-Role Support',
      description: 'Separate dashboards for Admin and Runner roles',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Real-time Queue',
      description: 'Live updates on guest queue and check-in status',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Reliable',
      description: 'Built with security and data integrity in mind',
    },
  ];

  // Benefits data
  const benefits = [
    'Streamlined guest check-in process',
    'Eliminate long waiting queues',
    'Track gift contributions easily',
    'Professional guest management',
    'Real-time coordination between team',
    'Detailed analytics and reporting',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>Modern Wedding Management</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
              >
                Welcome to{' '}
                <span className="gradient-text">{APP_NAME}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-gray-600 mb-6"
              >
                Professional wedding guest check-in system with real-time queue
                management and seamless coordination.
              </motion.p>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-sm text-gray-500 mb-8"
              >
                {APP_TAGLINE}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="shadow-lg shadow-primary-500/30"
                >
                  Get Started
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  Learn More
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200"
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Accurate</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Real-time
                  </div>
                  <div className="text-sm text-gray-600">Updates</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Easy
                  </div>
                  <div className="text-sm text-gray-600">To Use</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Lottie Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative"
            >
              <div className="relative z-10">
                <DotLottieReact
                  src={LOTTIE_ANIMATIONS.HERO}
                  loop
                  autoplay
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>

              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your wedding guests efficiently and
              professionally.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-600 rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary-500 to-purple-500 rounded-3xl p-8 text-white">
                <div className="flex flex-col justify-center h-full">
                  <Users className="w-20 h-20 mb-6 opacity-90" />
                  <h3 className="text-3xl font-bold mb-4">
                    Manage Hundreds of Guests
                  </h3>
                  <p className="text-lg opacity-90">
                    Handle large wedding events with ease using our intuitive
                    queue management system.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-yellow-400 rounded-3xl -z-10" />
            </motion.div>

            {/* Right - Benefits List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose {APP_NAME}?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our system is designed specifically for modern weddings, making
                guest management a breeze.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join us and experience the future of wedding guest management.
              Simple, fast, and professional.
            </p>

            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate(ROUTES.LOGIN)}
              className="shadow-xl"
            >
              Start Managing Guests
            </Button>

            {/* Small Note */}
            <p className="text-sm opacity-75 mt-6">
              No credit card required • Free trial available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 {APP_NAME} • {APP_TAGLINE}
          </p>
          <p className="text-xs mt-2 opacity-75">
            Modern Wedding Guest Check-in System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;