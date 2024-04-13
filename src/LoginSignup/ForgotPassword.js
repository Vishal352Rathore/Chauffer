import React, { useState } from "react";
import "../CssStyle/Resetpassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../cab_images/logo.png"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const URL = "https://chauffer-staging-tse4a.ondigitalocean.app/v1/authRouter/forgotPassword"
  const [verify ,setVerify] = useState({
    email:''
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) =>{
    setVerify({...verify, [e.target.name]  : e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const emailVerify = {
        email: verify.email
      };
    
      const response = await axios.post(URL, emailVerify);
      const data = response.data;
      console.log(data);

      if (response.data.status) {
        toast.success(response.data.message);
        localStorage.setItem("email", verify.email);
        navigate("/forgotpassword/otpverify");
      } else {
        toast.error(response.data.message);
      }
    } catch(err) {
      console.error("Error:", err.message);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="reset-password-container">
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="signup-logo-container">
              <img src={logo} alt="not-found" onClick={() => navigate('/')} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="reset-form-container">
              <form onSubmit={handleSubmit}>
                <p className="formtitle">Request password reset</p>
                <p className="registered-email">
                  If you have a registered email, you will receive a reset link.
                </p>
                <div className="mb-3 mt-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder=""
                    name="email"
                    value={verify.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-dark col-md-12 btn-login"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Verifying...' : 'Verify your email'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
