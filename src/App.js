import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate, Outlet } from "react-router";
import Login from "./components/auth/Login";
import Register from "./components/auth/Signup";
import { useAppDispatch, useAppSelector } from "./state/store";
import {
  setAuthUser,
  setIsAuthenticated,
  setIsUserFetching,
} from "./components/auth/redux/actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/dashboard/Dashboard/Dashboard";


const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(
    (state) => state?.auth?.isAuthenticated
  );
  const token = localStorage.getItem("token");

  if (!(isAuthenticated || token)) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setIsUserFetching(true));
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        dispatch(setAuthUser({ uid: user.uid }));
      } else {
        dispatch(setIsAuthenticated(false));
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
