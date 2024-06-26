import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineProfile,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaUser, FaVideo } from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";
import { TbDeviceRemote } from "react-icons/tb";
import { Select } from "../Select";
import { signOut } from "firebase/auth";
import { auth } from "../../server/firebase";
import { MenuDivider } from "./Menu";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
export const Header = () => {
  const [userOptions, setUserOptions] = useState(false);
  const [settingsOptions, setSettingsOptions] = useState(false);
  const [settingsState, setSettingsState] = useState({
    audio: true,
    video: false,
    general: false,
  });
  const [allDevice, setAllDevice] = useState({ audio: null, video: null });
  // const [permission,setPermission] = useState()

  const settingsStateHandler = (name) => {
    // setSettingsState((prev) => {
    //   (prev.audio = false), (prev.video = false), (prev.general = false);
    // });

    // setSettingsState({ ...settingsState, [name]: true });
    setSettingsState((prevState) => ({
      ...prevState,
      audio: false,
      video: false,
      general: false,
      [name]: true,
    }));
  };

  async function getConnectedDevices(type) {
    // navigator.mediaDevicesss
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => console.log(stream))
    //   .catch((err) => console.log(err));
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  }

  const deviceHandler = async () => {
    const video_device = await getConnectedDevices("videoinput");
    const audio_device_input = await getConnectedDevices("audioinput");
    const audio_device_output = await getConnectedDevices("audiooutput");

    setAllDevice({
      ...allDevice,
      audio: { input: audio_device_input, output: audio_device_output },
      video: video_device,
    });
  };
  useEffect(() => {
    deviceHandler();
  }, [settingsOptions]);
  console.log(allDevice);
  return (
    <div className="  bg-blue-500 p-4 flex justify-between text-white">
      <div className="flex gap-1 text-2xl">
        <SiGooglemeet className="text-4xl" /> wemeet
      </div>
      <div className="flex text-3xl gap-10 text-white relative">
        <AiOutlineSetting
          onClick={() => {
            if ((allDevice.audio.input[0].labal = " ")) {
              // setSettingsOptions(false);

              navigator.mediaDevices
                .getUserMedia({ audio: true, video: true })
                .then((stream) => setSettingsOptions(true));
            }
            // setSettingsOptions(!settingsOptions);
          }}
        />

        {/* {userOptions ? (
          <div className="absolute cursor-pointer  border-red-400 mt-11 w-[100%]  bg-blue-400 text-2xl justify-start  flex flex-col ">
            <div className="mt-2">Profile</div>
            <div
              onClick={() => {
                signOut(auth).then((d) => alert("signOut successfully"));
              }}
            >
              Log Out
            </div>
          </div>
        ) : (
          ""
        )} */}
        <Menu>
          <MenuHandler>
            <div>
              <FaUser
              // onClick={() => {
              //   setUserOptions(!userOptions);
              // }}
              />
            </div>
          </MenuHandler>
          <MenuList className=" text-sm w-[200px]">
            <MenuItem className="text-xl">user profile</MenuItem>

            <MenuItem
              className="text-xl"
              onClick={() => console.log("logout is clicked")}
            >
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
        {settingsOptions ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => {
                setSettingsOptions(!settingsOptions);
              }} // Close settings when clicking the overlay
            ></div>

            <div
              className={`bg-white p-4 rounded-lg shadow-md  z-50 lg:w-[50%] md:w-[90%] h-[50%] w-[90%] relative text-black grid grid-cols-[30%,1%,auto] `}
            >
              <div className={`flex gap-3 flex-col text-base`}>
                <div className="hidden lg:inline-block md:inline-block text-2xl">
                  Settings
                </div>
                <div
                  className={`flex ${
                    settingsState.audio ? "" : "hover:bg-slate-50"
                  } gap-2 transition-transform duration-200 ease-in-out transform hover:shadow-md p-3 rounded-lg cursor-pointer ${
                    settingsState.audio ? "bg-blue-300" : ""
                  } mt-2 `}
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
                {/* <div
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
                </div> */}
              </div>
              <div className="border-2 border-black-400 w-[1px]"> </div>
              <div className=" cursor-pointer ">
                <div className="float-right">
                  <AiOutlineClose
                    onClick={() => {
                      setAllDevice({ audio: null, video: null });
                      setSettingsOptions(!settingsOptions);
                      setSettingsState((prevState) => ({
                        ...prevState,
                        audio: true,
                        video: false,
                        general: false,
                      }));
                    }}
                    className="cursor-pointer"
                  />
                </div>
                {settingsState.audio ? (
                  <div className="flex flex-col mt-10 gap-5">
                    <Select title="Microphone" data={allDevice.audio.input} />
                    <Select title="Speakers" data={allDevice.audio.output} />
                  </div>
                ) : (
                  ""
                )}
                {settingsState.video ? (
                  <div className="flex flex-col mt-10 gap-5">
                    <Select title="Microphone" data={allDevice.video} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
