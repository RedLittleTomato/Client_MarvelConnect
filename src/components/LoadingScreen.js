import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const style = {
  backdrop: {
    zIndex: (theme) => theme.zIndex.drawer + 1,
    color: "#fff",
  },
};

function LoadingScreen(props) {
  const { open } = props;

  return (
    <>
      <Backdrop sx={style.backdrop} open={open}>
        <CircularProgress color="inherit" size={30} />
      </Backdrop>
    </>
  );
}

export default LoadingScreen;
