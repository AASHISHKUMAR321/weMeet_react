import { initializeApp } from "firebase/app";

import { getDatabase, ref, child, push, onValue } from "firebase/database";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// const config = {
//   apikey: "AIzaSyDKjRRsbYcYGmpkZq-5WEargft3JqCpNVQ",
//   databaseURL: "https://wemeet-a801f-default-rtdb.firebaseio.com",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDKjRRsbYcYGmpkZq-5WEargft3JqCpNVQ",
  authDomain: "wemeet-a801f.firebaseapp.com",
  databaseURL: "https://wemeet-a801f-default-rtdb.firebaseio.com",
  projectId: "wemeet-a801f",
  storageBucket: "wemeet-a801f.appspot.com",
  messagingSenderId: "539639555063",
  appId: "1:539639555063:web:1da08fdafd0cefc98344f2",
  measurementId: "G-NKNFGNEGMK",
};

const user = JSON.parse(localStorage.getItem("user")) || null;
const userName = user?.userName;
const app = initializeApp(firebaseConfig);
let db = getDatabase(app);

let dbref = ref(db);

// console.log(dbref);

const urlparms = new URLSearchParams(window.location.search);

const roomId = urlparms.get("id");

let connectedInfo = ref(db, ".info/connected");

// onValue(connectedInfo, (snap) => console.log(snap));

// onValue((snap) => console.log(snap));
// connectedInfo.on("value", (snap) => console.log(snap));

export let key = null;
if (roomId) {
  dbref = child(dbref, roomId);
  // dbref = dbref.child(roomId);
} else {
  // console.log(dbref);
  key = push(dbref);
  // console.log(key);
  // dbref = window.history.replaceState(null, "meet", "?id=" + key.key);
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { dbref, provider, auth, userName, connectedInfo };
