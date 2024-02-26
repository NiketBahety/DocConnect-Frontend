import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const AdminSignup = ({ setCurrent }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = async () => {
    if (!name || !email || !password) {
      alert("Please fill all required fields");
    } else {
      try {
        const data = await API.post("/auth/admin/signup", {
          name,
          email,
          password,
        });
        toast.success("Succesfully signed up and logged in!");
        localStorage.setItem(
          "Profile",
          JSON.stringify({ ...data.data.data.user, type: "admin" })
        );
        navigate("/home");
      } catch (err) {
        toast.error("There was an error! Please try later.");
        console.log(err);
      }
    }
  };

  return (
    <div className="form-cont">
      <div className="form">
        <div className="input-row">
          <div className="input-grp">
            <label htmlFor="name" className="required">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-grp">
            <label htmlFor="email" className="required">
              Email
            </label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-grp">
            <label htmlFor="password" className="required">
              Password
            </label>
            <input
              type="text"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="btn signup-btn" onClick={handleClick}>
          Signup
        </button>
      </div>
      <div className="form-footer">
        <p onClick={() => setCurrent("Doctor")}>Sign up as doctor instead</p>
        <p onClick={() => setCurrent("Patient")}>Sign up as patient</p>
      </div>
    </div>
  );
};

export default AdminSignup;
