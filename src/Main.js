import './App.css';
import Timeline from './Timeline.js';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PeopleIcon from '@material-ui/icons/People';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    alignContent: 'center',
    paddingBottom: '30px',
    overflow: 'auto',
  },
}));

export default function Main(props) {
  useEffect(() => {
    function setAppBar() {
      props.setShowSearchField(true);
      props.setShowLoginButton(true);
    }
    setAppBar();
  }, [props]);

  return (
    <>
      <Fab color='primary' aria-label='New Post' component={Link} to='/CreatePost'>
        <EditIcon />
      </Fab>
      <Fab color='primary' aria-label='My Friends' component={Link} to='/myFriends'>
        <PeopleIcon />
      </Fab>
      <Fab color='primary' aria-label='My Circles' component={Link} to='/myCircle'>
        <RadioButtonUncheckedIcon />
      </Fab>
      <Timeline user={localStorage.getItem('user')}></Timeline>
    </>
  );
}
