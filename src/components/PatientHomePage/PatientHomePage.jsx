import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import DoctorCard from "./../DoctorCard/DoctorCard";
import "./homepage.css";
import axios from "axios";
import moment from "moment";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const PatientHomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [sort, setSort] = useState("");
  const [date, setDate] = useState(moment());
  const [beforeTime, setBeforeTime] = useState(
    moment().endOf("day").set("second", 0)
  );
  const [afterTime, setAfterTime] = useState(moment().startOf("day"));

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getDoctors = async () => {
      let data = await API.get("/doctor", {
        params: {
          sort: sort,
          beforeTime: moment(beforeTime).format(),
          afterTime: moment(afterTime).format(),
        },
      });
      setDoctors(data.data.data.newDoctors);
      if (searchText) {
        let newDoctors = [];
        for (let i = 0; i < doctors.length; i++) {
          if (doctors[i].name.toLowerCase().includes(searchText.toLowerCase()))
            newDoctors.push(doctors[i]);
        }
        setDoctors(newDoctors);
      }
    };

    getDoctors();
  }, [sort, afterTime, beforeTime, searchText]);

  return (
    <div className="home-page">
      <Navbar></Navbar>
      <div className="home-cont">
        <div className="search-cont">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="main-cont">
          <div className="left-cont">
            <div className="filter">
              <p className="filter-heading">Sort By:</p>
              <div className="filter-options">
                <div className="radio">
                  <input
                    type="radio"
                    id="feeslth"
                    value="l2h"
                    name="sort"
                    onChange={() => setSort("FEES_ASCE")}
                  />
                  <label htmlFor="feeslth">Fees: Lowest to Highest</label>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    id="feeshtl"
                    value="h2l"
                    name="sort"
                    onChange={() => setSort("FEES_DESC")}
                  />
                  <label htmlFor="feeshtl">Fees: Highest to Lowest</label>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    id="rat"
                    value="rat"
                    name="sort"
                    onChange={() => setSort("")}
                  />
                  <label htmlFor="rat">Rating</label>
                </div>
              </div>
            </div>
            <div className="filter">
              <p className="filter-heading">Time Slot:</p>
              <div className="filter-options">
                <div className="radio dates">
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    id="date"
                    defaultValue={moment(Date.now()).format("yyyy-MM-DD")}
                    min={moment(Date.now()).format("yyyy-MM-DD")}
                    max={moment(Date.now()).add(7, "days").format("yyyy-MM-DD")}
                    onChange={(e) => {
                      setDate(moment(e.target.value));
                      setBeforeTime(
                        moment(beforeTime).set({
                          year: e.target.value.substring(0, 4),
                          month: parseInt(e.target.value.substring(5, 7)) - 1,
                          date: e.target.value.substring(8, 10),
                        })
                      );
                      setAfterTime(
                        moment(afterTime).set({
                          year: e.target.value.substring(0, 4),
                          month: parseInt(e.target.value.substring(5, 7)) - 1,
                          date: e.target.value.substring(8, 10),
                        })
                      );
                    }}
                  />
                </div>
                <div className="radio dates">
                  <label htmlFor="after">After:</label>
                  <input
                    type="time"
                    id="after"
                    defaultValue="00:00"
                    onChange={(e) => {
                      setAfterTime(
                        moment(afterTime).set({
                          hour: e.target.value.substring(0, 2),
                          minute: e.target.value.substring(3, 5),
                        })
                      );
                    }}
                  />
                </div>
                <div className="radio dates">
                  <label htmlFor="before">Before:</label>
                  <input
                    type="time"
                    id="before"
                    defaultValue="23:59"
                    onChange={(e) => {
                      setBeforeTime(
                        moment(beforeTime).set({
                          hour: e.target.value.substring(0, 2),
                          minute: e.target.value.substring(3, 5),
                        })
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right-cont">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} date={date} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHomePage;
