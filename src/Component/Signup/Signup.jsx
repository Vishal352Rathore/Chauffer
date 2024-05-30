import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Images from "../Images";

const Signup = () => {
  const URL = process.env.REACT_APP_AGENCY_REGISTER_API_URL;
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    AgencyName: "",
    BusinessRegistrationNumber: "",
    ContactPerson: "",
    ContactEmail: "",
    ContactNumber: "",
    AgencyWebsite: "",
    PhysicalAddress: "",
    password: "",
    YearsInOperation: "",
    NumberOfVehiclesInFleet: "",
    ServiceWeCovrage: "",
    BusinessLicensePermit: "",
    TaxInformationNumber: "",
  });
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    
  };

  const validatePasswords = () => {
    if (signupInfo.Password !== ConfirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePasswords();
    if (signupInfo.Password === ConfirmPassword) {
      // Proceed with form submission or further processing
      console.log("Passwords match. Form submitted.");
    }
    console.log("signupInfo :", signupInfo);
    AgencyRegister();

  };

  const AgencyRegister = async () => {
    try {
      const response = await axios.post(URL, signupInfo);
      if (signupInfo.Password === ConfirmPassword) {
        // Proceed with form submission or further processing
        console.log("Passwords match. Form submitted.");
      }
      if (response.data.subCode === 200) {
        console.log(
          response.data.subCode,
          response.data.message,
          response.data
        );
        alert("Data Register successfully");
        toast.success(response.data.message);
        console.log("Registered Data :");
        navigate("/login");
      } else if (response.data.subCode === 201) {
        console.log(
          response.data.subCode,
          response.data.message,
          response.data
        );
        toast.success(response.data.message);
      } else if (response.data.subCode === 400) {
        console.log(
          response.data.subCode,
          response.data.message,
          response.data
        );
        toast.success(response.data.message);
        navigate("/login");
      } else if (response.data.subCode === 401) {
        console.log(
          response.data.subCode,
          response.data.message,
          response.data
        );
        toast.success(response.data.message);
      } else if (response.data.subCode === 403) {
        console.log(
          response.data.subCode,
          response.data.message,
          response.data
        );
        toast.success(response.data.message);
      } else if (response.data.subCode === 404) {
        console.log(
          response.data.subCode,
          response.data.message,
          response.data
        );
        toast.success(response.data.message);
      }

      // Clear the form fields after submission
      setSignupInfo({
        AgencyName: "",
        BusinessRegistrationNumber: "",
        ContactPerson: "",
        ContactEmail: "",
        ContactNumber: "",
        AgencyWebsite: "",
        PhysicalAddress: "",
        password: "",
        YearsInOperation: "",
        NumberOfVehiclesInFleet: "",
        ServiceWeCovrage: "",
        BusinessLicensePermit: "",
        TaxInformationNumber: "",
      });
      navigate("/signup");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-4 set_postion">
            <img src={Images("signup_banner")} alt="not found" />
            <div className="login-image">
              <p>
                Join our community by registering with your name, email, and
                password. Confirm your email to activate your account. Welcome
                aboard!
              </p>
            </div>
          </div>

          <div className="col-md-8">
            <h1 className="signup-form-title">Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
              <p className="form-input-title">
                Agency Information
              </p>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="agencyname" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    id="agencyname"
                    placeholder="Agency Name"
                    name="AgencyName"
                    value={signupInfo.AgencyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="businessRegistration"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="businessRegistration"
                    placeholder="Business Registration No."
                    name="BusinessRegistrationNumber"
                    value={signupInfo.BusinessRegistrationNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="contactPerson" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactPerson"
                    placeholder="Contact Person"
                    name="ContactPerson"
                    value={signupInfo.ContactPerson}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="contactEmail" className="form-label"></label>
                  <input
                    type="email"
                    className="form-control"
                    id="contactEmail"
                    placeholder="Contact Email"
                    name="ContactEmail"
                    value={signupInfo.ContactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="contactNumber" className="form-label"></label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contactNumber"
                    placeholder="Contact Number"
                    name="ContactNumber"
                    value={signupInfo.ContactNumber}
                    onChange={handleChange}
                    required
                    maxLength="10"
                    minLength="10"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="agencyWebsite" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    id="agencyWebsite"
                    placeholder="Agency Website"
                    name="AgencyWebsite"
                    value={signupInfo.AgencyWebsite}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="physicalAddress"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="physicalAddress"
                    placeholder="Physical Address"
                    name="PhysicalAddress"
                    value={signupInfo.PhysicalAddress}
                    onChange={handleChange}
                    required
                    maxLength="120"
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="Password"
                    className="form-label"
                  ></label>
                  <input
                    type="password"
                    className="form-control"
                    id="Password"
                    placeholder="Password"
                    name="password"
                    value={signupInfo.password}
                    onChange={handleChange}
                    required
                    maxLength="20"
                  />
                </div>
              </div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="password"
                    value={ConfirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    onBlur={validatePasswords} // Validate on blur
                    className="form-control confirmpassword"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 ">
                  <p className="form-input-title operation-title ">
                    Operation Details
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="yearsInOperation"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="yearsInOperation"
                    placeholder="Years In Operation"
                    name="YearsInOperation"
                    value={signupInfo.YearsInOperation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="numberOfVehiclesInFleet"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="numberOfVehiclesInFleet"
                    placeholder="Number Of Vehicles In Fleet"
                    name="NumberOfVehiclesInFleet"
                    value={signupInfo.NumberOfVehiclesInFleet}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="serviceWeCovrage"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="serviceWeCovrage"
                    placeholder="Service We Covrage"
                    name="ServiceWeCovrage"
                    value={signupInfo.ServiceWeCovrage}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 ">
                  <p className="form-input-title operation-title">
                    License & Insurance
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="businessLicensePermit"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="businessLicensePermit"
                    placeholder="Business License/Permit"
                    name="BusinessLicensePermit"
                    value={signupInfo.BusinessLicensePermit}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="taxInformationNumber"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="taxInformationNumber"
                    placeholder="Tax Information Number"
                    name="TaxInformationNumber"
                    value={signupInfo.TaxInformationNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 mx-auto py-5">
                <button type="submit" className=" btn-create-acc">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
