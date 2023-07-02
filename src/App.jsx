import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./components/Admin/index";
import HomePages from "./components/HomePages/index";
import RequireAuth from "./components/Protected/RequireAuth";
import { ROLES } from "./constants/authority";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePages />}>
            <Route path="/product/:productId" />
            <Route path="/cart" />
            <Route path="/checkout" />
            <Route path="/order" />
            <Route path="/myorder" />
            <Route path="/myaccount" />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin" element={<AdminPage />}>
              <Route path="/admin/add-product" />
              <Route path="/admin/show-product" />
              <Route path="/admin/add-category" />
              <Route path="/admin/show-category" />
              <Route path="/admin/manage-users" />
              <Route path="/admin/manage-orders" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
