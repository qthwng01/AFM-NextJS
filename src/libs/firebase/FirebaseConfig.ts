import { initializeApp } from 'firebase/app'
import { getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FB_CF_API_KEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_FB_CF_AUTH_DOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_FB_CF_PROJECTID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FB_CF_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_FB_CF_MESSAGING_SENDER_ID}`,
  appId: `${process.env.NEXT_PUBLIC_FB_CF_APPID}`,
  measurementId: `${process.env.NEXT_PUBLIC_FB_CF_MEASUREMENT_ID}`,
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);
const provider = new GoogleAuthProvider()

export { auth, provider, db }