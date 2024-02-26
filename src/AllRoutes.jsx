import React from "react";
import { Routes, Route } from "react-router-dom";
import SubRoutes from "./SubRoutes";

import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/SignupPage/Signup";
import Login from "./pages/LoginPage/Login";
import HomePage from "./pages/HomePage/HomePage";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import Profile from "./pages/Profile/Profile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/paymentSuccess" element={<PaymentSuccess />}></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route path="/*" element={<SubRoutes />}></Route>
    </Routes>
  );
};

export default AllRoutes;
