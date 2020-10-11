import "./App.css";
import React from "react";
import { Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import PeopleIcon from '@material-ui/icons/People';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

export default function Main(props) {
  props.setShowSearchField(true);
  props.setShowLoginButton(true);
  return (
    <><p>WELCOME TO CIRCLE</p>
    <Fab color="primary" aria-label="New Post" href="/newPost"><EditIcon/></Fab>
    <Fab color="primary" aria-label="My Friends" href="/myFriends"><PeopleIcon/></Fab>
    <Fab color="primary" aria-label="My Circles" href="/myCircle"><RadioButtonUncheckedIcon/></Fab>
    
    </>
    

  );
}
