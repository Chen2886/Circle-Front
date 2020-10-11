import './404.css';
import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const font = "'Tenor Sans', sans-serif";

const useStyles = makeStyles(() => ({
  Typography: {
    textAlign: 'center',
    margin: '5rem 15px',
  },
  buttonLabel: {
    fontFamily: font,
    color: '#528487',
  },
  button: {
    borderColor: '#528487',
  },
  linkContainer: {
    textAlign: 'center'
  }
}));

export default function Page404() {
  const classes = useStyles();
  return (
    <div>
      <section class='error-container'>
        <span>4</span>
        <span>
          <span class='screen-reader-text'>0</span>
        </span>
        <span>4</span>
      </section>
      <div className={classes.linkContainer}>
        <Button
          color='inherit'
          variant='outlined'
          component={Link}
          to='/'
          classes={{
            root: classes.button,
            label: classes.buttonLabel,
          }}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
