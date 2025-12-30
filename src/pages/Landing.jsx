/**
 * 🌺 Baleda - Digital Guest Reception Platform
 * Landing Page - Complete Redesign
 * Rooted in Balinese tradition, powered by modern technology
 */

import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Users,
  ClipboardList,
  MessageSquare,
  QrCode,
  BarChart3,
  Calendar,
  Building2,
  Heart,
  Church,
  Award,
  Shield,
  AlertCircle,
  Clock,
  UserX,
} from 'lucide-react';
import Button from '@components/ui/Button';
import { APP_NAME, APP_TAGLINE, ROUTES } from '@utils/constants';

const Landing = () => {
  const navigate = useNavigate();
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: false, amount: 0.3 });

  // Smooth scroll animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-pampas-50">
      {/* ============================================ */}
      {/* NAVBAR */}
      {/* ============================================ */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-pampas-200 shadow-sm"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/images/logo.png"
                alt={`${APP_NAME} Logo`}
                className="h-10 w-auto"
              />
              <div className="hidden sm:block">
                <h2 className="text-xl font-bold text-green-700">
                  {APP_NAME}
                </h2>
                <p className="text-xs text-green-600">{APP_TAGLINE}</p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate(ROUTES.LOGIN)}
                className="bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white transition-all duration-300 shadow-md"
              >
                Login
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <svg width="100%" height="100%">
          <pattern id="wayang-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 10 L60 30 L50 50 L40 30 Z" fill="currentColor" className="text-green-700" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#wayang-pattern)" />
        </svg>
      </div>

      {/* ============================================ */}
      {/* 1️⃣ HERO SECTION */}
      {/* ============================================ */}
      <section className="relative overflow-hidden pt-28 pb-20 bg-gradient-to-b from-white to-pampas-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left relative z-10"
            >
              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-green-700 mb-6 leading-tight"
              >
                Digital Guest Reception,{' '}
                <span className="text-gold-400">Rooted in Tradition</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed"
              >
                Manage invitations, RSVP, and guest check-in seamlessly — so every arrival feels <span className="font-semibold text-green-700">welcomed, not rushed</span>.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white shadow-xl"
                >
                  Get a Demo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-green-600 text-green-700 hover:bg-green-50"
                >
                  See How It Works
                </Button>
              </motion.div>
            </motion.div>

            {/* Right - Floating Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative h-[500px]"
            >
              {/* Card 1 - Invitation Sent */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 left-0 bg-white rounded-2xl shadow-xl p-6 border-2 border-gold-200 w-64"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Step 1</div>
                    <div className="font-bold text-green-700">Invitation Sent</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">150 guests notified via WhatsApp</div>
              </motion.div>

              {/* Connecting Line 1-2 */}
              <motion.svg
                className="absolute top-32 left-32 w-32 h-32 pointer-events-none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                <motion.path
                  d="M 0 0 Q 50 50, 100 100"
                  stroke="#E1A847"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </motion.svg>

              {/* Card 2 - QR Code Ready */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-40 right-0 bg-white rounded-2xl shadow-xl p-6 border-2 border-green-200 w-64"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Step 2</div>
                    <div className="font-bold text-green-700">QR Code Ready</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">142 unique codes generated</div>
              </motion.div>

              {/* Connecting Line 2-3 */}
              <motion.svg
                className="absolute bottom-40 right-24 w-32 h-32 pointer-events-none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, delay: 1.3 }}
              >
                <motion.path
                  d="M 100 0 Q 50 50, 0 100"
                  stroke="#32491E"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </motion.svg>

              {/* Card 3 - Guest Checked-in */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-0 left-12 bg-white rounded-2xl shadow-xl p-6 border-2 border-gold-200 w-64"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Step 3</div>
                    <div className="font-bold text-green-700">Guest Checked-in</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">No queue, no confusion</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2️⃣ PROBLEM SECTION - Before Baleda */}
      {/* ============================================ */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pampas-100 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-red-700 mb-4">
              Before Baleda
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Traditional guest management creates chaos at the gate
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left - Problems */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { icon: Clock, text: 'Long check-in queues', color: 'red' },
                { icon: ClipboardList, text: 'Manual guest books', color: 'red' },
                { icon: UserX, text: 'Uncertain guest attendance', color: 'red' },
                { icon: AlertCircle, text: 'Gatecrashers & double entry', color: 'red' },
              ].map((problem, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-red-200 shadow-md"
                >
                  <div className={`w-12 h-12 bg-red-100 rounded-full flex items-center justify-center`}>
                    <problem.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{problem.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Right - Visual chaos → order transition */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-md h-80 bg-gradient-to-br from-red-100 to-pampas-200 rounded-3xl flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-center"
                >
                  <AlertCircle className="w-32 h-32 text-red-400 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-red-600">Chaos at the Gate</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 3️⃣ SOLUTION SECTION */}
      {/* ============================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-green-700 mb-4">
              A Better Way to Welcome Your Guests
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Baleda transforms the way you receive guests — from the first invitation to the moment they arrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4️⃣ SERVICES / FEATURES */}
      {/* ============================================ */}
      <section className="py-20 bg-gradient-to-b from-pampas-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-green-700 mb-4">
              The Baleda System
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Dauhin */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-xl border-2 border-gold-200 p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-200 to-transparent rounded-bl-full opacity-50" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gold-600 mb-2">Dauhin</h3>
                <p className="text-sm text-gray-500 mb-4">Invitation & RSVP</p>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Dauhin manages your invitations and RSVP through WhatsApp and web — automatically informing, reminding, and recording responses.
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span className="text-gray-600">WhatsApp blast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span className="text-gray-600">Personalized RSVP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span className="text-gray-600">Real-time response tracking</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Panyanggra */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-xl border-2 border-green-200 p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200 to-transparent rounded-bl-full opacity-50" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <QrCode className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-green-700 mb-2">Panyanggra</h3>
                <p className="text-sm text-gray-500 mb-4">Guest Check-in</p>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Panyanggra replaces your guest book with a smooth digital check-in experience using QR codes.
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">Unique QR code per guest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">Mobile & desktop check-in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">No queues, no duplicates</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Penampen */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-xl border-2 border-gold-200 p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200 to-transparent rounded-bl-full opacity-30" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-red-700 mb-2">Penampen</h3>
                <p className="text-sm text-gray-500 mb-4">Report & Insight</p>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Penampen gives you a clear summary of your event — who came, when they arrived, and how the flow performed.
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600" />
                    <span className="text-gray-600">Live guest count</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600" />
                    <span className="text-gray-600">Downloadable reports (Excel)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-600" />
                    <span className="text-gray-600">Arrival time distribution</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 5️⃣ HOW IT WORKS - Animated Flow Line */}
      {/* ============================================ */}
      <section id="how-it-works" ref={flowRef} className="py-24 bg-gradient-to-b from-white to-pampas-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-green-700 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              A seamless flow from invitation to insight
            </p>
          </motion.div>

          {/* Flow Steps */}
          <div className="max-w-5xl mx-auto relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-400 via-green-600 to-red-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={flowInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                >
                  <MessageSquare className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-green-700 mb-2">Dauhin</h3>
                <p className="text-sm text-gray-600 mb-4">Upload your guest list</p>
                <p className="text-xs text-gray-500">We send invitations & collect RSVP automatically</p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                >
                  <QrCode className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-green-700 mb-2">QR Code Issued</h3>
                <p className="text-sm text-gray-600 mb-4">Each guest receives unique code</p>
                <p className="text-xs text-gray-500">Sent via WhatsApp with event details</p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-green-700 mb-2">Panyanggra</h3>
                <p className="text-sm text-gray-600 mb-4">Guests scan on arrival</p>
                <p className="text-xs text-gray-500">Instant check-in, no waiting</p>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                >
                  <BarChart3 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-green-700 mb-2">Penampen</h3>
                <p className="text-sm text-gray-600 mb-4">Monitor & download reports</p>
                <p className="text-xs text-gray-500">Real-time insights, Excel export</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 6️⃣ USE CASES */}
      {/* ============================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-green-700 mb-4">
              Who Is Baleda For?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Weddings & Private Events', color: 'from-red-500 to-pink-500' },
              { icon: Building2, title: 'Corporate Gatherings', color: 'from-blue-500 to-cyan-500' },
              { icon: Church, title: 'Religious & Cultural Ceremonies', color: 'from-green-500 to-emerald-500' },
              { icon: Award, title: 'VIP & Invitation-only Events', color: 'from-gold-400 to-gold-600' },
            ].map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-pampas-50 to-white rounded-2xl p-8 border-2 border-pampas-200 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${useCase.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-green-700">{useCase.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 7️⃣ TRUST SECTION */}
      {/* ============================================ */}
      <section className="py-20 bg-gradient-to-br from-pampas-100 to-pampas-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Shield className="w-20 h-20 text-green-700 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6">
              Designed for Events That Value Order and Hospitality
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Baleda brings the calm dignity of traditional Balinese hospitality into the digital age. Every guest feels seen, every arrival feels intentional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 8️⃣ FINAL CTA */}
      {/* ============================================ */}
      <section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-gold-500 text-white relative overflow-hidden">
        {/* Subtle Wayang pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="wayang-final" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 10 L50 30 L40 50 L30 30 Z" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#wayang-final)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Welcome Your Guests,<br />Without the Chaos
            </h2>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-8"
            >
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => navigate(ROUTES.LOGIN)}
                className="shadow-2xl bg-white text-green-700 hover:bg-pampas-50 px-10 py-5 text-xl font-bold transition-all duration-300"
              >
                Request Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="py-10 bg-green-900 text-green-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-green-500 to-gold-400" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gold-400">
                {APP_NAME}
              </h3>
            </div>
            <p className="text-sm mb-3">
              © 2025 {APP_NAME} • {APP_TAGLINE}
            </p>
            <p className="text-xs opacity-75">
              Rooted in tradition, powered by technology
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
