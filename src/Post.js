import './App.css';
import React from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import { useHistory } from 'react-router-dom';
import MmsIcon from '@material-ui/icons/Mms';
import { Paper, Typography, TextField, Tabs, Tab, Box, Card, CardActionArea, CardContent, CardActions, Button, Grid } from '@material-ui/core';

export default function Post() {
  const history = useHistory();

  const handleCancel = () => {
    history.push('/');
  };

  const handlePost = () => {
    history.push('/');
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      {/* Empty grid to align items.*/}
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Box m={2}>
          <Paper elevation={0}>
            <Typography variant='h4' align='left'>
              create a post
            </Typography>
          </Paper>
        </Box>
        <form noValidate autoComplete='off'>
          <TextField id='outlined-basic' label='Select Circle' variant='outlined' />
          <Tabs variant='fullWidth' value={value} onChange={handleChange}>
            <Tab icon={<CommentIcon />} label='Text' />
            <Tab icon={<MmsIcon />} label='Picture / Video' />
          </Tabs>
          {value === 0 && (
            <Box p={3}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <TextField id='standard-basic' label='add title...' fullWidth />
                    <TextField
                      id='filled-multiline-static'
                      label='write something nice...'
                      multiline
                      fullWidth
                      rows={4}
                      //defaultValue="Default Value"
                      variant='filled'
                    />
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size='small' color='primary'>
                    Post
                  </Button>
                  <Button size='small' color='primary'>
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Box>
          )}
          {value === 1 && (
            <Box p={3}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <input accept='image/*' id='contained-button-file' multiple type='file' />
                    <label htmlFor='contained-button-file'>
                      <Button variant='contained' color='primary' component='span'>
                        Upload
                      </Button>
                    </label>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size='small' color='primary' onClick={handlePost}>
                    Post
                  </Button>
                  <Button size='small' color='primary' onClick={handlePost}>
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Box>
          )}
        </form>
      </Grid>
      <Grid item xs={4}>
        <Box textAlign='center'>
          <Typography variant='h5' align='center'>
            Guidlines
          </Typography>
          <li>hidsfdsfds dgsfsd</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
          <li>hi</li>
        </Box>
      </Grid>
    </Grid>
  );
}
