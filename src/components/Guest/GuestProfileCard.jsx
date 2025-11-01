/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Guest Profile Card Component - Display complete guest information (UPDATED!)
 * by PutuWistika
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Phone,
  Users,
  Gift,
  Clock,
  CheckCircle,
  Calendar,
  MapPin,
  UserCheck,
  FileText,
  Sparkles,
  QrCode,
} from 'lucide-react';
import Card from '@components/ui/Card';
import Badge from '@components/ui/Badge';
import GuestQRCode from './GuestQRCode';
import { formatDateTime, getInitials } from '@utils/helpers';
import { GUEST_STATUS } from '@utils/constants';

/**
 * Guest Profile Card Component
 * Displays complete guest information with QR code
 * 
 * @param {object} guest - Guest object (required)
 * @param {boolean} showQR - Show QR code section (default: true)
 * @param {boolean} showActions - Show action buttons (default: false)
 * @param {function} onAction - Action handler (close, print, etc)
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Card variant (default | compact | detailed)
 */
const GuestProfileCard = ({
  guest,
  showQR = true,
  showActions = false,
  onAction,
  className = '',
  variant = 'default',
}) => {
  // Validation
  if (!guest) {
    return (
      <Card className={className}>
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No guest data available</p>
        </div>
      </Card>
    );
  }

  // Get status badge variant
  const getStatusVariant = (status) => {
    const statusMap = {
      [GUEST_STATUS.NOT_ARRIVED]: 'default',
      [GUEST_STATUS.QUEUE]: 'warning',
      [GUEST_STATUS.DONE]: 'success',
    };
    return statusMap[status] || 'default';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <Card padding="none" className="overflow-hidden">
        {/* Header Section - Gradient Background */}
        <div className="relative bg-gradient-to-br from-primary-500 to-purple-600 text-white p-6 pb-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          {/* Header Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border-2 border-white/30">
                  <span className="text-2xl font-bold">
                    {getInitials(guest.name)}
                  </span>
                </div>

                {/* Name & Status */}
                <div>
                  <h2 className="text-2xl font-bold mb-1">{guest.name}</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant={getStatusVariant(guest.check_in_status)}
                      className="bg-white/20 backdrop-blur-lg border-white/30"
                    >
                      {guest.check_in_status === GUEST_STATUS.NOT_ARRIVED && 'Not Arrived'}
                      {guest.check_in_status === GUEST_STATUS.QUEUE && 'In Queue'}
                      {guest.check_in_status === GUEST_STATUS.DONE && 'Completed'}
                    </Badge>
                    {guest.invitation_type && (
                      <Badge className="bg-white/20 backdrop-blur-lg border-white/30">
                        {guest.invitation_type}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* VIP/Special Badge */}
              {guest.invitation_type === 'VIP' && (
                <div className="flex items-center gap-1 bg-yellow-400/20 backdrop-blur-lg border border-yellow-400/30 px-3 py-1 rounded-full">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold">VIP</span>
                </div>
              )}
            </div>

            {/* UID */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-3 py-1.5 rounded-lg border border-white/20">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-mono">{guest.uid}</span>
            </div>
          </div>
        </div>

        {/* White Card Overlap */}
        <div className="relative -mt-12 mx-4">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Table Number */}
              {guest.table_number && (
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Table Number</p>
                    <p className="text-sm font-medium text-gray-900">
                      {guest.table_number}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Companions */}
              <motion.div variants={itemVariants} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Companions</p>
                  <p className="text-sm font-medium text-gray-900">
                    {guest.companion_count || 0} {guest.companion_count === 1 ? 'person' : 'people'}
                  </p>
                </div>
              </motion.div>

              {/* Gift Type */}
              {guest.gift_type && (
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Gift Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {guest.gift_type}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Invitation Type */}
              {guest.invitation_type && (
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Invitation Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {guest.invitation_type}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Check-in Info */}
            {guest.is_checked_in === 'TRUE' && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Check-in Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Check-in Time */}
                  {guest.check_in_time && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Check-in Time</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDateTime(guest.check_in_time)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Checked In By */}
                  {guest.checked_in_by && (
                    <div className="flex items-start gap-2">
                      <UserCheck className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Checked In By</p>
                        <p className="text-sm font-medium text-gray-900">
                          {guest.checked_in_by}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Gift Notes */}
            {guest.gift_notes && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Gift Notes
                </h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {guest.gift_notes}
                </p>
              </div>
            )}

            {/* Runner Notes */}
            {guest.runner_notes && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Runner Notes
                </h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {guest.runner_notes}
                </p>
              </div>
            )}

            {/* QR Code Section - UPDATED! */}
            {showQR && guest.uid && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  Guest QR Code
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <GuestQRCode
                    guestUID={guest.uid}
                    guestName={guest.name}
                    size="md"
                    showDownload={true}
                    showLink={true}
                  />
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                {guest.created_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Created: {formatDateTime(guest.created_at)}</span>
                  </div>
                )}
                {guest.updated_at && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Updated: {formatDateTime(guest.updated_at)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {showActions && onAction && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => onAction('close')}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => onAction('print')}
                  className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Print Card
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="h-4" />
      </Card>
    </motion.div>
  );
};

export default GuestProfileCard;