import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import checkoutApi from "./../../../../../api/checkoutApi";
import "./style.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { selectAdress } from "../CheckOutSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

function CheckoutAddress(props) {
  const [showAddress, setShowAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [savingData, setSavingData] = useState(false);
  const [addAddress, setAddAddress] = useState([]);
  const [addressSaved, setAddressSaved] = useState();
  const [selectAddress, setSelectAddress] = useState(null);
  const [deleteAddress, setDeleteAddress] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressEdit, setAddressEdit] = useState();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (addAddress.length > 0) {
      setSelectAddress(addAddress[0]);
    }
  }, [addAddress]);

  useEffect(() => {
    dispatch(selectAdress(selectAddress));
  }, [selectAddress]);

  const handleAddAddress = () => {
    setShowAddress(true);
  };

  const handleToggleAddress = () => {
    setShowAddress(!showAddress);
  };

  useEffect(() => {
    (async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        const response = await checkoutApi.getAddress(userId);
        setAddAddress(response.data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch Address list", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, [addressSaved, deleteAddress, addressEdit]);

  const handleSubmitAddress = async () => {
    try {
      await validationSchema.validate(addressInfo, { abortEarly: false });
      // Validation passed
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user.id;

      const addressObject = {
        user_id: user_id,
        name: addressInfo.name,
        phone: addressInfo.phone,
        address: addressInfo.address,
      };

      setSavingData(true);
      const response = await checkoutApi.address(addressObject);
      setShowAddress(false);
      setAddressSaved(addressObject);

      setAddressInfo({
        name: "",
        phone: "",
        address: "",
      });

      enqueueSnackbar("Add Address successfully!!! 💯 ", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    } finally {
      setSavingData(false);
    }
  };

  const handleSelectAddress = (item) => {
    setSelectAddress(item);
    dispatch(selectAdress(selectAddress));
  };

  const handleDelete = async (id) => {
    try {
      setSavingData(true);
      const response = await checkoutApi.delete(id);
      setDeleteAddress(response);
      setSavingData(false);
      enqueueSnackbar("Delete Address successfully!!! 💯 ", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleEdit = (id) => {
    setEditingAddressId(id);
    const selectedAddress = addAddress.find((item) => item.id === id);
    setAddressInfo({
      name: selectedAddress.name,
      phone: selectedAddress.phone,
      address: selectedAddress.address,
    });
  };

  const handleSave = async (id) => {
    try {
      await validationSchema.validate(addressInfo, { abortEarly: false });

      const updatedAddress = {
        id: id,
        name: addressInfo.name,
        phone: addressInfo.phone,
        address: addressInfo.address,
      };

      const response = await checkoutApi.updateAddress(updatedAddress);
      setShowAddress(false);
      setAddressEdit(updatedAddress);
      setEditingAddressId(null);
      setAddressInfo({
        name: "",
        phone: "",
        address: "",
      });
      setSavingData(false);

      enqueueSnackbar("Address updated successfully!!! 💯 ", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }
  };

  const handleCancel = () => {
    setEditingAddressId(null);
    setAddressInfo({
      name: "",
      phone: "",
      address: "",
    });
  };

  return (
    <>
      <Grid>
        {addAddress.length > 0 ? (
          addAddress.map((item) => (
            <Paper
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                padding: "10px",
                alignItems: "center",
                backgroundColor: item === selectAddress ? "lightblue" : "white",
              }}
              key={item.id}
              onClick={() => handleSelectAddress(item)}
            >
              {editingAddressId === item.id ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <TextField
                      id="edit-name"
                      label="Name"
                      variant="standard"
                      value={addressInfo.name}
                      onChange={(e) =>
                        setAddressInfo({ ...addressInfo, name: e.target.value })
                      }
                      error={Boolean(errors?.name)}
                      helperText={errors?.name}
                    />
                    <TextField
                      id="edit-phone"
                      label="Phone"
                      variant="standard"
                      value={addressInfo.phone}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          phone: e.target.value,
                        })
                      }
                      error={Boolean(errors?.phone)}
                      helperText={errors?.phone}
                    />
                    <TextField
                      id="edit-address"
                      label="Address"
                      variant="standard"
                      value={addressInfo.address}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          address: e.target.value,
                        })
                      }
                      error={Boolean(errors?.address)}
                      helperText={errors?.address}
                    />
                  </div>
                  <div>
                    <Button
                      style={{
                        padding: "6px",
                        minWidth: "36px",
                      }}
                      variant="contained"
                      color="primary"
                      disabled={savingData}
                      onClick={() => handleSave(item.id)}
                    >
                      <SaveIcon />
                    </Button>
                    <Button
                      style={{
                        marginLeft: "5px",
                        padding: "6px",
                        minWidth: "36px",
                        backgroundColor: "#ff5151",
                      }}
                      variant="contained"
                      color="primary"
                      disabled={savingData}
                      onClick={() => handleCancel()}
                    >
                      <CancelIcon />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div className="">
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {item.name},
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        marginLeft: "10px",
                      }}
                    >
                      {item.phone},
                    </span>
                    <span
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      {item.address}
                    </span>
                  </div>
                  <div>
                    <Button
                      style={{
                        padding: "6px",
                        minWidth: "36px",
                      }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      style={{
                        marginLeft: "5px",
                        padding: "6px",
                        minWidth: "36px",
                      }}
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteOutlineIcon />
                    </Button>
                  </div>
                </div>
              )}
            </Paper>
          ))
        ) : (
          <Typography variant="body1">Bạn cần thêm địa chỉ</Typography>
        )}

        {showAddress && (
          <Paper className="add-address">
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <div>
                <TextField
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  name="name"
                  value={addressInfo.name}
                  onChange={(e) =>
                    setAddressInfo({ ...addressInfo, name: e.target.value })
                  }
                  error={Boolean(errors?.name)}
                  helperText={errors?.name}
                />
                <TextField
                  id="standard-basic"
                  label="Phone"
                  variant="standard"
                  name="phone"
                  value={addressInfo.phone}
                  onChange={(e) =>
                    setAddressInfo({ ...addressInfo, phone: e.target.value })
                  }
                  error={Boolean(errors?.phone)}
                  helperText={errors?.phone}
                />
                <TextField
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  name="address"
                  value={addressInfo.address}
                  onChange={(e) =>
                    setAddressInfo({
                      ...addressInfo,
                      address: e.target.value,
                    })
                  }
                  error={Boolean(errors?.address)}
                  helperText={errors?.address}
                />
              </div>
              <div>
                <Button
                  style={{
                    marginLeft: "5px",
                    padding: "6px",
                    minWidth: "36px",
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={savingData}
                  onClick={handleSubmitAddress}
                >
                  <CheckIcon />
                </Button>
                <Button
                  style={{
                    marginLeft: "5px",
                    padding: "6px",
                    minWidth: "36px",
                  }}
                  variant="contained"
                  color="error"
                  disabled={savingData}
                  onClick={handleToggleAddress}
                >
                  <CloseIcon />
                </Button>
              </div>
            </Box>
          </Paper>
        )}
        <Button
          style={{ marginTop: "10px" }}
          onClick={handleAddAddress}
          variant="contained"
          color="primary"
        >
          Thêm
        </Button>
      </Grid>
    </>
  );
}

export default CheckoutAddress;
