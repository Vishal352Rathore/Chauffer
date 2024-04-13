import React from 'react'
import image1 from "../cab_images/logo.png";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";


const Header = () => {

    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (isLogin) {
          localStorage.removeItem("token");
          setIsLogin(false);
        } else {
          navigate("./login");
        }
      };

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container customheader">
            <a className="navbar-brand" href="/">
              <img
                src={image1}
                alt="not found"
                className="logo"
                // onClick={() => navigate("/")}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={"/history"}>
                    History
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/help">
                    Help
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/services">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cities">
                    Cities
                  </a>
                </li>
                <li className="nav-item">
                  <button className="sign-in-btn" onClick={handleLogin}>
                    {isLogin ? "Logout" : "Sign In"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Header
