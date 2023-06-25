import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { accountAPIs } from "../api";
import avatar2x from "../images/avatar@2x.png";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 300;
const style = {
  root: {
    backgroundColor: "#edeef0",
    minHeight: "100vh",
  },
  appBar: {
    position: "fixed",
    color: "#000000",
    bgcolor: "#ffffff",
    boxShadow: 0,
    width: { sm: `calc(100% - ${drawerWidth}px)` },
    ml: { sm: `${drawerWidth}px` },
  },
  avatarButton: {
    width: 24,
    height: 24,
  },
  button: {
    borderRadius: 25,
    textTransform: "none",
  },
  content: {
    p: 3,
    ml: `${drawerWidth}px`,
  },
  drawer: {
    w: { sm: `${drawerWidth}px` },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
    },
  },
  logo: {
    color: "#44b39f",
    fontSize: 50,
    fontWeight: "bold",
    padding: "20px",
  },
  userTextField: {
    bgcolor: "#f0f0f0",
    m: "20px",
    h: { sm: "5px" },
  },
  searchTextField: {
    bgcolor: "#f0f0f0",
    mt: "20px",
    mb: "20px",
  },
};

function Blank() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const username = localStorage.getItem("username");

  const handleChangeUserProfile = () => (event) => {
    setUserProfile(event.target.value);
  };

  const handleChangeSearch = () => (event) => {
    setSearch(event.target.value);
  };

  const handleLogout = async () => {
    await accountAPIs
      .logout()
      .then((res) => {
        const data = res.data;
        if (data.success) {
          sessionStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }
      })
      .catch((err) => {
        const error = err.response;
        console.log(error);
      });
  };

  return (
    <div style={style.root}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar sx={style.appBar}>
          <Toolbar>
            <TextField
              sx={style.searchTextField}
              size="small"
              type="text"
              label="Search"
              value={search}
              onChange={handleChangeSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Typography sx={{ flexGrow: 1 }}></Typography>
            <Stack direction="row" spacing={2}>
              <Button
                sx={style.button}
                variant="outlined"
                startIcon={<Avatar sx={style.avatarButton} alt="avatar" src={avatar2x} />}
              >
                {username}
              </Button>
              <Button sx={style.button} variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="nav">
        <Drawer anchor="left" position="fixed" variant="permanent" sx={style.drawer}>
          <Typography sx={style.logo}>LOGO</Typography>
          <TextField
            sx={style.userTextField}
            type="text"
            label="User Profile"
            value={userProfile}
            onChange={handleChangeUserProfile()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Drawer>
      </Box>
      <Box component="main" sx={style.content}>
        <Toolbar />
        <Outlet context={{ search }} />
      </Box>
    </div>
  );
}

export default Blank;
