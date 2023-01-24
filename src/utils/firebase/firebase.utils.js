import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// --- start of setup firebase/store --- //
const firebaseConfig = {
  apiKey: 'AIzaSyCLiuH4WrmxBxgHEmrV_mKlenI7YIq7_MQ',
  authDomain: 'crwn-clothing-db-fdc72.firebaseapp.com',
  projectId: 'crwn-clothing-db-fdc72',
  storageBucket: 'crwn-clothing-db-fdc72.appspot.com',
  messagingSenderId: '850097239147',
  appId: '1:850097239147:web:e61c17889e2ffc919f6d2e',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(
    auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(
    auth, googleProvider);

export const db = getFirestore();
// --- end of setup firebase/store --- //

// --- ------------------- --- //

// --- create user methods --- //
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {},
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log('error creating the user', err.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// --- end of create user methods --- //