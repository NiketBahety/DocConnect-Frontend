import React from "react";
import { Routes, Route } from "react-router-dom";
import SubRoutes from "./SubRoutes";

import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/SignupPage/Signup";
import Login from "./pages/LoginPage/Login";
import HomePage from "./pages/HomePage/HomePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/home" element={<HomePage />} />
      <Route path="/*" element={<SubRoutes />}></Route>
    </Routes>
  );
};

export default AllRoutes;
