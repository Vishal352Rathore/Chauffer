import React from "react";
import { useLocation } from "react-router-dom";
import "./ComplainDetail.css"

const ComplainDetail = () => {
  const location = useLocation();
  const { complainData } = location.state;
  console.log("complainData", complainData);
  return (
    <div>
      {" "}
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-driver-header">
              <div className="form-title padding_left_20">
                <p>
                  Complaint <span>Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="complaint-detail-container">
        <section className="container-fluid">
          <div>
            <div className="row">
              <h4>Complaint Message</h4>
            </div>
            <div class="row">
              <div class="col-md-12">
                {/* <div class="label">User Id</div> */}
                <div class="value">{complainData.complaints}</div>
              </div>
            </div>
            <div className="row">
              <h4>User Detail</h4>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="label">User Id</div>
                <div class="value">{complainData.rideId.userId}</div>
              </div>
              <div class="col-md-6">
                <div class="label">User Name</div>
                <div class="value">{complainData.rideId.firstName}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="label">User Email</div>
                <div class="value">{complainData.rideId.email}</div>
              </div>
              <div class="col-md-6">
                <div class="label">User Contact No</div>
                <div class="value">{complainData.rideId.phoneNumber}</div>
              </div>
            </div>

            <div className="row">
              <h4>Ride Detail</h4>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="label">Ride Id</div>
                <div class="value">{complainData.rideId._id}</div>
              </div>
              <div class="col-md-6">
                <div class="label">Ride time</div>
                <div class="value">{complainData.rideId.time}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="label">Pickup Location</div>
                <div class="value">{complainData.rideId.pickUpLocation}</div>
              </div>
              <div class="col-md-6">
                <div class="label">Drop Location</div>
                <div class="value">{complainData.rideId.dropLocation}</div>
              </div>
            </div>
            <div className="row">
              <h4>Driver Detail</h4>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="label">Driver Name</div>
                <div class="value">{complainData.rideId.driverId.drivername}</div>
              </div>
              <div class="col-md-6">
                <div class="label">Contact No</div>
                <div class="value">{complainData.rideId.driverId.mobile}</div>
              </div>
              <div className="row">
              <h4>Vehicle Detail</h4>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="label">Vehicle No</div>
                <div class="value">{complainData.rideId.vehicleId.vehicleNoPlate}</div>
              </div>
              <div class="col-md-6">
                <div class="label">Contact No</div>
                <div class="value">{complainData.rideId.vehicleId.brand}</div>
              </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComplainDetail;
