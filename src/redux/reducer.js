import { ADD_PARTICIPANTS, REMOVE_PARTICIPANTS, SET_USER } from "./actions";

let init_state = {
  currentUser: null,
  participants: {},
};

export const reducer = (state = init_state, action) => {
  switch (action.type) {
    case SET_USER: {
      let { payload } = action;
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
      console.log(payload);
      let participants = { ...state.participants, ...payload.participant };
      // console.log(state.participants, payload);
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
