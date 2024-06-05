import React from "react";
import { Link } from "react-router-dom";
import "./AllDriver.css";
import AllDriverData from "./AllDriverData";

const AllDriver = () => {
  const superAdminId = localStorage.getItem("superAdminId");
  const agencyId = localStorage.getItem("agencyId");
  return (
    <div>
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-driver-header">
              <div className="form-title  padding_left_20  ">
                <p>
                  All <span>Drivers</span>
                </p>
              </div>
              {
                agencyId ? 
                (
                  <div className="add-driver-navigate-btn-div">
                <span>
                  <Link to="addDriver" className="add-driver-btn">
                    {" "}
                    Add Driver
                  </Link>{" "}
                </span>
              </div>
                ) : ""
              }
            </div>
          </div>
        </div>
      </section>

      <AllDriverData superAdminId={superAdminId} agencyId={agencyId}/>
    </div>
  );
};

export default AllDriver;
