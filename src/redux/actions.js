export const ADD_PARTICIPANTS = "ADD_PARTICIPANTS";
export const REMOVE_PARTICIPANTS = "REMOVE_PARTICIPANTS";
export const SET_USER = "SET_USER";
export const SET_USERSTREAM = "SET_USERSTREAM";

export const setUserStream = (stream) => {
  return {
    type: SET_USERSTREAM,
    payload: {
      mainStrem: stream,
    },
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const addUser = (participant) => {
  return {
    type: ADD_PARTICIPANTS,
    payload: {
      participant,
    },
  };
};

export const removeUser = (participantId) => {
  return {
    type: REMOVE_PARTICIPANTS,
    payload: {
      participantId,
    },
  };
};
