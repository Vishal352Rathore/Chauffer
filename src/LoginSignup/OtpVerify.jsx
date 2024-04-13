import React, { useState } from "react";
import "../CssStyle/Resetpassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../cab_images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OtpVerify = () => {
  const URL =
    "https://chauffer-staging-tse4a.ondigitalocean.app/v1/authRouter/verifyOtp";
  const navigate = useNavigate();
  const [emailverify, setEmailverify] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    setEmailverify({ ...emailverify, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: localStorage.getItem("email"),
        otp: parseInt(emailverify.otp),
      };
      console.log(userData);
      const response = await axios.post(URL, userData);

      if (response.data && response.data.status === true) {
        console.log("Otp verify", response.data);
        toast.success("OTP Verified!");
        navigate("/forgotpassword/otpverify/newpassword");
      } else {
        console.error("OTP verification failed:", response.data);
        toast.error("OTP verification failed. Please check your OTP.");
      }

      setEmailverify({ email: "", otp: "" });
    } catch (error) {
      console.log("Error in login Data :", error);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="signup-logo-container">
              <img src={logo} alt="not-found" onClick={() => navigate("/")} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="reset-form-container">
              <form onSubmit={handleSubmit}>
                <p className="formtitle">
                  {/* <i className="fa-solid fa-arrow-left"></i>  */}
                  OTP Verification
                </p>
                <p className="registered-email">
                  We've sent a One Time Password (OTP) to your Email. Please
                  enter it below.
                </p>
                <div className="mb-3 mt-3">
                  <label htmlFor="otp" className="form-label">
                    Otp
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    placeholder=""
                    name="otp"
                    value={emailverify.otp}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-dark col-md-12 btn-login"
                >
                  Verify your email{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
