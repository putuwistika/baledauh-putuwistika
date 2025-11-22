# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RuangTamu** is a professional wedding guest check-in system with real-time queue management. It's a React + Vite application that connects to an n8n backend workflow which interfaces with Google Sheets as the data store.

### Key Architecture Components

1. **Backend**: n8n workflows hosted at `https://servern8n.putuwistika.com`
   - n8n acts as the API layer with webhooks
   - Google Sheets serves as the database
   - All API responses are processed through interceptors

2. **Frontend**: React + Vite SPA
   - Two user roles: Admin (full access) and Runner (limited access)
   - Context API for state management (Auth, Queue)
   - Real-time polling for queue updates
   - Public guest card pages (no authentication required)

3. **Data Flow**:
   - API calls → n8n webhooks → Google Sheets → Response transformation
   - Response interceptor handles array wrapping (n8n returns `[{...}]`, app needs `{...}`)
   - Real-time updates via polling (POLL_INTERVALS in constants.js)

## Common Commands

### Development
```bash
npm run dev          # Start dev server on port 3000 (auto-opens browser)
npm run build        # Production build to dist/
npm run preview      # Preview production build on port 1281
npm run lint         # ESLint check
```

### Important Notes
- Dev server runs on port 3000
- Preview/production runs on port 1281 (configured for Caddy reverse proxy)
- Environment variables are in `.env` (copy from `.env.example`)

## API Architecture

### API Response Handling
The API service (`src/services/api.js`) has a **critical response interceptor**:

```javascript
// n8n returns arrays like [{...}], but we need objects {...}
api.interceptors.response.use((response) => {
  let data = response.data;
  if (Array.isArray(data) && data.length > 0) {
    data = data[0]; // Extract first element
  }
  return data;
});
```

### Key API Endpoints
All endpoints are defined in `src/utils/constants.js`:

- **Auth**: `/webhook/auth/login`
- **Guests**:
  - `/webhook/get-guests` - All guests (optional `?status=queue|done|not_arrived`)
  - `/webhook/1d3229bc-af4b-4a6b-bef1-b16b8760a05f/get-guest/:uid` - Single guest
  - `/webhook/search-guests` - Fuzzy search
  - `/webhook/create-guest` - Create new guest
- **Check-in**: `/webhook/check-in-guest` - Accepts optional companion_count, gift_type, gift_notes
- **Queue/Runner**:
  - `/webhook/get-queue` - Current queue
  - `/webhook/take-guest` - Runner takes guest to table
  - `/webhook/99572f92-6c4f-486b-b4e4-dd5df671e866/runner-completed/:runnerId` - Runner's completed guests

### Guest Status Flow
```
not_arrived → (check-in) → queue → (runner takes) → done
```

Defined in `GUEST_STATUS` constant.

## State Management

### Contexts
1. **AuthContext** (`src/context/AuthContext.jsx`)
   - Manages user authentication and role-based access
   - Stores user data and token in localStorage
   - Provides: `user`, `token`, `isAuthenticated`, `login()`, `logout()`, `isAdmin()`, `isRunner()`

2. **QueueContext** (`src/context/QueueContext.jsx`)
   - Real-time queue state management
   - Polling mechanism for queue updates
   - Note: Check if this is actively used (may be replaced by direct API calls)

### Custom Hooks
- `useAuth()` - Access AuthContext
- `useQueue()` - Access QueueContext
- `useRealtime()` - Real-time data polling utilities

## Routing & Access Control

### Route Protection
Routes are protected by role using `ProtectedRoute` component in `App.jsx`:

```javascript
<ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
  <AdminDashboard />
</ProtectedRoute>
```

### Admin Routes
- `/admin/dashboard` - Overview & statistics
- `/admin/search` - Search guest (check-in functionality)
- `/admin/create` - Create new guest
- `/admin/guests` - All guests table
- `/admin/queue` - Queue management

### Runner Routes
- `/runner/dashboard` - Queue overview
- `/runner/search` - Read-only guest search
- `/runner/queue` - Take guests from queue
- `/runner/completed` - Runner's completed guests

### Public Routes
- `/` - Landing page with Lottie hero
- `/login` - Login (redirects to dashboard if authenticated)
- `/guest/:uid` - **Public guest card** (no auth required, shows ProfileCard + QR)

## Important Implementation Details

### QR Code Generation
QR codes use the free API `https://api.qrserver.com/v1/create-qr-code/`:

```javascript
// QR code points to: {origin}/guest/{uid}
getQRCodeURL(uid, 'MEDIUM') // Returns QR image URL
```

Helper functions in `src/utils/constants.js`.

### Check-In Modal Flow
3-step process (`src/components/Modals/CheckInModal.jsx`):
1. Preview guest info
2. Optional form (companion_count, gift_type, gift_notes)
3. Success screen with ProfileCard + QR code

### ProfileCard Component
Located in `src/components/ProfileCard/` - displays guest information with custom CSS animations. Used in:
- Check-in success screen
- Public `/guest/:uid` page
- Guest preview modals

### Path Aliases
Vite is configured with path aliases (see `vite.config.js`):
```javascript
'@' → './src'
'@components' → './src/components'
'@pages' → './src/pages'
'@hooks' → './src/hooks'
'@services' → './src/services'
'@utils' → './src/utils'
'@context' → './src/context'
```

Use these when importing to maintain consistency.

## Styling System

### Tailwind Configuration
Custom theme extends with:
- **Primary colors**: Blue/Cyan palette (Gemini-inspired)
- **Gemini gradient**: Custom color palette for special UI elements
- **Custom animations**: fade-in, slide-up, slide-down, scale-in, float, glow, gradient-shift
- **Font**: Inter (sans-serif)

### Animation Libraries
- **Framer Motion**: Page transitions, modal animations, interactive elements
- **Lottie**: Hero animation on landing page (from lottie.host)

## Data Structures

### Guest Object
Key fields returned by API:
```javascript
{
  uid: string,                    // Unique identifier
  name: string,
  table_number: string,
  check_in_status: 'not_arrived' | 'queue' | 'done',
  invitation_type: string,        // VIP, Regular, Family, etc.
  invitation_value: 'alone' | 'group',
  invitation_group_names: string[], // For group invitations
  companion_count: number,
  gift_type: string,             // Angpao, Gift, Flowers, etc.
  gift_notes: string,
  qr_code: string,               // URL to QR image
  // ... timestamps and other fields
}
```

### User Object
```javascript
{
  id: string,
  name: string,
  email: string,
  role: 'admin' | 'runner'
}
```

## Code Patterns

### API Error Handling
Always wrap API calls in try-catch with toast notifications:

```javascript
try {
  const response = await apiFunction();
  toast.success('Success message');
} catch (error) {
  console.error('Error:', error);
  toast.error(error.message || 'Operation failed');
}
```

### Loading States
Use the `Loading` component from `@components/ui/Loading`:
```javascript
if (loading) return <Loading size="lg" />;
```

### Real-time Updates
Queue and stats use polling intervals defined in `POLL_INTERVALS` constant:
```javascript
POLL_INTERVALS = {
  QUEUE: 3000,        // 3 seconds
  STATS: 5000,        // 5 seconds
  COMPLETED: 10000,   // 10 seconds
}
```

## Component Library

### UI Components (`src/components/ui/`)
- `Button` - Primary, secondary, outline, ghost variants
- `Input` - With left/right icons, validation states
- `Modal` - With Header, Body, Footer sub-components
- `Card` - With Header, Body sub-components
- `Badge` - Status badges with variants
- `Table` - Data tables with sorting/pagination
- `Loading` - Spinner with size variants

### Layout Components
- `MainLayout` - Wrapper with Sidebar + Navbar
- `Sidebar` - Collapsible, role-based navigation
- `Navbar` - Top bar with title and user menu

### Feature Components
- `CheckInModal` - 3-step check-in process
- `TakeGuestModal` - Runner assigns table
- `CreateGuestModal` - Admin creates new guest
- `GuestProfileCard` - Display guest info with QR
- `GuestQRCode` - QR code display/download

## Local Storage

Keys are defined in `STORAGE_KEYS` constant:
```javascript
'ruangtamu_user'        // User object
'ruangtamu_token'       // Auth token (Bearer token for API)
'ruangtamu_last_login'  // Timestamp
'ruangtamu_remember'    // Remember me flag
```

Helper functions in `src/utils/helpers.js`:
- `saveUser()`, `getUser()`, `clearUser()`
- `saveToken()`, `getToken()`, `clearToken()`
- `logout()` - Clears all auth data

## Deployment

- Production build outputs to `dist/`
- Preview server configured for Caddy reverse proxy at port 1281
- Host whitelist: `ruangtamu.putuwistika.com`
- Code splitting configured for React and animation vendors

## Important Constants Reference

All constants centralized in `src/utils/constants.js`:
- `ROUTES` - All route paths
- `USER_ROLES` - Role definitions
- `GUEST_STATUS` - Status values
- `GIFT_TYPES` - Gift options
- `INVITATION_TYPES` - Invitation categories
- `VALIDATION` - Form validation rules
- `ERROR_MESSAGES` / `SUCCESS_MESSAGES` - User-facing messages

When adding new features, always add constants here first rather than hardcoding strings.

## Testing & Debugging

### Console Logging
The codebase has extensive console logging:
- API requests/responses are logged in `api.js`
- Auth flow has step-by-step logging in `AuthContext.jsx`
- Keep these logs for debugging in development

### Common Issues
1. **API returns array instead of object**: The response interceptor handles this automatically
2. **Redirect not working after login**: Check role comparison in `AuthContext.jsx` (lines 132-144)
3. **QR code not showing**: Guest must have `qr_code` field populated after check-in
4. **Route access denied**: Verify user role matches `requiredRole` in route definition

## Security Notes

- Never commit `.env` file
- API token is stored in localStorage (consider security implications for production)
- No sensitive data should be in constants.js (API keys, etc.)
- All API calls require Bearer token except public routes (`/guest/:uid`)
