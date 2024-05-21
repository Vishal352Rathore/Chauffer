import React from "react";
import { useState } from "react";
import UserComplaint from "../UserComplaint/UserComplaint";
import DriverComplaint from "../DriverComplaint/DriverComplaint";
import { Link } from "react-router-dom";
import "./Complaints.css";

const Complaints = () => {
  const [isTrue, setIsTrue] = useState(true);

  const handleUser = () => {
    setIsTrue(true);
  };
  const handleDriver = () => {
    setIsTrue(false);
  };

  const tabStylesForUser = {
    backgroundColor: isTrue ? "#1A2A84" : "white",
    color: isTrue ? "white" : "#1A2A84",
  };
  const tabStylesForDriver = {
    backgroundColor: isTrue ? "white" : "#1A2A84",
    color: isTrue ? "#1A2A84" : "white",
  };

  return (
    <div className="complaint-container">
         <section className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="all-driver-header">
            <div className="form-title padding_left_20">
              <p>
                Complaint <span>Detail</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

      <div className="complaint-tab">
        <div>
          <button style={tabStylesForUser} onClick={handleUser}>
            User
          </button>
          <button style={tabStylesForDriver} onClick={handleDriver}>
            Driver
          </button>
        </div>
        <div>
          <span>
            <Link className="add-complaint-btn" to="complaintForm">
              {" "}
              Add Complain
            </Link>{" "}
          </span>
        </div>
      </div>

      <div className="">{isTrue ? <UserComplaint /> : <DriverComplaint />}</div>
    </div>
  );
};

export default Complaints;
