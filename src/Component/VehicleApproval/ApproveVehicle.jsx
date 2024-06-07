import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../VehicleDetail/VehicleDetail.css";
import axios from "axios";

const ApproveVehicle = () => {
  const AGENCYVEHICLE_STATUS_CHANGE_URL = process.env.REACT_APP_AGENCYVEHICLE_STATUS_CHANGE_API_URL;

  const { vehicleId } = useParams();
  console.log("vehicleId:", vehicleId);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { vehicleData } = location.state;
  const [vehicleStatus, setAddVehicleStatus] = useState({
    isApproved: "",
  });
  console.log("vehicleData", vehicleData);

  const handleChange = (e) => {
    setAddVehicleStatus({ ...vehicleStatus, [e.targer.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiCalling();
  };

  const ApiCalling = async () => {
    try {
      const response = await axios.post(
        AGENCYVEHICLE_STATUS_CHANGE_URL,
        {
          agencyId: 1,
          agencyStatus: vehicleStatus.isApproved,
        },
        {
          headers: {
            token: token,
            type: "superAdmin",
          },
        }
      );

      if (response.data.status === true) {
        console.log("response.data.items", response.items);
        alert(response.data.message);
        navigate("/home/allAgent");
      } else {
        alert(response.data.message);
        console.log("response.data.items.drivers fail", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="vehicle-detail">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-driver-header">
              <div className="form-title padding_left_20">
                <p>
                  Vehicle Detail for <span>Approval</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="vehicle-detail-container">
        <section className="container">
          {/* <form onSubmit={handleSubmit}> */}
          <div className="row">
            <div className="row">
              <div className="col-md-6">
                <div className="label">Vehicle Type</div>
                <div className="value">
                  {vehicleData.vehicleName || "Not Found"}
                </div>
              </div>
              <div className="col-md-6">
                <div className="label">Vehicle Brand</div>
                <div className="value">{vehicleData.brand || "Not Found"}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="label">Vehicle Variant</div>
                <div className="value">{vehicleData.model || "Not Found"}</div>
              </div>
              <div className="col-md-6">
                <div className="label">Capacity</div>
                <div className="value">
                  {vehicleData.capacity || "Not Found"}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="label">Colour</div>
                <div className="value">{vehicleData.color || "Not Found"}</div>
              </div>
              <div className="col-md-6">
                <div className="label">Charges / km</div>
                <div className="value">
                  {vehicleData.vehicleCharges || "Not Found"}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="label" htmlFor="document">
                  Car Images
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 ">
                <div className="upload-container">
                  {vehicleData.vehicleImg[0] ? (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <img
                        src={vehicleData.vehicleImg[0] || "#"}
                        alt="images"
                        id="imagePreview"
                      />
                    </label>
                  ) : (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <p>Not Available</p>{" "}
                    </label>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="upload-container">
                  {vehicleData.vehicleImg[1] ? (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <img
                        src={vehicleData.vehicleImg[1] || "#"}
                        alt="images"
                        id="imagePreview"
                      />
                    </label>
                  ) : (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <p>Not Available</p>{" "}
                    </label>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="upload-container">
                  {vehicleData.vehicleImg[2] ? (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <img
                        src={vehicleData.vehicleImg[2] || "#"}
                        alt="images"
                        id="imagePreview"
                      />
                    </label>
                  ) : (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <p>Not Available</p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="label">Vehicle Number</div>
                <div className="value">{vehicleData.vehicleNoPlate}</div>
              </div>
              <div className="col-md-6">
                <div className="label">Vehicle Registration Number</div>
                <div className="value">{vehicleData.vehicleRegistrationNo}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="label">Vehicle Chassis Number</div>
                <div className="value">{vehicleData.vehicleChechisNo}</div>
              </div>
              <div className="col-md-6">
                <div className="label">Vehicle Last Servicing</div>
                <div className="value">{vehicleData.vehicleLastServising}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="label" htmlFor="document">
                  Vehicle RC Document
                </label>
              </div>
              <div className="col-md-6">
                <label className="label" htmlFor="document">
                  Vehicle Insurance Document
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="upload-container">
                  {vehicleData.vehicleRCDocument ? (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <img
                        src={vehicleData.vehicleRCDocument || "#"}
                        alt="images"
                        id="imagePreview"
                      />
                    </label>
                  ) : (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <p>Not Available</p>
                    </label>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="upload-container">
                  {vehicleData.vehicleRCDocument ? (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <img
                        src={vehicleData.vehicleRCDocument || "#"}
                        alt="images"
                        id="imagePreview"
                      />
                    </label>
                  ) : (
                    <label className="filelabel" htmlFor="FileInput-0">
                      <p>Not Available</p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="statusform">
              <h4 className="statusformtitle">
                Vehicle Status approved/pending{" "}
              </h4>
              <div className="container">
                <div className="row">
                  <div class="col-md-6">
                    <label htmlfor="vehiclestatus" class="label">
                      Selected Status
                    </label>
                    <br />
                    <select
                      className="value vehiclestatusvalue"
                      aria-label="Default select example"
                      id="vehiclestatus"
                      name="isApproved"
                      value={vehicleStatus.isApproved}
                      onChange={handleChange}
                    >
                      <option>Vehicle Select Class</option>
                      <option value="active">Approve</option>
                      <option value="inactive">Reject</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mx-auto">
                  <button className="form-btn" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApproveVehicle;
