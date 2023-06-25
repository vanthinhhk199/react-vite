import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddCategory from "./components/Category/index";
import AdminHeader from "./components/HeaderAdmin/Header";
import Order from "./components/Order";
import AddProduct from "./components/Products/index";
import UserPage from "./components/User/index";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DetailCategory from "./components/Category/components/DetailCategory";
import DetailProduct from "./components/Products/components/DetailProduct";

function AdminPage(props) {
  return (
    <Container>
      <AdminHeader />
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item xs={2} sx={{ height: "100%", minHeight: 0 }}>
          <Box
            sx={{
              height: "100vh  ",
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <List
              component="nav"
              aria-label="main mailbox folders"
              sx={{ flexGrow: 1, overflow: "auto" }}
            >
              <ListItemButton component={Link} to="/admin/add-product">
                <AddCircleOutlineIcon />
                <ListItemText primary="Add Product" />
              </ListItemButton>
              <ListItemButton component={Link} to="/admin/show-product">
                <ChecklistIcon />
                <ListItemText primary="Detail Products" />
              </ListItemButton>
              <ListItemButton component={Link} to="/admin/add-category">
                <AddCircleOutlineIcon />
                <ListItemText primary="Add Category" />
              </ListItemButton>
              <ListItemButton component={Link} to="/admin/show-category">
                <ChecklistIcon />
                <ListItemText primary="Detail Category" />
              </ListItemButton>
              <ListItemButton component={Link} to="/admin/manage-orders">
                <ManageAccountsIcon />
                <ListItemText primary="Manage Orders" />
              </ListItemButton>
              <ListItemButton component={Link} to="/admin/manage-users">
                <ManageAccountsIcon />
                <ListItemText primary="Manage Users" />
              </ListItemButton>
            </List>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/show-product" element={<DetailProduct />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/show-category" element={<DetailCategory />} />
            <Route path="/manage-orders" element={<Order />} />
            <Route path="/manage-users" element={<UserPage />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminPage;
