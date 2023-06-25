import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { accountAPIs } from "../api";
import {
  Box,
  Button,
  Container,
  CircularProgress,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  root: {
    backgroundColor: "#44b39f",
    minHeight: "100vh",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#38ae99",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#38ae99",
    },
  },
  logo: {
    color: "#44b39f",
    fontSize: 50,
    fontWeight: "bold",
  },
  gridItem: {
    padding: 1,
  },
  paper: {
    padding: 5,
  },
};

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [login, setLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUsername = () => (event) => {
    setUsername({ ...username, value: event.target.value });
  };

  const handleChangePassword = () => (event) => {
    setPassword({ ...password, value: event.target.value });
  };

  const handleLogin = async (event) => {
    setUsername({ ...username, error: false });
    setPassword({ ...password, error: false });
    if (username.value === "" || password.value === "") {
      if (username.value === "") {
        setUsername({
          ...username,
          error: true,
          errorMessage: "The username cannot be blank.",
        });
      }
      if (password.value === "") {
        setPassword({
          ...password,
          error: true,
          errorMessage: "The password cannot be blank.",
        });
      }
    } else {
      setUsername({ ...username, error: false });
      setPassword({ ...password, error: false });
      setIsLoading(true);
      const payload = {
        username: username.value,
        password: password.value,
      };
      await accountAPIs
        .login(payload)
        .then(async (res) => {
          const data = res.data;
          if (!data.success) {
            setLogin(false);
            setIsLoading(false);
          } else {
            sessionStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("accountId", data.item.id);
            localStorage.setItem("username", data.item.username);
            navigate("/profile");
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Navigate to profile if logged
  useEffect(() => {
    if (!sessionStorage.accessToken) return;
    navigate("/profile");
  }, [navigate]);

  useEffect(() => {
    function downHandler({ key }) {
      if (key === "Enter") {
        handleLogin();
      }
    }
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [handleLogin]);

  return (
    <Box sx={style.root}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper sx={style.paper} elevation={0}>
          <Grid container direction="column">
            <Grid item sx={style.gridItem}>
              <Typography sx={style.logo}>LOGO</Typography>
            </Grid>
            <Grid item sx={style.gridItem}>
              <Typography sx={style}>Login to Platform</Typography>
            </Grid>
            <Grid item sx={style.gridItem}>
              <TextField
                type="text"
                label="Username"
                value={username.value}
                error={username.error}
                helperText={username.error ? username.errorMessage : " "}
                onChange={handleChangeUsername()}
                required
                fullWidth
                // autoFocus
              />
            </Grid>
          </Grid>
          <Grid item sx={style.gridItem}>
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password.value}
              error={password.error}
              helperText={password.error ? password.errorMessage : " "}
              onChange={handleChangePassword()}
              required
              fullWidth
            />
          </Grid>
          <p style={{ margin: "4px", color: !login ? "red" : "white" }}>Login failed.</p>
          <Grid item sx={style.gridItem}>
            <Button
              type="submit"
              variant="contained"
              sx={style.button}
              onClick={handleLogin}
              fullWidth
            >
              LOGIN
              {isLoading && (
                <CircularProgress style={{ color: "white", marginLeft: "10px" }} size={15} />
              )}
            </Button>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
