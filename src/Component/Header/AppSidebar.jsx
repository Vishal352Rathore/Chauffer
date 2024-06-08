import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AppSidebar.css";
import Images from "../Images";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import { useNavigate } from "react-router-dom";

const AppSidebar = ({ isOpen, toggleSidebar }) => {
  const AgencyName = localStorage.getItem("AgencyName");
  const navigate = useNavigate();
  const [toogleDropdown, setToogleDropdown] = useState(false);
  const [toogleOpen, setToogleOpen] = useState(false);
  const [toogleLogoutPopup, setToogleLogoutPopup] = useState(false);


 
  const handleLogout = () => {
    // Logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("AgencyName");
    localStorage.removeItem("email");
    localStorage.removeItem("superAdminId");
    localStorage.removeItem("agencyId");
    setToogleLogoutPopup(false); // Close the modal after logout
    setToogleOpen(false);
    navigate("/");
  };
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
      {toogleLogoutPopup && (
        <div className="container">
          <div className="row">
            <div className="col-md-3 mx-auto">
              <div className="popup-container">
              <div className="popup-modal">
              <div className="popup-content">
                <div className="popup-title-content">
                <h5>Confirm Logout</h5>
                <span onClick={()=>setToogleLogoutPopup(false)}>
                <i class="fa-solid fa-xmark"></i>
                </span>
                </div>
                <p>Are you sure you want to logout?</p>
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
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

        <div className={`sidebar-container  ${toogleLogoutPopup ? "backgroundDisable": "backgroundEnable"}`}>
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
              <li >
                {" "}
              <Link to="dashboard" className="link-tag" >
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
              <li onClick={() => setToogleDropdown(!toogleDropdown)}>
                <div className="caret-icon">
                  <div className="link-tag">
                    <img
                      src={Images("add_vehicle_icon")}
                      alt="not found"
                      className="add-vehicle-icon"
                    />
                    <span>Driver </span>{" "}
                  </div>
                  <span>
                    {toogleDropdown ? (
                      <i class="fa-solid fa-angle-down"></i>
                    ) : (
                      <i class="fa-solid fa-angle-up"></i>
                    )}
                  </span>
                </div>
              </li>
              {toogleDropdown && (
                <ul>
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
                  <li>
                    <Link to="allDriverForApproval" className="link-tag">
                      <img
                        src={Images("add_driver_icon")}
                        alt="not found"
                        className="add-driver-icon"
                      />
                      <span>Approve Driver</span>{" "}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="menu">
              <li onClick={() => setToogleOpen(!toogleOpen)}>
                <div className="caret-icon">
                  <div className="link-tag">
                    <img
                      src={Images("add_vehicle_icon")}
                      alt="not found"
                      className="add-vehicle-icon"
                    />
                    <span>Vehicle</span>{" "}
                  </div>
                  <span>
                    {toogleOpen ? (
                      <i class="fa-solid fa-angle-down"></i>
                    ) : (
                      <i class="fa-solid fa-angle-up"></i>
                    )}
                  </span>
                </div>
              </li>
              {toogleOpen && (
                <ul>
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
                  <li>
                    <Link to="allVehicleForApproval" className="link-tag">
                      <img
                        src={Images("add_vehicle_icon")}
                        alt="not found"
                        className="add-vehicle-icon"
                      />
                      <span>Approve Vehicle</span>{" "}
                    </Link>
                  </li>
                </ul>
              )}
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
            <div className="menu">
              <li className="link-tag btn-container">
                <button
                  type="button"
                  className="policy-icon"
                  onClick={() => setToogleLogoutPopup(true)}
                >
                  <img
                    src={Images("logout_icon")}
                    alt="not found"
                    className="logout-icon"
                  />
                  <span>Logout</span>
                </button>
               
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
            <AppContent />
          </div>
        </div>
      
    </div>
  );
};
export default AppSidebar;
