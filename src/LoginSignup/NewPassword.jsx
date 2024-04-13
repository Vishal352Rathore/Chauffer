import React, { useState } from "react";
import "../CssStyle/Resetpassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CssStyle/NewPassword.css";
import logo from "../cab_images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'; 

const NewPassword = () => {
  const URL = "https://chauffer-staging-tse4a.ondigitalocean.app/v1/authRouter/resetPassword";
  const navigate = useNavigate();
  const [reset, setReset] = useState({
    email:"",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setReset({ ...reset, [e.target.name]: e.target.value });
    console.log(reset)
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reset.newPassword !== reset.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
        const newpass = {
            email: localStorage.getItem("email"),
            NewPassword:reset.newPassword
        }
        console.log("newpass",newpass)
        
      const response = await axios.post(URL,newpass);
      const data = response.data;
      console.log("Reset data", data); 
    } 
    catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred. Please try again later.");
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
                <p className="formtitle">Reset Password</p>
                <p className="registered-email">
                  The password should have at least 6 characters and at most 10
                  characters.
                </p>
                <div className="mb-3 mt-3">
                  <label htmlFor="newpassword" className="form-label">
                    New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="newpassword"
                      placeholder=""
                      name="newPassword"
                      value={reset.newPassword}
                      onChange={handleChange}
                      minLength={6}
                      maxLength={10}
                      required
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-none"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="confirmpassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="confirmpassword"
                      placeholder=""
                      name="confirmPassword"
                      value={reset.confirmPassword}
                      onChange={handleChange}
                      minLength={6}
                      maxLength={10}
                      required
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-outline-none"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-dark col-md-12 btn-login"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
