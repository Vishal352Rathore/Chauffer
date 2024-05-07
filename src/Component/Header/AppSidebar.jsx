import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AppSidebar.css";
import Images from "../Images";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent"

const AppSidebar = ({ isOpen, toggleSidebar }) => {


   const isAdmin = () =>{
      if(localStorage.getItem("superAdminId")){
        return true
      }
   }


 var divWidth = null;
 
  const [dynamicWidth, setDynamicWidth] = useState(`calc(99.90vw - ${divWidth}px)`);
  const [sidebarWidth, setSidebarWidth] = useState();


  useEffect(() => {
     divWidth = document.querySelector('.sidebar-container').getBoundingClientRect().width;
     setSidebarWidth(`${divWidth}px`)
     console.log("divWidtleftWidthForHeadeContainerh", divWidth);
     setDynamicWidth(isOpen ?  `99.90vw`  : `calc(99.90vw - ${divWidth}px)`) ;
  }, [isOpen])
  
  return (
    <div className="flex-container sidebar" style={{ left: isOpen ? `-${sidebarWidth}`: ""}}>
      <div className="sidebar-container">
        <ul>
          <div className="dashboard-container ">
            <li>
              <div className="logo-container">
                <div className="logo">
                  <img src={Images("logo")} alt="not found" />
                </div>
                <div className="username">
                  <p>Welcome! John</p>
                </div>
              </div>
            </li>
          </div>
          <div className="menu">
            <li>
              {" "}
              <Link to="dashboard" className="link-tag">
                <span>
                  <img src={Images("dashboard_icon")} alt="not found" />{" "}
                  Dashboard
                </span>
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              {" "}
              <Link to="allRides" className="link-tag">
                <span>
                  <img src={Images("all_rides_icon")} alt="not found" /> All
                  Rides
                </span>{" "}
              </Link>{" "}
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="allDriver" className="link-tag">
                <span>
                  <img src={Images("add_driver_icon")} alt="not found" /> 
                  All  Driver
                </span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="allVehicle" className="link-tag">
                <span>
                  <img src={Images("add_vehicle_icon")} alt="not found" />
                  All Vehicle
                </span>{" "}
              </Link>
            </li>
          </div>
       {  isAdmin() && <div className="menu">
            <li>
              <Link to="allAgent" className="link-tag">
                <span>
                  <img src={Images("agent_icon")} alt="not found" />
                  All Agent 
                </span>{" "}
              </Link>
            </li>
          </div>}
          <div className="menu">
            <li>
              <Link to="earnings" className="link-tag">
                <span>
                  <img src={Images("earning_icon")} alt="not found" />
                  Earnings
                </span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="complaints" className="link-tag">
                <span>
                  <img src={Images("complaints_icon")} alt="not found" />
                  Complaints
                </span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="terms&Condition" className="link-tag">
                <span>
                  <img src={Images("terms_condition_icon")} alt="not found" />{" "}
                  Terms and Condition
                </span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu">
            <li>
              <Link to="policy" className="link-tag">
                <span>
                  <img src={Images("policy_icon")} alt="not found" /> Policy
                </span>{" "}
              </Link>
            </li>
          </div>
          <div className="menu logout">
            <li>
              <Link to="policy" className="link-tag">
                <span>
                  <img src={Images("logout_icon")} alt="not found" /> Logout
                </span>{" "}
              </Link>
            </li>
          </div>
        </ul>
      </div>

      <div className="header-position" style={{ left: sidebarWidth, width: dynamicWidth  , transition: 'width 0.3s ease'}}>
        <AppHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="app-content-container">
        <AppContent />
        </div>
      </div>

    </div>
  );
};

export default AppSidebar;
