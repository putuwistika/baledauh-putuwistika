# 🎊 RuangTamu - Wedding Guest Check-in System

Modern wedding guest check-in system with real-time queue management.

## ✨ Features

- 🎯 Real-time guest queue management
- 👨‍💼 Admin dashboard with full control
- 🏃 Runner dashboard for guest escort
- 🎴 Beautiful guest profile cards
- 📱 Fully responsive (mobile & desktop)
- 🎨 Smooth animations with Framer Motion

## 🚀 Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion + Lottie
- **Icons**: Lucide React
- **Notifications**: Sonner
- **State**: Context API
- **Backend**: n8n Workflows + Google Sheets

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run development server
npm run dev
```

## 🎯 Quick Start

1. **Landing Page**: `/` - Hero with Lottie animation
2. **Login**: `/login` - Admin or Runner login
3. **Admin Dashboard**: `/admin/dashboard` - Full management
4. **Runner Dashboard**: `/runner/dashboard` - Queue & take guests
5. **Guest Card**: `/guest/:uid` - Public guest info (no login)

## 🔐 Roles

### Admin (Full Access)
- ✅ Search guests
- ✅ Create new guest
- ✅ Check-in guest
- ✅ View all guests & queue
- ✅ Statistics

### Runner (Limited)
- ✅ View queue (real-time)
- ✅ Take guest to table
- ✅ View completed guests
- ✅ View all guests (read-only)
- ❌ No check-in access

## 📝 Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Design System

- **Primary Color**: Blue (Google-inspired)
- **Theme**: Light, clean, minimal
- **Typography**: Inter font family
- **Animations**: Smooth, professional

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 📄 License

By PutuWistika

---

**Happy Wedding! 🎉**
