import { initializeApp, getApps, cert } from 'firebase-admin/app'

const firebaseAdminConfig = {
  credential: cert({
    projectId: `${process.env.NEXT_PUBLIC_FB_PROJECTID}`,
    clientEmail: `${process.env.NEXT_PUBLIC_FB_CLIENT_EMAIL}`,
    privateKey: `${process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n') : undefined}`,
  }),
}

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig)
  }
}
