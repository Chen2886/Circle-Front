import './App.css';
import React from 'react';
import { InputAdornment, TextField, Button, Checkbox, FormControlLabel, Typography, Container } from '@material-ui/core';
import { Redirect, Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import logo from './resources/logo.jpg';

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

function login(username, password, rememberMe, setMissingRequired, setRedirectToHome) {
  // TODO: call api
  if (username === '' || password === '') setMissingRequired(true);
  else setRedirectToHome(true);
}

export default function Login(props) {
  // turn off search field for login page
  props.setShowSearchField(false);

  // styles
  const classes = useStyles();

  // hooks
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [missingRequired, setMissingRequired] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [redirectToHome, setRedirectToHome] = React.useState(false);

  const passwordChanged = (e) => setPassword(e.target.value);
  const usernameChanged = (e) => setUsername(e.target.value);
  const changeRememberMe = (e) => setRememberMe(e.target.checked);

  return (
    <MuiThemeProvider theme={theme}>
      {redirectToHome && <Redirect push to='/' />}
      <Container maxWidth='sm'>
        <div className={classes.first}>
          <img src={logo} className={classes.pic} alt='logo' />
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
            id='password'
            label='Password'
            variant='outlined'
            type='password'
            onChange={passwordChanged}
            className={classes.textField}
            error={missingRequired && password === ''}
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
            onClick={() => login(username, password, rememberMe, setMissingRequired, setRedirectToHome)}
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
            <div>New to Circle? Create Account</div>
          </Link>
        </div>
      </Container>
    </MuiThemeProvider>
  );
}
