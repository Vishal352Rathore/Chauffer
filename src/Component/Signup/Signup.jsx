import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const URL =
    "https://chauffer-staging-tse4a.ondigitalocean.app/v1/authRouter/signUp";
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    AgencyName: "",
    ContactPerson: "",
    ContactNumber: "",
    PhysicalAddress: "",
    BusinessRegistration: "",
    ContactEmail: "",
    AgencyWebsite: "",
    YearsInOperation: "",
    ServiceWeCovrage: "",
    NumberOfVehiclesInFleet: "",
    BusinessLicensePermit: "",
    TaxInformationNumber: "",
    CompanyTermsAndConditions: "",
  });

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    console.log("signupInfo :" ,signupInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  //  AgencyRegister();
  };

   const AgencyRegister = async () =>{

    try {
      const response = await axios.post(URL, signupInfo);

      if (response.data.subCode === 200) {
        console.log(
          response.data.subCode,
          response.data.message,
          response.data
        );
        toast.success(response.data.message);
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
        ContactPerson: "",
        ContactEmail: "",
        ContactNumber: "",
        PhysicalAddress: "",
        BusinessRegistration: "",
        AgencyWebsite: "",
        YearsInOperation: "",
        ServiceWeCovrage: "",
        NumberOfVehiclesInFleet: "",
        BusinessLicensePermit: "",
        TaxInformationNumber: "",
        CompanyTermsAndConditions: "",
      });
      navigate("/signup");
    } 
    catch (error) {
      console.error("Error:", error);
    }
   }


  return (
    <div className="signup-container">
      <section className="container">
        <div className="row">
          <div className="col-md-4 mx-auto py-5">
            <h1 className="signup-title">Registration</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-9 m-auto">
            <form className="signup-form" onSubmit={handleSubmit}>
            <p className="form-title ">
                Agency Information
                {/* <i className="fa-solid fa-arrow-left"></i> */}
              </p>
              <div className="row">
              
                <div className="col-md-6">
                
                  <label htmlFor="agencyname" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control "
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
                    placeholder="Business Registration"
                    name="BusinessRegistration"
                    value={signupInfo.BusinessRegistration}
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
                <div className="col">
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
                <div className="col">
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
              </div>
              <div className="row">
                <div className="col-md-12 ">
                  <p className="form-title operation-title ">Operation Details</p>
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
                  <p className="form-title operation-title">License & Insurance</p>
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
              <div className="row">
                <div className="col-md-12 ">
                  <p className="form-title operation-title">Additional Information </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    htmlFor="companyTermsAndConditions"
                    className="form-label"
                  ></label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyTermsAndConditions"
                    placeholder="Company Terms And Conditions"
                    name="CompanyTermsAndConditions"
                    value={signupInfo.CompanyTermsAndConditions}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* <p className="termandcondition ">
                By selecting Create account, you agree with Blacklane's 
                <span>Terms & Conditions </span>and<span> policies</span>.
              </p> */}
              <div className="col-md-6 mx-auto py-5">
              <button
                type="submit"
                className=" btn-create-acc"
              >
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
