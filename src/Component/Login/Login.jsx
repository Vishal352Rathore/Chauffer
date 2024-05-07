import React, { useState,useEffect } from "react";
import "./Login.css";
import Images from "../Images";
import { useNavigate ,Link} from "react-router-dom";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const url = process.env.REACT_APP_ADMIN_LOGIN_API_URL;
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("loginData",loginData);
      const response = await axios.post(url, loginData);
      const res = response.data;
      console.log("API :", res);
      
      if (res.status === true) {
        setLoginData(res);
        localStorage.setItem("token", res.items.token);
        if(res.items.role === "superAdmin"){
          localStorage.setItem("superAdminId", res.items._id);
          localStorage.setItem("agencyId", "");
        }else if(res.items.role === "agency"){
          localStorage.setItem("agencyId", res.items._id);
          localStorage.setItem("superAdminId", "");
        }
        console.log("login successfully", res);
        setLoginData({ email: "", password: "" });
        navigate("/home");
      }
       else{
        alert(res.message)
      }
    } catch (err) {
      console.log("Error :", err.message);
    }
  };
  
  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 set_postion">
            <img src={Images("login_image")} alt="not found" />
            <div className="login-image">
              <h2> Welcome back!</h2>
              <p>you can sign in to access with your existing profile </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="login-form-container">
              <div className="login-form">
                <div>
                  <h2>Log In</h2>
                  {/* <p>
                    Please enter your login information or <br />
                    <a onClick={()=>navigate('/signUp')} href="">click here</a> to
                    register
                  </p> */}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email"></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password"></label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label " for="exampleCheck1">
                      Remember me
                    </label>  
                  
                  </div>
                  <div className="mb-3">
                  <p>
                    Signup as a agency {" "}
                    <Link to="/signup">click here</Link> to
                    register
                  </p>
                  </div>
                  <button type="submit" className="">
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;