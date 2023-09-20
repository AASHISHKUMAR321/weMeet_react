import React, { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { PatCard } from "../partcipients/participent/PatCard";
import {
  child,
  onChildAdded,
  onChildRemoved,
  onDisconnect,
  onValue,
  push,
} from "firebase/database";
import { auth, connectedInfo, dbref } from "../../server/firebase";
import {
  addUser,
  removeUser,
  setUser,
  setUserStream,
} from "../../redux/actions";
import { onAuthStateChanged } from "firebase/auth";

export const MeetingScreen = () => {
  // const participants = useSelector((store) => store.participants);
  // console.log(participants);
  // useEffect(() => {
  //   console.log("meeting page");
  // }, []);
  const [userName, setUserName] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.currentUser);
  const participants = useSelector((store) => store.participants);
  console.log(userName);

  useEffect(() => {
    // console.log("userName", userName);
    // const { userName } = JSON.parse(localStorage.getItem("user"));

    let unsub = onAuthStateChanged(auth, (res) => {
      // if (res) {
      //   setUserName(res.displayName);
      //   // dispatch(addUser())
      // }

      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((mediaStream) => {
          mediaStream.getVideoTracks()[0].enabled = true;
          // console.log(mediaStream);
          console.log(mediaStream);
          dispatch(setUserStream(mediaStream));
        })
        .catch((err) => console.log(err));

      onValue(connectedInfo, (snap) => {
        const participants_ref = child(dbref, "participants");
        if (snap.val()) {
          let default_prefrence = {
            audio: true,
            video: false,
            share: false,
          };
          let user_ref = push(participants_ref, {
            userName: res.displayName,
            preference: default_prefrence,
          });
          dispatch(
            setUser({
              [user_ref.key]: {
                userName: res.displayName,
                ...default_prefrence,
              },
            })
          );
          onDisconnect(user_ref).remove();
        }
      });
    });
    return () => unsub();
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
    <div className="w-full  flex flex-col justify-start">
      <div className="min-h-[90vh]  grid grid-cols-2">
        {Object.keys(participants).map((e) => (
          <PatCard {...participants[e]} />
        ))}
      </div>
      <div className=" w-full min-h-[10vh] ">
        <Footer />
      </div>
    </div>
  );
};
