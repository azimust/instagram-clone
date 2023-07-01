// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNstjuUOHUjvsC12T5tQa8jEZS9sR1-HQ",
    authDomain: "instagram-clone-3c4dc.firebaseapp.com",
    projectId: "instagram-clone-3c4dc",
    storageBucket: "instagram-clone-3c4dc.appspot.com",
    messagingSenderId: "1014849409294",
    appId: "1:1014849409294:web:b1850b76974e34073c475f"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

export {
    app,
    db,
    auth,
    storage
}