import './App.css';
import React, { useEffect } from 'react';
import {
  InputAdornment,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Snackbar,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import Alert from './Alert.js';
import { Link, useHistory } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import logo from './resources/logo.jpg';
import axios from 'axios';
import sha256 from 'js-sha256';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    alignContent: 'center',
    paddingBottom: '30px',
    overflow: 'auto',
  },
  first: {
    textAlign: 'center',
    paddingBottom: '20px',
    marginTop: '50px',
  },
  form: {
    marginLeft: '35%',
    marginRight: '35%',
  },
  pic: {
    alignContent: 'center',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  checkBox: {
    float: 'left',
    marginLeft: '3px',
  },
  checkBoxLabel: {
    fontFamily: font,
    color: '#528487',
  },
  buttonLabel: {
    float: 'right',
    fontFamily: font,
    color: '#528487',
  },
  button: {
    borderColor: '#528487',
    float: 'right',
  },
  textFieldRoot: {
    fontFamily: font,
    color: '#528487',
  },
  forgotPassword: {
    fontFamily: font,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  textField: {
    // so it doesn't cut off label
    marginTop: '5px',
  },
}));

const font = "'Tenor Sans', sans-serif";

const theme = createMuiTheme({
  FormControlLabel: {
    fontFamily: font,
  },
});

const login = async (
  username,
  password,
  rememberMe,
  setMissingRequired,
  setLoggedIn,
  setLoading,
  setAlertOpen,
  setAlertMessage,
  history,
  setUser
) => {
  localStorage.setItem('username', rememberMe && username.length !== 0 ? username : '');
  localStorage.setItem('rememberMe', rememberMe);

  // if any fields are empty
  if (username === '' || password === '') {
    setMissingRequired(true);
    return;
  }

  // if redirect or not
  var data = {
    username: username,
    password: sha256(password),
  };
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  // show loading
  setLoading(true);
  try {
    let res = await axios.get(
      'https://cs307circle-production.herokuapp.com/api/login',
      {
        params: data,
      },
      headers
    );
    setLoading(false);
    setLoggedIn(true);
    setUser(username);
    history.push('/');
  } catch (err) {
    setAlertOpen(true);
    setAlertMessage(err.response.data);
    setLoading(false);
    return;
  }
};

export default function Login(props) {
  // turn off search field for login page
  props.setShowSearchField(false);
  props.setShowLoginButton(false);

  const history = useHistory();

  // styles
  const classes = useStyles();

  // hooks
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [missingRequired, setMissingRequired] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);

  // backdrop loading
  const [loading, setLoading] = React.useState(false);

  // alert hook
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const passwordChanged = (e) => setPassword(e.target.value);
  const usernameChanged = (e) => setUsername(e.target.value);
  const changeRememberMe = (e) => setRememberMe(e.target.checked);

  useEffect(() => {
    if (localStorage.getItem('rememberMe')) {
      setUsername(localStorage.getItem('username'));
    }
  }, []);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity='error'>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Container maxWidth='sm'>
        <div className={classes.first}>
          <img src={logo} className={classes.pic} alt='logo' style={{ width: '20%' }} />
        </div>
        <div className={classes.container}>
          <TextField
            required
            fullWidth
            id='username'
            label='Username'
            variant='outlined'
            onChange={usernameChanged}
            error={missingRequired && username === ''}
            className={classes.textField}
            value={username}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
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
            id='password'
            label='Password'
            variant='outlined'
            type='password'
            onChange={passwordChanged}
            className={classes.textField}
            error={missingRequired && password === ''}
            onKeyPress={(event) => {
              if (event.key === 'Enter')
                login(
                  username,
                  password,
                  rememberMe,
                  setMissingRequired,
                  props.setLoggedIn,
                  setLoading,
                  setAlertOpen,
                  setAlertMessage,
                  history,
                  props.setUser
                );
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
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
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                name='RememberMe'
                onChange={changeRememberMe}
                style={{
                  color: '#528487',
                }}
              />
            }
            label={<Typography className={classes.checkBoxLabel}>Remember Me?</Typography>}
            className={classes.checkBox}
          />
          <Button
            variant='outlined'
            color='primary'
            onClick={() =>
              login(
                username,
                password,
                rememberMe,
                setMissingRequired,
                props.setLoggedIn,
                setLoading,
                setAlertOpen,
                setAlertMessage,
                history,
                props.setUser
              )
            }
            classes={{
              root: classes.button,
              label: classes.buttonLabel,
            }}>
            LOGIN
          </Button>
        </div>
        <div className={classes.container}>
          <Link to='/forgotPassword' className={classes.forgotPassword}>
            <div>Forgot Password?</div>
          </Link>
        </div>
        <div className={classes.container}>
          <Link to='/createAccount' className={classes.forgotPassword}>
            <div>New to CIRCLE? Create Account</div>
          </Link>
        </div>
      </Container>
    </MuiThemeProvider>
  );
}
