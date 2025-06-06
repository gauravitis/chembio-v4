import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

console.log('Initializing Firebase Admin...');

// Validate environment variables
if (!process.env.FIREBASE_PROJECT_ID) {
  throw new Error('FIREBASE_PROJECT_ID is not defined in environment variables');
}
if (!process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error('FIREBASE_CLIENT_EMAIL is not defined in environment variables');
}
if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error('FIREBASE_PRIVATE_KEY is not defined in environment variables');
}

console.log('Environment variables loaded successfully');

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

let app;
let auth;
let db;

try {
  // Initialize Firebase Admin
  const apps = getApps();
  console.log('Existing Firebase apps:', apps.length);

  app = !apps.length ? initializeApp(firebaseAdminConfig) : apps[0];
  console.log('Firebase Admin app initialized:', !!app);

  auth = getAuth(app);
  db = getFirestore(app);

  console.log('Firebase Admin services initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  throw error;
}

export { app, auth, db };
