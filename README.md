# Zuri Companion App

A React Native mobile application built with Expo that provides an AI-powered reading companion for children ages 3-7. The app includes interactive stories, phonics games, daily routines, and emotional support features.

## 🚀 Quick Start with Bun

This project uses [Bun](https://bun.sh) as the package manager for faster installation and development.

### Prerequisites

- Node.js 18+
- Bun 1.0+ (install from [bun.sh](https://bun.sh))
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd zuri-companion-app
   ```

2. **Install dependencies with Bun**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

4. **Run on your preferred platform**

   ```bash
   # iOS (requires Mac)
   bun run ios

   # Android
   bun run android

   # Web
   bun run web
   ```

## 🧪 Testing the App

The app includes comprehensive dummy data for testing all features:

### Test Accounts

- **Email:** `john.smith@example.com`
- **Password:** `password123`
- **Child:** Emily (Age 5)

- **Email:** `sarah.johnson@example.com`
- **Password:** `password123`
- **Child:** Alex (Age 4)

### Features to Test

1. **Onboarding Flow**

   - Welcome screen
   - Parent signup/login
   - Child profile creation
   - Device pairing simulation
   - Privacy consent
   - Feature tour

2. **Main App Features**

   - **Dashboard:** View child's activity, device status, quick actions
   - **Library:** Browse stories, affirmations, phonics games, routines
   - **Customize:** Adjust voice, LED, and touch settings
   - **Insights:** View learning progress and analytics
   - **Settings:** Manage account, parental controls, notifications

3. **Content Categories**
   - **Stories:** 5 interactive bedtime and learning stories
   - **Affirmations:** 4 confidence-building affirmations
   - **Phonics:** 4 educational games for reading skills
   - **Routines:** 4 daily routine guides

## 📱 App Structure

```
zuri-companion-app/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Main app tabs
│   │   ├── index.tsx            # Dashboard/Home
│   │   ├── library.tsx          # Content Library
│   │   ├── customize.tsx        # Device Customization
│   │   ├── insights.tsx         # Learning Analytics
│   │   └── settings.tsx         # Settings & Account
│   ├── onboarding/              # Onboarding flow
│   │   ├── index.tsx            # Welcome
│   │   ├── parent-signup.tsx    # Account creation
│   │   ├── login.tsx            # Login
│   │   ├── child-profile.tsx    # Child setup
│   │   ├── device-pairing.tsx   # Device connection
│   │   ├── privacy-consent.tsx  # Privacy settings
│   │   └── feature-tour.tsx     # App introduction
│   ├── _layout.tsx              # Root layout
│   └── +not-found.tsx           # 404 screen
├── context/                      # React Context providers
│   ├── AuthContext.tsx          # Authentication state
│   └── ThemeContext.tsx         # Theme management
├── hooks/                        # Custom React hooks
│   └── useFrameworkReady.ts     # App initialization
├── data/                         # Mock data for testing
│   └── mockData.ts              # Stories, activities, progress
└── assets/                       # Images and fonts
```

## 🎨 Features

### For Parents

- **Comprehensive Dashboard:** Monitor child's learning progress and device status
- **Content Library:** Browse and manage educational content
- **Parental Controls:** Set usage limits, content filtering, quiet hours
- **Learning Insights:** View detailed analytics on child's progress
- **Device Management:** Customize Zuri toy settings (voice, lights, touch sensitivity)

### For Children

- **Interactive Stories:** Engaging narratives with AI voice interaction
- **Phonics Games:** Fun learning activities for reading skills
- **Daily Routines:** Guided morning, bedtime, and after-school routines
- **Positive Affirmations:** Confidence-building and emotional support
- **Personalized Experience:** Content adapted to child's age and progress

### Technical Features

- **Cross-Platform:** iOS, Android, and Web support
- **Offline-First:** Content available without internet connection
- **Secure Authentication:** Biometric login support
- **Real-time Sync:** Progress tracking across devices
- **Accessibility:** Screen reader and high contrast support

## 🔧 Development

### Available Scripts

```bash
# Development
bun run dev              # Start Expo dev server
bun run start            # Alternative start command
bun run type-check       # TypeScript checking

# Building
bun run build:web        # Build for web
bun run build:android    # Build Android APK (requires EAS)
bun run build:ios        # Build iOS app (requires EAS)

# Platform-specific development
bun run ios              # Open in iOS simulator
bun run android          # Open in Android emulator
bun run web              # Open in web browser

# Code quality
bun run lint             # Run ESLint
```

### Project Configuration

- **Expo SDK:** 53.0.0
- **React Native:** 0.79.1
- **TypeScript:** 5.8.3
- **Navigation:** Expo Router with tabs
- **Styling:** React Native StyleSheet (no external CSS framework)
- **State Management:** React Context
- **Charts:** react-native-chart-kit
- **Authentication:** Expo Local Authentication for biometrics

### Adding New Content

1. **Stories/Content:** Add to `data/mockData.ts`
2. **Screens:** Create in appropriate `app/` directory
3. **Navigation:** Update `app/(tabs)/_layout.tsx` for new tabs

### Customizing Themes

Edit `context/ThemeContext.tsx` to modify colors and theme switching:

```typescript
const lightColors = {
  primary: "#5E9CF3",
  secondary: "#8A64EC",
  // ... other colors
};
```

## 🚀 Deployment

### Web Deployment

```bash
bun run build:web
# Deploy the dist/ folder to your web hosting
```

### Mobile App Stores

1. Set up [EAS Build](https://docs.expo.dev/build/introduction/)
2. Configure `eas.json`
3. Run builds:
   ```bash
   bun run build:android
   bun run build:ios
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Bun installation problems**

   ```bash
   # Reinstall Bun
   curl -fsSL https://bun.sh/install | bash

   # Clear Bun cache
   bun pm cache rm
   ```

2. **Metro bundler issues**

   ```bash
   # Clear Expo cache
   expo r -c

   # Reset project
   bun run reset-project
   ```

3. **iOS Simulator not opening**

   ```bash
   # Install iOS platform tools
   npx expo install --ios

   # Open Xcode and accept license agreements
   sudo xcode-select --install
   ```

4. **Android Emulator issues**

   ```bash
   # Check Android SDK
   npx expo doctor

   # Install Android platform tools
   npx expo install --android
   ```

### Performance Tips

- Use `bun run dev` instead of `expo start` for faster startup
- Enable Hermes engine for Android (already configured)
- Use Flipper for debugging React Native performance

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or support, please:

- Open an issue on GitHub
- Check the [Expo documentation](https://docs.expo.dev/)
- Review [React Native documentation](https://reactnative.dev/docs/getting-started)

---

Built with ❤️ using Expo, React Native, and Bun.
