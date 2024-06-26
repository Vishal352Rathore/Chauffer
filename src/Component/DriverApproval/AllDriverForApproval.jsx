import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../AllDriver/AllDriver.css";
import Images from "../Images"; // Adjust this import based on your project structure

const AllDriverForApproval = () => {
  const superAdminId = localStorage.getItem("superAdminId");
  const agencyId = localStorage.getItem("agencyId");
  const token = localStorage.getItem("token");
  const [driverData, setDriverData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState(null);
  const APPROVE_DRIVER_URL = process.env.REACT_APP_GET_DRIVER_LIST_FOR_APPROVE_API_URL;
  const DRIVER_SEARCH_URL = process.env.REACT_APP_DRIVER_SEARCH_API_URL;


  console.log("APPROVE DRIVER URL:",  process.env.REACT_APP_GET_DRIVER_LIST_FOR_APPROVE_API_URL);
  console.log("DRIVER SEARCH URL:", DRIVER_SEARCH_URL);

  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("type", "superAdmin");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        superAdminId,
        agencyId,
        page,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    
      const response = await fetch(APPROVE_DRIVER_URL, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === true) {
        setDriverData(result.items.drivers);
        setFilteredDrivers(result.items.drivers);
        setTotalPages(Math.ceil(result.items.totalCount / 10));
        console.log("DRIVER response:", result);
      } else {
        console.log("DRIVER response failed:", result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchData();
    } else {
      filteredDriverData();
    }
  }, [page, searchQuery]);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const filteredDriverData = async () => {
    if (searchQuery.trim() === "") {
      return;
    }

    try {
      const result = await axios.post(
        DRIVER_SEARCH_URL,
        {
          superAdminId,
          agencyId,
          searchBy: searchQuery,
          page,
        },
        {
          headers: {
            token,
            type: "superAdmin",
          },
        }
      );

      if (result.data.status === true) {
        setFilteredDrivers(result.data.items.drivers);
        setTotalPages(Math.ceil(result.data.items.totalCount / 10));
        console.log("Filtered drivers:", result.data.items);
      } 
      else {
        setFilteredDrivers(result.data.items.drivers);
        setTotalPages(Math.ceil(result.data.items.totalCount / 10));
        console.log("Filtered drivers failed:", result);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div>
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-driver-header">
              <div className="form-title padding_left_20">
                <p>Drivers<span> Approval</span></p>
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
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      <div className="all-driver-conainer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <table>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Driver name </th>
                    <th>Email Id</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDrivers && filteredDrivers.length ? (
                    filteredDrivers.map((driver, index) => (
                      <tr key={driver._id}>
                        <td>{index + 1 + (page - 1) * 10}</td>
                        <td>{driver.drivername}</td>
                        <td>{driver.email}</td>
                        <td>{driver.createdAt}</td>
                        <td>
                          <button style={{ background: driver.status === "active" ? "#5DCA95" : "#32FdE1" }}>
                            {driver.status === "active" ? "Done" : "Pending"}
                          </button>
                        </td>
                        <td>
                          <div className="action_icon">
                            <Link to={`approveDriver/${driver._id}`} state={{ driverData: driver }}>
                              <img src={Images("view_icon")} alt="not found" />
                            </Link>
                            <img src={Images("delete_icon")} alt="not found" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Driver found</td>
                    </tr>
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
            {driverData && (
              <div className="pagination">
                <span
                  onClick={() => selectPageHandler(page - 1)}
                  className={page > 1 ? "prev_page" : "pagination__disable"}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </span>

                {Array.from({ length: totalPages >= 4 ? 4 : totalPages }, (_, i) => {
                  const startingPage = page <= 3 ? 1 : page - 3;
                  const pageNumber = startingPage + i;
                  return (
                    pageNumber <= totalPages && (
                      <span
                        key={pageNumber}
                        className={page === pageNumber ? "pagination__selected" : "inactive_page"}
                        onClick={() => selectPageHandler(pageNumber)}
                      >
                        {pageNumber}
                      </span>
                    )
                  );
                })}

                <span
                  onClick={() => selectPageHandler(page + 1)}
                  className={page === totalPages ? "pagination__disable" : "next-page"}
                >
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllDriverForApproval;
