import React, { useEffect } from "react";
import "./landingPage.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const user = localStorage.getItem("Profile");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  }, []);

  return (
    <div className="landing-page">
      <Navbar></Navbar>
      <div className="hero">
        <div className="left">
          <p className="hero-heading">
            Find your doctor and make an appointment
          </p>
          <a href="/login">
            <button className="hero-btn">
              <span>Find doctors</span>
              <i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </a>
        </div>
        <div className="right">
          <img src="./hero.jpg" alt="" />
        </div>
      </div>
      <div className="bottom">
        <img src="./logo1.png" alt="" />
        <img src="./logo2.png" alt="" />
        <img src="./logo1.png" alt="" />
        <img src="./logo2.png" alt="" />
      </div>
    </div>
  );
};

export default LandingPage;
