import React from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, editItem, setName, setPhone } from "./todoSlice";
import { Margin } from "@mui/icons-material";
import "./style.scss";

Todolist.propTypes = {};

function Todolist(props) {
  const name = useSelector((state) => state.todolist.name);
  const phone = useSelector((state) => state.todolist.phone);
  const items = useSelector((state) => state.todolist.items);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = React.useState(-1);
  const [editName, setEditName] = React.useState("");
  const [editPhone, setEditPhone] = React.useState("");

  const handleNameChange = (e) => {
    dispatch(setName(e.target.value));
  };

  const handlePhoneChange = (e) => {
    dispatch(setPhone(e.target.value));
  };

  const handleAddItem = () => {
    const newItem = { name, phone };
    dispatch(addItem(newItem));
    dispatch(setName(""));
    dispatch(setPhone(""));
  };

  const handleDeleteItem = (index) => {
    dispatch(deleteItem(index));
  };

  const handleEditButtonClick = (index) => {
    const item = items[index];
    setEditIndex(index);
    setEditName(item.name);
    setEditPhone(item.phone);
  };

  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedItem = {
        name: editName,
        phone: editPhone,
      };

      dispatch(editItem({ index: editIndex, updatedItem }));
      setEditIndex(-1);
      setEditName("");
      setEditPhone("");
    }
  };
  return (
    <div className="tong">
      <Box className="trai">
        <TextField
          type="text"
          placeholder="Tên"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          style={{
            marginLeft: "5px",
          }}
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={handlePhoneChange}
        />
        <Button
          style={{
            backgroundColor: "red",
            marginLeft: "5px",

            color: "black",
            height: "56px",
          }}
          onClick={handleAddItem}
        >
          Gui
        </Button>
      </Box>
      <Box className="phai">
        {items.map((item, index) => (
          <div key={index} className="item">
            {editIndex === index ? (
              <div style={{ marginBottom: "10px" }}>
                <TextField
                  type="text"
                  placeholder="Tên"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <TextField
                  style={{
                    marginLeft: "5px",
                  }}
                  type="text"
                  placeholder="Phone"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
                <Button
                  style={{
                    backgroundColor: "green",
                    marginLeft: "5px",
                    color: "black",
                    height: "32px",
                    padding: "4px 8px",
                    fontSize: "14px",
                  }}
                  onClick={handleSaveEdit}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <Typography>
                  <span>Tên:</span> {item.name}, <span>Phone:</span>{" "}
                  {item.phone}
                </Typography>
                <Box>
                  <Button
                    style={{
                      backgroundColor: "red",
                      marginLeft: "5px",
                      color: "black",
                      height: "32px",
                      padding: "4px 8px",
                      fontSize: "14px",
                    }}
                    onClick={() => handleDeleteItem(index)}
                  >
                    x
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "blue",
                      marginLeft: "5px",
                      color: "black",
                      height: "32px",
                      padding: "4px 8px",
                      fontSize: "14px",
                    }}
                    onClick={() => handleEditButtonClick(index)}
                  >
                    Edit
                  </Button>
                </Box>
              </div>
            )}
          </div>
        ))}
      </Box>
    </div>
  );
}

export default Todolist;
