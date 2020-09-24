import "./App.css";
import React from "react";

export default function Main(props) {
  props.setShowSearchField(true);
  props.setShowLoginButton(true);
  return (
    <p>Main</p>
  );
}
