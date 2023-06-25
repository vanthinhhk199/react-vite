import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

UserForm.propTypes = { data: PropTypes.array.isRequired };

function UserForm({ data }) {
  return (
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
        {data.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.role === 1 ? "Admin" : "Khách"}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.birthday}</TableCell>
            <TableCell>{user.gender}</TableCell>
            <TableCell>{user.is_verifiled > 0 ? "Rồi" : "Chưa"}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              <EditIcon style={{ color: "blue", cursor: "pointer" }} />
              <DeleteOutlineIcon style={{ color: "red", cursor: "pointer" }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UserForm;
