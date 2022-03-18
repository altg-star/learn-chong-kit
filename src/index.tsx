import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
<<<<<<< HEAD
import { StylesProvider } from "@mui/styles";
=======
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from 'styled-components';
const theme = createMuiTheme();
>>>>>>> eb4ec2e54a9aec5ec1bd0980af452527e5fa53cd
//import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
