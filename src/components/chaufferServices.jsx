import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image1 from "../cab_images/logo.png";
import img1 from "../cab_images/01.jpg";
import pdf from "../cab_images/download.png";
import address from "../cab_images/address.png";
import phone from "../cab_images/phone.png";
import email from "../cab_images/email.png";
import "../CssStyle/ChaufferServices.css";

const ChaufferServices = () => {
  const navigate = useNavigate();
  return (
    <div className="chaufferservices">
      <section className="bg-image-aboutus w-100%">
        <nav class="navbar navbar-expand-sm  navbar-dark">
          <div class="container customheader">
            <img src={image1} alt="not found" className="logo" onClick={()=>navigate('/')}/>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarsFurni">
              <ul class="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0 custom-menu ">
                <li class="nav-item">
                  <NavLink to="/" class="nav-link active">
                    Home
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/about" class="nav-link">
                    About Us
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/help" class="nav-link">
                    Help
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/services" class="nav-link">
                    Services
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/cities" class="nav-link">
                    Cities
                  </NavLink>
                </li>
                <li class="nav-item">
                  <button
                    class="sign-in-btn"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <section className="container customheader">
          <div className="row">
            <div className="text-content-aboutus">
              <p className="text-heading-first pb-5">Chauffer Services</p>
            </div>
          </div>
        </section>
      </section>

      <section className="container pt-5 customwidth">
        <div className="row">
          <div className="col-md-8">
            {/* Carousel */}

            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div class="carousel-item active">
                  <img src={img1} class="d-block servicecar w-100" alt="..." />
                  <div class="carousel-caption d-none d-md-block "></div>
                </div>
                <div class="carousel-item">
                  <img src={img1} class="d-block servicecar w-100" alt="..." />
                  <div class="carousel-caption d-none d-md-block"></div>
                </div>
                <div class="carousel-item">
                  <img src={img1} class="d-block servicecar w-100" alt="..." />
                  <div class="carousel-caption d-none d-md-block"></div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
            </div>

            <div className="pt-5">
              <div className="chauffer-service">
                <p className="chauffer-service-title">Chauffer Service </p>
                <p className="chauffer-service-subtitle">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam id fugiat deserunt! Similique inventore minus
                  molestias minima, deserunt ratione eligendi? Ipsam nulla
                  pariatur ad porro exercitationem fugit nam. molestias minima,
                  deserunt ratione eligendi? Ipsam nulla Veritatis, culpa!
                </p>
              </div>
            </div>
            <div className="pt-5">
              <div className="chauffer-service">
                <p className="chauffer-service-title">Project Mission</p>
                <p className="chauffer-service-subtitle">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam id fugiat deserunt! Similique inventore minus
                  molestias minima, deserunt ratione eligendi? Ipsam nulla
                  pariatur ad porro exercitationem fugit nam. molestias minima,
                  deserunt ratione eligendi? Ipsam nulla Veritatis, culpa!
                </p>
                <p className="chauffer-service-subtitle">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam id fugiat deserunt! Similique inventore minus
                  molestias minima, deserunt ratione eligendi? Ipsam nulla
                  pariatur ad porro exercitationem fugit nam. molestias minima,
                  deserunt ratione eligendi? Ipsam nulla Veritatis, culpa!
                </p>
                <p className="chauffer-service-subtitle">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam id fugiat deserunt! Similique inventore minus
                  molestias minima, deserunt ratione eligendi? Ipsam nulla
                  pariatur ad porro exercitationem fugit nam. molestias minima,
                  deserunt ratione eligendi? Ipsam nulla Veritatis, culpa!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="diffservices  pt-4 pb-4">
              <ul
                title="Service"
                style={{
                  listStyleType: "none",
                  textAlign: "left",
                  fontSize: "25px",
                  color: " #1E1E1E;",
                }}
              >
                <li>
                  <span
                    className="pe-3"
                    style={{ color: "rgb(235, 225, 175)" }}
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                  </span>
                  Bussiness Class
                </li>
                <li>
                  <span
                    className="pe-3"
                    style={{ color: "rgb(235, 225, 175)" }}
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                  </span>
                  Promo
                </li>
                <li>
                  <span
                    className="pe-3"
                    style={{ color: "rgb(235, 225, 175)" }}
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                  </span>
                  Airport transport
                </li>
                <li>
                  <span
                    className="pe-3"
                    style={{ color: "rgb(235, 225, 175)" }}
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                  </span>
                  Chauffer Service
                </li>
                <li>
                  <span
                    className="pe-3"
                    style={{ color: "rgb(235, 225, 175)" }}
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                  </span>
                  Weddings
                </li>
                <li>
                  <span
                    className="pe-3"
                    style={{ color: "rgb(235, 225, 175)" }}
                  >
                    <i class="fa-solid fa-arrow-right"></i>
                  </span>
                  Parties
                </li>
              </ul>
            </div>
            <div className="pt-4">
              <div className="pt-2 ps-3  pe-3" style={{ backgroundColor: "#1e1e1e" ,borderRadius:"1.4%",display:"flex",justifyContent:"space-between"}} >
                <div className="text-start" >
                  <strong style={{ color: "#fff" }}>
                    Address
                   </strong> 
                    <p style={{ color: "#ccc" }}>
                      329,shubash marg ,North Himachal,India
                    </p>
                    
                </div>
                <img src={address} alt="not found" className="address-img ps-2 pe-3 pt-2 pb-2"/>  
              </div>
            </div>
             <div className="pt-2">
              <div
                className="pt-2 ps-3  pe-3" style={{ backgroundColor: "#1e1e1e" ,borderRadius:"1.4%",display:"flex",justifyContent:"space-between"}}
              >
                <div className="text-start" >
                  <strong style={{ color: "#fff" }}>
                    Phone
                    </strong> 
                    <p style={{ color: "#ccc" }}>
                      9956592348
                      </p>
                    
                    </div>
                    <img src={phone} alt="not found" className="phone-img ps-3 pe-3 pt-2"/>  
                  </div>
            </div>
            <div className="pt-2">
              <div
                  className="pt-2 ps-3 pe-3" style={{ backgroundColor: "#1e1e1e" ,borderRadius:"1.4%",display:"flex",justifyContent:"space-between"}}
                >
                <div className="text-start" >
                  <strong style={{ color: "#fff" }}>
                    Email
                    </strong> 
                    <p style={{ color: "#ccc" }}>
                      info@prodrive.com
                    </p>
                </div>
                <img src={email} alt="not found" className="email-img ps-3 pe-3 pt-2 pb-1"/>  
              </div>
            </div>
            
            <div className="pt-2">
              <div
                  className="pt-3 ps-2 pb-2 pe-3" style={{ backgroundColor: "#1e1e1e" ,borderRadius:"1.4%",}}
                >
                <div className="text-start"  style={{display:"flex",justifyContent:"space-between"}}>
                  <strong style={{ color: "#fff" }}>
                    Download PDF brochure
                    </strong> <img src={pdf} alt="not found" className="pdf-img ps-3 pe-3 pt-1 pb-1"/>
                </div>
                
              </div>
            </div> 
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChaufferServices;
