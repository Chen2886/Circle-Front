import "./App.css";
import React from "react";
import {
  InputAdornment,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import logo from "./resources/logo.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    paddingBottom: "20px",
  },
  first: {
    textAlign: "center",
    paddingBottom: "20px",
    marginTop: "50px",
  },
  form: {
    marginLeft: "35%",
    marginRight: "35%",
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
  },
  button: {
    float: "right",
    fontFamily: font,
  },
  textFieldRoot: {
    fontFamily: font,
  },
}));

const font = "'Tenor Sans', sans-serif";

const theme = createMuiTheme({
  FormControlLabel: {
    fontFamily: font,
  },
});

function login(username, password, rememberMe, setMissingRequired) {
  // TODO: call api
  console.log(rememberMe);
  if (username === "" || password === "") setMissingRequired(true);
}

export default function Login(props) {
  // turn off search field for login page
  props.setShowSearchField(false);

  // styles
  const classes = useStyles();

  // hooks
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [missingRequired, setMissingRequired] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);

  const passwordChanged = (e) => setPassword(e.target.value);
  const usernameChanged = (e) => setUsername(e.target.value);
  const changeRememberMe = (e) => setRememberMe(e.target.checked);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.form}>
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              classes: {
                root: classes.textFieldRoot,
              }
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
            onChange={passwordChanged}
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
              }
            }}
          />
        </div>
        <div className={classes.container}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                color="primary"
                name="RememberMe"
                onChange={changeRememberMe}
              />
            }
            label={
              <Typography className={classes.checkBoxLabel}>
                Remember Me?
              </Typography>
            }
            className={classes.checkBox}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              login(username, password, rememberMe, setMissingRequired)
            }
            className={classes.button}
          >
            LOGIN
          </Button>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
