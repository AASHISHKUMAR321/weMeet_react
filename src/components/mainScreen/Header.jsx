import React, { useState } from "react";
import { AiOutlineProfile, AiOutlineSetting } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
export const Header = () => {
  const [userOptions, setUserOptions] = useState(false);
  const [settingsOptions, setSettingsOptions] = useState(false);

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
        {settingsOptions ? <div className=" fixed inset-0">settings</div> : ""}
      </div>
    </div>
  );
};
