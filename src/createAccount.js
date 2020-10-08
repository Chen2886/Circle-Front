import './App.css';
import React from 'react';
import { InputAdornment, TextField, Button, Container, Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect, useHistory } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import logo from './resources/logo.jpg';
import axios from 'axios';
import sha256 from 'js-sha256';

const useStyles = makeStyles(() => ({
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
  pic: {
    alignContent: 'center',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
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
  requirementListPass: {
    paddingTop: '5px',
    paddingBottom: '5px',
    display: 'flex',
    color: 'green',
  },
  requirementListFail: {
    paddingTop: '5px',
    paddingBottom: '5px',
    display: 'flex',
    color: 'red',
    fontFamily: font,
  },
  requirementListIcons: {
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const font = "'Tenor Sans', sans-serif";

const theme = createMuiTheme({
  FormControlLabel: {
    fontFamily: font,
  },
});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const createAccount = async (
  username,
  password,
  retypePassword,
  email,
  setMissingRequired,
  passwordLength,
  passwordLower,
  passwordUpper,
  setLoading,
  setAlertOpen,
  setAlertMessage,
  history
) => {
  // if any fields are empty
  if (username === '' || password === '' || email === '') {
    setMissingRequired(true);
    return;
  }
  if (!passwordLength || !passwordLower || !passwordUpper) return;
  if (password !== retypePassword) return;

  // if redirect or not
  var data = {
    username: username,
    password: sha256(password),
    email: email,
  };

  // show loading
  setLoading(true);
  try {
    let res = await axios.post('https://cs307circle-production.herokuapp.com/api/createUser', data, headers);
    console.log(res.data);
  } catch (err) {
    console.log(err.response.data);
    setAlertOpen(true);
    setAlertMessage(err.response.data);
    setLoading(false);
    return;
  }
  history.push('/');
};

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function CreateAccountPage(props) {
  // turn off search field for login page
  props.setShowSearchField(false);
  props.setShowLoginButton(false);

  // styles
  const classes = useStyles();

  const history = useHistory();

  // information
  const [password, setPassword] = React.useState('');
  const [retypePassword, setRetypePassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');

  // empty validation
  const [missingRequired, setMissingRequired] = React.useState(false);

  const [emailValid, setEmailValid] = React.useState(false);
  // password validation
  const [passwordLength, setPasswordLength] = React.useState(false);
  const [passwordLower, setPasswordLower] = React.useState(false);
  const [passwordUpper, setPasswordUpper] = React.useState(false);

  // backdrop loading
  const [loading, setLoading] = React.useState(false);

  // alert hook
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

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
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  const usernameChanged = (e) => setUsername(e.target.value);
  const emailChanged = (e) => {
    if (/[^@]*@[^.]*\..+/.test(e.target.value)) setEmailValid(true);
    else setEmailValid(false);
    setEmail(e.target.value);
  };
  const retypePasswordChanged = (e) => setRetypePassword(e.target.value);

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
            id='email'
            label='Email'
            variant='outlined'
            onChange={emailChanged}
            error={missingRequired && email === ''}
            className={classes.textField}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
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
          <div className={emailValid ? classes.requirementListPass : classes.requirementListFail}>
            {emailValid && <CheckIcon className={classes.requirementListIcons}></CheckIcon>}
            {!emailValid && <CloseIcon className={classes.requirementListIcons}></CloseIcon>}
            Please enter a valid Email address.
          </div>
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
            error={missingRequired ? password === '' || !passwordLength || !passwordLower || !passwordUpper : false}
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
          <div className={passwordLength ? classes.requirementListPass : classes.requirementListFail}>
            {passwordLength && <CheckIcon className={classes.requirementListIcons}></CheckIcon>}
            {!passwordLength && <CloseIcon className={classes.requirementListIcons}></CloseIcon>}
            Password must contain at least 8 characters.
          </div>
          <div className={passwordLower ? classes.requirementListPass : classes.requirementListFail}>
            {passwordLower && <CheckIcon className={classes.requirementListIcons}></CheckIcon>}
            {!passwordLower && <CloseIcon className={classes.requirementListIcons}></CloseIcon>}
            Password must contain at least 1 lowercase character.
          </div>
          <div className={passwordUpper ? classes.requirementListPass : classes.requirementListFail}>
            {passwordUpper && <CheckIcon className={classes.requirementListIcons}></CheckIcon>}
            {!passwordUpper && <CloseIcon className={classes.requirementListIcons}></CloseIcon>}
            Password must contain at least 1 uppercase character.
          </div>
        </div>
        <div className={classes.container}>
          <TextField
            required
            fullWidth
            id='retypePassword'
            label='Retype Password'
            variant='outlined'
            type='password'
            onChange={retypePasswordChanged}
            className={classes.textField}
            error={(missingRequired && retypePassword === '') || password !== retypePassword}
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
          {password.length > 0 && (
            <div className={password === retypePassword ? classes.requirementListPass : classes.requirementListFail}>
              {password === retypePassword && <CheckIcon className={classes.requirementListIcons}></CheckIcon>}
              {password !== retypePassword && <CloseIcon className={classes.requirementListIcons}></CloseIcon>}
              {password === retypePassword && 'Password match.'}
              {password !== retypePassword && 'Password do not match.'}
            </div>
          )}
        </div>
        <div className={classes.container}>
          <Button
            variant='outlined'
            color='primary'
            onClick={() =>
              createAccount(
                username,
                password,
                retypePassword,
                email,
                setMissingRequired,
                passwordLength,
                passwordLower,
                passwordUpper,
                setLoading,
                setAlertOpen,
                setAlertMessage,
                history
              )
            }
            classes={{
              root: classes.button,
              label: classes.buttonLabel,
            }}>
            CREATE
          </Button>
        </div>
      </Container>
    </MuiThemeProvider>
  );
}
