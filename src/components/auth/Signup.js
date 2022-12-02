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
import { Validate } from 'mui-validate';
import { ValidationGroup } from 'mui-validate';
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
             <ValidationGroup>
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Validate name="internal key 1" required>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                  </Validate>

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
            </>
          </ValidationGroup>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
