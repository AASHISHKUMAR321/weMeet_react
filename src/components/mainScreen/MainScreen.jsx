import React, { useState } from "react";
import { SiGooglemeet } from "react-icons/si";
import { MdVideoCall } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa";
import { MdInsertLink } from "react-icons/md";
import {
  AiOutlinePlus,
  AiOutlineSetting,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsCalendarPlus } from "react-icons/bs";

import { FaUserCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { key } from "../../server/firebase";

export const MainScreen = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [settings, setSettings] = useState(false);

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
    <div className="w-full h-full ">
      <div className=" sm:w-full w-full bg-blue-500 p-4 flex justify-between items-center min-w-full-screen ">
        <div className="flex items-center">
          <SiGooglemeet className="text-3xl text-white" />
          <h1 className="text-white text-lg font-semibold ml-2"> WeMeet</h1>
        </div>

        <div className="text-white text-xl flex gap-5 ">
          <FaUserCircle className="text-3xl text-white" />
          <AiOutlineSetting
            className="text-3xl text-white "
            onClick={() => setSettings(!settings)}
          />
        </div>
      </div>

      <div className="sm:flex-row w-full min-h-[90vh]  flex flex-col  ">
        <div className="m-auto flex gap-10 flex-col justify-start ">
          <div className="sm:w-[800px] text-start w-[600px] font-medium text-[#3c4043] m-auto ">
            <h1 className="text-6xl  ">
              Premium video meetings. <br />
              Now free for everyone
            </h1>
            <p className="text-lg">
              We have built app for meetings , we Meet, to make it free video &
              audio call available for all.
            </p>
          </div>
          <div>{/* <SimpleClock /> */}</div>

          <div className=" gap-4 flex  w-[80%] m-auto ">
            <div onClick={handleButtonClick} className="relative text-sm ">
              <button className="bg-blue-600 text-white p-3  rounded-md flex  ">
                <MdVideoCall className=" text-4xl " /> new meet
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

            <div className=" border rounded-lg flex border-blue-400  ">
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
        <div className="m-auto rounded-lg w-[400px] h-[300px]  ">
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

      <div>
        {settings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setSettings(!settings)} // Close settings when clicking the overlay
            ></div>

            {/* Settings container */}
            <div className="bg-white p-4 rounded-lg shadow-md  z-50 w-[40%] h-[50%] relative">
              {/* <div className="flex justify-evenly gap-96 text-3xl ">
                <div>Settings</div>
                <div>
                  <button
                    onClick={() => setSettings(!setSettings)}
                    className=" text-blue-600 py-2 px-4 rounded-md float-right"

                  >
                    <AiOutlineCloseCircle className="text-5xl" />
                  </button>
                </div>
              </div> */}

              <div className="flex justify-between h-full">
                <div className="text-2xl">
                  <div className="text-2xl mb-7">Settings</div>
                  <div className="ml-[10%]">
                    <div>Audio</div>
                    <div>Video</div>
                    <div>General</div>
                  </div>
                </div>
                <div className=" h-[97%] border-2 border-black-500"></div>
                <div className="min-w-[40%] flex flex-col border-2 border-black-500 ">
                  <div className="flex justify-end ">
                    <AiOutlineCloseCircle
                      className="text-4xl text-blue-600 "
                      onClick={() => setSettings(!setSettings)}
                    />
                  </div>
                  <div className=" border-2 border-red-300 p-4">
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
