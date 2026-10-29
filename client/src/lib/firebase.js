
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ6yng3GvwTNtMWRXvYV3F1z-89ZoQy20",
  authDomain: "planning-with-ai-14b10.firebaseapp.com",
  projectId: "planning-with-ai-14b10",
  storageBucket: "planning-with-ai-14b10.firebasestorage.app",
  messagingSenderId: "44320643624",
  appId: "1:44320643624:web:7239064aedef7459a9f31d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
