/**
 * 🎊 RuangTamu - Wedding Check-in System
 * 404 Not Found Page
 * by PutuWistika
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  ArrowLeft,
  Search,
  MapPin,
  HelpCircle,
} from 'lucide-react';
import Button from '@components/ui/Button';
import { APP_NAME, ROUTES } from '@utils/constants';

const NotFound = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  // Float animation for 404 number
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Quick links
  const quickLinks = [
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Home',
      description: 'Back to homepage',
      onClick: () => navigate(ROUTES.HOME),
    },
    {
      icon: <ArrowLeft className="w-5 h-5" />,
      label: 'Go Back',
      description: 'Previous page',
      onClick: () => navigate(-1),
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: 'Login',
      description: 'Sign in to continue',
      onClick: () => navigate(ROUTES.LOGIN),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full text-center"
      >
        {/* 404 Illustration */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="mb-8"
        >
          {/* Large 404 Text */}
          <div className="relative inline-block">
            <motion.h1
              variants={itemVariants}
              className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-purple-500"
            >
              404
            </motion.h1>
            
            {/* Decorative Icons */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-8 -right-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl"
            >
              🤔
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-4 -left-8 w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center"
            >
              <Search className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. Don't
          worry, let's get you back on track! 🎯
        </motion.p>

        {/* Error Code */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium mb-8"
        >
          <MapPin className="w-4 h-4" />
          <span>Error Code: 404 - Not Found</span>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {quickLinks.map((link, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={link.onClick}
                className="card-hover p-4 text-left cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {link.label}
                    </h3>
                    <p className="text-xs text-gray-600">{link.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Home className="w-5 h-5" />}
            onClick={() => navigate(ROUTES.HOME)}
          >
            Back to Home
          </Button>

          <Button
            variant="outline"
            size="lg"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </motion.div>

        {/* Help Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Need Help?</span>
          </div>
          <p className="text-sm text-gray-600">
            If you believe this is an error, please{' '}
            <button
              onClick={() => {
                alert('Contact support at: support@ruangtamu.com');
              }}
              className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
            >
              contact support
            </button>{' '}
            or check our{' '}
            <button
              onClick={() => navigate(ROUTES.HOME)}
              className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
            >
              documentation
            </button>
            .
          </p>
        </motion.div>

        {/* Footer Note */}
        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-xs text-gray-500">
            {APP_NAME} - Wedding Guest Check-in System
          </p>
        </motion.div>
      </motion.div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default NotFound;