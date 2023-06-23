import React from "react";
import PropTypes from "prop-types";
import HomePages from "./HomePages";
import AdminPage from "./Admin";
import { Route, Navigate, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

Home.propTypes = {};

function Home(props) {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<HomePages />} />
      <Route path="/admin/" element={<AdminPage />} />
    </Routes>
  );
}

export default Home;
