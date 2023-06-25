import React from "react";
import PropTypes from "prop-types";
import { useProductAll } from "./../../../hook/useProductAll";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import "./style.scss";
import format from "date-fns/format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

DetailProduct.propTypes = {};

function DetailProduct(props) {
  const { product } = useProductAll();
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>image</TableCell>
            <TableCell>slug</TableCell>
            <TableCell>description</TableCell>
            <TableCell>price</TableCell>
            <TableCell>qty</TableCell>
            <TableCell>created_at</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((prod, index) => (
            <TableRow key={index}>
              <TableCell>{prod.name}</TableCell>
              <TableCell>{prod.image}</TableCell>
              <TableCell>{prod.slug}</TableCell>
              <TableCell>
                <p className="description-cell">{prod.description}</p>
              </TableCell>
              <TableCell>{prod.price}</TableCell>
              <TableCell>{prod.qty}</TableCell>
              <TableCell>{formatDateTime(prod.created_at)}</TableCell>
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

export default DetailProduct;
