import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, TextField, Typography } from "@mui/material";
import Paypal from "../paypal/paypal";

Order.propTypes = {};

function Order(props) {
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get("data");
  const selectedItems = JSON.parse(decodeURIComponent(data));

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6} className="order-left">
          <Typography className="lable-info">
            <Typography className="lable-info_name">Họ tên:</Typography>
            <Typography>{selectedItems.name}</Typography>
          </Typography>
          <Typography className="lable-info">
            <Typography className="lable-info_name">Số điện thoại:</Typography>
            <Typography>{selectedItems.phone}</Typography>
          </Typography>
          <Typography className="lable-info">
            <Typography className="lable-info_name">Email:</Typography>
            <Typography>{selectedItems.email}</Typography>
          </Typography>
          <Typography className="lable-info">
            <Typography className="lable-info_name">Địa chỉ:</Typography>
            <Typography>{selectedItems.address}</Typography>
          </Typography>
          <Typography className="lable-info">
            <Typography className="lable-info_name">Thành Phố:</Typography>
            <Typography>{selectedItems.city}</Typography>
          </Typography>
          <Typography className="lable-info">
            <Typography className="lable-info_name">Pin Code:</Typography>
            <Typography>{selectedItems.pincode}</Typography>
          </Typography>
          <Typography className="lable-info">
            <Typography className="lable-info_name">Total:</Typography>
            <Typography>{selectedItems.total}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} className="order-right">
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Order;
