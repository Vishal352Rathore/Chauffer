import React from "react";
import "./Dashboard.css";
import Images from "../Images";

const Dashboard = () => {
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
                <p>8</p>
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
                <p>4</p>
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
                <p>8</p>
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
                <p>8</p>
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
                <p>50</p>
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
                <p>12</p>
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
