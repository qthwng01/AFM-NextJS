import { initializeApp, getApps, cert } from 'firebase-admin/app'

const firebaseAdminConfig = {
  credential: cert({
    projectId: `${process.env.NEXT_PUBLIC_FB_PROJECTID}`,
    clientEmail: `${process.env.NEXT_PUBLIC_FB_CLIENT_EMAIL}`,
    privateKey: `${process.env.NEXT_PUBLIC_FB_PRIVATE_KEY}`,
  }),
}

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig)
  }
}
