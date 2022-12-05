import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  RESET_AUTH,
  SET_AUTH_USER,
  SET_IS_AUTHENTICATED,
  SET_IS_FETCHING_AUTH_USER,
} from "./types";

export const setIsAuthenticated = (payload) => ({
  type: SET_IS_AUTHENTICATED,
  payload,
});

export const resetAuth = () => ({
  type: RESET_AUTH,
});

export const setIsUserFetching = (payload) => ({
  type: SET_IS_FETCHING_AUTH_USER,
  payload,
});

export const setAuthUser = (payload) => async (dispatch) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", payload.uid));
    const data = await getDocs(q);
    if (data.docs.length) {
      dispatch({
        type: SET_AUTH_USER,
        payload: data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))[0],
      });
    }
  } catch (error) {}
  dispatch(setIsUserFetching(false));
};
