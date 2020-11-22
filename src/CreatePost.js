import './App.css';
import React, { useEffect, useCallback } from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MmsIcon from '@material-ui/icons/Mms';
import Alert from './Alert.js';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import {
  Typography,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Backdrop,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: '1rem',
  },
  card: {
    margin: '2rem',
    boxShadow: '0px 10px 13px -7px #000000, 0px 0px 8px 0px rgba(0,0,0,0)',
  },
  title: {
    marginTop: '3rem',
  },
  textField: {
    marginTop: '1rem',
  },
  uploadFileButton: {
    marginTop: '1rem',
    alignContent: 'right',
  },
  uploadFileArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#528487',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginTop: '1rem',
  },
  img: {
    marginTop: '1rem',
    maxHeight: '30rem',
    objectFit: 'contain',
    maxWidth: '100%',
  },
  previewImg: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export default function CreatePost(props) {
  const history = useHistory();
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [openPreview, setOpenPreview] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState();
  const [alertSeverity, setAlertSeverity] = React.useState('error');

  // text post hook
  const [textCircle, setTextCircle] = React.useState('');
  const [textTitle, setTextTitle] = React.useState('');
  const [textContent, setTextContent] = React.useState('');
  const [missingRequired, setMissingRequired] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const handleCancel = () => history.push('/');

  const handleClickOpenPreview = () => setOpenPreview(true);
  const handleClosePreview = () => setOpenPreview(false);
  const handleTextCircleChange = (e) => setTextCircle(e.target.value);
  const handleTextTitleChange = (e) => setTextTitle(e.target.value);
  const handleTextContentChange = (e) => setTextContent(e.target.value);
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles([]);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      // TODO: err handle
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onloadend = () => {
        setUploadedFiles((current) => [...current, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ accept: 'image/*', onDrop });

  useEffect(() => {
    function setAppBar() {
      props.setShowSearchField(false);
      props.setShowLoginButton(true);
    }
    var currentUser = localStorage.getItem('user');
    if (currentUser === null || currentUser === undefined || currentUser === '') history.push('/login');
    setAppBar();
  }, [props]);

  const handlePost = async (anon) => {
    if (uploadedFiles.length === 0) handlePostText();
    // if any fields are empty
    if (textCircle === '' || textContent === '' || textTitle === '') {
      setMissingRequired(true);
      return;
    }
    var data = {
      author: anon ? 'anonymous user' : localStorage.getItem('user'),
      title: textTitle,
      text: textContent,
      topic: textCircle,
      image: uploadedFiles,
    };

    // show loading
    setLoading(true);

    try {
      await axios.post('https://cs307circle-production.herokuapp.com/api/createPost', data, headers);
      setLoading(false);
      if (anon) {
        setAlertMessage('You posted anonymously. Your post will not show up in your timeline, only the topic timeline.');
        setAlertSeverity('success');
        setAlertOpen(true);
      }
      history.push('/');
    } catch (err) {
      setAlertMessage(err.response === null ? 'Error, please try again later' : err.response.data);
      setLoading(false);
      setAlertSeverity('error');
      setAlertOpen(true);
      return;
    }
  };

  const handlePostText = async (anon) => {
    // if any fields are empty
    if (textCircle === '' || textContent === '' || textTitle === '') {
      setMissingRequired(true);
      return;
    }
    var data = {
      author: anon ? 'anonymous user' : localStorage.getItem('user'),
      title: textTitle,
      text: textContent,
      topic: textCircle,
    };

    // show loading
    setLoading(true);

    try {
      await axios.post('https://cs307circle-production.herokuapp.com/api/createPost', data, headers);
      setLoading(false);
      if (anon) {
        setAlertMessage('You posted anonymously. Your post will not show up in your timeline, only the topic timeline.');
        setAlertSeverity('success');
        setAlertOpen(true);
      }
      history.push('/');
    } catch (err) {
      setAlertMessage(err.response === null ? 'Error, please try again later' : err.response.data);
      setLoading(false);
      setAlertSeverity('error');
      setAlertOpen(true);
      return;
    }
  };

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  const filePreview = (
    <Grid container direction='row' justify='center' alignItems='center' spacing={2}>
      {uploadedFiles.map((file, index) => {
        return (
          <Grid item xs={uploadedFiles.length - index - 1 < uploadedFiles.length % 3 ? 12 / (uploadedFiles.length % 3) : 4} key={index}>
            <img
              src={file}
              alt='uploaded file'
              className={classes.img}
              onClick={() => {
                setImgSrc(file);
                handleClickOpenPreview();
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleConfirmDeleteDialog = () => {
    // TODO: API delete account
    setDeleteDialogOpen(false);
    if (tab === 0) handlePostText(true);
    else handlePost(true);
  };

  return (
    <>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Post Anonymously?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to post anonymously? Your post will not show up in your timeline, only on a topic timeline.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteDialog} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop open={openPreview} onClick={handleClosePreview} className={classes.backdrop}>
        <img src={imgSrc} className={classes.previewImg} />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Typography variant='h4' align='center' className={classes.title}>
        Create a Post
      </Typography>
      <Grid container justify='center' className={classes.grid}>
        <Grid item xs={12} md={3}>
          <Card className={classes.card} style={{ padding: '1rem' }}>
            <Typography variant='h5' align='center'>
              Guidelines
            </Typography>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <Tabs variant='fullWidth' value={tab} onChange={handleChange}>
              <Tab icon={<CommentIcon />} label='Text' />
              <Tab icon={<MmsIcon />} label='Picture / Video' />
            </Tabs>
            {tab === 0 && (
              <>
                <CardContent>
                  <TextField
                    label='Circle'
                    variant='outlined'
                    fullWidth
                    className={classes.textField}
                    onChange={handleTextCircleChange}
                    value={textCircle}
                    error={missingRequired && textCircle === ''}
                  />
                  <TextField
                    label='Title'
                    variant='outlined'
                    fullWidth
                    className={classes.textField}
                    onChange={handleTextTitleChange}
                    value={textTitle}
                    error={missingRequired && textTitle === ''}
                  />
                  <TextField
                    label='Content'
                    multiline
                    fullWidth
                    rows={10}
                    variant='outlined'
                    className={classes.textField}
                    onChange={handleTextContentChange}
                    text={textContent}
                    error={missingRequired && textContent === ''}
                  />
                </CardContent>
                <CardActions>
                  <Button color='primary' onClick={() => handlePostText(false)}>
                    Post
                  </Button>
                  <Button color='primary' onClick={() => setDeleteDialogOpen(true)}>
                    Post Anonymously
                  </Button>
                  <Button color='primary' onClick={handleCancel}>
                    Cancel
                  </Button>
                </CardActions>
              </>
            )}
            {tab === 1 && (
              <>
                <CardContent>
                  <TextField
                    label='Circle'
                    variant='outlined'
                    fullWidth
                    className={classes.textField}
                    onChange={handleTextCircleChange}
                    value={textCircle}
                    error={missingRequired && textCircle === ''}
                  />
                  <TextField
                    label='Title'
                    variant='outlined'
                    fullWidth
                    className={classes.textField}
                    onChange={handleTextTitleChange}
                    value={textTitle}
                    error={missingRequired && textTitle === ''}
                  />
                  <TextField
                    label='Content'
                    multiline
                    fullWidth
                    rows={10}
                    variant='outlined'
                    className={classes.textField}
                    onChange={handleTextContentChange}
                    text={textContent}
                    error={missingRequired && textContent === ''}
                  />
                  <div {...getRootProps({ className: classes.uploadFileArea })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  {filePreview}
                </CardContent>
                <CardActions>
                  <Button color='primary' onClick={() => handlePost(false)}>
                    Post
                  </Button>
                  <Button color='primary' onClick={() => setDeleteDialogOpen(true)}>
                    Post Anonymously
                  </Button>
                  <Button color='primary' onClick={handleCancel}>
                    Cancel
                  </Button>
                </CardActions>
              </>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>
    </>
  );
}
