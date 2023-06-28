import React from "react";
import PropTypes from "prop-types";
import { Box, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useOrderDetail } from "../Product/hook/useOderDetail";

MyOrder.propTypes = {};

function MyOrder(props) {
  const storedAccessToken = localStorage.getItem("access_token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser.id;
  const { order } = useOrderDetail(userId);

  return (
    <Container className="container-myorder">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="table-title">
              <TableCell align="center">Mã đơn hàng</TableCell>
              <TableCell align="center">Giá</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Payment Mode</TableCell>
              <TableCell align="center">Thời gian</TableCell>
            </TableRow>
          </TableHead>
          {order.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Không có
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {order.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.idPayment}</TableCell>
                  <TableCell align="center">
                    {item.paymentmode === "COD" ? (
                      <span>{item.total_price} VNĐ</span>
                    ) : item.paymentmode === "Paid by Paypal" ? (
                      <span>{item.total_price} $</span>
                    ) : (
                      <span>{item.total_price}</span>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">{item.paymentmode}</TableCell>
                  <TableCell align="center">{item.paymentTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MyOrder;
