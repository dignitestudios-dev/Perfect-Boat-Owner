// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "perfectboat-1afb7.firebaseapp.com",
  projectId: "perfectboat-1afb7",
  storageBucket: "perfectboat-1afb7.appspot.com",
  messagingSenderId: "710726380778",
  appId: "1:710726380778:web:dc61795a7ac36645cdfb93",
  measurementId: "G-N6EQLMBLWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging };
