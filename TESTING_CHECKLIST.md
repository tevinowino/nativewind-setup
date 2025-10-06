# ✅ Testing Checklist - Shamba Pal

Use this checklist to verify all features are working correctly.

## 🚀 Initial Setup

- [ ] Run `npm install` successfully
- [ ] Run `npm start` without errors
- [ ] App loads on device/simulator
- [ ] No console errors on launch

## 🔐 Authentication Flow

### Login Screen
- [ ] Screen displays correctly with green theme
- [ ] Email input accepts text
- [ ] Password input shows/hides password
- [ ] Email validation works (invalid format shows error)
- [ ] Password validation works (empty shows error)
- [ ] Login button shows loading state
- [ ] Successful login navigates to Home
- [ ] "Forgot Password" link navigates correctly
- [ ] "Sign Up" link navigates correctly
- [ ] Google Sign-In button visible (placeholder)

### Sign Up Screen
- [ ] All input fields work (name, email, phone, password, confirm)
- [ ] Name validation (required)
- [ ] Email validation (format check)
- [ ] Password validation (min 8 characters)
- [ ] Confirm password validation (passwords match)
- [ ] Sign up button shows loading state
- [ ] Successful signup navigates to Home
- [ ] "Login" link navigates back
- [ ] Google Sign-In button visible

### Forgot Password Screen
- [ ] Back button works
- [ ] Email input accepts text
- [ ] Email validation works
- [ ] Reset button shows loading state
- [ ] Success alert shows
- [ ] "Login" link navigates correctly

### Session Persistence
- [ ] Close and reopen app - stays logged in
- [ ] Logout and reopen app - shows login screen

## 🏠 Home Screen

### Layout
- [ ] Header shows user name
- [ ] Profile icon in header
- [ ] Quick action buttons display (4 buttons)
- [ ] Weather card shows current conditions
- [ ] Recent diagnosis card shows (if available)
- [ ] Farming tips card displays

### Functionality
- [ ] Pull-to-refresh works
- [ ] Profile icon navigates to Profile
- [ ] Diagnose button navigates to Diagnose
- [ ] Marketplace button navigates to Marketplace
- [ ] Weather button navigates to Weather
- [ ] Orders button navigates to Orders
- [ ] Weather card is tappable
- [ ] All data loads correctly

## 🔬 Diagnose Screen

### Image Selection
- [ ] "Take Photo" button works
- [ ] Camera permission requested
- [ ] Camera opens and captures photo
- [ ] "Select from Gallery" button works
- [ ] Gallery permission requested
- [ ] Gallery opens and allows selection
- [ ] Selected image displays in preview
- [ ] Remove button (X) clears image

### Diagnosis Process
- [ ] "Diagnose Crop" button appears after image selected
- [ ] Loading screen shows with "Analyzing..." message
- [ ] Results display after ~3 seconds
- [ ] Crop name shows
- [ ] Issue description shows
- [ ] Severity badge displays with correct color
- [ ] Confidence percentage shows
- [ ] Advice section displays
- [ ] "View Products" button appears
- [ ] "New Diagnosis" button resets screen

## 🛒 Marketplace Screen

### Layout
- [ ] Header shows "Marketplace" title
- [ ] Cart icon with badge shows item count
- [ ] Category filters display horizontally
- [ ] Products display in list
- [ ] Each product card shows:
  - [ ] Product image
  - [ ] Product name
  - [ ] Description
  - [ ] Rating and reviews
  - [ ] Price
  - [ ] Stock status
  - [ ] Add to cart button

### Functionality
- [ ] Category filter works (All, Seeds, Fertilizers, etc.)
- [ ] Products filter by category
- [ ] Add to cart button works
- [ ] Cart count updates
- [ ] Alert shows "Added to Cart"
- [ ] Out of stock products show disabled button
- [ ] Product cards are tappable

### Language Support
- [ ] Category labels change with language toggle
- [ ] English categories display correctly
- [ ] Kiswahili categories display correctly

## ☁️ Weather Screen

### Current Weather
- [ ] Location name displays
- [ ] Current temperature shows
- [ ] Weather condition text displays
- [ ] Weather icon shows
- [ ] Humidity percentage displays
- [ ] Wind speed displays

### Forecast
- [ ] 7-day forecast displays
- [ ] Each day shows date
- [ ] Weather icons for each day
- [ ] Min/max temperatures show
- [ ] Dates format correctly

### Alerts & Tips
- [ ] Weather alerts display (if any)
- [ ] Alert styling (orange background)
- [ ] Farming tips list displays
- [ ] Tips are readable

### Functionality
- [ ] Pull-to-refresh works
- [ ] "Update Location" button works
- [ ] Location permission requested
- [ ] Data reloads after location update

## 📦 Orders Screen

### Layout
- [ ] Header shows "My Orders"
- [ ] Orders list displays
- [ ] Each order shows:
  - [ ] Order ID
  - [ ] Total amount
  - [ ] Status badge with color
  - [ ] Order date
  - [ ] Items list
  - [ ] Delivery address
  - [ ] Payment method

### Status Display
- [ ] Delivered orders show green
- [ ] Shipped orders show blue
- [ ] Processing orders show orange
- [ ] Pending orders show gray
- [ ] Cancelled orders show red
- [ ] Status icons display correctly

### Empty State
- [ ] Empty state shows when no orders
- [ ] Icon displays
- [ ] Message displays

## 👤 Profile Screen

### User Info
- [ ] Avatar with initials displays
- [ ] User name shows
- [ ] Email shows
- [ ] Phone shows (if provided)

### Language Selection
- [ ] English option displays with flag
- [ ] Kiswahili option displays with flag
- [ ] Current language has checkmark
- [ ] Tapping language changes app language
- [ ] Success alert shows
- [ ] UI updates with new language

### Menu Items
- [ ] Edit Profile button works
- [ ] Notifications button works
- [ ] Settings button works
- [ ] Help button works
- [ ] About button shows version info
- [ ] All items have icons

### Logout
- [ ] Logout button displays in red
- [ ] Confirmation dialog shows
- [ ] Cancel keeps user logged in
- [ ] Logout navigates to Login screen
- [ ] User session cleared

## 🧭 Navigation

### Tab Bar
- [ ] All 6 tabs display
- [ ] Icons show for each tab
- [ ] Labels show for each tab
- [ ] Active tab highlighted in green
- [ ] Inactive tabs gray
- [ ] Tapping tabs switches screens
- [ ] Tab bar always visible

### Screen Transitions
- [ ] Smooth transitions between screens
- [ ] No flickering
- [ ] Back navigation works
- [ ] Deep linking works (if applicable)

## 🎨 UI/UX

### Theme
- [ ] Green color scheme consistent
- [ ] Primary color: #16a34a
- [ ] Buttons styled correctly
- [ ] Cards have shadows
- [ ] Rounded corners consistent
- [ ] Spacing consistent

### Responsiveness
- [ ] Works on different screen sizes
- [ ] Text readable on all screens
- [ ] Images scale properly
- [ ] No overflow issues
- [ ] Safe area respected (notch/status bar)

### Accessibility
- [ ] Text contrast sufficient
- [ ] Touch targets adequate size
- [ ] Icons have meaning
- [ ] Loading states clear

## 🌍 Internationalization

### English
- [ ] All labels in English
- [ ] Navigation in English
- [ ] Buttons in English
- [ ] Messages in English

### Kiswahili
- [ ] Switch to Kiswahili in Profile
- [ ] All labels translate
- [ ] Navigation translates
- [ ] Buttons translate
- [ ] Messages translate

### Translation Coverage
- [ ] Home screen
- [ ] Diagnose screen
- [ ] Marketplace screen
- [ ] Weather screen
- [ ] Orders screen
- [ ] Profile screen
- [ ] Auth screens

## 🔧 Error Handling

### Network Errors
- [ ] Graceful handling of API failures
- [ ] Error messages display
- [ ] Retry options available

### Permission Errors
- [ ] Camera permission denial handled
- [ ] Gallery permission denial handled
- [ ] Location permission denial handled
- [ ] Clear error messages

### Validation Errors
- [ ] Form validation messages clear
- [ ] Error styling visible
- [ ] Errors clear when fixed

## 📱 Platform Specific

### iOS
- [ ] Status bar styled correctly
- [ ] Safe area handled
- [ ] Keyboard behavior correct
- [ ] Gestures work

### Android
- [ ] Back button works
- [ ] Status bar styled correctly
- [ ] Keyboard behavior correct
- [ ] Material design respected

### Web (if applicable)
- [ ] Responsive layout
- [ ] Mouse interactions work
- [ ] Keyboard navigation works

## 🚀 Performance

- [ ] App launches quickly
- [ ] Screen transitions smooth
- [ ] Images load efficiently
- [ ] No memory leaks
- [ ] Scroll performance good
- [ ] No lag in interactions

## 📝 Data Persistence

- [ ] Auth token persists
- [ ] User data persists
- [ ] Language preference persists
- [ ] Cart items persist (session)
- [ ] Data survives app restart

## 🐛 Known Issues

Document any issues found:

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

## ✅ Final Checks

- [ ] No console errors
- [ ] No console warnings (critical)
- [ ] TypeScript compiles without errors
- [ ] Linter passes
- [ ] All screens accessible
- [ ] All features functional
- [ ] Documentation complete
- [ ] Ready for API integration

---

## 📊 Test Results

**Date Tested**: _______________
**Tester**: _______________
**Platform**: iOS / Android / Web
**Device**: _______________
**Pass Rate**: _____ / _____ (___%)

**Status**: ⬜ Pass | ⬜ Fail | ⬜ Needs Review

**Notes**:
_________________________________________________
_________________________________________________
_________________________________________________
