import { createOffer, intitListeners } from "../server/peerConnection";
import {
  ADD_PARTICIPANTS,
  REMOVE_PARTICIPANTS,
  SET_USER,
  SET_USERSTREAM,
} from "./actions";

let init_state = {
  currentUser: null,
  participants: {},
  mainStrem: null,
};

const stunServers = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
        "stun:stun.services.mozilla.com",
      ],
    },
  ],
};

export const reducer = (state = init_state, action) => {
  switch (action.type) {
    case SET_USERSTREAM: {
      let { payload } = action;

      let x = { ...state, ...payload };

      return x;
    }

    case SET_USER: {
      let { payload } = action;
      intitListeners(Object.keys(payload.currentUser)[0]);
      return { ...state, currentUser: { ...payload.currentUser } };
    }
    case ADD_PARTICIPANTS: {
      let { payload } = action;
      // console.log(payload);
      const currentUserId = Object.keys(state.currentUser)[0];
      const participantID = Object.keys(payload.participant)[0];

      if (currentUserId == participantID) {
        payload.participant[participantID].currentUser = true;
      }
      console.log("stream", state.mainStream);
      if (state.mainStrem && currentUserId != participantID) {
        // console.log("mainstream working");
        addConnection(state.currentUser, payload.participant, state.mainStrem);
      }
      // console.log(payload);
      let participants = { ...state.participants, ...payload.participant };
      // console.log(state.participants, participants);
      return { ...state, participants };
    }
    case REMOVE_PARTICIPANTS: {
      let { payload } = action;
      let participants = { ...state.participants };
      delete participants[payload.participantId];
      return { ...state, participants };
    }
    default:
      return state;
  }
};

const addConnection = (currentUser, newUser, mediaStrem) => {
  console.log("addconnection");
  const peerConnection = new RTCPeerConnection(stunServers);
  mediaStrem.getTracks().forEach((track) => {
    peerConnection.addTrack(track, mediaStrem);
  });

  const currentUserKey = Object.keys(currentUser)[0];
  let newUserKey = Object.keys(newUser)[0];

  newUser[newUserKey].peerConnection = peerConnection;

  const sortedIDs = [currentUserKey, newUserKey].sort((a, b) =>
    a.localeCompare(b)
  );

  if (sortedIDs[1] == currentUserKey) {
    createOffer(peerConnection, sortedIDs[1], sortedIDs[0]);
  }
};
