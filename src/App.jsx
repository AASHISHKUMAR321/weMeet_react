import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { dbref, userName, connectedInfo, auth } from "./server/firebase";

import {
  onValue,
  child,
  push,
  onDisconnect,
  onChildAdded,
  onChildRemoved,
} from "firebase/database";

import { connect, useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, setUser, setUserStream } from "./redux/actions";
import { MeetingScreen } from "./components/MeetingScreen/MeetingScreen";
import { MainScreen } from "./components/mainScreen/MainScreen";
import { MainRoute } from "./routes/MainRoute";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.currentUser);
  // const participants = useSelector((store) => store.participants);

  // useEffect(() => {
  //   console.log("connectedInfo", connectedInfo);
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then((mediaStream) => {
  //       mediaStream.getVideoTracks()[0].enabled = true;
  //       // console.log(mediaStream);
  //       console.log(mediaStream);
  //       dispatch(setUserStream(mediaStream));
  //     })
  //     .catch((err) => console.log(err));

  //   onValue(connectedInfo, (snap) => {
  //     const participants_ref = child(dbref, "participants");
  //     if (snap.val()) {
  //       let default_prefrence = {
  //         audio: true,
  //         video: false,
  //         share: false,
  //       };
  //       let user_ref = push(participants_ref, {
  //         userName,
  //         preference: default_prefrence,
  //       });
  //       dispatch(
  //         setUser({
  //           [user_ref.key]: {
  //             userName,
  //             ...default_prefrence,
  //           },
  //         })
  //       );
  //       onDisconnect(user_ref).remove();
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     const participants_ref = child(dbref, "participants");
  //     onChildAdded(participants_ref, (snap) => {
  //       const { userName, preference } = snap.val();
  //       dispatch(
  //         addUser({
  //           [snap.key]: {
  //             userName,
  //             ...preference,
  //           },
  //         })
  //       );
  //     });
  //     onChildRemoved(participants_ref, (snap) => {
  //       dispatch(removeUser(snap.key));
  //     });
  //   }
  // }, [user]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (res) => {
      if (res) {
        // dispatch(addUser())
        console.log(res);
      }
    });
    return unsub();
  }, []);

  return (
    <>
      {/* <MainScreen /> */}
      <MainRoute />
      {/* <MeetingScreen /> */}
      {/* {JSON.stringify(user)}-{JSON.stringify(participants)} */}
    </>
  );
}

export default App;
