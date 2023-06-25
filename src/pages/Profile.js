import React, { useEffect, useMemo, useState } from "react";
import { LoadingScreen, SaveAndDelete } from "../components";
import { CreateAccountDialog } from "../components/dialogs";

import { Button, Grid, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { accountAPIs } from "../api";
import { Snackbar } from "../components/common";

const drawerWidth = 300;
const style = {
  appBar: {
    position: "fixed",
    color: "#000000",
    backgroundColor: "#ffffff",
    boxShadow: 0,
    width: { sm: `calc(100% - ${drawerWidth}px)` },
    marginLeft: { sm: `${drawerWidth}px` },
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
    padding: (theme) => theme.spacing(4),
    marginLeft: `${drawerWidth}px`,
    width: { sm: `calc(100% - ${drawerWidth}px)` },
  },
  dataGrid: {
    bgcolor: "white",
  },
  drawer: {
    width: { sm: `${drawerWidth}px` },
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
  textField: {
    margin: "20px",
    height: { sm: "5px" },
  },
};

function Profile() {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [rowIds, setRowIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
    loading: false,
  });

  const columns = useMemo(
    () => [
      {
        field: "username",
        headerName: "Username",
        width: 200,
      },
      {
        field: "firstname",
        headerName: "Firstname",
        width: 200,
        editable: true,
      },
      {
        field: "lastname",
        headerName: "Last name",
        width: 200,
        editable: true,
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 150,
        type: "singleSelect",
        valueOptions: ["Male", "Female"],
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
      },
      {
        field: "createdBy",
        headerName: "Created by",
        width: 250,
      },
      {
        field: "createdAt",
        headerName: "Created at",
        width: 250,
        // renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => (
          <SaveAndDelete {...{ params, rowIds, setRowIds, snackbar, setSnackbar, getAccounts }} />
        ),
      },
    ],
    [rowIds, snackbar]
  );

  useEffect(() => {
    async function init() {
      setLoading(true);
      await accountAPIs
        .getAccounts()
        .then((res) => {
          const data = res.data;
          setAccounts(data.items);
        })
        .catch((error) => {
          const data = error.response.data;
          console.log(data);
        });
      setLoading(false);
    }
    init();
  }, []);

  const getAccounts = async () => {
    setLoading(true);
    await accountAPIs
      .getAccounts()
      .then((res) => {
        const data = res.data;
        setAccounts(data.items);
      })
      .catch((err) => {
        const error = err.response;
        console.log(error);
      });
    setLoading(false);
  };

  const openCreateAccountDialog = () => {
    setOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <LoadingScreen open={loading} />
      <Snackbar
        open={snackbar.open}
        handleClose={handleSnackbarClose}
        severity={snackbar.severity}
        loading={snackbar.loading}
        anchor="br"
        duration={3000}
      >
        {snackbar.message}
      </Snackbar>
      <CreateAccountDialog {...{ open, setOpen, snackbar, setSnackbar, getAccounts }} />
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">User Profile</Typography>
          </Grid>
          <Grid item>
            <Button onClick={openCreateAccountDialog}>Create Account</Button>
          </Grid>
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <DataGrid
            sx={style.dataGrid}
            columns={columns}
            rows={accounts}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            onCellEditStop={(params) =>
              !rowIds.includes(params.id) && setRowIds([...rowIds, params.id])
            }
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
