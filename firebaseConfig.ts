import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCrpARc47lb4e-IsA9t9OyS9XzL2bjgnRs",
    authDomain: "firestreamapp-b7a36.firebaseapp.com",
    projectId: "firestreamapp-b7a36",
    storageBucket: "firestreamapp-b7a36.appspot.com",
    messagingSenderId: "620812520678",
    appId: "1:620812520678:web:cb750f81029ae90fd27f27",
    measurementId: "G-4KETVL0T61"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);