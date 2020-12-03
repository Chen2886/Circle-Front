import './App.css';
import Timeline from './Timeline.js';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: '1rem',
    marginTop: '3rem',
  },
}));

export default function SavedPost(props) {
  useEffect(() => {
    function setAppBar() {
      props.setShowSearchField(true);
      props.setShowLoginButton(true);
    }
    setAppBar();
  }, [props]);

  const classes = useStyles();

  return (
    <>
      <Grid container justify='center' direction='column' alignItems='center' className={classes.grid}>
        <Grid item>
          <Typography style={{ marginBottom: '1rem' }} variant='h4'>
            Welcome to your posts!
          </Typography>
        </Grid>
      </Grid>
      <Timeline userline={localStorage.getItem('user')}></Timeline>
    </>
  );
}
