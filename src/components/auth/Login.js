// import { signInWithEmailAndPassword } from "firebase/auth";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { auth, db } from "../../firebase";
// import { useAppDispatch } from "../../state/store";
// import { setAuthUser, setIsAuthenticated } from "./redux/actions";


// export default function Login() {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const login = (e) => {
//     e.preventDefault();

//     if (loginData.email && loginData.password) {
//       // Create a new user with email and password using firebase
//       signInWithEmailAndPassword(auth, loginData.email, loginData.password)
//         .then(async (res) => {
//           dispatch(setAuthUser({ uid: res.user.uid }));
//           localStorage.setItem("token", res.user.refreshToken);
//           dispatch(setIsAuthenticated(true));
//           navigate("/technologies");
//         })
//         .catch((error) => {
//           if (error.code === "auth/wrong-password") {
//             toast.error("Please check the Password");
//           } else if (error.code === "auth/user-not-found") {
//             toast.error("Please check the Email");
//           } else {
//             toast.error(error.message);
//           }
//           window.location.reload();
//         });
//     }

//     setLoginData({
//       email: "",
//       password: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
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
//                       Sign
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
//                     <div className="text-center mt-6">
//                       <button
//                         className="bg-darkBlue-101 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
//                         type="submit"
//                         onClick={login}
//                       >
//                         Sign In
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//               <div className="flex flex-wrap mt-6 relative">
//                 <div className="w-1/2">
//                   <a
//                     href="#pablo"
//                     onClick={(e) => e.preventDefault()}
//                     className="text-blue-400"
//                   >
//                     <small>Forgot password?</small>
//                   </a>
//                 </div>
//                 <div className="w-1/2 text-right">
//                   <Link to="/signup" className="text-blue-400">
//                     <small>Create new account</small>
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



import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { auth, db } from "../../firebase";
import { useAppDispatch } from "../../state/store";
import { setAuthUser, setIsAuthenticated } from "./redux/actions";
import { signInWithEmailAndPassword } from "firebase/auth";

const theme = createTheme();

export default function SignIn() {



  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') && data.get('password')) {
      // Create a new user with email and password using firebase
      signInWithEmailAndPassword(auth, data.get('email') , data.get('password'))
        .then(async (res) => {
          dispatch(setAuthUser({ uid: res.user.uid }));
          localStorage.setItem("token", res.user.refreshToken);
          dispatch(setIsAuthenticated(true));
          navigate("/dashboard");
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password");
          } else if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email");
          } else {
            toast.error(error.message);
          }
          window.location.reload();
        });
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}