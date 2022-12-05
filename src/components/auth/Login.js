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
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useAppDispatch } from "../../state/store";
import { setAuthUser, setIsAuthenticated } from "./redux/actions";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Form,
  Formik,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const theme = createTheme();

export default function SignIn() {
  const [eyeToggle, setEyeTOggle] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setEyeTOggle({
      ...eyeToggle,
      showPassword: !eyeToggle.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const intialValues = {
    email: "",
    password: "",
    remember: false,
    validateOnMount: true,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please Enter Valid Email").required(),
    password: Yup.string().required('Please Enter your password')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  });

  const onSubmit = (values, props, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values));

      console.log(values, "jgkhk");
      if (values.email && values.password) {
        console.log(values.email, values.password, "jgkhk");
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

      setSubmitting(false);
    }, 400);
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

  // the return doesn't matter, it can return anything you want

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
            initialTouched={{
              field: true,
            }}
            initialValues={intialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={true}
            ValidateOnMount
          >
            {({
              props,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              dirty
}) => (
              <Form>
                {console.log(props, "props in form")}
                {/* <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}> */}
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={eyeToggle.showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  helperText={<ErrorMessage name="password" />}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {eyeToggle.passwordVisibility && <Visibility />}
                          {!eyeToggle.passwordVisibility && <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                  disabled={isSubmitting || !isValid || !dirty}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <br />
                {console.log(isValid
,dirty,'ye re wo')}
            isValid: {JSON.stringify(isValid)}
            <br />
            dirty: {JSON.stringify(dirty)}
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
