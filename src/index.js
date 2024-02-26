import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { toast } from "react-toastify";
toast.configure({ position: "top-center", autoClose: 2500, theme: "dark" });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
