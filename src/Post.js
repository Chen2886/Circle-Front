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
    width: '100%',
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

export default function Login() {
  // Add history and styles
  // Get requested user from URL param
  // Hooks
  // textfield changes
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant='h6'>User</Typography>}
        subheader={<Typography variant='caption'>September 14th, 2020</Typography>}
      />
      {/* <CardMedia className={classes.media} image='/static/images/cards/paella.jpg' title='Paella dish' /> */}
      <Divider />
      <CardContent>
        <Typography variant='h4'>Title</Typography>
        <Typography variant='body1' style={{ marginTop: '1rem' }}>
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
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
          <Typography variant='body2'>Method:</Typography>
          <Typography paragraph>Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.</Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo
            in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant,
            about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
