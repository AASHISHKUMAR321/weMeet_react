import db from "firebase/firestore";

// export default db;

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

let localStrem = null;
let remoteStrem = null;
let peerConnection = null;

// const  createRoom = async()=>{

// const peerConnection = new RTCPeerConnection(configuration);

// console.log(peerConnection);

// registerPeerconctinListeners()

// localStrem.getTrack().forEach(track=>{

//     peerConnection.addTrack(track,localStrem)
// })

// //code for collecting ice candidate

// //1- get the ref of callercandidate collection

// peerConnection.addEventListener('icecandidate',event=>{

//     if(!event.candidate){
//           console.log("got final candidate")
//           return
//     }
//     callercandidate.add(event.candidate.toJSON())

// })

// //code for creating a room

//   const offer =await peerConnection.createOffer()

//  await  peerConnection.localDescription(offer)

//  const roomWithOffer = {
//     'offer':{
//         type:offer.type,
//         sdp:offer.sdp
//     }
//  }

//  //we have to set this roomWithOffer obj in room collection

// peerConnection.addEventListener("track",event=>{

//    event.streams[0].getTrack().forEach(track=>{
//       remoteStrem.addTrack(track)
//    })
// })

// //we have to listen remote session description

// }

async function createRoom() {
  let room_ref = db.collection("rooms").doc();

  peerConnection = new RTCPeerConnection(configuration);

  registerPeerconncetionListeners();

  localStrem.getTrack().forEach((track) => {
    peerConnection.addTrack(track, localStrem);
  });

  //collecting the ice
  const callerCandiatesCollection = room_ref.collection("callerCandidates");

  peerConnection.addEventListener("icecandidate", (event) => {
    if (!event.candidate) {
      console.log("got the final candidate");
      return;
    }

    callerCandiatesCollection.add(event.candidate.toJSON());
  });

  //code for creating a room

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  const roomWithOffer = {
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  };
  await room_ref.set(roomWithOffer);
  roomId = room_ref.id;

  peerConnection.addEventListener("track", (event) => {
    event.strems[0].addTrack().forEach((track) => {
      remoteStrem.addTrack(track);
    });
  });

  room_ref.onSnapShot(async (snap) => {
    snap.data();
  });
}
