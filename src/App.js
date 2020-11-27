import './App.css';
import logo from './resources/logo.png';
import React, { useEffect } from 'react';

import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import axios from 'axios';
import sha256 from 'js-sha256';

import { ThemeProvider } from '@material-ui/styles';
import {
  Grid,
  InputBase,
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Login from './Login.js';
import Main from './Main.js';
import Profile from './Profile.js';
import CreateAccount from './createAccount.js';
import CreatePost from './CreatePost.js';
import Page404 from './404.js';
import Topic from './Topic.js';
import Alert from './Alert.js';
import SavedPost from './SavedPost.js';
import UserLine from './UserLine.js';
import ChangePassword from './ChangePassword.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: 'lightgray',
      cursor: 'pointer',
    },
  },
  appBar: {
    backgroundColor: '#528487',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
    alignContent: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  list: {
    width: 10000,
  },
  Toolbar: {
    maxHeight: '30px',
  },
  logo: {
    marginLeft: '15px',
    maxHeight: '30px',
  },
}));

const font = "'Tenor Sans', sans-serif";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  },
  palette: {
    primary: {
      main: '#528487',
    },
    secondary: {
      main: '#BFD9DB',
    },
  },
});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export default function App() {
  const classes = useStyles();
  const [showSearchField, setShowSearchField] = React.useState(true);
  const [showLoginButton, setShowLoginButton] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteAccountPassword, setDeleteAccountPassword] = React.useState('');
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [searchRedirect, setSearchRedirect] = React.useState(false);
  const [searchRedirectUrl, setSearchRedirectUrl] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = React.useState(false);
  const [changePasswordOld, setChangePasswordOld] = React.useState('');
  const [changePasswordNew, setChangePasswordNew] = React.useState('');

  window.onbeforeunload = () => {
    if (localStorage.getItem('rememberMe') !== 'true') localStorage.removeItem('user');
  };

  // user menu
  const handleOpenUserMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);
  const handleRedirectToProfilePage = () => setAnchorEl(null);
  const handleChangePassword = () => {
    setAnchorEl(null);
    if (currentUser === null) {
      setRedirectToLogin(true);
    } else {
      setChangePasswordDialogOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(localStorage.getItem('user'));
    setAnchorEl(null);
  };

  const handleDeleteAccount = () => {
    setAnchorEl(null);
    if (currentUser === null) {
      setRedirectToLogin(true);
    } else {
      setDeleteDialogOpen(true);
    }
  };

  useEffect(() => {
    // this forces rerender
    setIsLoggedIn(false);
    setCurrentUser(localStorage.getItem('user'));
    setSearchRedirect(false);
    setSearchRedirectUrl('');
  }, [isLoggedIn]);

  const toggleDrawer = (open) => (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setDrawerOpen(open);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleCloseChangePasswordDialog = () => {
    setChangePasswordDialogOpen(false);
  };

  const handleConfirmDeleteDialog = () => {
    if (currentUser === null || currentUser === undefined || currentUser === '') return;
    axios
      .delete(
        'https://cs307circle-production.herokuapp.com/api/deleteUser',
        {
          params: { username: currentUser, password: sha256(deleteAccountPassword) },
        },
        headers
      )
      .then((res) => handleLogout())
      .catch((err) => console.log(err));
    setDeleteDialogOpen(false);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      if (localStorage.getItem('user') === undefined || localStorage.getItem('user') === null || localStorage.getItem('user') === '') {
        setAlertMessage('You are not logged in!');
        setAlertOpen(true);
        return;
      }
      var userFailuer = false;
      var topicFailuer = false;
      try {
        await axios.get('https://cs307circle-production.herokuapp.com/api/getUser', { params: { username: searchValue } }, headers);
      } catch (err) {
        userFailuer = true;
      }
      try {
        await axios.get('https://cs307circle-production.herokuapp.com/api/listPost', { params: { topic: searchValue } }, headers);
      } catch (err) {
        topicFailuer = true;
      }
      if (!userFailuer) {
        setSearchRedirectUrl('/profile/' + searchValue);
        setSearchValue('');
        setSearchRedirect(true);
        return;
      } else if (!topicFailuer) {
        setSearchRedirectUrl('/topic/' + searchValue);
        setSearchValue('');
        setSearchRedirect(true);
        return;
      } else {
        setAlertMessage('Neither a user or a topic has this name.');
        setAlertOpen(true);
      }
    }
  };

  const searchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDeletePasswordChange = (e) => setDeleteAccountPassword(e.target.value);

  const handleChangePasswordOld = (e) => setChangePasswordOld(e.target.value);

  const handleChangePasswordNew = (e) => setChangePasswordNew(e.target.value);

  const handleConfirmChangePasswordDialog = () => {
    if (currentUser === null || currentUser === undefined || currentUser === '') return;
    var data = { username: currentUser, oldpass: sha256(changePasswordOld), newpass: sha256(changePasswordNew) };
    axios
      .post('https://cs307circle-production.herokuapp.com/api/changePassword', data, headers)
      .then((res) => {
        setChangePasswordDialogOpen(false);
        handleLogout();
      })
      .catch((err) => console.log(err));
    setDeleteDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity='error'>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Delete your Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This actions is irriversible. If so, please enter your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label='Password'
            type='password'
            fullWidth
            value={deleteAccountPassword}
            onChange={handleDeletePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteDialog} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={changePasswordDialogOpen} onClose={handleCloseChangePasswordDialog}>
        <DialogTitle id='form-dialog-title'>Change Your Password?</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Old Password'
            type='password'
            fullWidth
            value={changePasswordOld}
            onChange={handleChangePasswordOld}
          />
          <TextField
            autoFocus
            margin='dense'
            label='New Password'
            type='password'
            fullWidth
            value={changePasswordNew}
            onChange={handleChangePasswordNew}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePasswordDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmChangePasswordDialog} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Router>
        {redirectToLogin && <Redirect to='/login'></Redirect>}
        {searchRedirect && <Redirect to={searchRedirectUrl}></Redirect>}
        <div className={classes.grow}>
          <Helmet>
            <title>Home</title>
            <style>{'body { background-color: #f8f9fe; }'}</style>
          </Helmet>
          <div className={classes.root}>
            <AppBar position='static' className={classes.appBar}>
              <Toolbar className={classes.Toolbar}>
                <Grid justify='space-between' container alignItems='center' direction='row'>
                  <Grid xs={2} item align='left'>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <IconButton onClick={toggleDrawer(true)} edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
                              <MenuIcon />
                            </IconButton>
                            <Drawer anchor='left' onClose={toggleDrawer(false)} open={drawerOpen}>
                              <List>
                                <ListItem button component='a' key='Home' href='/'>
                                  <ListItemText primary='Home' />
                                </ListItem>
                                <ListItem button key='New Post' component={Link} to='/CreatePost'>
                                  <ListItemText primary='New Post' />
                                </ListItem>
                                <ListItem button key='Saved Post' component={Link} to='/savedPost'>
                                  <ListItemText primary='Saved Post' />
                                </ListItem>
                                <ListItem button key='User Line' component={Link} to='/userLine'>
                                  <ListItemText primary='User Line' />
                                </ListItem>
                              </List>
                            </Drawer>
                          </td>
                          <td>
                            <Link to='/' className={classes.link}>
                              <Typography variant='h5' className={classes.title}>
                                CIRCLE
                              </Typography>
                            </Link>
                          </td>
                          <td>
                            <img src={logo} alt='logo' className={classes.logo} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Grid>
                  <Grid xs={2} item></Grid>
                  <Grid xs={4} item>
                    {showSearchField && (
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder='Search…'
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{ 'aria-label': 'search' }}
                          onKeyPress={handleSearch}
                          onChange={searchChange}
                          value={searchValue}
                        />
                      </div>
                    )}
                    {!showSearchField && (
                      <Typography className={classes.centerText} variant='h5'>
                        ALWAYS STAY CONNECTED
                      </Typography>
                    )}
                  </Grid>
                  <Grid xs={3} item></Grid>
                  <Grid xs={1} item>
                    {showLoginButton && (currentUser === null || currentUser === '') && (
                      <div align='right'>
                        <Button color='inherit' component={Link} to='/login'>
                          Login
                        </Button>
                      </div>
                    )}
                    {showLoginButton && currentUser !== null && currentUser !== '' && (
                      <div align='right'>
                        <IconButton color='inherit' onClick={handleOpenUserMenu}>
                          <AccountCircleIcon />
                        </IconButton>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseUserMenu}>
              <MenuItem onClick={handleRedirectToProfilePage} component={Link} to={'/profile/' + currentUser}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleDeleteAccount}>Delete Account</MenuItem>
              <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
              <MenuItem onClick={handleLogout} component={Link} to='/'>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
        <Switch>
          <Route
            exact
            path='/login'
            component={() => <Login setShowSearchField={setShowSearchField} setShowLoginButton={setShowLoginButton} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            exact
            path='/changePassword'
            component={() => (
              <ChangePassword setShowSearchField={setShowSearchField} setShowLoginButton={setShowLoginButton} setIsLoggedIn={setIsLoggedIn} />
            )}
          />
          <Route
            exact
            path='/createPost'
            component={() => <CreatePost setShowSearchField={setShowSearchField} setShowLoginButton={setShowLoginButton} />}
          />
          <Route
            exact
            path='/createAccount'
            component={() => <CreateAccount setShowSearchField={setShowSearchField} setShowLoginButton={setShowLoginButton} />}
          />
          <Route
            exact
            path='/profile/:requestedUser'
            component={() => <Profile setShowSearchField={setShowSearchField} setShowLoginButton={setShowLoginButton} />}
          />
          <Route
            exact
            path='/topic/:topic'
            component={() => <Topic setShowSearchField={setShowSearchField} setShowLoginButton={setShowLoginButton} />}
          />
          <Route
            exact
            path='/savedPost'
            component={() => <SavedPost setShowSearchField={setShowSearchField} setShowLoginButton={setShowLoginButton} />}
          />
          <Route
            exact
            path='/userLine'
            component={() => <UserLine setShowSearchField={setShowSearchField} setShowLoginButton={setShowLoginButton} />}
          />
          <Route exact path='/404' component={() => <Page404></Page404>} />
          <Route exact path='/' component={() => <Main setShowSearchField={setShowSearchField} setShowLoginButton={setShowLoginButton} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
