import React, { useEffect, useState } from "react";
import axios from "axios";
// import moment from "moment";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const DoctorSignup = ({ setCurrent }) => {
  const navigate = useNavigate();

  useEffect(() => {
    function createOption(value, text) {
      var option = document.createElement("option");
      option.text = text;
      option.value = value;
      return option;
    }

    var hourSelect = document.getElementById("from-hours");
    var hourSelect2 = document.getElementById("to-hours");

    for (let i = 0; i <= 23; i++) {
      hourSelect.add(createOption(i, i));
      hourSelect2.add(createOption(i, i));
    }

    var minutesSelect = document.getElementById("from-minutes");
    var minutesSelect2 = document.getElementById("to-minutes");

    for (let i = 0; i < 60; i += 15) {
      minutesSelect.add(createOption(i, i));
      minutesSelect2.add(createOption(i, i));
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [fees, setFees] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [about, setAbout] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [address, setAddress] = useState("");
  const [h1, setH1] = useState("");
  const [m1, setM1] = useState(0);
  const [h2, setH2] = useState("");
  const [m2, setM2] = useState(0);

  const handleClick = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !fees ||
      !education ||
      !h1 ||
      !h2 ||
      !address
    ) {
      alert("Please fill all required fields");
    } else if (
      parseInt(h1) > parseInt(h2) ||
      (parseInt(h1) === parseInt(h2) && parseInt(m1) >= parseInt(m2))
    ) {
      alert("Please input valid timings. From cannot be less than to.");
    } else {
      try {
        function n(num, len = 2) {
          return `${num}`.padStart(len, "0");
        }
        setTimeSlot(`${n(h1)}:${n(m1)}-${n(h2)}:${n(m2)}`);

        const data = await API.post("/auth/doctor/signup", {
          name,
          email,
          password,
          phone,
          education,
          fees,
          specialization,
          about,
          address,
          timeSlot: `${n(h1)}:${n(m1)}-${n(h2)}:${n(m2)}`,
        });
        toast.success("Succesfully signed up and logged in!");
        localStorage.setItem(
          "Profile",
          JSON.stringify({ ...data.data.data.user, type: "doctor" })
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
            <label htmlFor="address" className="required">
              Address
            </label>
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
            <label htmlFor="phone">Phone Number</label>
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
          <div className="input-grp">
            <label htmlFor="specialization">Specialization</label>
            <input
              type="text"
              id="specialization"
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-grp">
            <label htmlFor="education" className="required">
              Education
            </label>
            <input
              type="text"
              id="education"
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>
          <div className="input-grp">
            <label htmlFor="fees" className="required">
              Fees
            </label>
            <input
              type="number"
              id="fees"
              onChange={(e) => setFees(e.target.value)}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-grp">
            <label htmlFor="about">About yourself</label>
            <input
              type="text"
              id="about"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-grp">
            <label htmlFor="timing" className="required">
              Timings
            </label>
            <div className="input-row">
              <div className="input-row">
                <label>From</label>
                <div>
                  <select
                    className="time"
                    id="from-hours"
                    onChange={(e) => {
                      setH1(e.target.value);
                    }}
                  ></select>
                  <select
                    className="time"
                    id="from-minutes"
                    onChange={(e) => {
                      setM1(e.target.value);
                    }}
                  ></select>
                </div>
              </div>
              <div className="input-row">
                <label>To</label>
                <div>
                  <select
                    className="time"
                    id="to-hours"
                    onChange={(e) => {
                      setH2(e.target.value);
                    }}
                  ></select>
                  <select
                    className="time"
                    id="to-minutes"
                    onChange={(e) => setM2(e.target.value)}
                  ></select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn signup-btn" onClick={handleClick}>
          Signup
        </button>
      </div>
      <div className="form-footer">
        <p onClick={() => setCurrent("Patient")}>Sign up as patient instead</p>
        <p onClick={() => setCurrent("Admin")}>Sign up as admin</p>
      </div>
    </div>
  );
};

export default DoctorSignup;
