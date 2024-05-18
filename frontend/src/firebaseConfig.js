import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

//import { connectFirestoreEmulator } from 'firebase/firestore';
//import { connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBkoB3lwxp5BM9n_Wy3Yo2tMYJ3A-WY8aY",
    authDomain: "open-patient-cases.firebaseapp.com",
    projectId: "open-patient-cases",
    storageBucket: "open-patient-cases.appspot.com",
    messagingSenderId: "73753724783",
    appId: "1:73753724783:web:40140bd8221d371f9f0a9a",
    measurementId: "G-9WFD3KRNFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

console.log(window.location.hostname);
// Use emulators if in development
// if (window.location.hostname.includes('localhost')) {
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }

export { db, auth };