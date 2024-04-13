import React, { useState } from "react";
import "../CssStyle/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import google from "../cabimages-22/google.png";
import facebook from "../cabimages-22/facebook.png";
import logo from "../cab_images/logo.png";
import { useNavigate ,useLocation  } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';



const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: "/" };
  console.log("Redirected from:", location.state);

  const URL = "https://chauffer-staging-tse4a.ondigitalocean.app/v1/authRouter/logIn";
  
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: loginInfo.email,
        password: loginInfo.password
      }
      const response = await axios.post(URL, userData);
      
       localStorage.setItem('token',response.data.items.token);
       localStorage.setItem('email',response.data.items.email);
       localStorage.setItem('user_id',response.data.items.userId);

       
      if (response.data.status == true) {
        console.log("login successfully", response.data); 
        toast.success('Login successful!');
        e.target.reset();
        navigate(from);
        
      } 
      else {
        console.error("Login failed:", response.data);
        toast.error('Login failed. Please check your credentials.');
      }
      setLoginInfo({ email: '', password: '' });
      
      
    } catch (error) {
      console.log("Error in login Data :", error);
      
    }
  };

  return (
    <div className="login-form-contaner mb-auto">
      <section className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="signup-logo-container">
              <img src={logo} alt="not-found" onClick={() => navigate("/")} />
            </div>
          </div>
        </div>
      </section>
      <section className="container ">
        <div className="row ">
          <div className="col-md-8 m-auto pb-5">
            <form className="login-form p-5 text-left" onSubmit={handleSubmit}>
              <p className="formtitle">Welcome to GenAlphaPlus</p>
              <p className="registered-email">
                You'll be able to easily book and manage rides, and get ride
                status updates on the day of travel.
              </p>

              <div className="row">
                <div className="col">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder=""
                    name="email"
                    value={loginInfo.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder=""
                    name="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    maxLength={10}
                  />
                </div>
              </div>
              <div className="row">
                <p
                  className="forgot-password"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot Password?
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-dark col-md-12 btn-login"
                
              >
                Log in
              </button>
              <p className="navi-login">
                New to GenAlphaPlus? <span onClick={() => navigate("/signup")}>Create account</span>
              </p>
              <div className="or-container ">
                <div className="or-parent d-flex justify-content-center align-items-center">
                  <p className="m-auto p-3 text-white w-10 h-10">OR</p>
                </div>
              </div>
              <div className="quickly">
                You can log in quickly with your account.
              </div>
              <div className="btn-container-login">
                <button>
                  <img src={google} alt="not-found" /> Continue with Google
                </button>
                <button>
                  <img src={facebook} alt="not-found" /> Continue with Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
