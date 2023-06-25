import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useCategoryAll } from "../../../hook/useCategoryAll";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import format from "date-fns/format";

DetailCategory.propTypes = {};

function DetailCategory(props) {
  const { category } = useCategoryAll();
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>image</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category.map((cate, index) => (
            <TableRow key={index}>
              <TableCell>{cate.image}</TableCell>
              <TableCell>{cate.name}</TableCell>
              <TableCell>{cate.slug}</TableCell>
              <TableCell>{formatDateTime(cate.created_at)}</TableCell>

              <TableCell>
                <EditIcon style={{ color: "blue", cursor: "pointer" }} />
                <DeleteOutlineIcon
                  style={{ color: "red", cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default DetailCategory;
