import './App.css';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Timeline from './Timeline';
import { Typography, Grid, Button } from '@material-ui/core';
import axios from 'axios';

const font = "'Tenor Sans', sans-serif";

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: '1rem',
    marginTop: '3rem',
  },
  buttonLabel: {
    fontFamily: font,
    color: '#528487',
  },
  button: {
    borderColor: '#528487',
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
  const [followedTopics, setFollowedTopics] = React.useState([]);
  const [currentUserFollowingTopic, setCurrentUserFollowingTopic] = React.useState(false);

  // initialize the user
  useEffect(() => {
    function setAppBar() {
      props.setShowSearchField(false);
      props.setShowLoginButton(true);
    }
    setAppBar();
    updateTopics();
  }, [props]);

  useEffect(() => {
    checkFollowing();
  }, [followedTopics]);

  let { topic } = useParams();

  const classes = useStyles();

  const updateTopics = async () => {
    try {
      await axios
        .get(
          'https://cs307circle-production.herokuapp.com/api/getUserTopics',
          {
            params: { username: localStorage.getItem('user') },
          },
          headers
        )
        .then((res) => setFollowedTopics(res.data))
        .catch((err) => setFollowedTopics([]));
    } catch (err) {}
  };

  const unfollowTopic = async () => {
    var data = {
      username: localStorage.getItem('user'),
      topic: topic,
    };
    await axios.put('https://cs307circle-production.herokuapp.com/api/unfollowTopic', data, headers).catch(function (err) {
      return;
    });
    await updateTopics();
  };

  const followTopic = async () => {
    var data = {
      username: localStorage.getItem('user'),
      topic: topic,
    };
    await axios.put('https://cs307circle-production.herokuapp.com/api/followTopic', data, headers).catch(function (err) {
      return;
    });
    await updateTopics();
  };

  const checkFollowing = () => {
    var temp = false;
    followedTopics.forEach((followingTopic) => {
      if (followingTopic.topic === topic) temp = true;
    });
    setCurrentUserFollowingTopic(temp);
  };

  return (
    <>
      <Grid container justify='center' direction='column' alignItems='center' className={classes.grid}>
        <Grid item>
          <Typography style={{ marginBottom: '1rem' }} variant='h4'>
            Welcome to {topic}!
          </Typography>
        </Grid>
        {localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== '' && localStorage.getItem('user') !== null && (
          <Grid item>
            <Button
              variant='outlined'
              style={{ marginLeft: '1rem' }}
              onClick={currentUserFollowingTopic ? unfollowTopic : followTopic}
              classes={{
                root: classes.button,
                label: classes.buttonLabel,
              }}>
              {currentUserFollowingTopic ? 'UNFOLLOW' : 'FOLLOW'}
            </Button>
          </Grid>
        )}
      </Grid>
      <Timeline topic={topic}></Timeline>
    </>
  );
}
