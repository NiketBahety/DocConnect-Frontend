import React from "react";
import PatientHomePage from "../../components/PatientHomePage/PatientHomePage";

const HomePage = () => {
  let user = JSON.parse(localStorage.getItem("Profile"));

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
