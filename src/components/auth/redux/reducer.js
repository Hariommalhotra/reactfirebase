import {
  SET_AUTH_USER,
  SET_IS_AUTHENTICATED,
  SET_IS_FETCHING_AUTH_USER,
} from "./types";

const initialState = {
  isAuthenticated: false,
  authUser: null,
  isFetchingAuthUser: false,
};



const authReducer = (state=initialState, action
 ) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case SET_IS_FETCHING_AUTH_USER:
      return { ...state, isFetchingAuthUser: action.payload };
    case SET_AUTH_USER:
      return { ...state, authUser: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};

export default authReducer;
