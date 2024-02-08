import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PatientSignup from "../../components/Signup/PatientSignup";
import DoctorSignup from "../../components/Signup/DoctorSignup";
import AdminSignup from "../../components/Signup/AdminSignup";

import "./signup.css";

const Signup = () => {
  const [current, setCurrent] = useState("Patient");

  return (
    <div className="signup-page">
      <Navbar active="signup"></Navbar>
      {current === "Patient" ? (
        <PatientSignup setCurrent={setCurrent} />
      ) : current === "Doctor" ? (
        <DoctorSignup setCurrent={setCurrent} />
      ) : (
        <AdminSignup setCurrent={setCurrent} />
      )}
    </div>
  );
};

export default Signup;
