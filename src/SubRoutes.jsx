import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SubRoutes = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("Profile");

  useEffect(() => {
    if (!user) navigate("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home-page">
      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
};

export default SubRoutes;
