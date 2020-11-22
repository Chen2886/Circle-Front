import './App.css';
import Post from './Post.js';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Snackbar, Typography, Backdrop } from '@material-ui/core';
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
  const [loading, setLoading] = React.useState(false);
  const [filter, setfilter] = React.useState({});

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  useEffect(() => {
    if (filter === props.filter || posts.length > 0) {
      return;
    }
    if (filter !== props.filter) {
      setfilter(props.filter);
    }

    console.log('loading new posts.');

    setLoading(true);
    var data = {};

    // user's customize timeline
    if (props.timeline !== undefined && props.timeline !== null) {
      data = { username: props.timeline };
      axios
        .get('https://cs307circle-production.herokuapp.com/api/getUserTimeline', { params: data }, headers)
        .then(function (res) {
          var sortedPosts = res.data.sort(function (a, b) {
            return b.dateAndTime.$date - a.dateAndTime.$date;
          });
          if (props.filter !== undefined || props.filter !== null) {
            var filter = [];
            for (const [key, value] of Object.entries(props.filter)) {
              if (value === 'outlined') filter.push(key);
            }
            sortedPosts = sortedPosts.filter((post) => {
              return !filter.includes(post.topic) || post.author === localStorage.getItem('user');
            });
          }

          setPosts(sortedPosts);
          setNumOfPosts(sortedPosts.length);
          if (sortedPosts.length === 0) setHasMore(false);
        })
        .catch(function (err) {
          if (
            err.response !== undefined &&
            err.response.data === 'This user has not made any posts, does not follow anyone, and does not follow any topics.'
          ) {
            setHasMore(false);
            return;
          }
          setAlertOpen(true);
          setAlertMessage(err.response === undefined ? 'Error, please try again later' : err.response.data);
          setHasMore(false);
        });
      setLoading(false);
      return;
    }

    if (props.savedPost !== undefined && props.savedPost !== null) {
      data = { username: props.savedPost };
      axios
        .get('https://cs307circle-production.herokuapp.com/api/listSavedPosts', { params: data }, headers)
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
      setLoading(false);
      return;
    }

    // all post timeline
    if ((props.user === undefined || props.user === null) && (props.topic === undefined || props.topic === null)) {
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
      setLoading(false);
      return;
    }

    // regular timeline
    if (props.user !== undefined && props.user !== null) data = { author: props.user };
    else if (props.topic !== undefined && props.topic !== null) data = { topic: props.topic };

    axios
      .get('https://cs307circle-production.herokuapp.com/api/listPost', { params: data }, headers)
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
    setLoading(false);
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
      <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Grid container alignItems='center' justify='center' className={classes.container}>
        <Grid item xs={12} md={8}>
          {(posts.length !== 0 || hasMore) && (
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
          {posts.length === 0 && !hasMore && (
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
