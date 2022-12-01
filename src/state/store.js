import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "../components/auth/redux/reducer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
   
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


//hooks with type
export const useAppSelector = useSelector;
export const useAppDispatch = useDispatch;

