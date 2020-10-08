import './App.css';
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { Grid, Button, Typography, Card, TextField, Divider, Chip, Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  avatarCard: {
    margin: '2rem',
    display: 'flex',
    boxShadow: '0px 10px 13px -7px #000000, 0px 0px 8px 0px rgba(0,0,0,0)',
  },
  infoCard: {
    margin: '2rem',
    boxShadow: '0px 10px 13px -7px #000000, 0px 0px 8px 0px rgba(0,0,0,0)',
  },
  avatar: {
    maxWidth: '180px',
    left: '50%',
    borderRadius: '50%',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '3rem',
    float: 'left',
  },
  infoContainer: {
    margin: '3rem',
    marginLeft: '5rem',
    marginRight: '3rem',
    float: 'left',
    width: '100%',
    overflow: 'auto',
  },
  flexDisplay: {
    display: 'flex',
  },
  infoTitle: {
    margin: '1rem',
    marginTop: '3rem',
    textAlign: 'center',
    width: '100%',
  },
  gridContainer: {
    flexGrow: 1,
    margin: '3rem',
    marginTop: '0',
  },
  textField: {
    margin: '0 auto',
    display: 'block',
    overflow: 'auto',
    width: '60%',
  },
  textFieldContainer: {
    overflow: 'auto',
    margin: '0.5rem',
    display: 'flex',
  },
  followedCircles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // width: '60%',
    marginBottom: '1rem',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const bioFocus = (setBio, e) => {
  console.log(e.target.value);
};

const bioBlur = (setBio, e) => {
  console.log(e.target.value);
  setBio(e.target.value);
};

const handleClick = () => {
  console.info('You clicked the Chip.');
};

const handleDelete = () => {
  console.info('You clicked the delete icon.');
};

export default function Main(props) {
  props.setShowSearchField(true);
  props.setShowLoginButton(true);

  const history = useHistory();

  const handleLogout = () => {
    props.setLoggedIn(false);
    history.push('/');
  }

  const [bio, setBio] = React.useState('');

  const classes = useStyles();

  return (
    <>
      <Card className={classes.avatarCard}>
        <div className={classes.avatarContainer}>
          <img src='https://demos.creative-tim.com/argon-dashboard/assets/img/theme/team-4.jpg' className={classes.avatar} />
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.flexDisplay}>
            <Typography variant='h4' style={{ float: 'left' }}>
              First Last
            </Typography>
            <Button variant='outlined' style={{ marginLeft: '2rem' }} onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <div className={classes.flexDisplay} style={{ marginTop: '1rem' }}>
            <Typography variant='h6' style={{ float: 'left' }}>
              22 Friends
            </Typography>
            <Typography variant='h6' style={{ float: 'left', marginLeft: '2rem' }}>
              89 Comment
            </Typography>
          </div>
          <div className={classes.flexDisplay} style={{ marginTop: '1rem' }}>
            <TextField
              label='Bio'
              fullWidth
              multiline
              rows={4}
              defaultValue={bio}
              onFocus={(e) => bioFocus(setBio, e)}
              onBlur={(e) => bioBlur(setBio, e)}
              variant='outlined'
              on
            />
          </div>
        </div>
      </Card>
      <Card className={classes.infoCard}>
        <div className={classes.gridContainer}>
          <Grid container>
            <Typography variant='h6' className={classes.infoTitle}>
              User information
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div className={classes.textFieldContainer}>
                <TextField type='text' variant='outlined' className={classes.textField} label='Username' fullWidth />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.textFieldContainer}>
                <TextField type='email' variant='outlined' className={classes.textField} label='Email' fullWidth />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div className={classes.textFieldContainer}>
                <TextField type='text' variant='outlined' className={classes.textField} label='First Name' fullWidth />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.textFieldContainer}>
                <TextField type='text' variant='outlined' className={classes.textField} label='Last Name' fullWidth />
              </div>
            </Grid>
          </Grid>
        </div>
        <Divider variant='middle' />
        <Typography variant='h6' className={classes.infoTitle}>
          Followed Circles
        </Typography>
        <div style={{width: '75%', margin: '0 auto', marginBottom: '3rem'}}>
          <div className={classes.followedCircles}>
            <Chip variant='outlined' size='small' label='Basic' />
            <Chip variant='outlined' size='small' avatar={<Avatar>M</Avatar>} label='Clickable' onClick={handleClick} />
            <Chip
              variant='outlined'
              size='small'
              avatar={<Avatar alt='Natacha' src='/static/images/avatar/1.jpg' />}
              label='Deletable'
              onDelete={handleDelete}
            />
            <Chip variant='outlined' size='small' icon={<FaceIcon />} label='Clickable deletable' onClick={handleClick} onDelete={handleDelete} />
            <Chip
              variant='outlined'
              size='small'
              label='Custom delete icon'
              onClick={handleClick}
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip variant='outlined' size='small' label='Clickable link' component='a' href='#chip' clickable />
            <Chip
              variant='outlined'
              size='small'
              avatar={<Avatar>M</Avatar>}
              label='Primary clickable'
              clickable
              color='primary'
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip
              variant='outlined'
              size='small'
              icon={<FaceIcon />}
              label='Primary clickable'
              clickable
              color='primary'
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip variant='outlined' size='small' label='Deletable primary' onDelete={handleDelete} color='primary' />
          </div>
        </div>
      </Card>
    </>
  );
}
