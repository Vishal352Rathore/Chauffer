import React from "react";
import { useState } from "react";
import "./AllRides.css";
import Images from "../Images";

const AllRides = () => {
  const [rideData, setRideData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState(null);
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

  return (
    <div className="all-rides">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-title  margin_top_4 padding_left_20  ">
              <p>
                All <span>Rides</span>
              </p>
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
                    <th>Ride Id</th>
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
                    rideData.map((ride) => {
                      return (
                        <tr key={ride._id}>
                          <>
                            <td> {ride._id}</td>
                            <td> {ride.dropLocation}</td>
                            <td>{ride.firstName}</td>
                            <td>{ride.rideType}</td>
                            <td>{ride.status}</td>
                            <td>
                              {ride.date}
                              {ride.time}
                            </td>
                            <td>
                              <input type="checkbox" />
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
