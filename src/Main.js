import './App.css';
import Timeline from './Timeline.js'
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PeopleIcon from '@material-ui/icons/People';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    alignContent: 'center',
    paddingBottom: '30px',
    overflow: 'auto',
  }
}));

export default function Main(props) {
  useEffect(() => {
    
  }, [props]);

  return (
    <>
      <Fab color='primary' aria-label='New Post' href='/newPost'>
        <EditIcon />
      </Fab>
      <Fab color='primary' aria-label='My Friends' href='/myFriends'>
        <PeopleIcon />
      </Fab>
      <Fab color='primary' aria-label='My Circles' href='/myCircle'>
        <RadioButtonUncheckedIcon />
      </Fab>
      <Timeline topic={props.topic}></Timeline>
    </>
  );
}
