import './App.css';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Timeline from './Timeline';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: '1rem',
    marginTop: '3rem'
  },
}));

export default function Profile(props) {
  // Disable search and login
  // Add history and styles
  // Get requested user from URL param
  // Hooks

  // initialize the user
  useEffect(() => {
    function setAppBar() {
      props.setShowSearchField(false);
      props.setShowLoginButton(true);
    }
    setAppBar();
  }, [props]);

  let { topic } = useParams();

  const classes = useStyles();

  return (
    <>
      <Grid container justify='center' className={classes.grid}>
        <Grid item>
          <Typography variant='h4'>Welcome to {topic}!</Typography>
        </Grid>
      </Grid>
      <Timeline topic={topic}></Timeline>
    </>
  );
}
