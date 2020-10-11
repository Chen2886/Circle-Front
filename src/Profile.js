import './App.css';
import Alert from './Alert.js';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import {
  Grid,
  Button,
  Typography,
  Card,
  TextField,
  Divider,
  Chip,
  Avatar,
  Snackbar,
  Backdrop,
  CircularProgress,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

const font = "'Tenor Sans', sans-serif";

const useStyles = makeStyles((theme) => ({
  avatarCard: {
    margin: '2rem',
    display: 'flex',
    boxShadow: '0px 10px 13px -7px #000000, 0px 0px 8px 0px rgba(0,0,0,0)',
  },
  settingsCard: {
    margin: '2rem',
    boxShadow: '0px 10px 13px -7px #000000, 0px 0px 8px 0px rgba(0,0,0,0)',
  },
  infoCard: {
    margin: '2rem',
    boxShadow: '0px 10px 13px -7px #000000, 0px 0px 8px 0px rgba(0,0,0,0)',
  },
  avatar: {
    maxWidth: '180px',
    left: '50%',
    borderRadius: '50%',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '3rem',
    float: 'left',
  },
  infoContainer: {
    margin: '3rem',
    marginLeft: '5rem',
    marginRight: '3rem',
    float: 'left',
    width: '100%',
    overflow: 'auto',
  },
  settingsContainer: {
    textAlign: 'center',
    alignContent: 'center',
    paddingBottom: '2rem',
    overflow: 'auto',
  },
  flexDisplay: {
    display: 'flex',
  },
  infoTitle: {
    margin: '1rem',
    marginTop: '2rem',
    textAlign: 'center',
  },
  gridContainer: {
    flexGrow: 1,
    margin: '3rem',
    marginTop: '0',
  },
  textField: {
    margin: '0 auto',
    display: 'block',
    overflow: 'auto',
    width: '60%',
  },
  settingsTextField: {
    marginTop: '5px',
    width: '70%',
  },
  textFieldContainer: {
    overflow: 'auto',
    margin: '0.5rem',
    display: 'flex',
  },
  followedCircles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '1rem',
    '& > *': {
      margin: theme.spacing(0.5),
    },
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
  editUserButton: {
    // marginTop: '1rem',
    marginTop: '2rem',
    textAlign: 'center',
  },
  chipLabel: {
    fontSize: '20px'
  },
}));

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export default function Profile(props) {
  // Disable search and login
  // Add history and styles
  // Get requested user from URL param
  // Hooks
  const history = useHistory();
  const classes = useStyles();
  const currentUser = props.currentUser;
  let { requestedUser } = useParams();
  const [bio, setBio] = React.useState('');
  const [lastUpdatedBio, setLastUpdatedBio] = React.useState('');
  const [requestedUserObj, setRequestedUserObj] = React.useState({});
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [userError, setUserError] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [lastUpdatedEmail, setLastUpdatedEmail] = React.useState('');
  const [editingUserInfo, setEditingUserInfo] = React.useState(false);
  const [circles, setCircles] = React.useState([]);

  // if url does not include requested user
  if (requestedUser === null || requestedUser === '') history.push('/404');

  const bioChanged = (e) => setBio(e.target.value);
  const handleEmailChanged = (e) => setEmail(e.target.value);

  // initialize the user
  useEffect(() => {
    function setAppBar() {
      props.setShowSearchField(false);
      props.setShowLoginButton(true);
    }
    setAppBar();
    getUser(requestedUser);
  }, [props, requestedUser]);

  const editUserInfo = async (e) => {
    if (editingUserInfo) {
      // not valid email
      if (!/[^@]*@[^.]*\..+/.test(email)) {
        setAlertSeverity('error');
        setAlertMessage('Email invalid');
        setAlertOpen(true);
        return;
      }
      setLoading(true);
      var newEmail = e.target.value;
      if (email === lastUpdatedEmail) return;
      var data = {
        username: currentUser,
        email: email,
      };
      console.log(data);
      try {
        await axios.put('https://cs307circle-production.herokuapp.com/api/updateUserEmail', data, headers);
        setAlertSeverity('success');
        setAlertMessage('Email updated!');
        setAlertOpen(true);
        setLastUpdatedEmail(newEmail);
      } catch (err) {
        setAlertSeverity('error');
        setAlertMessage(err.response.data);
        setAlertOpen(true);
        setEmail(lastUpdatedEmail);
      }
    }
    setLoading(false);
    setEditingUserInfo(!editingUserInfo);
  };

  const getUser = (requestedUser) => {
    setLoading(true);
    axios
      .get(
        'https://cs307circle-production.herokuapp.com/api/getUser',
        {
          params: { username: requestedUser },
        },
        headers
      )
      .then(function (res) {
        setRequestedUserObj(res.data);
        setBio(res.data.bio);
        setEmail(res.data.email);
        setLastUpdatedBio(res.data.bio);
        setLastUpdatedEmail(res.data.email);
        setCircles(res.data.listOfTopics);
        setLoading(false);
      })
      .catch(function (err) {
        setAlertSeverity('error');
        setAlertMessage(err.response.data);
        setUserError(true);
        setAlertOpen(true);
        setLoading(false);
      });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  const bioBlur = async (e) => {
    var newBio = e.target.value;
    if (newBio === lastUpdatedBio) return;
    var data = {
      username: currentUser,
      bio: newBio,
    };
    try {
      await axios.put('https://cs307circle-production.herokuapp.com/api/updateUserBio', data, headers);
      setAlertSeverity('success');
      setAlertMessage('Bio updated!');
      setAlertOpen(true);
      setLastUpdatedBio(newBio);
    } catch (err) {
      setAlertSeverity('error');
      setAlertMessage('Could not update Bio. Please try again later.');
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      {userError && <Redirect to='/404'></Redirect>}
      {!userError && (
        <>
          <Grid container>
            <Grid item xs={12} md={requestedUser === currentUser ? 8 : 12}>
              <Card className={classes.avatarCard}>
                <div className={classes.avatarContainer}>
                  <img src='https://demos.creative-tim.com/argon-dashboard/assets/img/theme/team-4.jpg' className={classes.avatar} alt='avatar' />
                </div>
                <div className={classes.infoContainer}>
                  <div className={classes.flexDisplay}>
                    <Typography variant='h4' style={{ float: 'left' }}>
                      {requestedUserObj === null ? '' : requestedUserObj.username}
                    </Typography>
                    {requestedUser !== currentUser && (
                      <Button
                        variant='outlined'
                        style={{ marginLeft: '1rem' }}
                        classes={{
                          root: classes.button,
                          label: classes.buttonLabel,
                        }}>
                        CONNECT
                      </Button>
                    )}
                  </div>
                  <div className={classes.flexDisplay} style={{ marginTop: '1rem' }}>
                    <Typography variant='h6' style={{ float: 'left' }}>
                      {requestedUserObj === undefined || requestedUserObj.listOfFollowers === undefined ? 0 : requestedUserObj.listOfFollowers.length}{' '}
                      Followers
                    </Typography>
                    <Typography variant='h6' style={{ float: 'left', marginLeft: '2rem' }}>
                      {requestedUserObj === undefined || requestedUserObj.listOfFollowing === undefined ? 0 : requestedUserObj.listOfFollowing.length}{' '}
                      Following
                    </Typography>
                    <Typography variant='h6' style={{ float: 'left', marginLeft: '2rem' }}>
                      {requestedUserObj === undefined || requestedUserObj.listOfTopics === undefined ? 0 : requestedUserObj.listOfTopics.length}{' '}
                      CIRCLES
                    </Typography>
                  </div>
                  <div className={classes.flexDisplay} style={{ marginTop: '1rem' }}>
                    <TextField label='Bio' key='Bio' fullWidth multiline rows={4} value={bio} onChange={bioChanged} onBlur={(e) => bioBlur(e)} />
                  </div>
                </div>
              </Card>
            </Grid>
            {requestedUser === currentUser && (
              <Grid item xs={12} md={4}>
                <Card className={classes.settingsCard}>
                  <CardHeader
                    action={
                      <IconButton aria-label='settings' onClick={editUserInfo}>
                        {editingUserInfo && <DoneIcon />}
                        {!editingUserInfo && <EditIcon />}
                      </IconButton>
                    }
                    title='User Information'
                  />
                  <div style={{ marginBottom: '1rem' }}>
                    <div className={classes.settingsContainer}>
                      <TextField
                        type='text'
                        variant='outlined'
                        className={classes.settingsTextField}
                        label='Username'
                        value={requestedUser}
                        disabled
                        fullWidth
                      />
                    </div>
                    <div className={classes.settingsContainer}>
                      <TextField
                        type='email'
                        variant='outlined'
                        className={classes.settingsTextField}
                        label='Email'
                        value={email}
                        onChange={(e) => handleEmailChanged(e)}
                        disabled={!editingUserInfo}
                        fullWidth
                      />
                    </div>
                  </div>
                </Card>
              </Grid>
            )}
          </Grid>
          <Card className={classes.infoCard}>
            <Divider variant='middle' />
            <Typography variant='h6' className={classes.infoTitle}>
              Followed Circles
            </Typography>
            <div style={{ width: '75%', margin: '0 auto', marginBottom: '3rem' }}>
              <div className={classes.followedCircles}>
                {circles.map((circle) => (
                  <Chip
                    classes={{
                      label: classes.chipLabel
                    }}
                    key={circle}
                    variant='outlined'
                    avatar={<Avatar>{circle.charAt(0)}</Avatar>}
                    size='medium'
                    color='primary'
                    label={circle}
                  />
                ))}
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
