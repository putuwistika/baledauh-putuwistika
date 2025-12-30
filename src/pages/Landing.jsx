/**
 * 🏛️ Baleda - Digital Guest Reception
 * Landing Page - Rooted in Tradition, Built for Modern Events
 * Inspired by Balinese Bale Dauh - traditional guest welcoming space
 */

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Users,
  MessageSquare,
  QrCode,
  BarChart3,
  Send,
  Scan,
  Download,
  Clock,
  Shield,
  Sparkles,
  X,
  Calendar,
  Heart,
  Building2,
  Star,
  ChevronRight,
  FileCheck,
} from 'lucide-react';
import Button from '@components/ui/Button';
import { APP_NAME, ROUTES } from '@utils/constants';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar navigate={navigate} />

      {/* Hero Section */}
      <HeroSection navigate={navigate} />

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* Services Section - Dauhin, Panyanggra, Penampen */}
      <ServicesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Trust Section */}
      <TrustSection />

      {/* Final CTA */}
      <FinalCTASection navigate={navigate} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

/* ============================================
   NAVBAR
   ============================================ */
const Navbar = ({ navigate }) => (
  <motion.nav
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gold-100/50"
  >
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src="/images/logo.png"
            alt="Baleda Logo"
            className="h-10 w-auto"
          />
          <div className="hidden sm:block">
            <h2 className="text-xl font-bold gradient-text">{APP_NAME}</h2>
            <p className="text-xs text-green-700">Digital Guest Reception</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate(ROUTES.LOGIN)}
            className="gradient-baleda hover:gradient-baleda-hover text-white shadow-gold"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  </motion.nav>
);

/* ============================================
   HERO SECTION
   ============================================ */
const HeroSection = ({ navigate }) => (
  <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-br from-white via-gold-50/30 to-white overflow-hidden">
    {/* Background Pattern - Subtle Wayang Lines */}
    <div className="absolute inset-0 opacity-[0.03]">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMGwzMCAzMC0zMCAzMEwwIDMweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzI0OTFFIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-20" />
    </div>

    {/* Floating Gradient Orbs */}
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-gold-200/20 to-gold-100/10 rounded-full blur-3xl"
    />
    <motion.div
      animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-green-200/15 to-gold-100/10 rounded-full blur-3xl"
    />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-50 to-green-50 text-green-700 rounded-full text-sm font-semibold mb-8 shadow-lg shadow-gold/10 backdrop-blur-sm border border-gold-200/50"
        >
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>Inspired by Balinese Bale Dauh</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Digital Guest Reception,
          <br />
          <span className="gradient-text">Rooted in Tradition</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Manage invitations, RSVP, and guest check-in seamlessly — so every
          arrival feels welcomed, not rushed.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate(ROUTES.LOGIN)}
              className="shadow-xl shadow-baleda gradient-baleda hover:gradient-baleda-hover text-white"
            >
              Get a Demo
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              className="border-2 border-green-300 text-green-700 hover:bg-green-50"
            >
              See How It Works
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Visual - 3 Floating Cards */}
        <HeroCards />
      </div>
    </div>
  </section>
);

/* Hero Visual Cards */
const HeroCards = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="relative max-w-4xl mx-auto h-80 sm:h-96"
  >
    {/* Animated connecting line */}
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <motion.path
        d="M 150 100 Q 400 50, 650 150 T 850 250"
        stroke="url(#gradient-line)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <defs>
        <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E1A847" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#587a4a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#32491E" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>

    {/* Card 1 - Invitation Sent */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="absolute top-16 left-4 sm:left-20 bg-white rounded-2xl shadow-lg shadow-gold/20 p-6 border border-gold-200/50 w-48 sm:w-56 z-10"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl flex items-center justify-center mb-4">
        <Send className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-gray-900 mb-1">Invitation Sent</h3>
      <p className="text-sm text-gray-600">Via WhatsApp</p>
    </motion.div>

    {/* Card 2 - QR Code Ready */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="absolute top-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg shadow-green/20 p-6 border border-green-200/50 w-48 sm:w-56 z-20"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
        <QrCode className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-gray-900 mb-1">QR Code Ready</h3>
      <p className="text-sm text-gray-600">Unique per guest</p>
    </motion.div>

    {/* Card 3 - Guest Checked-in */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="absolute top-24 right-4 sm:right-20 bg-white rounded-2xl shadow-lg shadow-green/20 p-6 border border-gold-200/50 w-48 sm:w-56 z-10"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-green-500 rounded-xl flex items-center justify-center mb-4">
        <CheckCircle className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-gray-900 mb-1">Guest Checked-in</h3>
      <p className="text-sm text-gray-600">Real-time</p>
    </motion.div>
  </motion.div>
);

/* ============================================
   PROBLEM SECTION - Before Baleda
   ============================================ */
const ProblemSection = () => (
  <section className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left - Chaos */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            {/* Chaotic illustration */}
            <div className="relative bg-red-50/50 rounded-3xl p-8 border-2 border-red-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Before Baleda...
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Clock, text: 'Long check-in queues' },
                  { icon: FileCheck, text: 'Manual guest books' },
                  { icon: Users, text: 'Uncertain guest attendance' },
                  { icon: Shield, text: 'Gatecrashers & double entry' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-red-200/50"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <p className="text-gray-700 font-medium pt-2">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animated "chaos" indicator */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-red-400/20 rounded-full blur-xl"
            />
          </div>
        </motion.div>

        {/* Right - Order with Baleda */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative">
            {/* Calm Baleda UI */}
            <div className="relative bg-gradient-to-br from-gold-50 to-green-50 rounded-3xl p-8 border-2 border-gold-200/50">
              <h3 className="text-2xl font-bold gradient-text mb-6">
                With Baleda
              </h3>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle, text: 'Instant QR check-in' },
                  { icon: MessageSquare, text: 'Automated RSVP tracking' },
                  { icon: Users, text: 'Real-time guest count' },
                  { icon: Shield, text: 'Zero duplicates or gatecrashers' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gold-200/50 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gold-400 to-green-500 text-white rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <p className="text-gray-800 font-semibold pt-2">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animated "calm" indicator */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gold-300/30 rounded-full blur-xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ============================================
   SOLUTION SECTION - Welcome with Order
   ============================================ */
const SolutionSection = () => (
  <section className="py-20 sm:py-28 bg-white">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          A Better Way to Welcome Your Guests
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          Baleda transforms the way you receive guests — from the first
          invitation to the moment they arrive.
        </p>
      </motion.div>

      {/* Central Flow Diagram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto"
      >
        <FlowDiagram />
      </motion.div>
    </div>
  </section>
);

/* Simple Flow Diagram Preview */
const FlowDiagram = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
    {[
      { icon: MessageSquare, label: 'Invite' },
      { icon: CheckCircle, label: 'RSVP' },
      { icon: QrCode, label: 'QR Code' },
      { icon: Scan, label: 'Check-in' },
    ].map((step, idx) => (
      <React.Fragment key={idx}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.15, type: 'spring' }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gold-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-gold/30 mb-3">
            <step.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <p className="text-sm font-semibold text-gray-700">{step.label}</p>
        </motion.div>

        {idx < 3 && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 + 0.3 }}
            className="hidden sm:block w-12 h-0.5 bg-gradient-to-r from-gold-400 to-green-500"
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ============================================
   SERVICES SECTION - Dauhin, Panyanggra, Penampen
   ============================================ */
const ServicesSection = () => {
  const services = [
    {
      id: 'dauhin',
      icon: MessageSquare,
      title: 'Dauhin',
      subtitle: 'Invitation & RSVP',
      description:
        'Dauhin manages your invitations and RSVP through WhatsApp and web — automatically informing, reminding, and recording responses.',
      points: ['WhatsApp blast', 'Personalized RSVP', 'Real-time response tracking'],
      color: 'gold',
      gradient: 'from-gold-400 to-gold-500',
    },
    {
      id: 'panyanggra',
      icon: QrCode,
      title: 'Panyanggra',
      subtitle: 'Guest Check-in',
      description:
        'Panyanggra replaces your guest book with a smooth digital check-in experience using QR codes.',
      points: ['Unique QR code per guest', 'Mobile & desktop check-in', 'No queues, no duplicates'],
      color: 'green',
      gradient: 'from-green-500 to-green-600',
    },
    {
      id: 'penampen',
      icon: BarChart3,
      title: 'Penampen',
      subtitle: 'Report & Insight',
      description:
        'Penampen gives you a clear summary of your event — who came, when they arrived, and how the flow performed.',
      points: ['Live guest count', 'Downloadable reports (Excel)', 'Arrival time distribution'],
      color: 'red',
      gradient: 'from-gold-400 to-green-500',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-gold-50/30 via-white to-green-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-100 to-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>The Baleda System</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Three Pillars of Hospitality
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            From invitation to insight — a complete guest management system
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* Service Card Component */
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-lg border border-gold-200/50 p-8 hover:shadow-xl transition-all duration-300"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
      >
        <service.icon className="w-8 h-8 text-white" />
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-bold gradient-text mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-gray-600 font-semibold mb-4">
        {service.subtitle}
      </p>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Key Points */}
      <div className="space-y-3">
        {service.points.map((point, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2 + idx * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
            <p className="text-sm text-gray-700 font-medium">{point}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ============================================
   HOW IT WORKS SECTION - Animated Flow Line
   ============================================ */
const HowItWorksSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const steps = [
    {
      title: 'Dauhin',
      subtitle: 'Upload your guest list',
      description: 'We send invitations & collect RSVP automatically',
      icon: Send,
    },
    {
      title: 'QR Code Issued',
      subtitle: 'Each confirmed guest receives a unique QR code',
      description: 'Secure and personalized for every invitation',
      icon: QrCode,
    },
    {
      title: 'Panyanggra',
      subtitle: 'Guests scan QR code on arrival',
      description: 'Instant check-in with pulse animation',
      icon: Scan,
    },
    {
      title: 'Penampen',
      subtitle: 'Monitor attendance and download reports',
      description: 'Line settles into chart shape',
      icon: Download,
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A seamless flow from invitation to insight
          </p>
        </motion.div>

        {/* Vertical Flow Line with Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated Line */}
          <svg
            className="absolute left-8 sm:left-1/2 top-0 h-full w-1 sm:-ml-0.5 pointer-events-none hidden sm:block"
            style={{ zIndex: 0 }}
          >
            <motion.line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="url(#vertical-gradient)"
              strokeWidth="3"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="vertical-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E1A847" />
                <stop offset="50%" stopColor="#587a4a" />
                <stop offset="100%" stopColor="#32491E" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, idx) => (
              <StepItem key={idx} step={step} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* Step Item Component */
const StepItem = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${
        isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
      } gap-8`}
    >
      {/* Icon Circle */}
      <motion.div
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.6 }}
        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gold-400 to-green-500 rounded-full flex items-center justify-center shadow-xl shadow-gold/30 z-10 ${
          isEven ? '' : 'sm:order-2'
        }`}
      >
        <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </motion.div>

      {/* Content Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`flex-1 bg-gradient-to-br from-white to-gold-50/30 rounded-2xl shadow-lg border border-gold-200/50 p-6 ${
          isEven ? 'sm:text-left' : 'sm:text-right'
        }`}
      >
        <h3 className="text-2xl font-bold gradient-text mb-2">{step.title}</h3>
        <p className="text-sm font-semibold text-green-700 mb-3">
          {step.subtitle}
        </p>
        <p className="text-gray-700 leading-relaxed">{step.description}</p>
      </motion.div>
    </motion.div>
  );
};

/* ============================================
   USE CASES SECTION - Who Is Baleda For
   ============================================ */
const UseCasesSection = () => {
  const useCases = [
    {
      icon: Heart,
      title: 'Weddings & Private Events',
      description: 'Traditional ceremonies with modern guest management',
    },
    {
      icon: Building2,
      title: 'Corporate Gatherings',
      description: 'Professional events with seamless check-in',
    },
    {
      icon: Calendar,
      title: 'Religious & Cultural Ceremonies',
      description: 'Respectful handling of sacred events',
    },
    {
      icon: Star,
      title: 'VIP & Invitation-only Events',
      description: 'Exclusive events with zero gatecrashers',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Who Is Baleda For?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Built for events that value order and hospitality
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-md border border-gold-200/50 p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold-400 to-green-500 rounded-2xl mb-4 shadow-lg"
              >
                <useCase.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {useCase.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================
   TRUST SECTION - Calm Authority
   ============================================ */
const TrustSection = () => (
  <section className="py-20 sm:py-28 bg-gradient-to-br from-green-50/50 via-white to-gold-50/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-100 to-green-100 text-green-700 rounded-full text-sm font-semibold mb-8">
          <Shield className="w-4 h-4 text-gold-400" />
          <span>Trusted by Event Organizers</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Designed for events that value
          <br />
          <span className="gradient-text">order and hospitality</span>
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          Baleda brings traditional Balinese hospitality principles into the
          digital age — welcoming every guest with dignity while maintaining
          perfect order.
        </p>

        {/* Trust Indicators */}
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { icon: Shield, label: 'Secure & Private' },
            { icon: CheckCircle, label: '100% Accurate' },
            { icon: Users, label: 'Proven Reliable' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-900">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ============================================
   FINAL CTA SECTION - Close the Gate Gracefully
   ============================================ */
const FinalCTASection = ({ navigate }) => (
  <section className="relative py-20 sm:py-28 overflow-hidden">
    {/* Background with subtle Wayang pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-gold-400 via-green-600 to-green-700" />
    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMGwzMCAzMC0zMCAzMEwwIDMweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]" />

    {/* Floating orbs */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute bottom-10 right-10 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl"
    />

    <div className="container mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
          Welcome Your Guests,
          <br />
          Without the Chaos
        </h2>

        <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">
          Experience the perfect blend of traditional hospitality and modern
          technology.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button
            variant="secondary"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={() => navigate(ROUTES.LOGIN)}
            className="bg-white text-green-700 hover:bg-gold-50 shadow-2xl px-8 py-4 text-lg font-bold"
          >
            Request Demo
          </Button>
        </motion.div>

        {/* Small benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6 flex-wrap text-white/90"
        >
          {['No setup fees', 'Fast implementation', 'Dedicated support'].map(
            (text, idx) => (
              <span key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4" />
                {text}
              </span>
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ============================================
   FOOTER
   ============================================ */
const Footer = () => (
  <footer className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-400 relative overflow-hidden">
    {/* Top border gradient */}
    <div className="absolute top-0 left-0 right-0 h-1 gradient-baleda" />

    <div className="container mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold gradient-text mb-2">{APP_NAME}</h3>
          <p className="text-sm text-gray-500">Digital Guest Reception</p>
        </div>

        <p className="text-sm mb-4">
          © 2025 {APP_NAME} • Rooted in Tradition, Built for Modern Events
        </p>

        <p className="text-xs opacity-75 mb-6">
          Inspired by Balinese Bale Dauh — traditional guest welcoming space
        </p>

        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse delay-200" />
        </div>
      </motion.div>
    </div>
  </footer>
);

export default Landing;
