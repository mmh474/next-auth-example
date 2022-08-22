import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyD-eJTlN8IOT7cVtEQfBnMW1b1RxQcANq0",
  authDomain: "nextjsauth-83280.firebaseapp.com",
  databaseUrl: "https://nextjsauth-83280.firebaseio.com",
  projectId: "nextjsauth-83280",
  storageBucket: "nextjsauth-83280.appspot.com",
  messagingSenderId: "234287496113",
  appId: "1:234287496113:web:1dd2a022753b680e41db90",
  measurementId: "234287496113",

  // apiKey: process.env.FIREBASE_API_KEY,
  // appId: process.env.FIREBASE_APP_ID,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseUrl: process.env.FIREBASE_DATABASE_URL,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // measurementId: "234287496113",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
