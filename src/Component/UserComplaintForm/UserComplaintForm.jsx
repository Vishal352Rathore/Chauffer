import { useState } from "react";
import React from "react";
import "./UserComplaintForm.css";

const UserComplaintForm = () => {
  return (
    <div className="user-complain-form">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <label for="driverName">User Name</label>
            <input type="text" id="driverName" name="driverName" />
          </div>
          <div className="col-md-6">
            <label for="yourEmail">Email</label>
            <input type="email" id="yourEmail" name="yourEmail" />
          </div>
          <div className="col-md-6">
            <label for="phoneNumber">Phone</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" />
          </div>
          <div className="col-md-6">
            <div>
              <label for="complainFor">Complain For</label>
              <input type="number" id="complainFor" name="complainFor" />
            </div>
          </div>
          <div className="col-md-12">
            <label for="complain">Complain</label>
            <textarea type="text" id="complain" name="complain" />
          </div>
          <div className="col-md-4 mx-auto">
            <button className="form-btn ">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComplaintForm;
