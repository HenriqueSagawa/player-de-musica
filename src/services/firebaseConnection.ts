import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcfR_bEiG_WDtZtFZesy5qLvwQCCX0rgs",
  authDomain: "player-de-musica-b90b2.firebaseapp.com",
  projectId: "player-de-musica-b90b2",
  storageBucket: "player-de-musica-b90b2.appspot.com",
  messagingSenderId: "573008822609",
  appId: "1:573008822609:web:1bd45b13e1c63b87039370",
  measurementId: "G-03HC25HS6B"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
