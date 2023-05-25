import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ListPage from "./components/Product/pages/ListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
