import { React, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const PatientSignup = ({ setCurrent }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [gender, setGender] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");

  const handleClick = async () => {
    if (!name || !email || !password || !phone) {
      alert("Please fill all required fields");
    } else {
      try {
        const data = await API.post("/auth/patient/signup", {
          name,
          email,
          password,
          phone,
          address,
          bloodType,
          gender,
          medicalHistory,
        });
        toast.success("Succesfully signed up and logged in!");
        localStorage.setItem(
          "Profile",
          JSON.stringify({ ...data.data.data.user, type: "patient" })
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
          <div className="input-grp">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
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
          <div className="input-grp">
            <label htmlFor="phone" className="required">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
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
          <div className="input-row">
            <div className="input-grp">
              <label htmlFor="blood">Blood Group</label>
              <input
                type="text"
                id="blood"
                onChange={(e) => setBloodType(e.target.value)}
              />
            </div>
            <div className="input-grp">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="input-row">
          <div className="input-grp">
            <label htmlFor="medical-history">Any medical history</label>
            <textarea
              id="medical-history"
              maxLength="150"
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
          </div>
        </div>
        <button className="btn signup-btn" onClick={handleClick}>
          Signup
        </button>
      </div>
      <div className="form-footer">
        <p onClick={() => setCurrent("Doctor")}>Sign up as doctor instead</p>
        <p onClick={() => setCurrent("Admin")}>Sign up as admin</p>
      </div>
    </div>
  );
};

export default PatientSignup;
