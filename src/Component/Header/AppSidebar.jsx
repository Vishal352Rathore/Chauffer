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
  const [isActive, setIsActive] = useState("dashboard");

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
                      <span onClick={() => setToogleLogoutPopup(false)}>
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

      <div
        className={`sidebar-container  ${
          toogleLogoutPopup ? "backgroundDisable" : "backgroundEnable"
        }`}
      >
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
                {/* <img
                  src={Images("dashboard_icon")}
                  alt="not found"
                  className="dashboard-icon"
                /> */}
                <i className={`fa-solid fa-house dashboard-icon ${  
                    isActive === "dashboard" ? "active-link" : ""
                  }`}
                  onClick={() => setIsActive("dashboard")}></i>
                <span
                  className={`link-tag ${
                    isActive === "dashboard" ? "active-link" : ""
                  }`}
                  onClick={() => setIsActive("dashboard")}
                >
                  Dashboard
                </span>{" "}
              </Link>{" "}
            </li>
          </div>
          <div className="menu">
            <li>
              {" "}
              <Link to="allRides" className="link-tag">
                {/* <img
                  src={Images("all_rides_icon")}
                  alt="not found"
                  className="all-rides-icon"
                /> */}
                <i className={`fa-solid fa-car-rear add-vehicle-icon ${
                      isActive === "allRides" ? "active-link" : ""
                    }`}
                    onClick={() => setIsActive("allRides")}></i>
                <span
                  className={`link-tag ${
                    isActive === "allRides" ? "active-link" : ""
                  }`}
                  onClick={() => setIsActive("allRides")}
                >
                  
                  All Rides
                </span>{" "}
              </Link>{" "}
            </li>
          </div>
          <div className="menu">
            <li onClick={() => setToogleDropdown(!toogleDropdown)}>
              <div className="caret-icon">
                <div className="link-tag">
                  {/* <img
                    src={Images("add_vehicle_icon")}
                    alt="not found"
                    className="add-vehicle-icon"
                  /> */}
                   <i
                    className={`fa-solid fa-plus add-vehicle-icon ${
                      isActive === "driver" ? "active-link" : ""
                    }`}
                    onClick={() => setIsActive("driver")}
                  ></i>
                  <span
                    className={`link-tag ${
                      isActive === "driver" ? "active-link" : ""
                    }`}
                    onClick={() => setIsActive("driver")}
                  >
                    Driver{" "}
                  </span>{" "}
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
                    {/* <img
                      src={Images("add_driver_icon")}
                      alt="not found"
                      className="add-driver-icon"
                    /> */}
                    <i className={`fa-solid fa-user-group add-vehicle-icon ${
                      isActive === "allDriver" ? "active-link" : ""
                    }`}
                    onClick={() => setIsActive("allDriver")}></i>
                    <span
                      className={`link-tag ${
                        isActive === "allDriver" ? "active-link" : ""
                      }`}
                      onClick={() => setIsActive("allDriver")}
                    >
                      All Driver
                    </span>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="allDriverForApproval" className="link-tag">
                    {/* <img
                      src={Images("add_driver_icon")}
                      alt="not found"
                      className="add-driver-icon"
                    />   */}
                    <i className={`fa-solid fa-user-group add-vehicle-icon ${
                      isActive === "allDriverForApproval" ? "active-link" : ""
                    }`}
                    onClick={() => setIsActive("allDriverForApproval")}></i>
                    <span
                      className={`link-tag ${
                        isActive === "allDriverForApproval" ? "active-link" : ""
                      }`}
                      onClick={() => setIsActive("allDriverForApproval")}
                    >
                      Approve Driver
                    </span>{" "}
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="menu">
            <li onClick={() => setToogleOpen(!toogleOpen)}>
              <div className="caret-icon">
                <div className="link-tag">
                  {/* <img
                      src={Images("add_vehicle_icon")}
                      alt="not found"
                      className="add-vehicle-icon"
                    /> */}
                  <i
                    className={`fa-solid fa-plus add-vehicle-icon ${
                      isActive === "vehicle" ? "active-link" : ""
                    }`}
                    onClick={() => setIsActive("vehicle")}
                  ></i>
                  <span
                    className={`link-tag ${
                      isActive === "vehicle" ? "active-link" : ""
                    }`}
                    onClick={() => setIsActive("vehicle")}
                  >
                    Vehicle
                  </span>{" "}
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
                    {/* <img
                        src={Images("add_vehicle_icon")}
                        alt="not found"
                        className="add-vehicle-icon"
                      /> */}
                    <i
                      className={`fa-solid fa-plus add-vehicle-icon ${
                        isActive === "allVehicle" ? "active-link" : ""
                      }`}
                      onClick={() => setIsActive("allVehicle")}
                    ></i>
                    <span
                      className={`link-tag ${
                        isActive === "allVehicle" ? "active-link" : ""
                      }`}
                      onClick={() => setIsActive("allVehicle")}
                    >
                      All Vehicle
                    </span>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="allVehicleForApproval" className="link-tag">
                    {/* <img
                        src={Images("add_vehicle_icon")}
                        alt="not found"
                        className={`add-vehicle-icon ${isActive === "allVehicleForApproval" ? "active-link" : "" }`} onClick={()=>setIsActive("allVehicleForApproval")}
                      /> */}
                    <i
                      className={`fa-solid fa-plus add-vehicle-icon ${
                        isActive === "allVehicleForApproval"
                          ? "active-link"
                          : ""
                      }`}
                      onClick={() => setIsActive("allVehicleForApproval")}
                    ></i>
                    <span
                      className={`link-tag ${
                        isActive === "allVehicleForApproval"
                          ? "active-link"
                          : ""
                      }`}
                      onClick={() => setIsActive("allVehicleForApproval")}
                    >
                      Approve Vehicle
                    </span>{" "}
                  </Link>
                </li>
              </ul>
            )}
          </div>
          {isAdmin() && (
            <div className="menu">
              <li>
                <Link to="allAgent" className="link-tag">
                  {/* <img
                    src={Images("agent_icon")}
                    alt="not found"
                    className="agent-icon"
                  /> */}
                  <i className={`fa-solid fa-id-badge agent-icon ${
                      isActive === "allAgent" ? "active-link" : ""
                    }`}
                    onClick={() => setIsActive("allAgent")}></i>
                  <span
                    className={`link-tag ${
                      isActive === "allAgent" ? "active-link" : ""
                    }`}
                    onClick={() => setIsActive("allAgent")}
                  >
                    All Agent
                  </span>{" "}
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
                <span
                  className={`link-tag ${
                    isActive === "earnings" ? "active-link" : ""
                  }`}
                  onClick={() => setIsActive("earnings")}
                >
                  Earnings
                </span>{" "}
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
                <span
                  className={`link-tag ${
                    isActive === "discount" ? "active-link" : ""
                  }`}
                  onClick={() => setIsActive("discount")}
                >
                  Discount
                </span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="complaints" className="link-tag">
                {/* <img
                  src={Images("complaints_icon")}
                  alt="not found"
                  className="complaints-icon"
                /> */}
                <i className={`fa-regular fa-face-frown complaints-icon ${isActive === "complaints"  ? "active-link" : ""}`}></i>
                <span
                  className={`link-tag ${
                    isActive === "complaints" ? "active-link" : ""
                  }`}
                  onClick={() => setIsActive("complaints")}
                >
                  Complaints
                </span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="terms&Condition" className="link-tag">
                {/* <img
                  src={Images("terms_condition_icon")}
                  alt="not found"
                  className="terms-condition-icon"
                /> */}
                <i className={`fa-solid fa-file-lines terms-condition-icon ${isActive === "terms&Condition" ? "active-link" : ""}`}></i>
                <span
                  className={`link-tag ${
                    isActive === "terms&Condition" ? "active-link" : ""
                  }`}
                  onClick={() => setIsActive("terms&Condition")}
                >
                  Terms and Condition
                </span>{" "}
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
                <span
                  className={`link-tag ${
                    isActive === "policy" ? "active-link" : ""
                  }`}
                  onClick={() => setIsActive("policy")}
                >
                  Policy
                </span>{" "}
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
                {/* <img
                  src={Images("logout_icon")}
                  alt="not found"
                  className="logout-icon"
                /> */}
                <i className={`fa-solid fa-arrow-right-from-bracket logout-icons ${isActive ? "active-link":""}`}></i>
                <span
                  className={`link-tag ${ 
                    isActive === "logout" ? "active-link" : ""
                  }`}
                  onClick={() => setIsActive("logout")}
                >
                  Logout
                </span>
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
