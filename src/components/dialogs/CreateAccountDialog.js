import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material/";
import { accountAPIs } from "../../api";

const style = {
  textField: {
    mt: 1,
  },
};

function CreateAccountDialog(props) {
  const { open, setOpen, snackbar, setSnackbar, getAccounts } = props;
  const [loading, setLoading] = useState();
  const [username, setUsername] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [firstname, setFirstname] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [lastname, setLastname] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });

  const handleChangeUsername = () => (event) => {
    setUsername({ ...username, value: event.target.value });
  };
  const handleChangeFirstname = () => (event) => {
    setFirstname({ ...firstname, value: event.target.value });
  };
  const handleChangeLastname = () => (event) => {
    setLastname({ ...lastname, value: event.target.value });
  };
  const handleChangeEmail = () => (event) => {
    setEmail({ ...email, value: event.target.value });
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangePassword = () => (event) => {
    setPassword({ ...password, value: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    setLoading(true);
    const payload = {
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
      gender: gender,
      email: email.value,
      password: password.value,
    };
    await accountAPIs
      .createAccount(payload)
      .then(async (res) => {
        const data = res.data;
        if (data.success) {
          setOpen(false);
          setLoading(false);
          setSnackbar({ ...snackbar, open: true, message: data.message });
          getAccounts();
        }
      })
      .catch((error) => {
        const data = error.response.data;
        setLoading(false);
        setSnackbar({
          ...snackbar,
          open: true,
          severity: "error",
          message: data.message,
        });
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create Account</DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          label="Username"
          value={username.value}
          error={username.error}
          helperText={username.error ? username.errorMessage : " "}
          onChange={handleChangeUsername()}
          required
          sx={style.textField}
          fullWidth
        ></TextField>
        <TextField
          type="text"
          label="Firstname"
          value={firstname.value}
          error={firstname.error}
          helperText={firstname.error ? firstname.errorMessage : " "}
          onChange={handleChangeFirstname()}
          required
          sx={style.textField}
          fullWidth
        ></TextField>
        <TextField
          type="text"
          label="Lastname"
          value={lastname.value}
          error={lastname.error}
          helperText={lastname.error ? lastname.errorMessage : " "}
          onChange={handleChangeLastname()}
          required
          sx={style.textField}
          fullWidth
        ></TextField>
        <FormControl sx={{ ml: 1, mb: 2 }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={gender}
            onChange={handleChangeGender}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>
        <TextField
          type="text"
          label="Email"
          value={email.value}
          error={email.error}
          helperText={email.error ? email.errorMessage : " "}
          onChange={handleChangeEmail()}
          required
          sx={style.textField}
          fullWidth
        ></TextField>
        <TextField
          type="password"
          label="Password"
          value={password.value}
          error={password.error}
          helperText={password.error ? password.errorMessage : " "}
          onChange={handleChangePassword()}
          required
          sx={style.textField}
          fullWidth
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>
          Create {loading && <CircularProgress style={{ marginLeft: "10px" }} size={15} />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateAccountDialog;
