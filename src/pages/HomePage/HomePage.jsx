import React from "react";
import PatientHomePage from "../../components/PatientHomePage/PatientHomePage";

const HomePage = () => {
  let user = JSON.parse(localStorage.getItem("Profile"));

  return (
    <div>{user.type === "patient" ? <PatientHomePage /> : <h1>Nope</h1>}</div>
  );
};

export default HomePage;
