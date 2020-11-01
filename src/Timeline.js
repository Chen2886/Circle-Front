import './App.css';
import Post from './Post.js';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Snackbar, Typography } from '@material-ui/core';
import axios from 'axios';
import Alert from './Alert.js';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles(() => ({
  container: {
    // margin: '1rem',
  },
}));

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export default function Timeline(props) {
  const classes = useStyles();
  const [posts, setPosts] = React.useState([]);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [numOfPosts, setNumOfPosts] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  useEffect(() => {
    var data = {};
    if (props.user !== undefined && props.user !== null) {
      data = {
        author: props.user,
      };
    } else if (props.topic !== undefined && props.topic !== null) {
      data = {
        topic: props.topic,
      };
    } else if ((props.user === undefined || props.user === null) && (props.topic === undefined || props.topic === null)) {
      axios
        .get('https://cs307circle-production.herokuapp.com/api/getAllPosts', headers)
        .then(function (res) {
          var sortedPosts = res.data.sort(function (a, b) {
            return b.dateAndTime.$date - a.dateAndTime.$date;
          });
          setPosts(sortedPosts);
          setNumOfPosts(sortedPosts.length);
          if (sortedPosts.length === 0) setHasMore(false);
        })
        .catch(function (err) {
          setAlertOpen(true);
          setAlertMessage(err.response === null ? 'Error, please try again later' : err.response.data);
          setHasMore(false);
        });
      return;
    }
    axios
      .get(
        'https://cs307circle-production.herokuapp.com/api/listPost',
        {
          params: data,
        },
        headers
      )
      .then(function (res) {
        var sortedPosts = res.data.sort(function (a, b) {
          return b.dateAndTime.$date - a.dateAndTime.$date;
        });
        setPosts(sortedPosts);
        setNumOfPosts(sortedPosts.length);
        if (sortedPosts.length === 0) setHasMore(false);
      })
      .catch(function (err) {
        setAlertOpen(true);
        setAlertMessage(err.response === undefined ? 'Error, please try again later' : err.response.data);
        setHasMore(false);
      });
  }, [props]);

  const fetchMoreData = () => {
    setHasMore(false);
  };

  return (
    <>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity='error'>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Grid container alignItems='center' justify='center' className={classes.container}>
        <Grid item xs={12} md={8}>
          {posts.length !== 0 && (
            <InfiniteScroll
              dataLength={numOfPosts}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                <Grid container alignItems='center' justify='center' style={{ marginTop: '5rem', marginBottom: '5rem' }}>
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              }>
              {posts.map((post, i) => {
                return <Post post={post} key={i} />;
              })}
            </InfiniteScroll>
          )}
          {posts.length === 0 && (
            <Grid container alignItems='center' justify='center' style={{ marginTop: '5rem', marginBottom: '5rem' }}>
              <Grid item>
                <Typography variant='h6'>No posts available! Go make one.</Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
