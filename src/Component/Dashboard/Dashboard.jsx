import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Images from "../Images";
import axios from "axios";

const Dashboard = () => {

  const token = localStorage.getItem("token");
  const [dashboardData, setDashBoardData] = useState("")
  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_API_URL ;

  useEffect(()=>{
    Api_calling();
    
  },[token,DASHBOARD_URL])
  
  const Api_calling = async()=>{
    if (!DASHBOARD_URL) {
      console.error("DASHBOARD_URL is not defined");
      return;
    }

    if (!token || !DASHBOARD_URL) {
      console.error("Token or superAdminId is not defined");
      return;
    }
    try{
    const response = await axios.get(DASHBOARD_URL,{headers:{
      token:token,
      type:"superAdmin"
    }})
    setDashBoardData(response.data.items)
    console.log("Dashboard Data :",response.data.items);
    console.log("response.data.items",dashboardData);
    if (response.status === 200) {

      
    } else {
      // alert(response.data.message);
      console.log("response.data.items.drivers fail", response);
    }}
  
   catch (error) {
    console.log("error", error);
  }
  } 
  

  return (
    <div className="dashboard-container margin_top_4 padding_left_20">
      <section className="container">
  
        <div className="row">
          <div className="col-md-4">
            <div className="earning_block">
              <div>
                <p>$ 1,28,000</p>
                <p>Total Earning</p>
              </div>
              <div className="img-container">
                <img src={Images("gold_coins")} alt="not found" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4 className="title ">Vehicle Details</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="vehicle-card-img">
              <img src={Images("available_vehicle_bg")} alt="not found" className="vehicle-bg-img"/>
              <div className="vehicle-icon">
                <img src={Images("available_vehicle_icon")} alt="not found" />
              </div>
              <div className="vehicle-data">
                <p>{dashboardData && dashboardData.vehicles.available}</p>
                <div>Available Vehicles</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="vehicle-card-img">
              <img src={Images("running_vehicle_bg")} alt="not found" className="vehicle-bg-img"/>
              <div className="vehicle-icon">
                <img src={Images("running_vehicle_icon")} alt="not found" />
              </div>
              <div className="vehicle-data">
                <p>{dashboardData && dashboardData.vehicles.booked}</p>
                <div>Running Vehicles</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="vehicle-card-img">
              <img src={Images("booked_vehicle_bg")} alt="not found" className="vehicle-bg-img"/>
              <div className="vehicle-icon">
                <img src={Images("available_vehicle_icon")} alt="not found" />
              </div>
              <div className="vehicle-data">
                <p>{dashboardData && dashboardData.vehicles.booked}</p>
                <div>Booked vehicle</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4 className="title ">Driver Details</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="vehicle-card-img">
              <img src={Images("available_drivers_bg")} alt="not found" className="vehicle-bg-img"/>
              <div className="vehicle-icon">
                <img src={Images("available_vehicle_icon")} alt="not found" />
              </div>
              <div className="vehicle-data">
                <p>{dashboardData && dashboardData.drivers.available}</p>
                <div>Available Drivers</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="vehicle-card-img">
              <img src={Images("running_drivers_bg")} alt="not found" className="vehicle-bg-img"/>
              <div className="vehicle-icon">
                <img src={Images("available_vehicle_icon")} alt="not found" />
              </div>
              <div className="vehicle-data">
                <p>{dashboardData && dashboardData.drivers.running}</p>
                <div>Running Drivers</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="vehicle-card-img">
              <img src={Images("agency_owners_bg")} alt="not found" className="vehicle-bg-img" />
              <div className="vehicle-icon">
                <img src={Images("available_vehicle_icon")} alt="not found" />
              </div>
              <div className="vehicle-data">
                <p>{dashboardData && dashboardData.agencyOwners.all_Owners}</p>
                <div>Agency Owners</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
