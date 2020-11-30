import './App.css';
import Timeline from './Timeline.js';
import React, { useEffect } from 'react';
import { Fab, Card, Divider, Typography, Chip, Avatar, Grid, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Link } from 'react-router-dom';
import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const useStyles = makeStyles((theme) => ({
  infoCard: {
    margin: '1rem',
    boxShadow: '0px 10px 13px -7px #000000, 0px 0px 8px 0px rgba(0,0,0,0)',
  },
  infoTitle: {
    // margin: '1rem',
    marginTop: '2rem',
    textAlign: 'center',
  },
  followedCircles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '1rem',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chipLabel: {
    fontSize: '20px',
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const [circles, setCircles] = React.useState([]);
  const [chipDict, setChipDict] = React.useState({});
  const [update, setUpdate] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('Default');

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  useEffect(() => {
    function setAppBar() {
      props.setShowSearchField(true);
      props.setShowLoginButton(true);
    }
    updateTopics(localStorage.getItem('user'), setCircles);
    setAppBar();
  }, [props]);

  const updateTopics = async (username, f) => {
    if (username === null || username === '' || username === undefined) {
      setCircles(null);
      return;
    }
    axios
      .get(
        'https://cs307circle-production.herokuapp.com/api/getUserTopics',
        {
          params: { username: username },
        },
        headers
      )
      .then((res) => {
        f(res.data);
        var data = {};
        res.data.forEach((circle) => (data[circle.topic] = 'default'));
        setChipDict(data);
      })
      .catch((err) => f([]));
  };

  const circleClicked = (topic) => {
    if (chipDict[topic] === 'default') chipDict[topic] = 'outlined';
    else chipDict[topic] = 'default';
    setChipDict(chipDict);
    setUpdate(!update);
  };

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
      {circles != null && (
        <Grid container alignItems='center' justify='center'>
          <Grid item xs={12} md={4}>
            <Card className={classes.infoCard}>
              <Divider variant='middle' />
              <Typography variant='h6' className={classes.infoTitle}>
                Filter Circles
              </Typography>
              <div style={{ width: '75%', margin: '0 auto', marginBottom: '3rem' }}>
                <div className={classes.followedCircles}>
                  {circles.length === 0 && <Typography variant='h5'>No CIRCLEs.</Typography>}
                  {Object.keys(chipDict).length !== 0 &&
                    Object.keys(chipDict).map((circle) => (
                      <Chip
                        classes={{
                          label: classes.chipLabel,
                        }}
                        clickable
                        variant={chipDict[circle]}
                        avatar={<Avatar>{circle.charAt(0).toUpperCase()}</Avatar>}
                        size='medium'
                        color={update ? 'primary' : 'primary'}
                        label={circle}
                        key={circle}
                        onClick={() => circleClicked(circle)}
                      />
                    ))}
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.infoCard}>
              <Divider variant='middle' />
              <Typography variant='h6' className={classes.infoTitle}>
                Sorting Options
              </Typography>
              <div style={{ width: '75%', margin: '0 auto', marginBottom: '3rem' }}>
                <FormControl component='fieldset'>
                  <RadioGroup value={radioValue} onChange={handleRadioChange}>
                    <FormControlLabel value='Default' control={<Radio color='primary' />} label='Default' />
                    <FormControlLabel value='Engagement' control={<Radio color='primary' />} label='Engagement' />
                    <FormControlLabel value='Interaction' control={<Radio color='primary' />} label='Interaction' />
                    <FormControlLabel value='other' control={<Radio color='primary' />} label='Other' />
                  </RadioGroup>
                </FormControl>
              </div>
            </Card>
          </Grid>
        </Grid>
      )}
      <Timeline timeline={localStorage.getItem('user')} filter={chipDict} sort={radioValue}></Timeline>
    </>
  );
}
