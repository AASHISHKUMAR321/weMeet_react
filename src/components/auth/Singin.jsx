import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth, key, provider } from "../../server/firebase";
import { useNavigate } from "react-router-dom";

export const Singin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (res) => {
      console.log(res);
      if (!res) {
        signInWithPopup(auth, provider).then((d) => {
          let user = {
            email: d.user.email,
            userName: d.user.displayName,
          };
          navigate(`/${key.key}`);
          // localStorage.setItem("user", JSON.stringify(user));
          // let user_data = JSON.parse(localStorage.getItem("user"));
          // if (user_data) {
          //   navigate(`/${key.key}`);
          // }
        });
      } else {
        navigate(`/${key.key}`);
      }
    });
    return () => unsub();
  }, []);
  return <div>Singin</div>;
};
