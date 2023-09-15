import { child, onChildAdded, push, set } from "firebase/database";
import dbref from "./firebase";
import { Store } from "../redux/store";

const participants_ref = child(dbref, "participants");

export const createOffer = async (peerConnection, createdId, receiverId) => {
  const receiverRef = child(participants_ref, receiverId);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const json = event.candidate.toJSON();
      push(child(receiverRef, "offerCandidate"), {
        ...json,
        userId: createdId,
      });
    }
  };

  const offerPayload = {
    sdp: offer.sdp,
    type: offer.type,
    userId: createdId,
  };
  console.log(receiverRef, offerPayload);
  let s = await push(child(receiverRef, "offers"));
  await set(s, { offerPayload });
};

export const intitListeners = (currentUserId) => {
  const recever_ref = child(participants_ref, currentUserId);

  let offer_ref = child(recever_ref, "offers");

  onChildAdded(offer_ref, async (snap) => {
    const data = snap.val();
    if (data?.offerPayload) {
      const createdId = data?.offerPayload.userId;
      const peerConnection =
        Store.getState().participants[createdId].peerConnection;

      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data?.offerPayload)
      );
      // console.log(peerConnection);
      creatAnswer(peerConnection, currentUserId, createdId);
    }
  });

  let offerCandidate_ref = child(recever_ref, "offerCandidates");

  onChildAdded(offerCandidate_ref, async (snap) => {
    const data = snap.val();
    if (data?.userId) {
      const peerConnection =
        Store.getState().participants[data?.userId].peerConnection;

      peerConnection.addIceCandidate(new RTCIceCandidate(data));
    }
  });

  let answer_ref = child(recever_ref, "answers");

  onChildAdded(answer_ref, async (snap) => {
    const data = snap.val();
    if (data?.answerPayload) {
      const createdId = data?.answerPayload.userId;
      const peerConnection =
        Store.getState().participants[createdId].peerConnection;

      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data?.answerPayload)
      );
    }
  });
  let answerCandidate_ref = child(recever_ref, "answerCandidates");

  onChildAdded(answerCandidate_ref, async (snap) => {
    const data = snap.val();
    if (data?.userId) {
      const peerConnection =
        Store.getState().participants[data?.userId].peerConnection;

      peerConnection.addIceCandidate(new RTCIceCandidate(data));
    }
  });
};

const creatAnswer = async (peerConnection, currentUserId, receiverId) => {
  const receiverRef = child(participants_ref, receiverId);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const json = event.candidate.toJSON();
      push(child(receiverRef, "answerCandidate"), {
        ...json,
        userId: currentUserId,
      });
    }
  };

  const anwerPayload = {
    sdp: answer.sdp,
    type: answer.type,
    userId: currentUserId,
  };
  // console.log(receiverRef, offerPayload);
  let s = await push(child(receiverRef, "answers"));
  await set(s, { anwerPayload });
};
