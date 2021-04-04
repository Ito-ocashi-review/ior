import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_BASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIRE_BASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIRE_BASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRE_BASE_MESSSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIRE_BASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIRE_BASE_MESUREMENT_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export default firebase;
