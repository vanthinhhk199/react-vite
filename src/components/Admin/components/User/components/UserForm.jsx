import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useUserAll } from "./../../../hook/useUserAll";
import { enqueueSnackbar } from "notistack";
import userApi from "./../../../../../api/userApi";

UserForm.propTypes = {};

function UserForm() {
  const { user, reloadUser } = useUserAll();
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserRoleId, setSelectedUserRoleId] = useState(0);

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setEditUserDialogOpen(false);
  };

  const handleEditClick = (item) => {
    setSelectedUser(item);
    setEditUserDialogOpen(true);
  };

  const handleUserRoleIdChange = (event) => {
    setSelectedUserRoleId(event.target.value);
  };

  const handleDeleteClick = async (id) => {
    try {
      console.log(id);
      const response = await userApi.deleteUser(id);
      enqueueSnackbar("User Delete successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
      reloadUser();
    } catch (error) {
      console.log(error);
      setErrors(errorsMap);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = selectedUser.id;
    const data = {
      role: selectedUserRoleId,
    };
    const response = await userApi.updateRole(data, id);
    handleCloseDialog();
    enqueueSnackbar("User Update successfully", {
      variant: "success",
      autoHideDuration: 2000,
    });
    reloadUser();
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Verified</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.role === 1 ? "Admin" : "Khách"}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.birthday}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.is_verifiled > 0 ? "Rồi" : "Chưa"}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>
                <EditIcon
                  onClick={() => handleEditClick(item)}
                  style={{ color: "blue", cursor: "pointer" }}
                />
                <DeleteOutlineIcon
                  onClick={() => handleDeleteClick(item.id)}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        disableEscapeKeyDown
        open={editUserDialogOpen}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialog();
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>
        {selectedUser && (
          <DialogContent style={{ padding: "30px" }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <FormControl fullWidth>
                <InputLabel id="select-user-role">Role</InputLabel>
                <Select
                  style={{ textAlign: "start" }}
                  labelId="select-user-role"
                  label="Role"
                  name="role"
                  value={selectedUserRoleId}
                  onChange={handleUserRoleIdChange}
                  fullWidth
                  margin="dense"
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={0}>Khách</MenuItem>
                </Select>
              </FormControl>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
                <Button onClick={handleCloseDialog}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        )}
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default UserForm;
