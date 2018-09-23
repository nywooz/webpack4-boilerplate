
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';


function LandingPage() {
  return (
    <Button variant="contained" color="primary">
      Material UI Test
    </Button>
  );
}


ReactDOM.render(<LandingPage />, document.getElementById("index2"));


