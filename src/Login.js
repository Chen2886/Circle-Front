import "./App.css";
import React from "react";
import { InputAdornment, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import logo from "./resources/logo.jpg"

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
  width: {
    width: "20%",
  },
}));

function login(username, password, setMissingRequired) {
  // TODO: call api
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
          <img src={logo} className={classes.width} alt="logo"/> 
        </div>
        <div className={classes.container}>
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
            fullWidth
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
