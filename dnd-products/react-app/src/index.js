import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.react";
import * as serviceWorker from "./serviceWorker";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

// Activate concurrent mode
ReactDOM.unstable_createRoot(document.getElementById("root")).render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
