import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddCategory from "./components/Category/index";
import AdminHeader from "./components/HeaderAdmin/Header";
import Order from "./components/Order";
import AddProduct from "./components/Products/index";
import UserPage from "./components/User/index";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ListProduct from "./components/Products/components/ListlProduct";
import ListCategory from "./components/Category/components/ListCategory";
import { Navigate } from "react-router-dom";

function AdminPage(props) {
  const [activeItem, setActiveItem] = useState("show-product");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    setActiveItem("show-product");
  }, []);

  return (
    <>
      <AdminHeader />
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item xs={2} sx={{ height: "100%", minHeight: 0 }}>
          <Box
            sx={{
              height: "100vh",
              maxWidth: 360,
              bgcolor: "background.paper",
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              position: "fixed",
            }}
          >
            <List
              component="nav"
              aria-label="main mailbox folders"
              sx={{ flexGrow: 1, overflow: "auto" }}
            >
              <ListItemButton
                component={Link}
                to="/admin/show-product"
                selected={
                  activeItem === "show-product" ||
                  window.location.pathname === "/admin"
                }
                onClick={() => handleItemClick("show-product")}
              >
                <ChecklistIcon />
                <ListItemText primary="Detail Products" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/add-product"
                selected={activeItem === "add-product"}
                onClick={() => handleItemClick("add-product")}
              >
                <AddCircleOutlineIcon />
                <ListItemText primary="Add Product" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/show-category"
                selected={activeItem === "show-category"}
                onClick={() => handleItemClick("show-category")}
              >
                <ChecklistIcon />
                <ListItemText primary="Detail Category" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/add-category"
                selected={activeItem === "add-category"}
                onClick={() => handleItemClick("add-category")}
              >
                <AddCircleOutlineIcon />
                <ListItemText primary="Add Category" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/admin/manage-orders"
                selected={activeItem === "manage-orders"}
                onClick={() => handleItemClick("manage-orders")}
              >
                <ManageAccountsIcon />
                <ListItemText primary="Manage Orders" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/admin/manage-users"
                selected={activeItem === "manage-users"}
                onClick={() => handleItemClick("manage-users")}
              >
                <ManageAccountsIcon />
                <ListItemText primary="Manage Users" />
              </ListItemButton>
            </List>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/admin/show-product" replace />}
            />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/show-product" element={<ListProduct />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/show-category" element={<ListCategory />} />
            <Route path="/manage-orders" element={<Order />} />
            <Route path="/manage-users" element={<UserPage />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminPage;
