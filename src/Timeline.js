import './App.css';
import Post from './Post.js';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PeopleIcon from '@material-ui/icons/People';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    alignContent: 'center',
    paddingBottom: '30px',
    overflow: 'auto',
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {}, [props]);

  return (
    <Grid container>
      <Grid item xs={0} md={3}></Grid>
      <Grid item xs={12} md={6}>
        <Post></Post>
      </Grid>
      <Grid item xs={0} md={3}></Grid>
    </Grid>
  );
}
