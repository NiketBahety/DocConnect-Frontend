import React, { useEffect, useState } from "react";
import "./adminProfile.css";
import Navbar from "../Navbar/Navbar";

import axios from "axios";
import moment from "moment";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const AdminProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Profile")));
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function getdata() {
      try {
        const { data } = await API.get("/profile/admin", {
          params: { id: user?._id },
        });

        setUser(data.data.admin);

        let doctorsData = await API.get("/doctor");
        setDoctors(doctorsData.data.data.newDoctors);

        let patientsData = await API.get("/patient");
        setPatients(patientsData.data.data.patients);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);

  return (
    <div className="login-page">
      <Navbar />
      <div className="form-cont profile">
        <div className="personal-info">
          <div className="heading">Personal Information</div>
          <div className="row">
            <div className="sub-heading">Name</div>
            <div className="value">{user?.name}</div>
          </div>
          <div className="row">
            <div className="sub-heading">Email</div>
            <div className="value">{user?.email}</div>
          </div>
        </div>
        <div className="personal-info">
          <div className="heading">Doctors</div>
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Fees</th>
                <th>Address</th>
                <th>Timings</th>
              </tr>
            </thead>
            <tbody>
              {doctors?.map((doctor) => (
                <tr key={doctor?._id}>
                  <td>{doctor?._id}</td>
                  <td>{doctor?.name}</td>
                  <td>{doctor?.email}</td>
                  <td>{doctor?.fees}</td>
                  <td className="address">{doctor?.address}</td>
                  <td>{doctor?.timeSlot.split("-").join(" - ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="personal-info">
          <div className="heading">Patients</div>
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {patients?.map((patient) => (
                <tr key={patient?._id}>
                  <td>{patient?._id}</td>
                  <td>{patient?.name}</td>
                  <td>{patient?.email}</td>
                  <td className="address">{patient?.address}</td>
                  <td>{patient?.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
