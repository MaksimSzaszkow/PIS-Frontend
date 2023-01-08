import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmeCuJMlwUjBBZRRDoMJg1rP-HehPtCiM",
  authDomain: "pis-projekt-a4a77.firebaseapp.com",
  projectId: "pis-projekt-a4a77",
  storageBucket: "pis-projekt-a4a77.appspot.com",
  messagingSenderId: "744819520554",
  appId: "1:744819520554:web:a3a8247247a195827d7f53",
  measurementId: "G-NY3GH3Q1L6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
