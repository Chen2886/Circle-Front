import './App.css';
import React, { useEffect } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  CardActions,
  Divider,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Snackbar,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CommentIcon from '@material-ui/icons/Comment';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import axios from 'axios';
import Alert from './Alert.js';

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

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export default function Post(props) {
  // Add history and styles
  // Get requested user from URL param
  // Hooks
  // textfield changes
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  const [votes, setVotes] = React.useState(0);
  const [disableUpvote, setDisableUpvote] = React.useState(false);
  const [disableDownvote, setDisableDownvote] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState('');
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [saved, setSaved] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('error');
  const [savedPost, setSavedPost] = React.useState([]);

  useEffect(() => {
    if (props.post.votes !== undefined) setVotes(props.post.votes);
    updateComments();
    if (localStorage.getItem('user') === undefined || localStorage.getItem('user') === null || localStorage.getItem('user') === '') {
      setLoggedIn(false);
      setDisableDownvote(true);
      setDisableUpvote(true);
    } else {
      setLoggedIn(true);
      updateSavedPost();
    }
  }, [props]);

  useEffect(() => {
    savedPost.forEach((post) => {
      if (post._id.$oid === props.post._id.$oid) setSaved(true);
    });
  }, [savedPost, props]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickAvatar = () => {
    history.push('/topic/' + props.post.topic);
  };

  const updateSavedPost = async () => {
    try {
      await axios
        .get(
          'https://cs307circle-production.herokuapp.com/api/listSavedPosts',
          {
            params: { username: localStorage.getItem('user') },
          },
          headers
        )
        .then((res) => setSavedPost(res.data))
        .catch((err) => {});
    } catch (err) {}
  };

  const updateComments = async () => {
    try {
      axios
        .get(
          'https://cs307circle-production.herokuapp.com/api/listComments',
          {
            params: { object_id: props.post._id.$oid },
          },
          headers
        )
        .then((res) => setComments(res.data))
        .catch((err) => setComments([]));
    } catch (err) {}
  };

  const upvote = async () => {
    var data = {
      object_id: props.post._id.$oid,
      votes: 1,
    };
    if (disableDownvote === false) {
      await axios.put('https://cs307circle-production.herokuapp.com/api/updatePostVotes', data, headers);
      setVotes(votes + 1);
    } else {
      await axios.put('https://cs307circle-production.herokuapp.com/api/updatePostVotes', data, headers);
      await axios.put('https://cs307circle-production.herokuapp.com/api/updatePostVotes', data, headers);
      setVotes(votes + 2);
    }
    setDisableUpvote(true);
    setDisableDownvote(false);
  };

  const downvote = async () => {
    var data = {
      object_id: props.post._id.$oid,
      votes: -1,
    };
    if (disableUpvote === false) {
      await axios.put('https://cs307circle-production.herokuapp.com/api/updatePostVotes', data, headers);
      setVotes(votes - 1);
    } else {
      await axios.put('https://cs307circle-production.herokuapp.com/api/updatePostVotes', data, headers);
      await axios.put('https://cs307circle-production.herokuapp.com/api/updatePostVotes', data, headers);
      setVotes(votes - 2);
    }
    setDisableDownvote(true);
    setDisableUpvote(false);
  };

  const postComment = async () => {
    if (newComment.length > 200) {
      setAlertSeverity('error');
      setAlertMessage('Comment must be shorter than 200 characters.');
      setAlertOpen(true);
      return;
    }
    var data = {
      object_id: props.post._id.$oid,
      author: localStorage.getItem('user'),
      comment: newComment,
    };

    axios
      .post('https://cs307circle-production.herokuapp.com/api/createComment', data, headers)
      .then(function () {
        updateComments();
      })
      .catch(function (err) {
        setAlertSeverity('error');
        setAlertMessage(err.response.data);
        setAlertOpen(true);
      });

    setNewComment('');
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const savePost = async () => {
    var url;
    var data = {
      username: localStorage.getItem('user'),
      post_oid: props.post._id.$oid,
    };
    if (saved) url = 'https://cs307circle-production.herokuapp.com/api/unsavePost';
    else url = 'https://cs307circle-production.herokuapp.com/api/savePost';
    try {
      await axios.put(url, data, headers);
      setAlertSeverity('success');
      setAlertMessage(saved ? 'Unsaved!' : 'Saved!');
      setAlertOpen(true);
    } catch (err) {
      setAlertSeverity('error');
      setAlertMessage('Could not save, try again later');
    }
    updateSavedPost();
    setSaved(!saved);
  };

  return (
    <>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <IconButton onClick={handleClickAvatar}>
              <Avatar aria-label='post' style={{ backgroundColor: `${stringToColor(props.post.topic)}` }}>
                {props.post.topic.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          }
          action={
            <IconButton aria-label='settings' onClick={savePost} disabled={!loggedIn}>
              {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
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
          <IconButton aria-label='upvote' onClick={upvote} disabled={disableUpvote}>
            <ArrowUpwardIcon />
          </IconButton>
          <Typography variant='body1'>{votes}</Typography>
          <IconButton aria-label='downvote' onClick={downvote} disabled={disableDownvote}>
            <ArrowDownwardIcon />
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
            {comments.length === 0 && <Typography variant='body2'>No comments.</Typography>}
            {comments.length !== 0 &&
              comments.map((comment, i) => (
                <Typography variant='body2' key={i}>
                  {comment.author + ': ' + comment.comment}
                </Typography>
              ))}
            {localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null && localStorage.getItem('user') !== '' && (
              <div style={{ marginTop: '1rem' }}>
                <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-new-comment'>New Comment</InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-new-comment'
                    value={newComment}
                    onChange={handleCommentChange}
                    multiline
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton aria-label='toggle password visibility' onClick={postComment} edge='end'>
                          <CommentIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={120}
                  />
                </FormControl>
              </div>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
