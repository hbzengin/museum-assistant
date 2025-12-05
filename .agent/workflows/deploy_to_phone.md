---
description: How to run the app on a physical device using Expo Go
---

# Run on Physical Device (Expo Go)

Since this project uses Expo, you can easily run it on your physical iOS or Android device without a cable.

## Prerequisites
1.  **Connect to the same Wi-Fi**: Ensure your computer and your phone are connected to the exact same Wi-Fi network.
2.  **Install Expo Go**: Download the "Expo Go" app from the App Store (iOS) or Google Play Store (Android).

## Steps

1.  **Start the Development Server**:
    In your terminal, run:
    ```bash
    npx expo start
    ```

2.  **Scan the QR Code**:
    *   **Android**: Open Expo Go and tap "Scan QR Code". Scan the QR code displayed in your terminal.
    *   **iOS**: Open the standard **Camera** app (not Expo Go) and scan the QR code. Tap the notification to open it in Expo Go.

3.  **Troubleshooting**:
    *   If it doesn't connect, try switching the connection type to "Tunnel" by pressing `t` in the terminal window where Expo is running. This routes the traffic through the internet instead of the local network, which helps if you have firewall issues.
