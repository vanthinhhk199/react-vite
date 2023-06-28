import React, { useEffect, useState } from "react";
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
  TextField,
  Button,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import orderApi from "./../../../../../api/orderApi";
import { enqueueSnackbar } from "notistack";
import { useOrderAll } from "./../../../hook/useOrderAll";

OrderForm.propTypes = {};

function OrderForm(props) {
  const { order, reloadOrder } = useOrderAll();
  const [editorderDialogOpen, setEditOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setEditOrderDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setEditOrderDialogOpen(false);
  };

  const handleDeleteClick = async (id) => {
    try {
      await orderApi.deleteOrder(id);
      enqueueSnackbar("Delete Order successfully", {
        variant: "success",
        autoHideDuration: 2000,
      });
      reloadOrder();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedOrder((prevOrder) => ({
      ...prevOrder,
      status: newStatus,
    }));
  };

  const handleSubmit = async () => {
    const response = await orderApi.upStatusOrder(selectedOrder);
    handleCloseDialog();
    enqueueSnackbar("Status updated successfully", {
      variant: "success",
      autoHideDuration: 2000,
    });
    reloadOrder();
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.total_price}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <RemoveRedEyeIcon
                  onClick={() => handleEditClick(order)}
                  style={{ color: "blue", cursor: "pointer" }}
                />
                <DeleteOutlineIcon
                  onClick={() => handleDeleteClick(order.id)}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        disableEscapeKeyDown
        open={editorderDialogOpen}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialog();
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        {selectedOrder && (
          <DialogContent style={{ padding: "30px" }}>
            <Typography variant="body1">Name: {selectedOrder.name}</Typography>
            <Typography variant="body1">
              Phone: {selectedOrder.phone}
            </Typography>
            <Typography variant="body1">
              Address: {selectedOrder.address}
            </Typography>
            <Typography variant="body1">
              Total Price: {selectedOrder.total_price}
            </Typography>
            <Typography variant="body1">
              Status:
              <select
                value={selectedOrder.status}
                onChange={handleStatusChange}
              >
                <option value="PROCESSING">Order Processing</option>
                <option value="PENDING">Order Pending</option>
                <option value="COMPLETED">Order Completed</option>
                <option value="CANCELLED">Order Cancelled</option>
              </select>
            </Typography>

            <Typography variant="h6" style={{ marginTop: "20px" }}>
              Order Items
            </Typography>
            <List>
              {selectedOrder.order_items.map((item) => (
                <ListItem key={item.id}>
                  <Typography variant="body1">
                    Product Name: {item.products.name}
                  </Typography>
                  <Typography variant="body1">Quantity: {item.qty}</Typography>
                  <Typography variant="body1">
                    Price: {item.products.price}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <Typography variant="body1">
              Created At: {selectedOrder.created_at}
            </Typography>
            <Typography variant="body1">
              Payment Time: {selectedOrder.paymentTime}
            </Typography>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Save
            </Button>
          </DialogContent>
        )}
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default OrderForm;
