import React, { useEffect, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
export const PatCard = (e) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const video_ref = useRef(null);
  const remote_strem = new MediaStream();

  const userStream = useSelector((store) => store.mainStrem);
  useEffect(() => {
    if (e.peerConnection) {
      e.peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remote_strem.addTrack(track);
        });
        video_ref.current.srcObject = remote_strem;
      };
    }
  }, [e.peerConnection]);

  useEffect(() => {
    if (userStream && e.currentUser) {
      video_ref.current.srcObject = userStream;
    }
  }, [e.currentUser, userStream]);
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full  text-center relative border-2 border-green-400">
      <div className="bg-white rounded-full w-32 h-32 p-2 flex items-center justify-center shadow-lg mx-auto">
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
          <img
            src={"avatarSrc" || "default-avatar.jpg"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <video ref={video_ref} autoPlay playsInline></video>
        </div>
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={toggleMute}
            className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="text-lg font-semibold">{e.userName}</h2>
      </div>
    </div>
  );
};
