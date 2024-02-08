import React from "react";
import "./doctorCard.css";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <div className="left">
        <div className="personal-info">
          <p className="name">Dr. {doctor.name}</p>
          <p className="education">{doctor.education}</p>
        </div>
        <div className="fees">
          <p className="address">{doctor?.address}</p>
          <p>
            <span>Rs. {doctor?.fees}</span> per consultation
          </p>
        </div>
      </div>
      <div className="right">
        <div className="rating-box">
          <button className="btn">
            <span>5</span>
            <i className="fa-solid fa-star"></i>
          </button>
        </div>
        <div className="book-btn">
          <button className="btn">Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
