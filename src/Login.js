import "./App.css";
import React from "react";
import { InputAdornment, TextField, Button } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fade, makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Alert from "@material-ui/lab/Alert";

const font = '"Tenor Sans", sans-serif';

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  },
});

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
  button: {
    // width: "20%",
  },
  width: {
    width: "20%",
  },
}));

function login(username, password, setMissingRequired) {
  if (username === '' || password === '') setMissingRequired(true);
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

  const passwordChanged = (e) => setPassword(e.target.value);
  const usernameChanged = (e) => setUsername(e.target.value);

  return (
    <>
      <form>
        <div className={classes.first}>
          <TextField
            required
            id="username"
            label="Username"
            className={classes.width}
            variant="outlined"
            onChange={usernameChanged}
            error={missingRequired && username === ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.container}>
          <TextField
            required
            id="password"
            label="Password"
            className={classes.width}
            variant="outlined"
            onChange={passwordChanged}
            error={missingRequired && password === ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.container}>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => login(username, password, setMissingRequired)}
          >
            LOGIN
          </Button>
        </div>
      </form>
    </>
  );
}
