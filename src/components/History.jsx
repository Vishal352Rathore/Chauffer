import React from "react";
import image1 from "../cab_images/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddressFromLatLng from "./AddressFromLatLong";
import Upcoming from "./HistoryStages/Upcoming";
import Past from "./HistoryStages/Past";
import Cancel from "./HistoryStages/Cancel";
import "../CssStyle/History.css";

const History = () => {
  const URL =
    "https://chauffer-staging-tse4a.ondigitalocean.app/v1/ride/allRide";
  const token = localStorage.getItem("token");
  const [rideData, setRideData] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pickUpLocation, setpickUpLocation] = useState("");

  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "upcoming":
        return <Upcoming />;
      case "past":
        return <Past />;
      case "cancel":
        return <Cancel />;
      default:
        return <Upcoming />;
    }
  };

  const handlePageChange = (e,page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div className="history-container">
      <header>
        <nav className="">
          <ul className="tab-bar">
            <li
              className="nav-item"
              onClick={(e) => handlePageChange(e,"upcoming")}
            >
              Upcoming
            </li>
            <li className="nav-item" onClick={(e) => handlePageChange(e,"past")}>
              Past
            </li>
            <li className="nav-item" onClick={(e) => handlePageChange(e,"cancel")}>
              Cancel
            </li>
          </ul>
        </nav>
      </header>
      <main>{renderPage()}</main>
    </div>
  );
};

export default History;
