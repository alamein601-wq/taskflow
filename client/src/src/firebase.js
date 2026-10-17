import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2JtL74XHeUsQqXZ-I3AfyWn8W",
  authDomain: "coffee-spark-ai-barista-f3479.firebaseapp.com",
  projectId: "coffee-spark-ai-barista-f3479",
  storageBucket: "coffee-spark-ai-barista-f3479.appspot.com",
  messagingSenderId: "780482456568",
  appId: "1:780482456568:web:765576ac0492feecb1c40d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
