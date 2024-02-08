import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./login.css";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Patient");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all required fields");
    } else {
      try {
        const data = await API.post(`/auth/${type.toLowerCase()}/login`, {
          email,
          password,
        });
        localStorage.setItem(
          "Profile",
          JSON.stringify({ ...data.data.data.user, type: type.toLowerCase() })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login-page">
      <Navbar active="login"></Navbar>
      <div className="form-cont">
        <div className="form">
          <div className="input-grp">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-grp">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="radio-grp">
            <div className="radio">
              <input
                type="radio"
                id="Patient"
                value="Patient"
                name="type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                defaultChecked
              />
              <label htmlFor="Patient">Patient</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="Doctor"
                value="Doctor"
                name="type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
              <label htmlFor="Doctor">Doctor</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="Admin"
                value="Admin"
                name="type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
              <label htmlFor="Admin">Admin</label>
            </div>
          </div>
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="form-footer">
          <span>Don't have an account yet? </span>
          <a href="/signup">Signup</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
