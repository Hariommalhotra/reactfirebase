import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router";
import { resetAuth } from "../../auth/redux/actions";
import { auth } from "../../../firebase";
import { useAppDispatch } from "../../../state/store";

 
function Dashboard() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const onLogOut = () => {
      signOut(auth)
      dispatch(resetAuth());
      localStorage.removeItem("token");
      navigate("/");
    };

  return (
    <div><h1>Welcome to dashboard</h1><button onClick={onLogOut}>Logout</button></div>
  )
}

export default Dashboard