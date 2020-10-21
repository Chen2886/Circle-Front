import './App.css';
import React, { useEffect, useCallback } from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MmsIcon from '@material-ui/icons/Mms';
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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Backdrop,
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

export default function CreatePost(props) {
  const history = useHistory();
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [openPreview, setOpenPreview] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState();

  //
  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles([]);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onloadend = () => setUploadedFiles((current) => [...current, reader.result]);
      reader.readAsDataURL(file);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: 'image/*', onDrop });

  useEffect(() => {
    function setAppBar() {
      props.setShowSearchField(false);
      props.setShowLoginButton(true);
    }
    if (props.currentUser === null || props.currentUser === undefined || props.currentUser === '') history.push('/login');
    setAppBar();
  }, [props]);

  const handleCancel = () => {
    history.push('/');
  };

  const handlePost = () => {
    history.push('/');
  };

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  const filePreview = (
    <Grid container direction='row' justify='center' alignItems='center' spacing={2}>
      {uploadedFiles.map((file, index) => {
        console.log(index);
        console.log(uploadedFiles.length - index - 1 < 3 && uploadedFiles.length % 3 !== 0 ? 12 / (uploadedFiles.length % 3) : 4);
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

  const handleClickOpenPreview = () => setOpenPreview(true);
  const handleClosePreview = () => setOpenPreview(false);
  return (
    <>
      <Backdrop open={openPreview} onClick={handleClosePreview} className={classes.backdrop}>
        <img src={imgSrc} className={classes.previewImg} />
      </Backdrop>
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
                  <TextField label='Circle' variant='outlined' fullWidth className={classes.textField} />
                  <TextField label='Title' variant='outlined' fullWidth className={classes.textField} />
                  <TextField label='Content' multiline fullWidth rows={10} variant='outlined' className={classes.textField} />
                </CardContent>
                <CardActions>
                  <Button color='primary' onClick={handlePost}>
                    Post
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
                  <TextField label='Circle' variant='outlined' fullWidth className={classes.textField} />
                  <TextField label='Content' multiline fullWidth rows={10} variant='outlined' className={classes.textField} />
                  <div {...getRootProps({ className: classes.uploadFileArea })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  {filePreview}
                </CardContent>
                <CardActions>
                  <Button color='primary' onClick={handlePost}>
                    Post
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
