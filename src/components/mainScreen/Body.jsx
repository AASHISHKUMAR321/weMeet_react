import React, { useEffect, useRef, useState } from "react";
import { Timer } from "./Timer";
import { MdInsertLink, MdVideoCall } from "react-icons/md";
import { FaKeyboard } from "react-icons/fa";
import { BsCalendarPlus } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { key } from "../../server/firebase";

export const Body = ({ clickHander }) => {
  const [meetingOptions, setMeetingOptions] = useState(false);

  const divRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click event target is not inside the div
      if (divRef.current && !divRef.current.contains(event.target)) {
        // Perform your action here
        setMeetingOptions(false);
      }
    }

    // Attach a click event listener to the entire document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="sm:grid-cols-2   md:grid-cols-1 grid lg:grid-cols-2 lg:mt-56 lg:w-[80%] m-auto  mt-10  md:mt-10 md:text-center text-center lg:text-start md:w-[80%] w-[90%] gap-10 ">
      <div className=" flex-1">
        <div>
          <div className="text-5xl">
            Premium video meetings. <br />
            Now free for everyone
          </div>
          <div className="text-3xl mt-8">
            We have built app for meetings , we Meet, to make it free video &
            audio call available for all.
          </div>
        </div>
        <div className="">
          <Timer />
        </div>
        <div
          className="grid md:grid-cols-[30%,70%] lg:grid-cols-[40%,60%]  mt-5 sm:grid-cols-2 justify-start"
          ref={divRef}
        >
          <div className="relative">
            <button
              className="bg-blue-600 text-white px-6 py-3  rounded-md flex gap-3 "
              onClick={() => {
                setMeetingOptions(!meetingOptions);
              }}
            >
              <MdVideoCall className=" text-2xl " />
              New Metting
            </button>
            {meetingOptions ? (
              <div className="absolute top-0 left-0 w-80 p-2 bg-white border border-gray-300 rounded shadow ">
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
            ) : (
              ""
            )}
          </div>

          <div className=" border rounded-lg flex border-blue-400 mt-5 md:mt-0 ">
            <div className=" w-[20%]  inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-2xl ">
              <FaKeyboard className="text-3xl text-blue-400" />
            </div>
            <div className="">
              <input
                type="text"
                className="w-[80%] px-4 py-3  rounded-lg outline-none"
                placeholder="Enter a code or link"
              />
              join
            </div>
          </div>
        </div>
        <hr className="mt-10" />
      </div>

      <div className="flex-1">
        <div className="m-auto w-[70%]">
          <img src="src/assets/5218235.jpg" alt="" className="rounded-3xl" />
          <h1 className="text-center text-2xl mt-5">
            Get a link you can share
          </h1>
          <p className="text-center text-m">
            Click New meeting to get a link you can share to people <br /> you
            want to meet with
          </p>
        </div>
      </div>
    </div>
  );
};
