import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image1 from "../cab_images/logo.png";
import "../CssStyle/TermsandCondition.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Shared/Footer";

const TermsAndCondition = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="bg-image-termsandcondition">
        <nav
          className="custom-navbar navbar navbar navbar-expand-md navbar-dark "
          arial-label="Furni navigation bar"
        >
          <div className="container">
            <img src={image1} alt="not found" className="logo" onClick={()=>navigate('/')}/>

            <div className="collapse navbar-collapse" id="navbarsFurni">
              <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0 custom-menu ">
                <li className="nav-item ">
                  <NavLink to="/" className="nav-link active">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/help" className="nav-link">
                    Help
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/services" className="nav-link">
                    Services
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/citiesandclasses" className="nav-link">
                    Cities and classNamees
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="sign-in-btn">Sign In</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <section className="container">
          <div className="row">
            <div className="text-content-aboutus">
              <p className="text-heading-first">Terms & Conditions</p>
            </div>
          </div>
        </section>
      </section>

      <section className="container mb-5 pb-5">
        <div className="row">
          <div className="col-md-12">
            <p className="termsandcondition">Lorem Ipsum is simply dummy</p>
            <p className="termsandcondition-para">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default TermsAndCondition;
