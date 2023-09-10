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
import { addUser, removeUser, setUser } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.currentUser);
  const participants = useSelector((store) => store.participants);

  useEffect(() => {
    // connectedInfo.on("value",snap=>{
    // })

    const participants_ref = child(dbref, "participants");
    onValue(connectedInfo, (snap) => {
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
    const participants_ref = child(dbref, "participants");
    if (user) {
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
      {JSON.stringify(user)}-{JSON.stringify(participants)}
    </>
  );
}

export default App;
