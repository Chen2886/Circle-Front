import './App.css';
import React from 'react';
import { Typography, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CommentIcon from '@material-ui/icons/Comment';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    margin: '1rem',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Post(props) {
  // Add history and styles
  // Get requested user from URL param
  // Hooks
  // textfield changes
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(props);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='post' className={classes.avatar}>
            {props.post.topic.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant='h6'>
            Posted on {props.post.topic} by {props.post.author}
          </Typography>
        }
        subheader={<Typography variant='caption'>{new Date(props.post.dateAndTime.$date).toLocaleString()}</Typography>}
      />
      {/* <CardMedia className={classes.media} image='/static/images/cards/paella.jpg' title='Paella dish' /> */}
      <Divider />
      <CardContent>
        <Typography variant='h4'>{props.post.title}</Typography>
        <Typography variant='body1' style={{ marginTop: '1rem' }}>
          {props.post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='upvote'>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton aria-label='downvote'>
          <ArrowDownwardIcon />
        </IconButton>
        <IconButton aria-label='downvote'>
          <CommentIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {props.post.listOfComments.length === 0 && <Typography variant='body2'>No comments.</Typography>}
          {props.post.listOfComments.length !== 0 && props.post.listOfComments.map((comment) => (
            <Typography variant='body2'>{comment}</Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
