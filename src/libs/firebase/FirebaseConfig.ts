import { initializeApp } from 'firebase/app'
import { getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyCC-rN8qCoEV7F2vGdvPnl_wYsEHfbw3yg',
  authDomain: 'afm-project-9f939.firebaseapp.com',
  projectId: 'afm-project-9f939',
  storageBucket: 'afm-project-9f939.appspot.com',
  messagingSenderId: '991630788392',
  appId: '1:991630788392:web:a2f4eace388655bece321d',
  measurementId: 'G-4SGKTPNLDD',
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);
const provider = new GoogleAuthProvider()

export { auth, provider, db }