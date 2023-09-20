import { child } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../server/firebase";

export const Private = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (res) => {
      if (!res) {
        navigate("/signin");
        // dispatch(addUser())
        console.log(res);
      } else {
        setUser(true);
      }
    });
    return () => unsub();
  }, []);

  if (user) return children;

  // if (!user) navigate("/signin");
  // else return children;

  // console.log(user);
  // if (user == null)
  // else return children;
};
