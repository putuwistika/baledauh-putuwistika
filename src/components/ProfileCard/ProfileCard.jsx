/**
 * 🎊 RuangTamu - Wedding Check-in System
 * ProfileCard Component - Guest Profile Display
 * by PutuWistika
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  MapPin, 
  Gift, 
  Users, 
  CheckCircle, 
  Clock,
  UserX,
  AlertCircle,
  Home,
  QrCode,
  Star,
  FileText,
  UserCheck
} from 'lucide-react';
import './ProfileCard.css';

/**
 * ProfileCard Component
 * Menampilkan detail lengkap guest berdasarkan UID
 */
const ProfileCard = () => {
  const { uid } = useParams();
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch guest data
  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://servern8n.putuwistika.com/webhook/1d3229bc-af4b-4a6b-bef1-b16b8760a05f/get-guest/${uid}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch guest data');
        }

        const data = await response.json();

        if (data.success && data.found) {
          setGuest(data.guest);
        } else {
          setError('Guest not found');
        }
      } catch (err) {
        console.error('Error fetching guest:', err);
        setError(err.message || 'Failed to load guest data');
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchGuestData();
    }
  }, [uid]);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      not_arrived: {
        icon: <UserX size={16} />,
        label: 'Not Arrived',
        className: 'status-badge status-not-arrived',
      },
      queue: {
        icon: <Clock size={16} />,
        label: 'In Queue',
        className: 'status-badge status-queue',
      },
      done: {
        icon: <CheckCircle size={16} />,
        label: 'Completed',
        className: 'status-badge status-done',
      },
    };

    const config = statusConfig[status] || statusConfig.not_arrived;
    return (
      <span className={config.className}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  // Get invitation type badge
  const getInvitationBadge = (type) => {
    const typeColors = {
      VIP: 'invitation-vip',
      Regular: 'invitation-regular',
      Family: 'invitation-family',
      Colleague: 'invitation-colleague',
      Friend: 'invitation-friend',
      Other: 'invitation-other',
    };

    const colorClass = typeColors[type] || 'invitation-other';
    return (
      <span className={`invitation-badge ${colorClass}`}>
        <Star size={16} />
        {type}
      </span>
    );
  };

  // Loading State
  if (loading) {
    return (
      <div className="profile-card-container">
        <div className="profile-card loading-card">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading guest information...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="profile-card-container">
        <div className="profile-card error-card">
          <div className="error-content">
            <AlertCircle size={64} className="error-icon" />
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <Link to="/" className="btn-home">
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Guest Not Found
  if (!guest) {
    return (
      <div className="profile-card-container">
        <div className="profile-card error-card">
          <div className="error-content">
            <UserX size={64} className="error-icon" />
            <h2>Guest Not Found</h2>
            <p>The guest with UID "{uid}" does not exist in our system.</p>
            <Link to="/" className="btn-home">
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main Profile Card Display
  return (
    <div className="profile-card-container">
      <div className="profile-card">
        {/* Header Section */}
        <div className="card-header">
          <div className="header-background">
            <div className="gradient-overlay"></div>
          </div>
          
          <div className="header-content">
            <div className="avatar">
              <User size={48} />
            </div>
            <h1 className="guest-name">{guest.name}</h1>
            <p className="guest-uid">UID: {guest.uid}</p>
            
            <div className="header-badges">
              {getStatusBadge(guest.check_in_status)}
              {getInvitationBadge(guest.invitation_type)}
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        {guest.qr_code_url && (
          <div className="qr-section">
            <div className="qr-code-wrapper">
              <img src={guest.qr_code_url} alt="QR Code" className="qr-code" />
              <div className="qr-label">
                <QrCode size={16} />
                Scan QR Code
              </div>
            </div>
          </div>
        )}

        {/* Information Sections */}
        <div className="card-body">
          {/* Table & Basic Info */}
          <section className="info-section">
            <h3 className="section-title">
              <MapPin size={20} />
              Basic Information
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Table Number</span>
                <span className="info-value highlight">
                  {guest.table_number || '-'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Invitation Type</span>
                <span className="info-value">{guest.invitation_type}</span>
              </div>
              {guest.is_new_guest && (
                <div className="info-item full-width">
                  <span className="new-guest-badge">
                    <Star size={16} />
                    New Guest
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Check-in Information */}
          <section className="info-section">
            <h3 className="section-title">
              <CheckCircle size={20} />
              Check-in Status
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value">
                  {getStatusBadge(guest.check_in_status)}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Checked In</span>
                <span className="info-value">
                  {guest.is_checked_in ? 'Yes ✓' : 'Not Yet ✗'}
                </span>
              </div>
              {guest.check_in_time && (
                <div className="info-item full-width">
                  <span className="info-label">
                    <Calendar size={16} />
                    Check-in Time
                  </span>
                  <span className="info-value">
                    {formatDate(guest.check_in_time)}
                  </span>
                </div>
              )}
              {guest.checked_in_by && (
                <div className="info-item full-width">
                  <span className="info-label">
                    <UserCheck size={16} />
                    Checked In By
                  </span>
                  <span className="info-value">{guest.checked_in_by}</span>
                </div>
              )}
            </div>
          </section>

          {/* Companion & Gift Information */}
          {(guest.companion_count > 0 || guest.gift_type || guest.gift_notes) && (
            <section className="info-section">
              <h3 className="section-title">
                <Gift size={20} />
                Additional Details
              </h3>
              <div className="info-grid">
                {guest.companion_count > 0 && (
                  <div className="info-item">
                    <span className="info-label">
                      <Users size={16} />
                      Companions
                    </span>
                    <span className="info-value highlight">
                      {guest.companion_count} person(s)
                    </span>
                  </div>
                )}
                {guest.gift_type && (
                  <div className="info-item">
                    <span className="info-label">
                      <Gift size={16} />
                      Gift Type
                    </span>
                    <span className="info-value">{guest.gift_type}</span>
                  </div>
                )}
                {guest.gift_notes && (
                  <div className="info-item full-width">
                    <span className="info-label">
                      <FileText size={16} />
                      Gift Notes
                    </span>
                    <span className="info-value gift-notes">
                      {guest.gift_notes}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Runner Information */}
          {(guest.assigned_runner || guest.runner_notes) && (
            <section className="info-section">
              <h3 className="section-title">
                <UserCheck size={20} />
                Runner Information
              </h3>
              <div className="info-grid">
                {guest.assigned_runner && (
                  <div className="info-item full-width">
                    <span className="info-label">Assigned Runner</span>
                    <span className="info-value">{guest.assigned_runner}</span>
                  </div>
                )}
                {guest.runner_notes && (
                  <div className="info-item full-width">
                    <span className="info-label">Runner Notes</span>
                    <span className="info-value notes-text">
                      {guest.runner_notes}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Timestamps */}
          <section className="info-section timestamps">
            <div className="timestamp-item">
              <Calendar size={14} />
              <span className="timestamp-label">Created:</span>
              <span className="timestamp-value">
                {formatDate(guest.created_at)}
              </span>
            </div>
            <div className="timestamp-item">
              <Calendar size={14} />
              <span className="timestamp-label">Last Updated:</span>
              <span className="timestamp-value">
                {formatDate(guest.updated_at)}
              </span>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <Link to="/" className="btn-back">
            <Home size={18} />
            Back to Home
          </Link>
          <p className="footer-text">
            🎊 RuangTamu by PutuWistika
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;