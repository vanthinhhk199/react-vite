import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Paypal from "../paypal/paypal";

Order.propTypes = {};

function Order(props) {
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get("data");
  const selectedItems = JSON.parse(decodeURIComponent(data));

  return (
    <Container style={{ paddingTop: "50px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Họ tên:</TableCell>
              <TableCell>{selectedItems.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Số điện thoại:</TableCell>
              <TableCell>{selectedItems.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email:</TableCell>
              <TableCell>{selectedItems.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Địa chỉ:</TableCell>
              <TableCell>{selectedItems.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Thành Phố:</TableCell>
              <TableCell>{selectedItems.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pin Code:</TableCell>
              <TableCell>{selectedItems.pincode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total:</TableCell>
              <TableCell>{selectedItems.total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box className="order">
          <Paypal
            totalPrice={selectedItems.total}
            name={selectedItems.name}
            email={selectedItems.email}
            pincode={selectedItems.pincode}
            address={selectedItems.address}
            city={selectedItems.city}
            prod={selectedItems.order_items}
            dataAll={selectedItems}
          />
        </Box>
      </TableContainer>
    </Container>
  );
}

export default Order;
