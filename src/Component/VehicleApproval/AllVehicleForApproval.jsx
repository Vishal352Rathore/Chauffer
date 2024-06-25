import React, { useState, useEffect } from "react";
import "../AllVehicle/AllVehicle.css";
import Images from "../Images";
import { Link } from "react-router-dom";
import axios from "axios";

const AllVehicleForApproval = () => {
  const superAdminId = localStorage.getItem("superAdminId");
  const agencyId = localStorage.getItem("agencyId");
  const [vehicleData, setVehicleData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(null);
  const token = localStorage.getItem("token");
  const URL = process.env.REACT_APP_VEHICLE_LIST_API_URL;
  
  const VEHICLE_SEARCH_URL = process.env.REACT_APP_VEHICLE_SEARCH_API_URL;

  const [VehicleStatus , setVehicleStatus] = useState({
    isApproved: "",
  })

  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchData();
    } else {
      filteredVehicleData();
    }
  }, [page, searchQuery]);

  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("type", "superAdmin");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        superAdminId: superAdminId,
        agencyId: agencyId,
        page: page,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === true) {
            setVehicleData(result.items.vehicles);
            setFilteredVehicles(result.items.vehicles);
            setTotalPages(Math.ceil(result.items.totalCount / 10));

            console.log("response.data.items", result);
          } else {
            console.log("response.data.items", result);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
      console.log("selectedPage", selectedPage);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const filteredVehicleData = async () => {
    console.log("searchQuery", searchQuery);

    if (searchQuery.trim() === "") {
      return;
    }

    try {
      const result = await axios.post(
        VEHICLE_SEARCH_URL,
        {
          superAdminId: superAdminId,
          agencyId: agencyId,
          searchBy: searchQuery,
          page: page,
        },
        {
          headers: {
            token: token,
            type: "superAdmin",
          },
        }
      );

      if (result.data.status === true) {
        setFilteredVehicles(result.data.items.vehicles);
        setTotalPages(Math.ceil(result.data.items.totalCount / 10));
        console.log("response.data.items", result.data.items);
      } else {
        setFilteredVehicles(result.data.items.vehicles);
        setTotalPages(Math.ceil(result.data.items.totalCount / 10));
        console.log("response.data.items.drivers fail", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

 

  return (
    <div>
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-vehicle-header">
              <div className="form-title  padding_left_20  ">
                <p>
                Vehicle <span>Approval</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="vehicle-search-section">
        <label htmlFor="searchby">Search </label>

        <div className="search-box">
          <img src={Images("search_icon")} alt="not found" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      <div className="all-vehicle-conainer">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <table>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Vehicle No. </th>
                    <th>Vehicle Brand</th>
                    <th>Registration No</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles && filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle, index) => {
                      return (
                        <tr key={vehicle._id}>
                          <>
                            <td>{index + 1 + (page - 1) * 10}</td>
                            <td> {vehicle.vehicleNoPlate}</td>
                            <td> {vehicle.brand}</td>
                            <td>{vehicle.vehicleRegistrationNo}</td>
                            <td>{vehicle.vehicleStatus}
                            {/* {vehicle.vehicleStatus && vehicle.vehicleStatus === "active" ? (
                              <td>
                                <button style={{ background: "#5DCA95" }}>
                                  Done
                                </button>
                              </td>
                            ) : (
                              <td>
                                <button>Pending</button>
                              </td>
                            )} */}
                            </td>
                            <td>
                              <div className="action_icon">
                                <Link
                                  to={`vehicleDetail/${vehicle._id}`}
                                  state={{ vehicleData: vehicle }}
                                >
                                  <img
                                    src={Images("view_icon")}
                                    alt="not found"
                                  />
                                </Link>
                                <img
                                  src={Images("edit_icon")}
                                  alt="not found"
                                />
                                <img
                                  src={Images("delete_icon")}
                                  alt="not found"
                                />
                              </div>
                            </td>
                          </>
                        </tr>
                      );
                    })
                  ) : (
                    <div>
                      {" "}
                      <p> No Vehicle found</p>{" "}
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section className="container">
        <div className="row">
          <div className="col-md-12">
            {vehicleData && (
              <div className="pagination">
                {/* Show previous button */}
                <span
                  onClick={() => selectPageHandler(page - 1)}
                  className={page > 1 ? "prev_page" : "pagination__disable"}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </span>

                {/* Render page numbers */}
                {Array.from(
                  { length: totalPages >= 4 ? 4 : totalPages },
                  (_, i) => {
                    const startingPage = page <= 3 ? 1 : page - 3;
                    const pageNumber = startingPage + i;
                    if (pageNumber <= totalPages) {
                      return (
                        <span
                          key={pageNumber}
                          className={
                            page === pageNumber
                              ? "pagination__selected"
                              : "inactive_page"
                          }
                          onClick={() => selectPageHandler(pageNumber)}
                        >
                          {pageNumber}
                        </span>
                      );
                    } else {
                      return null; // Render nothing htmlFor pages beyond totalPages
                    }
                  }
                )}

                {/* Show next button if there are more than 2 pages */}
                {totalPages > 0 && (
                  <span
                    onClick={() => selectPageHandler(page + 1)}
                    className={
                      page === totalPages ? "pagination__disable" : "next-page"
                    }
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllVehicleForApproval;
