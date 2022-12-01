// import React, { MouseEventHandler, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// import { toast, ToastContainer } from "react-toastify";
// import { addDoc, collection } from "firebase/firestore";

// export default function Signup() {
//   const [signupData, setSignupData] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const signup = (e) => {
//     e.preventDefault();
//     setError("");
//     if (signupData.email && signupData.password) {
//       // Create a new user with email and password using firebase
//       createUserWithEmailAndPassword(
//         auth,
//         signupData.email,
//         signupData.password
//       )
//         .then(async (res) => {

//           await addDoc(collection(db, "users"), {
//             uid: res.user.uid,
//             email: res.user.email,
//             role: signupData.role,
//           });

//           localStorage.setItem("token", res.user.refreshToken);
//           navigate("/");
//         })
//         .catch((error) => {
//           toast.error(error.message);
//           window.location.reload();
//         });
//     }

//     setSignupData({
//       email: "",
//       password: "",
//       role: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData({ ...signupData, [name]: value });
//   };

//   return (
//     <>
//       <div className="bg-darkBlue-101 h-screen">
//         <div className="container mx-auto px-4 h-full">
//           <div className="flex content-center items-center justify-center h-full">
//             <div className="w-full lg:w-4/12 p-4 rounded-lg">
//               <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-200 border-0">
//                 <div className="rounded-t mb-0 px-6 py-6">
//                   <div className="text-center mb-3">
//                     <h6 className="text-blueGray-500 text-sm font-bold">
//                       Sign up
//                     </h6>
//                   </div>

//                   <hr className="mt-6 border-b-1 border-blueGray-300" />
//                 </div>
//                 <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
//                   <form>
//                     <div className="relative w-full mb-3">
//                       <label
//                         className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                         htmlFor="grid-password"
//                       >
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         placeholder="Email"
//                         name="email"
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                     <div className="relative w-full mb-3">
//                       <label
//                         className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                         htmlFor="grid-password"
//                       >
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         placeholder="Password"
//                         name="password"
//                         onChange={handleInputChange}
//                       />
//                     </div>
//                     <div className="relative w-full mb-3">
//                       <label
//                         className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                         htmlFor="grid-password"
//                       >
//                         Role
//                       </label>
//                       <select
//                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                         placeholder="Role"
//                         name="role"
//                         onChange={handleInputChange}
//                       >
//                         <option selected disabled>
//                           -- Choose Role --
//                         </option>
//                         <option value="mentor">Mentor</option>
//                         <option value="employee">Employee</option>
//                       </select>
//                     </div>
//                     {error && <span className="text-red-500">{error}</span>}
//                     <div className="text-center mt-6">
//                       <button
//                         className="bg-darkBlue-101 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
//                         type="submit"
//                         onClick={signup}
//                       >
//                         Create Account
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//               <div className="flex flex-wrap justify-end mt-6 relative">
//                 <div className="w-1/2 text-right">
//                   <Link to="/" className="text-blue-400">
//                     <small>Already have account?</small>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// }

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormGroup } from "@mui/material";
import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
const theme = createTheme();

export default function SignUp() {

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [hobbiesData, setHobbiesData] = useState([]);

  const handleHobbies = (event) => {
    const index = hobbiesData.indexOf(event.target.value);
    if (index === -1) {
      setHobbiesData([...hobbiesData, event.target.value]);
    } else {
      setHobbiesData(hobbiesData.filter((hand) => hand !== event.target.value));
    }
  };
  
  const signup = (event) => {

    const data = new FormData(event.currentTarget);
    event.preventDefault();
        setError("");
        if (data.get("email") && data.get("password")) {
          // Create a new user with email and password using firebase
          createUserWithEmailAndPassword(
            auth,
            data.get("email"),
            data.get("password")
          )
            .then(async (res) => {
    
              await addDoc(collection(db, "users"), {
                uid: res.user.uid,
                email: data.get("email"),
                name: data.get("firstName"),
                lname: data.get("lastName"),
                gender: data.get("radio-buttons-group"),
                hobbies: hobbiesData
              });
    
              localStorage.setItem("token", res.user.refreshToken);
              navigate("/");
            })
            .catch((error) => {
              toast.error(error.message);
              window.location.reload();
            });
        }
      }
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
 
    const data = new FormData(event.currentTarget);
  console.log({
    email: data.get("email"),
    password: data.get("password"),
    name: data.get("firstName"),
    lname: data.get("lastName"),
    gender: data.get("radio-buttons-group"),
    hobbies: hobbiesData
  });
};
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={signup}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="male"
                    name="radio-buttons-group"
                    row
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
              <FormControl>
                <FormGroup>
                  <FormControlLabel
                    label="Meditation"
                    control={
                      <Checkbox
                        value="Meditation"
                        checked={hobbiesData.includes("Meditation")}
                        onChange={handleHobbies}
                      />
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    label="Cricket"
                    control={
                      <Checkbox
                        value="Cricket"
                        checked={hobbiesData.includes("Cricket")}
                        onChange={handleHobbies}
                      />
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    label="Books"
                    control={
                      <Checkbox
                        value="Books"
                        checked={hobbiesData.includes("Books")}
                        onChange={handleHobbies}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
