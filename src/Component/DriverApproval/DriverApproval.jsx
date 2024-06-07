import React, { useState } from "react";
import { useParams ,useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../DriverDetail/DriverDetail.css";

const DriverApproval = () => {
  const { driverId } = useParams();
  const location = useLocation();
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const { driverData } =  location.state;
 console.log("driverData",driverData); 
  
 const AGENCYDRIVER_STATUS_CHANGE_URL = process.env.REACT_APP_AGENCYDRIVER_STATUS_CHANGE_API_URL ;
  
  const [DriverStatus , setDriverStatus] = useState({
    isApproved: ""
  })
  const handleChange = (e)=>{
    setDriverStatus({...DriverStatus,[e.target.name]:e.target.value})
  }
  const  handleSubmit = (e) =>{
      e.preventDefault();
      ApiCalling();
  }
  const ApiCalling = async () => {
    try {
      const response = await axios.post(
        AGENCYDRIVER_STATUS_CHANGE_URL,
        {
          // agencyId: agencyData._id,
          agencyStatus: DriverStatus.isApproved,
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
    <div className="driver-detail">
    <section className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="all-driver-header">
            <div className="form-title padding_left_20">
              <p>
                Driver <span>Detail</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="driver-detail-container">
      <section className="container">
        {/* <form onSubmit={handleSubmit}> */}
        <div class="row">
          <div className="col-md-4 mx-auto">
            {driverData.profileImage && (
              <div className="profile">
                <div className="profile-preview">
                  <img
                    src={driverData.profileImage || "#"}
                    alt="images"
                    id="imageProfile"
                  />
                </div>
              </div>
            )}
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="label">Full Name</div>
              <div class="value">
                {driverData.drivername || "Not Available"}
              </div>
            </div>
            <div class="col-md-6">
              <div class="label">Email</div>
              <div class="value">{driverData.email || "Not Available"}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="label">Contact No</div>
              <div class="value">{driverData.mobile || "Not Available"}</div>
            </div>
            <div class="col-md-6">
              <div class="label">Full Address</div>
              <div class="value">{driverData.address || "Not Available"}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="label">Experience in years</div>
              <div class="value">
                {driverData.experience || "Not Available"}
              </div>
            </div>

            {/* <div class="col-md-6">
              <label htmlfor="serviceArea" class="form-label">
                Selected Status
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                id="status"
                name="status"
                value={driverData.status}
                onChange={handleChange}
              >
                <option>Vehicle Select Class</option>
                <option value="active">Approve</option>
                <option value="inactive">Reject</option>
              </select>
            </div> */}
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="label" htmlFor="document">
                Document
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 ">
              <div className="upload-container">
                {driverData.drivingLicence ? (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <img
                      src={driverData.drivingLicence || "#"}
                      alt="images"
                      id="imagePreview"
                    />
                    <span>Driving License</span>
                  </label>
                ) : (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <span>Driving License</span>
                    <p>Not Available</p>
                  </label>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {driverData.aadharCard[0] ? (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <img
                      src={driverData.aadharCard[0] || "#"}
                      alt="images"
                      id="imagePreview"
                    />
                    <span>Govt Id</span>
                  </label>
                ) : (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <span>Govt Id</span>
                    <p>Not Available</p>
                  </label>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {driverData.otherDocs[0] ? (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <img
                      src={driverData.otherDocs[0] || "#"}
                      alt="images"
                      id="imagePreview"
                    />
                    <span>Other Doc</span>
                  </label>
                ) : (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <span>Other Doc</span>
                    <p>Not Available</p>
                  </label>
                )}
              </div>
            </div>
          </div>

        <form onSubmit={handleSubmit} className='statusform'> 
        <h4 className='statusformtitle'>Driver Status approved/pending </h4>
          <div className='container'>
          <div className='row'>
          <div class="col-md-6">
              <label htmlfor="serviceArea" class="form-label">
                Selected Status
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                className="value vehiclestatusvalue"
                id="Driverstatus"
                name="isApproved"
                value={DriverStatus.isApproved}
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
        {/* </form> */}
      </section>
    </div>
  </div>
  )
}

export default DriverApproval
