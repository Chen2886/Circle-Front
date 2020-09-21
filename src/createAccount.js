import "./App.css";
import React from "react";
import {
  InputAdornment,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
} from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import logo from "./resources/logo.jpg";

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
    alignContent: "center",
    paddingBottom: "30px",
    overflow: "auto",
  },
  first: {
    textAlign: "center",
    paddingBottom: "20px",
    marginTop: "50px",
  },
  pic: {
    alignContent: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
  },
  checkBox: {
    float: "left",
    marginLeft: "3px",
  },
  checkBoxLabel: {
    fontFamily: font,
    color: "#528487",
  },
  buttonLabel: {
    float: "right",
    fontFamily: font,
    color: "#528487",
  },
  button: {
    borderColor: "#528487",
    float: "right",
  },
  textFieldRoot: {
    fontFamily: font,
    color: "#528487",
  },
  forgotPassword: {
    fontFamily: font,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  textField: {
    // so it doesn't cut off label
    marginTop: "5px",
  },
  requirementListPass: {
    paddingTop: "5px",
    paddingBottom: "5px",
    display: "flex",
    color: "green",
  },
  requirementListFail: {
    paddingTop: "5px",
    paddingBottom: "5px",
    display: "flex",
    color: "red",
  },
  requirementListIcons: {
    paddingLeft: "5px",
    paddingRight: "5px",
  },
}));

const font = "'Tenor Sans', sans-serif";

const theme = createMuiTheme({
  FormControlLabel: {
    fontFamily: font,
  },
});

function createAccount(
  username,
  password,
  email,
  setMissingRequired,
  setRedirectToHome,
  passwordLength,
  passwordLower,
  passwordUpper
) {
  // TODO: call api
  if (passwordLength || passwordLower || passwordUpper) return;
  if (username === "" || password === "" || email === "")
    setMissingRequired(true);
  else {
    setRedirectToHome(true);
    console.log(email);
  }
}

export default function Login(props) {
  // turn off search field for login page
  props.setShowSearchField(false);

  // styles
  const classes = useStyles();

  // hooks
  const [password, setPassword] = React.useState("");
  const [retypePassword, setRetypePassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [missingRequired, setMissingRequired] = React.useState(false);
  const [redirectToHome, setRedirectToHome] = React.useState(false);

  const [passwordLength, setPasswordLength] = React.useState(false);
  const [passwordLower, setPasswordLower] = React.useState(false);
  const [passwordUpper, setPasswordUpper] = React.useState(false);

  const passwordChanged = (e) => {
    var pass = e.target.value;
    setPassword(pass);

    // length check
    if (pass.length >= 8) setPasswordLength(true);
    else setPasswordLength(false);

    // lower
    if (/[a-z]/.test(pass)) setPasswordLower(true);
    else setPasswordLower(false);

    // upper
    if (/[A-Z]/.test(pass)) setPasswordUpper(true);
    else setPasswordUpper(false);
  };
  const usernameChanged = (e) => setUsername(e.target.value);
  const emailChanged = (e) => setEmail(e.target.value);
  const retypePasswordChanged = (e) => setRetypePassword(e.target.value);

  return (
    <MuiThemeProvider theme={theme}>
      {redirectToHome && <Redirect push to="/" />}
      <Container maxWidth="sm">
        <div className={classes.first}>
          <img src={logo} className={classes.pic} alt="logo" />
        </div>
        <div className={classes.container}>
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            variant="outlined"
            onChange={usernameChanged}
            error={missingRequired && username === ""}
            className={classes.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
              style: {
                fontFamily: font,
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.textFieldRoot,
              },
            }}
          />
        </div>
        <div className={classes.container}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            onChange={emailChanged}
            error={missingRequired && email === ""}
            className={classes.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
              style: {
                fontFamily: font,
              },
            }}
            InputLabelProps={{
              classes: {
                root: classes.textFieldRoot,
              },
            }}
          />
        </div>
        <div className={classes.container}>
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={passwordChanged}
            className={classes.textField}
            error={missingRequired && password === ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              classes: {
                root: classes.textFieldRoot,
              },
            }}
          />
        </div>
        <div className={classes.container}>
          <div
            className={
              passwordLength
                ? classes.requirementListPass
                : classes.requirementListFail
            }
          >
            {passwordLength && (
              <CheckIcon className={classes.requirementListIcons}></CheckIcon>
            )}
            {!passwordLength && (
              <CloseIcon className={classes.requirementListIcons}></CloseIcon>
            )}
            Password must contain at least 8 charaters.
          </div>
          <div
            className={
              passwordLower
                ? classes.requirementListPass
                : classes.requirementListFail
            }
          >
            {passwordLower && (
              <CheckIcon className={classes.requirementListIcons}></CheckIcon>
            )}
            {!passwordLower && (
              <CloseIcon className={classes.requirementListIcons}></CloseIcon>
            )}
            Password must contain at least 1 lowercase charater.
          </div>
          <div
            className={
              passwordUpper
                ? classes.requirementListPass
                : classes.requirementListFail
            }
          >
            {passwordUpper && (
              <CheckIcon className={classes.requirementListIcons}></CheckIcon>
            )}
            {!passwordUpper && (
              <CloseIcon className={classes.requirementListIcons}></CloseIcon>
            )}
            Password must contain at least 1 uppercase charater.
          </div>
        </div>
        <div className={classes.container}>
          <TextField
            required
            fullWidth
            id="retypePassword"
            label="Retype Password"
            variant="outlined"
            type="password"
            onChange={retypePasswordChanged}
            className={classes.textField}
            error={missingRequired && password === ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              classes: {
                root: classes.textFieldRoot,
              },
            }}
          />
        </div>
        <div className={classes.container}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              createAccount(
                username,
                password,
                email,
                setMissingRequired,
                setRedirectToHome,
                passwordLength,
                passwordLower,
                passwordUpper
              )
            }
            classes={{
              root: classes.button,
              label: classes.buttonLabel,
            }}
          >
            CREATE
          </Button>
        </div>
      </Container>
    </MuiThemeProvider>
  );
}
