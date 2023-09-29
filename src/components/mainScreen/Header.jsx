import React, { useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineProfile,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaUser, FaVideo } from "react-icons/fa";
import { TbDeviceRemote } from "react-icons/tb";
export const Header = () => {
  const [userOptions, setUserOptions] = useState(false);
  const [settingsOptions, setSettingsOptions] = useState(false);
  const [settingsState, setSettingsState] = useState({
    audio: false,
    video: false,
    general: false,
  });

  const settingsStateHandler = (name) => {
    setSettingsState((prev) => {
      (prev.audio = false), (prev.video = false), (prev.general = false);
    });

    setSettingsState({ ...settingsState, [name]: true });
  };
  console.log("before", settingsState);
  return (
    <div className="  bg-blue-500 p-4 flex justify-between text-white">
      <div>wemeet</div>
      <div className="flex text-3xl gap-10 text-white relative">
        <AiOutlineSetting
          onClick={() => {
            setSettingsOptions(!settingsOptions);
          }}
        />
        <FaUser
          onClick={() => {
            setUserOptions(!userOptions);
          }}
        />
        {userOptions ? (
          <div className="absolute cursor-pointer  border-red-400 mt-11 w-[100%]  bg-blue-400 text-2xl justify-start  flex flex-col ">
            <div className="mt-2">Profile</div>
            <div>Log Out</div>
          </div>
        ) : (
          ""
        )}
        {settingsOptions ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setSettingsOptions(!settingsOptions)} // Close settings when clicking the overlay
            ></div>

            <div
              className={`bg-white p-4 rounded-lg shadow-md  z-50 lg:w-[50%] md:w-[90%] h-[50%] w-[90%] relative text-black grid grid-cols-3 `}
            >
              <div className={`flex gap-3 flex-col text-base`}>
                <div className="hidden lg:inline-block md:inline-block text-2xl">
                  Settings
                </div>
                <div
                  className={`flex ${
                    settingsState.audio ? "" : "hover:bg-slate-50"
                  } gap-4 transition-transform duration-200 ease-in-out transform hover:shadow-md p-3 rounded-lg cursor-pointer ${
                    settingsState.audio ? "bg-blue-300" : ""
                  } `}
                  onClick={() => settingsStateHandler("audio")}
                >
                  <div>
                    <TbDeviceRemote className="text-2xl" />
                  </div>
                  <div className="hidden    lg:inline-block md:inline-block  ">
                    Audio
                  </div>
                </div>
                <div
                  className={`flex gap-4 ${
                    settingsState.video ? "" : "hover:bg-slate-50"
                  }  transition-transform duration-200 ease-in-out transform hover:shadow-md p-3 rounded-lg  cursor-pointer ${
                    settingsState.video ? "bg-blue-300" : ""
                  }  `}
                  onClick={() => settingsStateHandler("video")}
                >
                  <div>
                    <FaVideo className="text-2xl" />
                  </div>
                  <div className="hidden lg:inline-block md:inline-block">
                    video
                  </div>
                </div>
                <div
                  className={`flex gap-4 transition-transform duration-200 ease-in-out transform ${
                    settingsState.general ? "" : "hover:bg-slate-50"
                  } hover:shadow-md p-3 rounded-lg cursor-pointer ${
                    settingsState.general ? "bg-blue-300" : ""
                  } `}
                  onClick={() => settingsStateHandler("general")}
                >
                  <div>
                    <AiOutlineSetting className="text-2xl" />
                  </div>
                  <div className="hidden lg:inline-block md:inline-block">
                    General
                  </div>
                </div>
              </div>
              <div className="border-2 border-black-400 w-[1px]"> </div>
              <div>right side</div>
            </div>

            {/* Settings container */}
            {/* <div className="bg-white p-4 rounded-lg shadow-md  z-50 w-[40%] h-[50%] relative">
             

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
                      onClick={() => setSettingsOptions(false)}
                    />
                  </div>
                  <div className=" border-2 border-red-300 p-4">
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
