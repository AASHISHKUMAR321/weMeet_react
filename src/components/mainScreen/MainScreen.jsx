import React, { useState } from "react";
import { SiGooglemeet } from "react-icons/si";
import { MdVideoCall } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa";
import { MdInsertLink } from "react-icons/md";
import { AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import { BsCalendarPlus } from "react-icons/bs";

import { FaUserCircle } from "react-icons/fa";
import UniqueTimeDisplay from "./UniqueTimeDisplay";
import ClockTimeDisplay from "./UniqueTimeDisplay";
import CircularClock from "./UniqueTimeDisplay";
import RectangularClock from "./UniqueTimeDisplay";
import SimpleClock from "./UniqueTimeDisplay";
import { Link } from "react-router-dom";
import { key } from "../../server/firebase";

export const MainScreen = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const currentTime = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return (
    <div className="w-full h-full">
      <header className="bg-blue-500 p-4 flex justify-between items-center">
        {/* Left side logo */}
        <div className="flex items-center">
          <SiGooglemeet className="text-3xl text-white" />
          <h1 className="text-white text-lg font-semibold ml-2"> WeMeet</h1>
        </div>

        {/* Right side date, time, and profile */}
        <div className="text-white text-xl flex gap-5 ">
          {/* <p>{currentDateTime}</p> */}

          <FaUserCircle className="text-3xl text-white" />
          <AiOutlineSetting className="text-3xl text-white" />
        </div>
      </header>

      <div className="w-full min-h-[90vh]  flex ">
        <div className="m-auto flex gap-10 flex-col justify-start ">
          <div className=" text-start w-[400px] font-medium text-[#3c4043] ">
            <h1 className="text-2xl  ">
              Premium video meetings. <br />
              Now free for everyone
            </h1>
            <p className="text-m">
              We have built app for meetings , we Meet, to make it free video &
              audio call available for all.
            </p>
          </div>
          <div>
            <SimpleClock />
          </div>
          <div className="gap-4 flex ">
            <div onClick={handleButtonClick} className="relative">
              <button className="bg-blue-600 text-white p-3  rounded-md flex ">
                <MdVideoCall className="text-2xl " /> new meet
              </button>
              {showOptions && (
                <div className="absolute top-0 left-0 w-80 p-2 bg-white border border-gray-300 rounded shadow">
                  <ul className=" list-inside text-lg list-none p-3 flex flex-col gap-3 cursor-pointer">
                    <Link className="flex gap-5" to={`/${key.key}`}>
                      <AiOutlinePlus className="text-2xl" />
                      Start an instant meeting
                    </Link>
                    <li className="flex gap-5">
                      <MdInsertLink className="text-2xl" /> Create a meeting for
                      later
                    </li>
                    <li className="flex gap-5">
                      {" "}
                      <BsCalendarPlus className="text-2xl" />
                      Schedule in Google Calender
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* <input
              type="text"
              className="p-2 border-2"
              placeholder="Enter a code or link"
            /> */}

            <div className=" border rounded-lg flex border-blue-400 ">
              <div className=" w-[20%]  inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-2xl ">
                <FaKeyboard className="text-3xl text-blue-400" />
              </div>
              <div className="">
                <input
                  type="text"
                  className="w-[100%] px-4 py-3  rounded-lg outline-none"
                  placeholder="Enter a code or link"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="m-auto rounded-lg w-[400px] h-[300px] ">
          <img
            src="src/assets/5218235.jpg"
            alt=""
            className=" rounded-[10%] pb-3"
          />
          <h1 className="text-center text-lg">Get a link you can share</h1>
          <p className="text-center text-sm">
            Click New meeting to get a link you can share to people <br /> you
            want to meet with
          </p>
        </div>
      </div>
    </div>
  );
};
