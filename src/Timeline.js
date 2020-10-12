import './App.css';
import Post from './Post.js';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import axios from 'axios';
import Alert from './Alert.js';
import EditIcon from '@material-ui/icons/Edit';
import PeopleIcon from '@material-ui/icons/People';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles((theme) => ({
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
  const [loading, setLoading] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    var data = {
      author: 'user2',
    };
    axios
      .get(
        'https://cs307circle-staging.herokuapp.com/api/listPost',
        {
          params: data,
        },
        headers
      )
      .then(function (res) {
        var posts = res.data.sort(function (a, b) {
          return b.dateAndTime.$date - a.dateAndTime.$date;
        });
        setPosts(posts);
        setLoading(false);
      })
      .catch(function (err) {
        setAlertOpen(true);
        setAlertMessage(err.response === null ? 'Error, please try again later' : err.response.data);
        setLoading(false);
      });
  }, [props]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity='error'>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Grid container alignItems='center' justify='center' className={classes.container}>
        <Grid item xs={12} md={8}>
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}
