import React from "react";
import { useState, useEffect } from "react";
import Images from "../Images";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AllDriver.css";

const AllDriverData = ({ superAdminId, agencyId }) => {
  const [driverData, setDriverData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState(null);
  const token = localStorage.getItem("token");
  const URL = process.env.REACT_APP_DRIVER_LIST_API_URL;
  const DRIVER_SEARCH_URL = process.env.REACT_APP_DRIVER_SEARCH_API_URL;

  const [toogleLogoutPopup, setToogleLogoutPopup] = useState(false);
  const [driverId, setDriverId] = useState(null);
  const DRIVER_DELETE_URL = `${process.env.REACT_APP_DRIVER_DELETE_API_URL}/${driverId}`;

  const fetchData = async () => {
    const raw = JSON.stringify({
      superAdminId: superAdminId,
      agencyId: agencyId,
      page: page,
    });

    const myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("type", "superAdmin");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      fetch(URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === true) {
            setDriverData(result.items.drivers);
            setFilteredDrivers(result.items.drivers);
            setTotalPages(Math.ceil(result.items.totalCount / 10));
            console.log("response.data.items", result);
          } else {
            console.log("response.data.items", result);
          }
        })
        .catch((error) => console.error("error", error));
    } catch (error) {
      console.log("error", error);
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

  const filteredDriverData = async () => {
    console.log("searchQuery", searchQuery);

    if (searchQuery.trim() === "") {
      return;
    }

    try {
      const result = await axios.post(
        DRIVER_SEARCH_URL,
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
        setFilteredDrivers(result.data.items.drivers);
        setTotalPages(Math.ceil(result.data.items.totalCount / 10));
        console.log("response.data.items", result.data.items);
      } else {
        setFilteredDrivers(result.data.items.drivers);
        setTotalPages(Math.ceil(result.data.items.totalCount / 10));
        console.log("response.data.items.drivers fail", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = () => {
    console.log("Driver_DELETE_URL", DRIVER_DELETE_URL);
    try {
      axios
        .delete(DRIVER_DELETE_URL, {
          headers: {
            token: token,
            type: "superAdmin",
          },
        })
        .then((res) => {
          setToogleLogoutPopup(!toogleLogoutPopup);
          setDriverId(null);
          fetchData();
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
                    filteredDrivers.map((driver, index) => {
                      return (
                        <tr key={driver._id}>
                          <>
                            <td> {index + 1 + (page - 1) * 10}</td>
                            <td> {driver.drivername}</td>
                            <td>{driver.email}</td>
                            <td>{driver.createdAt}</td>
                            {driver.status && driver.status === "active" ? (
                              <td>
                                <button style={{ background: "#5DCA95" }}>
                                  Done
                                </button>
                              </td>
                            ) : (
                              <td>
                                <button>Pending</button>
                              </td>
                            )}
                            <td>
                              <div className="action_icon">
                                <Link
                                  to={`driverDetail/${driver._id}`}
                                  state={{ driverData: driver }}
                                >
                                  <img
                                    src={Images("view_icon")}
                                    alt="not found"
                                  />
                                </Link>
                                <Link
                                  to="addDriver"
                                  state={{ driverData: driver }}
                                >
                                  <img
                                    src={Images("edit_icon")}
                                    alt="not found"
                                  />
                                </Link>
                                <img
                                  src={Images("delete_icon")}
                                  alt="not found"
                                  onClick={() => {
                                    setDriverId(driver._id);
                                    setToogleLogoutPopup(true);
                                  }}
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
                      <p> No Driver found</p>{" "}
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {toogleLogoutPopup && (
        <div className="container">
          <div className="row">
            <div className="col-md-3 mx-auto">
              <div className="popup-container">
                <div className="popup-modal">
                  <div className="popup-content">
                    <div className="popup-title-content">
                      <h5>Confirm Delete</h5>
                      <span onClick={() => setToogleLogoutPopup(false)}>
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </div>
                    <p>Are you sure you want to Delete ?</p>
                  </div>
                  <div className="popup-buttons">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setToogleLogoutPopup(!toogleLogoutPopup);
                      }}
                    >
                      Close
                    </button>
                    <button className="btn btn-primary" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="container">
        <div className="row">
          <div className="col-md-12">
            {driverData && (
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
                      return null; // Render nothing for pages beyond totalPages
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

export default AllDriverData;
