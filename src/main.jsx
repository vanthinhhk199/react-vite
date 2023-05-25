import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <App />
      </SnackbarProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
