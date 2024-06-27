import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./UserComplaint.css";
import { Link } from "react-router-dom";
import Images from "../Images";

const UserComplaint = () => {
  const [userComplainData, setUserComplainData] = useState(null);
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const COMPLAINT_LIST_API_URL = process.env.REACT_APP_COMPLAINT_LIST_API_URL;

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

  const headers = {
    //  "Content-Type": "application/json",
    token: token,
    type: "superAdmin",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (token) {
        const response = await axios.get(COMPLAINT_LIST_API_URL, {
          headers: headers,
        });
        console.log("response for ride", response);
        setUserComplainData(response.data.complaints);
        setTotalPages(response.data.totalComplaints);
      } else {
        console.log("response fail for ride");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="user-complain-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>User name</th>
                    <th>Ride Id</th>
                    <th>Vehicle No</th>
                    <th>Driver Name</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {userComplainData &&
                    userComplainData.map((complain, index) => {
                      return (
                        <tr key={complain._id}>
                          <>
                            <td>{index + 1 + (page - 1) * 10}</td>
                            <td>{complain.rideId.firstName}</td>
                            <td>{complain.rideId._id}</td>
                            <td>{complain.rideId.vehicleId.vehicleNoPlate}</td>
                            <td>{complain.rideId.driverId.drivername}</td>
                            <td>
                              <div className="action_icon">
                                <Link
                                  to="complaintDetail"
                                  state={{ complainData: complain }}
                                >
                                  <img
                                    src={Images("view_icon")}
                                    alt="not found"
                                  />
                                </Link>
                               
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
      <section className="container">
        <div className="row">
          <div className="col-md-12">
            {userComplainData && (
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

export default UserComplaint;
