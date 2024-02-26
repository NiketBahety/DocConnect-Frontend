import React, { useEffect, useState } from "react";
import "./paymentSuccess.css";
import Navbar from "../../components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/appointment",
});

const PaymentSuccess = () => {
  const [queryParams] = useSearchParams();
  const [appointment, setAppointment] = useState();

  useEffect(() => {
    const getAppointmentDetails = async () => {
      const id = queryParams.get("appId");

      const { data } = await API.get(`?id=${id}`);
      setAppointment(data.data.appointment);
    };

    getAppointmentDetails();
  }, []);

  return (
    <div className="login-page">
      <Navbar></Navbar>
      <div className="form-cont">
        <div className="form">
          <p className="congo">Payment Successfull!</p>
          <p className="ref">Reference No: {queryParams.get("ref")}</p>
          <p className="heading">Appointment Details:</p>
          <div className="doc-card">
            <div className="row">
              <p className="head">Doctor Name: </p>
              <p className="d-name">{appointment?.doctor?.name}</p>
            </div>
            <div className="row">
              <p className="head">Patient Name: </p>
              <p className="d-name">{appointment?.patient?.name}</p>
            </div>
            <div className="row">
              <p className="head">Date: </p>
              <p className="d-name">
                {moment(appointment?.timeSlot).format("ddd Do MMM, YYYY")}
              </p>
            </div>
            <div className="row">
              <p className="head">Time: </p>
              <p className="d-name">
                {moment(appointment?.timeSlot).format("HH:mm A")}
              </p>
            </div>
            <div className="row">
              <p className="head">Fees: </p>
              <p className="d-name">Rs. {appointment?.doctor?.fees}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
