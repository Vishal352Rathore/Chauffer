

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AppSidebar.css";
import Images from "../Images";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import 'bootstrap/dist/css/bootstrap.min.css';


const AppSidebar = ({ isOpen, toggleSidebar }) => {
  const isAdmin = () => {
    if (localStorage.getItem("superAdminId")) {
      return true;
    }
  };

  var divWidth = null;

  const [dynamicWidth, setDynamicWidth] = useState(
    `calc(99.90vw - ${divWidth}px)`
  );
  const [sidebarWidth, setSidebarWidth] = useState();
  const AgencyName = localStorage.getItem("AgencyName")
  useEffect(() => {
    divWidth = document
      .querySelector(".sidebar-container")
      .getBoundingClientRect().width;
    setSidebarWidth(`${divWidth}px`);
    setDynamicWidth(isOpen ? `99.90vw` : `calc(99.90vw - ${divWidth}px)`);
  }, [isOpen]);

  return (
    <div
      className="flex-container sidebar"
      style={{ left: isOpen ? `-${sidebarWidth}` : "" }}
    >
      <div className="sidebar-container">
        <ul>
          <div className="dashboard-container ">
            <li>
              <div className="logo-container">
                <div className="logo">
                  <img src={Images("logo")} alt="not found" />
                </div>
                <div className="username">
                  <p>Welcome {AgencyName} !</p>
                </div>
              </div>
            </li>
          </div>
          <div className="menu">
            <li>
              {" "}
              <Link to="dashboard" className="link-tag">
                <img
                  src={Images("dashboard_icon")}
                  alt="not found"
                  className="dashboard-icon"
                />
                <span>Dashboard</span>{" "}
              </Link>{" "}
            </li>
          </div>
          <div className="menu">
            <li>
              {" "}
              <Link to="allRides" className="link-tag">
                <img
                  src={Images("all_rides_icon")}
                  alt="not found"
                  className="all-rides-icon"
                />
                <span> All Rides</span>{" "}
              </Link>{" "}
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="allDriver" className="link-tag">
                <img
                  src={Images("add_driver_icon")}
                  alt="not found"
                  className="add-driver-icon"
                />
                <span>All Driver</span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="allVehicle" className="link-tag">
                <img
                  src={Images("add_vehicle_icon")}
                  alt="not found"
                  className="add-vehicle-icon"
                />
                <span>All Vehicle</span>{" "}
              </Link>
            </li>
          </div>
          {isAdmin() && (
            <div className="menu">
              <li>
                <Link to="allAgent" className="link-tag">
                  <img
                    src={Images("agent_icon")}
                    alt="not found"
                    className="agent-icon"
                  />
                  <span>All Agent</span>{" "}
                </Link>
              </li>
            </div>
          )}
          <div className="menu">
            <li>
              <Link to="earnings" className="link-tag">
                <img
                  src={Images("earning_icon")}
                  alt="not found"
                  className="earning-icon"
                />
                <span>Earnings</span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="discount" className="link-tag">
                <img
                  src={Images("earning_icon")}
                  alt="not found"
                  className="earning-icon"
                />
                <span>Discount</span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="complaints" className="link-tag">
                <img
                  src={Images("complaints_icon")}
                  alt="not found"
                  className="complaints-icon"
                />
                <span>Complaints</span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="terms&Condition" className="link-tag">
                <img
                  src={Images("terms_condition_icon")}
                  alt="not found"
                  className="terms-condition-icon"
                />
                <span>Terms and Condition</span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="policy" className="link-tag">
                <img
                  src={Images("policy_icon")}
                  alt="not found"
                  className="policy-icon"
                />
                <span>Policy</span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu logout">
            <li>
              {/* <!-- Button trigger modal --> */}
               {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <img src={Images("logout_icon")} alt="not found" className="logout-icon" />
                  <span>Logout
                </span>{" "}
          </button>
              {/* <Link to="logout" className="link-tag">
                Logout
              </Link> */}
            </li>

          </div>
        </ul>
      </div>

      <div
        className="header-position"
        style={{
          left: sidebarWidth,
          width: dynamicWidth,
          transition: "width 0.3s ease",
        }}
      >
        <AppHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className="app-content-container">
            {/* Modal */}
            <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">body data</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <AppContent />
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
