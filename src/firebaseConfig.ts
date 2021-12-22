import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCbYvYV6wPL_hj3GhzBAtStbyXaZw_CSJw",
  authDomain: "poc-analytics-3546e.firebaseapp.com",
  databaseURL: "https://poc-analytics-3546e-default-rtdb.firebaseio.com",
  projectId: "poc-analytics-3546e",
  storageBucket: "poc-analytics-3546e.appspot.com",
  messagingSenderId: "772665606674",
  appId: "1:772665606674:web:be74131c9c1d251659cecb",
  measurementId: "G-BM8YB26BY3"
}

//Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)