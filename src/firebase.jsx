import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDI7PznwdSg14e61korA8mJUhdCfxKEuwM",
  authDomain: "weather-app-da1cb.firebaseapp.com",
  projectId: "weather-app-da1cb",
  storageBucket: "weather-app-da1cb.appspot.com",
  messagingSenderId: "765989273444",
  appId: "1:765989273444:web:2899790436540d2aedc471"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}