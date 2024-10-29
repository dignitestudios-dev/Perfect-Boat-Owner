// getFCMToken.js
import { ErrorToast } from "../components/global/Toaster";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const getFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPIDKEY,
      });
      return token;
    } else {
      console.error("Notification permission denied");
      ErrorToast("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export default getFCMToken;
