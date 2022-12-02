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
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { auth, db } from "../../firebase";
import { useAppDispatch } from "../../state/store";
import { setAuthUser, setIsAuthenticated } from "./redux/actions";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

const theme = createTheme();

export default function SignIn() {
  const intialValues = {
    email: "",
    password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please Enter Valid Email").required(),
    password: Yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  });

  const onSubmit = (values, props) => {

      console.log(values,'jgkhk')
    if (values.email && values.password) {
      console.log(values.email,values.password,'jgkhk')
      // Create a new user with email and password using firebase
      signInWithEmailAndPassword(auth, values.email && values.password)
        .then(async (res) => {
          dispatch(setAuthUser({ uid: res.user.uid }));
          localStorage.setItem("token", res.user.refreshToken);
          dispatch(setIsAuthenticated(true));
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error.code, "sdasadasd");
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password");
          } else if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email");
          } else {
            toast.error(error.message);
          }
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        });
    }
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const login = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   if (data.get("email") && data.get("password")) {
  //     // Create a new user with email and password using firebase
  //     signInWithEmailAndPassword(auth, data.get("email"), data.get("password"))
  //       .then(async (res) => {
  //         dispatch(setAuthUser({ uid: res.user.uid }));
  //         localStorage.setItem("token", res.user.refreshToken);
  //         dispatch(setIsAuthenticated(true));
  //         navigate("/dashboard");
  //       })
  //       .catch((error) => {
  //         console.log(error.code, "sdasadasd");
  //         if (error.code === "auth/wrong-password") {
  //           toast.error("Please check the Password");
  //         } else if (error.code === "auth/user-not-found") {
  //           toast.error("Please check the Email");
  //         } else {
  //           toast.error(error.message);
  //         }
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 1000);
  //       });
  //   }
  // };


 
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
            Sign in
          </Typography>
          <Formik
            initialValues={intialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                {console.log(props,'props in form')}
                {/* <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}> */}
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  helperText={<ErrorMessage name='email'/>}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={<ErrorMessage name='password'/>}
                />
                <Field
                  as={FormControlLabel}
                  name="remember"
                  control={
                    <Checkbox
                      name="remember"
                      value="remember"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Button
                disabled={props.isSubmitting}
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
                {/* </Box> */}
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
