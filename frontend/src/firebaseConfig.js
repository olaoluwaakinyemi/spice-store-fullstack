import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA13ePaOsgPvURD0TY8CWeWL1W0G_Qy6CE",
  authDomain: "ladhaspices.firebaseapp.com",
  projectId: "ladhaspices",
  storageBucket: "ladhaspices.firebasestorage.app",
  messagingSenderId: "59852461487",
  appId: "1:59852461487:web:19a3e5b572115b7ec2cb5a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export { auth, googleProvider, facebookProvider, twitterProvider };
