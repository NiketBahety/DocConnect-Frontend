import React, { useState, useEffect } from "react";
import "./doctorCard.css";
import moment from "moment";
import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const DoctorCard = ({ doctor, date }) => {
  const [open, setOpen] = useState(false);
  const [startTime, endTime] = doctor.timeSlot.split("-");
  const [timeIntervals, setTimeIntervals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    moment(Date.now()).format("yyyy-MM-DD")
  );

  console.log(date);

  useEffect(() => {
    let intervals = generateTimeIntervals();
    const currentDate = moment(selectedDate);
    const currentTime = moment();

    const showFromCurrentTime = currentDate.isSame(currentTime, "day");

    if (showFromCurrentTime) {
      // Filter out time slots before the current time
      intervals = intervals.filter((timeSlot) =>
        moment(`${selectedDate} ${timeSlot}`).isSameOrAfter(currentTime)
      );
    }

    const appointmentsForDate = doctor.appointments.filter((appointment) =>
      moment(appointment.timeSlot).isSame(moment(selectedDate), "day")
    );

    const bookedTimeSlots = appointmentsForDate.map((appointment) =>
      moment(appointment.timeSlot).format("HH:mm")
    );

    const freeTimeSlots = intervals.filter(
      (timeSlot) => !bookedTimeSlots.includes(timeSlot)
    );

    setTimeIntervals(freeTimeSlots);
  }, [selectedDate]);

  const generateTimeIntervals = () => {
    const intervals = [];
    let currentTime = moment(startTime, "HH:mm");

    while (currentTime.isSameOrBefore(moment(endTime, "HH:mm"))) {
      intervals.push(currentTime.format("HH:mm"));
      currentTime.add(30, "minutes");
    }

    return intervals;
  };

  const handlePayment = async () => {
    let doctorId = doctor._id;
    let patientId = JSON.parse(localStorage.getItem("Profile"))._id;
    let time = moment(timeIntervals[activeIndex], "HH:mm");
    let timeSlot = moment(selectedDate);
    timeSlot.set({ hour: time.hours(), minute: time.minutes(), second: 0 });
    timeSlot = timeSlot.format();

    const { data } = await API.post("/appointment/bookAppointment", {
      doctorId,
      patientId,
      timeSlot,
    });

    const order = data.data.order;

    const {
      data: { key },
    } = await API.get("/getRazorpayKeys");

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "DocConnect",
      description: "Test Transaction",
      image:
        "https://lh3.googleusercontent.com/a-/AOh14GgPFfbAnfcX0QMbdI7fQRMHa3qzFVZJ7UlXoI6w=k-s48",
      order_id: order.id,
      callback_url: `http://localhost:5000/api/v1/appointment/verifyPayment?doctor=${doctorId}&patient=${patientId}&timeSlot=${timeSlot}`,
      prefill: {
        name: JSON.parse(localStorage.getItem("Profile")).name,
        email: JSON.parse(localStorage.getItem("Profile")).email,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

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
        <div className="book-btn" onClick={() => setOpen(!open)}>
          <button className="btn">Book Appointment</button>
        </div>
      </div>
      {open ? (
        <div className="card-bottom">
          <input
            type="date"
            id="date"
            defaultValue={moment(Date.now()).format("yyyy-MM-DD")}
            min={moment(Date.now()).format("yyyy-MM-DD")}
            max={moment(Date.now()).add(7, "days").format("yyyy-MM-DD")}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
          />
          <p className="label">{timeIntervals.length} slots available!</p>
          <div className="time-slots">
            {timeIntervals.map((time, index) => (
              <button
                key={index}
                className={index === activeIndex ? "btn active" : "btn"}
                onClick={(e) => {
                  setActiveIndex(index);
                }}
              >
                {time}
              </button>
            ))}
          </div>
          <button
            className={
              activeIndex === null
                ? "btn payment-btn disabled"
                : "btn payment-btn"
            }
            disabled={activeIndex === null ? true : false}
            onClick={handlePayment}
          >
            Make payment and book slot
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DoctorCard;
