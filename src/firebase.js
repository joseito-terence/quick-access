import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDHEX7EQuU2CwvEZDqTuvzH7LjY_VgJQdQ",
  authDomain: "quick-access-6293a.firebaseapp.com",
  databaseURL: "https://quick-access-6293a.firebaseio.com",
  projectId: "quick-access-6293a",
  storageBucket: "quick-access-6293a.appspot.com",
  messagingSenderId: "318913910074",
  appId: "1:318913910074:web:e5a4deea7450c23d166c03",
  measurementId: "G-NL0NNNC09B",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const dbRef = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

dbRef.enablePersistence().catch(function (err) {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
  } else if (err.code === "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
  }
  console.log(err.code);
});
// Subsequent queries will use persistence, if it was enabled successfully

const db = firebaseApp.firestore().collection("users");

export { auth, provider };
export default db;
