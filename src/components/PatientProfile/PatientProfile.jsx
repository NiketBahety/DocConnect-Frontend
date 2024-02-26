import React, { useEffect, useState } from "react";
import "./patientProfile.css";

import Navbar from "../Navbar/Navbar";

import axios from "axios";
import moment from "moment";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const PatientProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Profile")));

  useEffect(() => {
    async function getdata() {
      try {
        const { data } = await API.get("/profile/patient", {
          params: { id: user?._id },
        });
        // Get the current date/time
        const currentDate = new Date();

        // Filter appointments in the future
        const futureAppointments = data.data.patient.appointments.filter(
          (appointment) => {
            const appointmentDate = new Date(appointment.timeSlot);
            return appointmentDate > currentDate;
          }
        );

        // Sort the future appointments by timeSlot in ascending order
        futureAppointments.sort((a, b) => {
          const dateA = new Date(a.timeSlot);
          const dateB = new Date(b.timeSlot);
          return dateA - dateB;
        });

        data.data.patient.appointments = [...futureAppointments];

        setUser(data.data.patient);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    }

    getdata();
  }, []);

  return (
    <div className="login-page">
      <Navbar></Navbar>
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
          <div className="row">
            <div className="sub-heading">Address</div>
            <div className="value">{user?.address}</div>
          </div>
          <div className="row">
            <div className="sub-heading">Blood Group</div>
            <div className="value">{user?.bloodType}</div>
          </div>
        </div>
        <div className="personal-info doctor">
          <div className="heading">Upcoming appointments</div>
          {user?.appointments?.map((appointment, index) => (
            <div className="row" key={index}>
              <div className="sub-heading">
                {moment(appointment.timeSlot).format("DD-MM-YYYY HH:mm A")}
              </div>
              <div className="value">{appointment.doctor?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
