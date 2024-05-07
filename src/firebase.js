import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBeih9bE4ADA2MW_4zZR7MbHeC9w2kDI7M",
  authDomain: "chaffer-admin.firebaseapp.com",
  projectId: "chaffer-admin",
  storageBucket: "chaffer-admin.appspot.com",
  messagingSenderId: "366983544557",
  appId: "1:366983544557:web:8e98dd811c7fd6c40d56e4",
  measurementId: "G-LQVX5N79BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);    

const storage = getStorage(app);

export { storage, app as default };