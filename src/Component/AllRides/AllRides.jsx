import React from "react";
import { useState, useEffect } from "react";
import "./AllRides.css";
import { Link } from "react-router-dom";
import Images from "../Images";
import axios from "axios";

const AllRides = () => {
  const [rideData, setRideData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState(null);
  const token = localStorage.getItem("token");


  const URL = process.env.REACT_APP_RIDE_DETAIL_API_URL;

  const headers = {
    "Content-Type": "application/json",
    token: token,
    type : "superAdmin"
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredDrivers(rideData); // Reset to full list if input field is cleared
      return;
    }

    const keywords = query.split(" ");
    const filtered = rideData.filter((driver) =>
      keywords.every((keyword) => {
        if (keyword === "active" || keyword === "inactive") {
          return driver.status.toLowerCase() === keyword;
        }
        return Object.values(driver).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(keyword)
        );
      })
    );
    setFilteredDrivers(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (token) {
        const response = await axios.get(URL, {
          method: "GET",
          headers: headers,
        });
        console.log("response for ride", response);
        setRideData(response.data.items);
      } else {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="all-rides">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-rides-header">
              <div className="form-title padding_left_20  ">
                <p>
                  All <span>Rides</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="search-box-section">
        <label htmlFor="searchby">Search :</label>

        <div className="search-box">
          <img src={Images("search_icon")} alt="not found" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>

      <div className="all-ride-conainer">
        <div className="container-fluid ">
          <div className="row">
            <div className="col">
              <table>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>User name</th>
                    <th>Amount</th>
                    <th>Ride type</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rideData &&
                    rideData.map((ride,index) => {
                      return (
                        <tr key={ride._id}>
                          <>
                            <td>{index + 1}</td>
                            <td>{ride.firstName}</td>
                            <td>{ride.amount}</td>
                            <td>{ride.rideType}</td>
                            <td>{ride.status}</td>
                            <td>
                              {ride.date}
                              {ride.time}
                            </td>
                            <td>
                              <div className="action_icon">
                              <Link
                                  to={`rideDetails/${ride._id}`}
                                  state={{ rideData: ride }}
                                >
                                <img
                                  src={Images("view_icon")}
                                  alt="not found"
                                />
                                </Link>
                                <img
                                  src={Images("delete_icon")}
                                  alt="not found"
                                />
                              </div>
                            </td>
                          </>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRides;
