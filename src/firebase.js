import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAZPPT06PFKJKZWRXg_TxLOv0qQ6W_HooY",
  authDomain: "ipangram-61023.firebaseapp.com",
  projectId: "ipangram-61023",
  storageBucket: "ipangram-61023.appspot.com",
  messagingSenderId: "955608924857",
  appId: "1:955608924857:web:3cd5b6edccddb2f11f5168",
  measurementId: "G-WRJMHL80BG"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore(app)

export {auth,db}