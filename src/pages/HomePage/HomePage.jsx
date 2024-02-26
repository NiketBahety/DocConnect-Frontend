import React, { useEffect } from "react";
import PatientHomePage from "../../components/PatientHomePage/PatientHomePage";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  let user = JSON.parse(localStorage.getItem("Profile"));
  let navigate = useNavigate();

  useEffect(() => {
    if (user.type !== "patient") navigate("/profile");
  }, []);

  return (
    <div>
      {user.type === "patient" ? (
        <PatientHomePage />
      ) : (
        <h1>This page is not ready yet. Try signing in as a patient.</h1>
      )}
    </div>
  );
};

export default HomePage;
