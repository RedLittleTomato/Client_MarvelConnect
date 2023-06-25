import React, { useState } from "react";
import { accountAPIs } from "../api";

import { CircularProgress, IconButton } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

function SaveAndDelete({ params, rowIds, setRowIds, snackbar, setSnackbar, getAccounts }) {
  const accountId = localStorage.getItem("accountId");
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const SaveAccountChanges = async () => {
    setSaveLoading(true);
    let data = params.row;
    const payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      gender: data.gender,
    };
    await accountAPIs
      .updateAccount(params.id, payload)
      .then(async (res) => {
        const data = res.data;
        if (data.success) {
          setRowIds(
            rowIds.filter(function (e) {
              return e !== params.id;
            })
          );
          setSaveLoading(false);
          setSnackbar({ ...snackbar, open: true, message: data.message });
        }
      })
      .catch((error) => {
        const data = error.response.data;
        console.log(data);
        setSaveLoading(false);
        setSnackbar({ ...snackbar, open: true, severity: "error", message: data.message });
      });
  };

  const DeleteAccount = async () => {
    setDeleteLoading(true);
    await accountAPIs
      .deleteAccount(params.id)
      .then(async (res) => {
        const data = res.data;
        if (data.success) {
          setDeleteLoading(false);
          setSnackbar({ ...snackbar, open: true, message: data.message });
          getAccounts();
        }
      })
      .catch((error) => {
        const data = error.response.data;
        console.log(data);
        setDeleteLoading(false);
        setSnackbar({ ...snackbar, open: true, severity: "error", message: data.message });
      });
  };

  return (
    <>
      <IconButton disabled={!rowIds.includes(params.id)} onClick={SaveAccountChanges}>
        <SaveIcon />
        {saveLoading && <CircularProgress sx={{ position: "absolute" }} />}
      </IconButton>
      <IconButton disabled={accountId === params.id} onClick={DeleteAccount}>
        <DeleteIcon />
        {deleteLoading && <CircularProgress sx={{ position: "absolute" }} />}
      </IconButton>
    </>
  );
}

export default SaveAndDelete;
