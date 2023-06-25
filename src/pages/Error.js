import React from "react";
import { Link } from "react-router-dom";
import ErrorImg from "../images/error.png";

import { Button, Container } from "@mui/material";

const style = {
  root: {
    color: "#ffffff",
    backgroundColor: "#d04746",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: "25px",
    color: "#d04746",
    backgroundColor: "#ffffff",
  },
};

function Error() {
  return (
    <div style={style.root}>
      <Container maxWidth="xs" sx={style.container}>
        <img src={ErrorImg} alt="error" width="100%" />
        Oops something went wrong!
        <Button sx={style.button} component={Link} to="/">
          Return to home
        </Button>
      </Container>
    </div>
  );
}

export default Error;
