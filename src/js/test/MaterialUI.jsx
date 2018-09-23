import React, { Component } from "react";
import ReactDOM from "react-dom";

import Button from "@material-ui/core/Button";

function AppMui() {
  return (
    <Button variant="contained" color="primary">
      Material UI Test
    </Button>
  );
}

ReactDOM.render(<AppMui />, document.getElementById("muiTest"));
