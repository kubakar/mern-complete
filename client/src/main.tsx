import React from "react";
import ReactDOM from "react-dom/client";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = localStorage.getItem("darkTheme") === "true";

// mui test
const theme = createTheme({
  palette: {
    primary: {
      main: "#2cb1bc",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* MUI */}
    <ThemeProvider theme={theme}>
      <App />
      <ToastContainer
        transition={Slide}
        position="top-center"
        theme={darkTheme ? "dark" : "light"}
      />
    </ThemeProvider>
  </React.StrictMode>
);
