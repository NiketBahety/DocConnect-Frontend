import React from "react";
import PatientProfile from "../../components/PatientProfile/PatientProfile";
import DoctorProfile from "../../components/DoctorProfile/DoctorProfile";
import AdminProfile from "../../components/AdminProfile/AdminProfile";

const HomePage = () => {
  let user = JSON.parse(localStorage.getItem("Profile"));

  return (
    <div>
      {user.type === "patient" ? (
        <PatientProfile />
      ) : user.type === "doctor" ? (
        <DoctorProfile />
      ) : (
        <AdminProfile />
      )}
    </div>
  );
};

export default HomePage;
