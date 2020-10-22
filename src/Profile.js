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
import Timeline from './Timeline';

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
    fontSize: '20px',
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
  const [currentUserObj, setCurrentUserObj] = React.useState({});
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
  const [listOfFollowers, setListOfFollowers] = React.useState([]);
  const [listOfFollowing, setListOfFollowing] = React.useState([]);

  // if url does not include requested user
  if (requestedUser === null || requestedUser === '') {
    console.log(requestedUser);
    history.push('/404');
  }

  const bioChanged = (e) => setBio(e.target.value);
  const handleEmailChanged = (e) => setEmail(e.target.value);

  // initialize the user
  useEffect(() => {
    function setAppBar() {
      props.setShowSearchField(false);
      props.setShowLoginButton(true);
    }
    setAppBar();
    getRequestedUser(requestedUser);
    getcurrentUser(currentUser);
  }, [props, requestedUser, currentUser]);

  const editUserInfo = async () => {
    if (editingUserInfo) {
      // not valid email
      if (!/[^@]*@[^.]*\..+/.test(email)) {
        setAlertSeverity('error');
        setAlertMessage('Email invalid');
        setAlertOpen(true);
        return;
      }
      if (email === lastUpdatedEmail) {
        setEditingUserInfo(!editingUserInfo);
        return;
      }
      setLoading(true);
      var data = {
        username: currentUserObj.username,
        email: email,
      };
      try {
        await axios.put('https://cs307circle-production.herokuapp.com/api/updateUserEmail', data, headers);
        setAlertSeverity('success');
        setAlertMessage('Email updated!');
        setAlertOpen(true);
        setLastUpdatedEmail(email);
        setLoading(false);
      } catch (err) {
        setAlertSeverity('error');
        setAlertMessage(err.response.data);
        setAlertOpen(true);
        setEmail(lastUpdatedEmail);
        setLoading(false);
      }
    }
    setEditingUserInfo(!editingUserInfo);
  };

  const getRequestedUser = async (requestedUser) => {
    setLoading(true);
    if (requestedUser === undefined || requestedUser === '' || requestedUser === null) {
      setAlertSeverity('error');
      setAlertMessage('User error. Please try again later.');
      setUserError(true);
      setAlertOpen(true);
      setLoading(false);
      setRequestedUserObj({});
      return;
    }
    try {
      let res = await axios.get(
        'https://cs307circle-production.herokuapp.com/api/getUser',
        {
          params: { username: requestedUser },
        },
        headers
      );
      setRequestedUserObj(res.data);
      setBio(res.data.bio);
      setEmail(res.data.email);
      setLastUpdatedEmail(res.data.email);
      setLastUpdatedBio(res.data.bio);
      setCircles(res.data.listOfTopics);
      setListOfFollowers(res.data.listOfFollowers);
      setListOfFollowers(res.data.listOfFollowing);
      setLoading(false);
    } catch (err) {
      setAlertSeverity('error');
      setAlertMessage(err.response.data);
      setUserError(true);
      setAlertOpen(true);
      setLoading(false);
    }
  };

  const getcurrentUser = async (currentUser) => {
    setLoading(true);
    if (currentUser === undefined || currentUser === '' || currentUser === null) {
      setLoading(false);
      setCurrentUserObj({});
      return;
    }
    try {
      let res = await axios.get(
        'https://cs307circle-production.herokuapp.com/api/getUser',
        {
          params: { username: currentUser },
        },
        headers
      );
      setCurrentUserObj(res.data);
      setLoading(false);
    } catch (err) {
      setCurrentUserObj({});
      setLoading(false);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  const bioBlur = async (e) => {
    var newBio = e.target.value;
    if (newBio === lastUpdatedBio) return;
    var data = {
      username: currentUserObj.username,
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
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      {userError && <Redirect to='/404'></Redirect>}
      {!userError && !loading && (
        <>
          <Grid container>
            <Grid item xs={12} md={requestedUser === currentUserObj.username ? 8 : 12}>
              <Card className={classes.avatarCard}>
                <div className={classes.avatarContainer}>
                  <img src='https://demos.creative-tim.com/argon-dashboard/assets/img/theme/team-4.jpg' className={classes.avatar} alt='avatar' />
                </div>
                <div className={classes.infoContainer}>
                  <div className={classes.flexDisplay}>
                    <Typography variant='h4' style={{ float: 'left' }}>
                      {requestedUserObj === null ? '' : requestedUserObj.username}
                    </Typography>
                    {requestedUser !== currentUserObj.username && (
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
                    {requestedUser === currentUser && (
                      <TextField label='Bio' key='Bio' fullWidth multiline rows={4} value={bio} onChange={bioChanged} onBlur={(e) => bioBlur(e)} />
                    )}
                    {requestedUser !== currentUser && <Typography variant='body1'>{requestedUserObj.bio}</Typography>}
                  </div>
                </div>
              </Card>
            </Grid>
            {requestedUser === currentUserObj.username && (
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
                {circles.length === 0 && <Typography variant='h5'>No CIRCLEs.</Typography>}
                {circles.length !== 0 &&
                  circles.map((circle) => (
                    <Chip
                      classes={{
                        label: classes.chipLabel,
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
          <Grid container>
            <Grid item xs={12} md={6}>
              <Card className={classes.infoCard}>
                <Divider variant='middle' />
                <Typography variant='h6' className={classes.infoTitle}>
                  Following
                </Typography>
                <div style={{ width: '75%', margin: '0 auto', marginBottom: '3rem' }}>
                  <div className={classes.followedCircles}>
                    {listOfFollowing.length === 0 && <Typography variant='h5'>No followings</Typography>}
                    {listOfFollowing.length !== 0 &&
                      listOfFollowing.map((following) => (
                        <Chip
                          classes={{
                            label: classes.chipLabel,
                          }}
                          key={following}
                          variant='outlined'
                          avatar={<Avatar>{following.charAt(0)}</Avatar>}
                          size='medium'
                          color='primary'
                          label={following}
                        />
                      ))}
                  </div>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.infoCard}>
                <Divider variant='middle' />
                <Typography variant='h6' className={classes.infoTitle}>
                  Follower
                </Typography>
                <div style={{ width: '75%', margin: '0 auto', marginBottom: '3rem' }}>
                  <div className={classes.followedCircles}>
                    {listOfFollowers.length === 0 && <Typography variant='h5'>No Followers</Typography>}
                    {listOfFollowers.length !== 0 &&
                      listOfFollowers.map((follower) => (
                        <Chip
                          classes={{
                            label: classes.chipLabel,
                          }}
                          key={follower}
                          variant='outlined'
                          avatar={<Avatar>{follower.charAt(0)}</Avatar>}
                          size='medium'
                          color='primary'
                          label={follower}
                        />
                      ))}
                  </div>
                </div>
              </Card>
            </Grid>
          </Grid>
          <Timeline user={requestedUser}></Timeline>
        </>
      )}
    </>
  );
}
