import React from "react";
import Footer from "./footer/Footer";
import { useSelector } from "react-redux";
import { PatCard } from "../partcipients/participent/PatCard";

export const MeetingScreen = () => {
  const participants = useSelector((store) => store.participants);
  console.log(participants);
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
