/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Guest QR Code Component - Generate QR from UID (UPDATED!)
 * by PutuWistika
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, AlertCircle, Check, ExternalLink } from 'lucide-react';
import Button from '@components/ui/Button';
import Loading from '@components/ui/Loading';
import { generateGuestQRCode, getGuestCardURL } from '@utils/helpers';
import { toast } from 'sonner';

/**
 * Guest QR Code Component
 * Generates and displays QR code from guest UID
 * QR code contains link to guest card page: /guest/:uid
 * 
 * @param {string} guestUID - Guest UID (required)
 * @param {string} guestName - Guest name for display and download filename
 * @param {string} size - Display size (sm|md|lg)
 * @param {boolean} showDownload - Show download button
 * @param {boolean} showLink - Show open card link button
 * @param {string} className - Additional CSS classes
 */
const GuestQRCode = ({
  guestUID,
  guestName,
  size = 'lg', // sm | md | lg
  showDownload = true,
  showLink = true,
  className = '',
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Validation
  if (!guestUID) {
    console.error('GuestQRCode: guestUID is required');
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-sm text-red-700">UID is required to generate QR code</p>
      </div>
    );
  }

  // Generate QR code URL from UID using helper
  const qrCodeUrl = generateGuestQRCode(guestUID, size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium');
  
  // Get guest card URL
  const guestCardUrl = getGuestCardURL(guestUID);

  // Size mapping for component display
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  // Reset states when UID changes or retry
  useEffect(() => {
    setLoading(true);
    setError(false);
    setImageLoaded(false);
  }, [guestUID, retryCount]);

  // Handle image load success
  const handleImageLoad = () => {
    setLoading(false);
    setImageLoaded(true);
    setError(false);
  };

  // Handle image load error
  const handleImageError = () => {
    setLoading(false);
    setError(true);
    console.error('Failed to load QR code for UID:', guestUID);
    toast.error('Failed to load QR code');
  };

  // Retry loading QR code
  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    toast.info('Retrying...');
  };

  // Download QR code
  const handleDownload = async () => {
    try {
      toast.loading('Downloading QR code...');
      
      const response = await fetch(qrCodeUrl);
      if (!response.ok) throw new Error('Failed to fetch QR code');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename
      const sanitizedName = guestName ? guestName.replace(/\s+/g, '-') : 'guest';
      link.download = `qr-${guestUID}-${sanitizedName}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      
      toast.dismiss();
      toast.success('QR Code downloaded successfully!');
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.dismiss();
      toast.error('Failed to download QR code');
    }
  };

  // Open guest card in new tab
  const handleOpenCard = () => {
    window.open(guestCardUrl, '_blank', 'noopener,noreferrer');
    toast.info('Guest card opened in new tab');
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* QR Code Container */}
      <div className="relative">
        {/* Loading State */}
        {loading && !error && (
          <div
            className={`${sizes[size]} bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-200 shadow-sm`}
          >
            <div className="text-center">
              <Loading size="lg" />
              <p className="text-xs text-gray-500 mt-2">Generating QR...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${sizes[size]} bg-red-50 rounded-xl flex flex-col items-center justify-center gap-3 border-2 border-red-200 p-4`}
          >
            <AlertCircle className="w-12 h-12 text-red-500" />
            <p className="text-sm text-red-700 text-center font-medium">
              Failed to generate QR code
            </p>
            <p className="text-xs text-red-600 text-center">
              UID: {guestUID}
            </p>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw className="w-4 h-4" />}
              onClick={handleRetry}
            >
              Retry
            </Button>
          </motion.div>
        )}

        {/* QR Code Image */}
        <motion.img
          key={`${qrCodeUrl}-${retryCount}`}
          src={qrCodeUrl}
          alt={`QR Code for ${guestName || guestUID}`}
          className={`${sizes[size]} ${
            imageLoaded ? 'block' : 'hidden'
          } rounded-xl border-2 border-gray-200 shadow-lg object-contain bg-white p-3`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={imageLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3 }}
        />

        {/* Success Checkmark */}
        {imageLoaded && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg z-10"
          >
            <Check className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      {/* Guest Info */}
      {imageLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center"
        >
          {guestName && (
            <p className="text-sm font-medium text-gray-900 mb-1">
              {guestName}
            </p>
          )}
          <p className="text-xs text-gray-500 font-mono">{guestUID}</p>
        </motion.div>
      )}

      {/* Action Buttons */}
      {imageLoaded && (showDownload || showLink) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex flex-wrap gap-2 justify-center"
        >
          {/* Download Button */}
          {showDownload && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={handleDownload}
            >
              Download
            </Button>
          )}

          {/* Open Card Link */}
          {showLink && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ExternalLink className="w-4 h-4" />}
              onClick={handleOpenCard}
            >
              Open Card
            </Button>
          )}
        </motion.div>
      )}

      {/* Info Text */}
      {imageLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <p className="text-xs text-blue-900 text-center">
            📱 Scan this QR code to view guest information
          </p>
          <p className="text-xs text-blue-700 text-center mt-1 font-mono">
            {guestCardUrl}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default GuestQRCode;