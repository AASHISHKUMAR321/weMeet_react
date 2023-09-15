import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import dbref, { userName, connectedInfo } from "./server/firebase";

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

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.currentUser);
  const participants = useSelector((store) => store.participants);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((mediaStream) => {
        // mediaStream.getVideoTracks()[0].enabled = false;
        // console.log(mediaStream);
        dispatch(setUserStream(mediaStream));
      });

    onValue(connectedInfo, (snap) => {
      const participants_ref = child(dbref, "participants");
      if (snap.val()) {
        let default_prefrence = {
          audio: true,
          video: false,
          share: false,
        };
        let user_ref = push(participants_ref, {
          userName,
          preference: default_prefrence,
        });
        dispatch(
          setUser({
            [user_ref.key]: {
              userName,
              ...default_prefrence,
            },
          })
        );
        onDisconnect(user_ref).remove();
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const participants_ref = child(dbref, "participants");
      onChildAdded(participants_ref, (snap) => {
        const { userName, preference } = snap.val();
        dispatch(
          addUser({
            [snap.key]: {
              userName,
              ...preference,
            },
          })
        );
      });
      onChildRemoved(participants_ref, (snap) => {
        dispatch(removeUser(snap.key));
      });
    }
  }, [user]);

  return (
    <>
      {/* <MainScreen /> */}
      <MeetingScreen />
      {/* {JSON.stringify(user)}-{JSON.stringify(participants)} */}
    </>
  );
}

export default App;
