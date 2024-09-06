// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBOUR8oqNDtDSqVzCS_ya_d1J1F5N1TRF4",
  authDomain: "e-commerce-f5370.firebaseapp.com",
  projectId: "e-commerce-f5370",
  storageBucket: "e-commerce-f5370.appspot.com",
  messagingSenderId: "580371292766",
  appId: "1:580371292766:web:f2c7ab86b762dec69b4acf"
};



const app = initializeApp(firebaseConfig);

const storage = getStorage(app); 
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth,storage } ;