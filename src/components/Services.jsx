import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image1 from "../cab_images/logo.png";
import "../CssStyle/Services.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../cabimages-22/3.jpg";
import Header from "./Header";
import Footer from "../Shared/Footer";

const Services = () => {
  const navigate = useNavigate();

  
  return (
    <div className="services ">
      <section className="bg-image-aboutus w-100%">
      <Header/>
        <section className="container customheader">
          <div className="row">
            <div className="text-content-aboutus">
              <p className="text-heading-first pb-5">Services</p>

            </div>
          </div>
        </section>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="our-services">Our Services</p>
            <p className="our-services-about">
              our aim is to fill a gap in niche market of Trade{" "}
            </p>
          </div>
        </div>
      </section>
      
      <section className="container m-auto ">
        <div className="row p-5">
          <div className="col-md-12  ">
            <div className="container">
              <div className="row p-3">
                <div className="col-md-3 " onClick={()=>navigate('/services/chaufferservices')}>
                  <img
                    src={img1}
                    alt="not found"
                    className="img-size-services"
                  />
                  <p className="img-name-service">chauffer service</p>
                </div>
                <div className="col-md-3 " onClick={()=>navigate('/services/chaufferservices')}>
                  <img
                    src={img1}
                    alt="not found"
                    className="img-size-services"
                  />
                  <p className="img-name-service">Limousin Service</p>
                </div>
                <div className="col-md-3 " onClick={()=>navigate('/services/chaufferservices')}>
                  <img
                    src={img1}
                    alt="not found"
                    className="img-size-services"
                  />
                  <p className="img-name-service">Airport Transfer</p>
                </div>
                <div className="col-md-3 " onClick={()=>navigate('/services/chaufferservices')}>
                  <img
                    src={img1}
                    alt="not found"
                    className="img-size-services"
                  />
                  <p className="img-name-service">Airport Transfer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container container d-flex justify-content-center mb-5 pb-5">
        <div className="row">
          <div className="col-md-12  m-auto ">
            <nav aria-label="Page navigation example">
              <ul class="pagination ">
                <li class="page-item">
                <p class="page-link" onClick={()=>navigate("/login")} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </p>
                </li>
                <li class="page-item">
                  <p class="page-link" onClick={()=>navigate("/login")}>
                    1
                  </p>
                </li>
                <li class="page-item">
                <p class="page-link" onClick={()=>navigate("/login")}>
                    2
                  </p>
                </li>
                <li class="page-item">
                  <p class="page-link" onClick={()=>navigate("/login")}>
                    3
                  </p>
                </li>
                <li class="page-item">
                  <p class="page-link" onClick={()=>navigate("/login")} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </p>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Services;
