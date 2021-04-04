import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD4wagzTUA_4VDH1D6nKVdcS_dD5vIqrjg',
  authDomain: 'ito-ocashi-75f9d.firebaseapp.com',
  databaseURL: 'https://ito-ocashi-75f9d-default-rtdb.firebaseio.com',
  projectId: 'ito-ocashi-75f9d',
  storageBucket: 'ito-ocashi-75f9d.appspot.com',
  messagingSenderId: '965467433859',
  appId: '1:965467433859:web:3f3ceb847d8c6ca59fa4b6',
  measurementId: 'G-FPY79Y4H25',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export default firebase;
