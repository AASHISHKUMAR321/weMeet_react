import { useState } from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

export default function Footer() {
  const [video, setvideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [share, setShare] = useState(false);
  return (
    <div className="flex flex-col w-full min-h-[10vh]">
      {/* Main content */}
      <div className="min-h-full">
        {/* Place your video and audio content here */}
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-center items-center bg-gray-200 py-4">
        <button
          onClick={() => setvideo(!video)}
          className="mr-4   px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {video ? (
            <FaVideoSlash className="text-2xl" />
          ) : (
            <FaVideo className="text-2xl" />
          )}
        </button>
        <button
          onClick={() => setAudio(!audio)}
          className="mr-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {audio ? (
            <AiOutlineAudioMuted className="text-2xl" />
          ) : (
            <AiOutlineAudio className="text-2xl" />
          )}
        </button>
        <button
          onClick={() => setShare(!share)}
          className="px-4 mr-5 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {share ? (
            <MdOutlineStopScreenShare className="text-2xl" />
          ) : (
            <MdOutlineScreenShare className="text-2xl" />
          )}
        </button>
        <button className="mr-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          <FiSettings className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
