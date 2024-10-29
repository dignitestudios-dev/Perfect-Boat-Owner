// Import Firebase scripts
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js"
);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNULMCZvOCVls44q6r4_bL7ZBj4G-2Oxs",
  authDomain: "perfectboat-1afb7.firebaseapp.com",
  projectId: "perfectboat-1afb7",
  storageBucket: "perfectboat-1afb7.appspot.com",
  messagingSenderId: "710726380778",
  appId: "1:710726380778:web:dc61795a7ac36645cdfb93",
  measurementId: "G-N6EQLMBLWD",
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
let messaging = firebase.messaging();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      // Ensure Firebase Messaging has the registration before requesting a token
      messaging = firebase.messaging();
      messaging.useServiceWorker(registration);

      // Now request the FCM token
      return messaging.getToken();
    })
    .then((token) => {
      console.log("FCM Token:", token);
    })
    .catch((error) => {
      console.error("Error getting FCM token:", error);
    });
} else {
  console.warn("Service workers are not supported in this browser.");
}

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Optional: add an icon for your notifications
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
