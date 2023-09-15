import React from "react";
import { SiGooglemeet } from "react-icons/si";

import { FaUserCircle } from "react-icons/fa";

export const MainScreen = () => {
  const currentTime = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const currentDateTime = currentTime.toLocaleDateString(undefined, options);

  return (
    <div className="w-full h-full">
      <header className="bg-blue-500 p-2 flex justify-between items-center">
        {/* Left side logo */}
        <div className="flex items-center">
          {/* <img
            src="public/up .png"
            alt="Meet App Logo"
            className="w-10 h-10 mr-2"
          /> */}
          <SiGooglemeet className="text-3xl text-white" />
          <h1 className="text-white text-lg font-semibold ml-2"> WeMeet</h1>
        </div>

        {/* Right side date, time, and profile */}
        <div className="text-white text-base flex gap-5 ">
          <p>{currentDateTime}</p>
          <FaUserCircle className="text-3xl text-white" />
          {/* <div className="flex items-center">
            <img
              src="/path/to/your/profile-icon.png"
              alt="User Profile"
              className="w-6 h-6 mr-2"
            />
            <p></p>
          </div> */}
        </div>
      </header>
      <div className="w-full min-h-[70vh] border-2 border-green-400 flex justify-evenly">
        <div className="m-auto flex gap-10">
          <button className="bg-blue-600 text-white p-5 rounded-md ">
            Start Meet
          </button>
          <input type="text" placeholder="past your link here" />
        </div>
        <div className="m-auto">right</div>
      </div>
    </div>
  );
};
