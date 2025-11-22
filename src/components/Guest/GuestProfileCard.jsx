/**
 * 🎊 RuangTamu - Wedding Check-in System
 * Guest Profile Card Component - Display complete guest information (UPDATED!)
 * by PutuWistika
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  UserPlus,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import Card from '@components/ui/Card';
import Badge from '@components/ui/Badge';
import Button from '@components/ui/Button';
import GuestQRCode from './GuestQRCode';
import { formatDateTime, getInitials } from '@utils/helpers';
import { GUEST_STATUS } from '@utils/constants';
import { cancelCheckIn } from '@services/api';
import { toast } from 'sonner';

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
  onCancelSuccess,
  className = '',
  variant = 'default',
}) => {
  // State for cancel confirmation modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [canceling, setCanceling] = useState(false);

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

  // Handle cancel check-in
  const handleCancelCheckIn = async () => {
    try {
      setCanceling(true);
      console.log('🚫 Canceling check-in for:', guest.uid);

      const response = await cancelCheckIn(guest.uid);

      console.log('📥 Cancel response:', response);

      // Accept both success response and "already checked in" as success
      // Because sending empty values should reset the check-in
      if (response.success || response.statusCode === 200 || response.statusCode === 400) {
        toast.success('Check-in canceled successfully! ✅');
        setShowCancelModal(false);

        // Create updated guest object with reset check-in data
        const resetGuest = {
          ...guest,
          check_in_status: GUEST_STATUS.NOT_ARRIVED,
          is_checked_in: 'FALSE',
          companion_count: 0,
          gift_type: '',
          gift_notes: '',
          check_in_time: null,
          checked_in_by: null,
          ...(response.guest || {}),
        };

        // Notify parent component
        if (onCancelSuccess) {
          onCancelSuccess(resetGuest);
        }
      } else {
        throw new Error(response.message || 'Failed to cancel check-in');
      }
    } catch (error) {
      console.error('❌ Cancel check-in error:', error);
      toast.error(error.message || 'Failed to cancel check-in');
    } finally {
      setCanceling(false);
    }
  };

  // Check if guest is checked in
  const isCheckedIn = guest.check_in_status === GUEST_STATUS.QUEUE ||
                       guest.check_in_status === GUEST_STATUS.DONE ||
                       guest.is_checked_in === 'TRUE';

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
            {/* Table Number - HIGHLIGHTED! */}
            {guest.table_number && (
              <motion.div variants={itemVariants} className="col-span-2 mb-2">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25"></div>
                  <div className="relative flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-xs font-medium text-white/90 uppercase tracking-wide mb-1">Nomor Meja</p>
                      <p className="text-3xl font-bold text-white drop-shadow-lg">
                        {guest.table_number}
                      </p>
                    </div>
                    <div className="w-12 h-12 opacity-0"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">

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

            {/* Invitation Details - Group Names or Value */}
            {(guest.invitation_group_names?.length > 0 || guest.invitation_value) && (
              <>
                <div className="border-t border-gray-200" />

                <motion.div variants={itemVariants} className="space-y-3">
                  {guest.invitation_group_names?.length > 0 ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Invitation Details</p>
                          <p className="text-sm font-semibold text-gray-900">Group Members</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-0">
                        {guest.invitation_group_names.map((name, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-medium"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : guest.invitation_value === 'alone' ? (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Invitation Details</p>
                        <p className="text-sm font-medium text-gray-900">Solo Invitation</p>
                      </div>
                    </div>
                  ) : guest.invitation_value === 'group' ? (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Invitation Details</p>
                        <p className="text-sm font-medium text-gray-900">Group Invitation</p>
                      </div>
                    </div>
                  ) : guest.invitation_value ? (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Invitation Details</p>
                        <p className="text-sm font-medium text-gray-900">{guest.invitation_value}</p>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </>
            )}

            {/* Divider */}
            {(guest.is_checked_in === 'TRUE' || guest.gift_notes || guest.runner_notes) && (
              <div className="border-t border-gray-200" />
            )}

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

            {/* Cancel Check-in Button */}
            {isCheckedIn && (
              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<XCircle className="w-5 h-5" />}
                  onClick={() => setShowCancelModal(true)}
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                >
                  Cancel Check-in
                </Button>
              </div>
            )}

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

      {/* Cancel Check-in Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !canceling && setShowCancelModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Red Warning */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Cancel Check-in</h3>
                    <p className="text-red-100 text-sm">This action will reset all check-in data</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-900 mb-1">
                        Warning: This will reset all check-in information
                      </p>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Check-in status will be reset to "Not Arrived"</li>
                        <li>• Companion count will be cleared</li>
                        <li>• Gift type and notes will be removed</li>
                        <li>• Guest will be removed from queue</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Guest:</strong> {guest.name}
                  </p>
                  {guest.table_number && (
                    <p className="text-sm text-gray-700">
                      <strong>Table:</strong> {guest.table_number}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowCancelModal(false)}
                  disabled={canceling}
                >
                  Keep Check-in
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleCancelCheckIn}
                  loading={canceling}
                  disabled={canceling}
                  leftIcon={!canceling && <XCircle className="w-5 h-5" />}
                  className="bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700"
                >
                  {canceling ? 'Canceling...' : 'Yes, Cancel Check-in'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GuestProfileCard;