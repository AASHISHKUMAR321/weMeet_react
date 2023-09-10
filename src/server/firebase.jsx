import { initializeApp } from "firebase/app";

import { getDatabase, ref, child, push, onValue } from "firebase/database";

const config = {
  apikey: "AIzaSyDKjRRsbYcYGmpkZq-5WEargft3JqCpNVQ",
  databaseURL: "https://wemeet-a801f-default-rtdb.firebaseio.com",
};

export const userName = prompt("enter your  user-name");
const app = initializeApp(config);
getDatabase(app);

let db = getDatabase();

let dbref = ref(db);

// console.log(dbref);

const urlparms = new URLSearchParams(window.location.search);

const roomId = urlparms.get("id");

export let connectedInfo = ref(db, ".info/connected");

// onValue(connectedInfo, (snap) => console.log(snap));

// onValue((snap) => console.log(snap));
// connectedInfo.on("value", (snap) => console.log(snap));

if (roomId) {
  dbref = child(dbref, roomId);
  // dbref = dbref.child(roomId);
} else {
  // console.log(dbref);
  let key = push();
  console.log(key.key);
  dbref = window.history.replaceState(null, "meet", "?id=" + key.key);
}

export default dbref;
