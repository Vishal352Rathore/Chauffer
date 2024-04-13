import React from "react";
import "../CssStyle/Footer.css";
import logo from "../cab_images/logo.png";
import android from "../cabimages-22/android.png";
import google from "../cab_images/googleAppimg.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div>
      <section className="footer-container">
        <div className="container w-100% ">
          <div className="row ps-3">
            <div className="col-md-3 col-sm-3">
              <div className="logo_container">
                <img src={logo} alt="logo not found" onClick={()=>navigate('/')}/>
              </div>
              <span className="google-img-container">
                <img src={google} alt="not found"/>

              </span>
              <span className="icon-container">
                <span>
                  <i class="fa-brands fa-facebook-f "></i>
                </span>
                <span>
                  <i class="fa-brands fa-twitter "></i>
                </span>
                <span>
                  <i class="fa-brands fa-instagram "></i>
                </span>
                <span>
                  <i class="fa-brands fa-pinterest "></i>
                </span>
                <span>
                  <i class="fa-solid fa-globe "></i>
                </span>
                <span>
                  <i class="fa-brands fa-google "></i>
                </span>
              </span>
            </div>
            <div className="col-md-2 coloumn_ourServices col-sm-3">
              <p className="our_service">Our Services</p>
              <p className="about fontcolor">Airport transfer</p>
              <p className="fontcolor">Limousine service </p>
              <p className="fontcolor">Chauffeur service</p>
            </div>
            <div className="col-md-2 coloumn_ourServices col-sm-3">
              <p className="our_service">About Us</p>
              <p className="about fontcolor">Chauffeurs</p>
              <p className="fontcolor">Blog </p>
              <p className="fontcolor">FAQs</p>
              <p className="fontcolor">Testimonials</p>
              <p className="fontcolor">Terms and Conditions</p>
              <p className="fontcolor">Contact</p>
            </div>
            <div className="col-md-2 coloumn_ourServices col-sm-3">
              <p className="our_service">Our Cars</p>
              <p className="about fontcolor">Mercedes S-Class</p>
              <p className="fontcolor">Mercedes E-Class</p>
              <p className="fontcolor">Rolls-Royce Phontom</p>
              <p className="fontcolor">Bently Mulsanne</p>
              <p className="fontcolor">Mercedes V-Class</p>
              <p className="fontcolor">Range Rover</p>
              <p className="fontcolor">Luxury Minibus</p>
            </div>
            <div className="col-md-3 col-sm-3">
              <div className="row">
                <div className="mobile_container">
                  <div className="mobile_icon" >
                    <i class="fa-solid fa-mobile-screen-button"></i>
                  </div>
                  <div className="app_container">
                    <p className="appStore_text">App Store</p>
                    <p className="available">Available now on the</p>
                  </div>
                </div>
                <div className="mobile_container">
                  <div className="mobile_icon" >
                   <img src={android} alt="not found" className="androidimg"/>
                  </div>
                  <div className="app_container">
                    <p className="appStore_text">Google Play</p>
                    <p className="available">Get it on</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;




    // <div>
    //   <div>
    //     <i class="fa-solid fa-mobile-screen-button"></i>
    //   </div>
    //   <div>
    //     <p>Google Play</p>
    //     <p className="fontcolor">Get it on</p>
    //   </div>
    // </div>

