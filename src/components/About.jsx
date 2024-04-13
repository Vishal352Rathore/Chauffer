import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image1 from "../cab_images/logo.png";
import "../CssStyle/About.css";
import "bootstrap/dist/css/bootstrap.min.css";
import aboutus from "../cab_images/taxi-driver-getting-ready-customer 1.png";
import thirdimg from "../cab_images/wqdD.png";
import forma1 from "../cab_images/forma1.png";
import forma2 from "../cab_images/forma2.png";
import forma3 from "../cab_images/forma3.png";
import Header from "./Header";
import Footer from "../Shared/Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="bg-image-aboutus w-100%">
        <Header/>
        <section className="container customheader ">
          <div className="row">
            <div className="text-content-aboutus">
              <p className="text-heading-first">About Us</p>
              <p className="text-heading-two">
                We are the most popular limousine service in New York.
              </p>
            </div>
          </div>
        </section>
      </section>

      <section className="container ps-2">
        <div className="row">
          <p className="story-aboutus">Story About Us</p>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <img src={aboutus} alt="not found" className="col-md-5" />
          <div className="col-md-7">
            <div className="aboutus-para">
              <p className="font-dosis">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                a enim aliquam, condimen-tum nisl a, laoreet lectus. Aliquam
                convallis sed elit nec vehicula. Praesent gravida, massa sit
                amet ullamcorper fringilla, tortor nunc ultrices dui, in
                tristique leo leosed massa.
              </p>
              <p className="font-dosis">
                Quisque et lectus pulvinar, porttitor mi non, elementum dui.
                Morbi mi nisl, tincidunt sed venenatis eget, finibus eu mauris.
                Nullam nisi lacus, feugiat eget varius eget, pellentesque dictum
                odio. Sed sollicitudin viverra est, at aliquam metus ultrices
                id.Duis eu purus vel nisl commodo facilisis vitae ut lectus.
              </p>

              <p className="font-dosis">
                Sed elementum dapibus tellus, a dictum metus interdum ac. Nullam
                condimentum, dui volutpat fringilla molestie, libero tortor
                ultrices lorem, at tempus diam purus non velit. Aliqu-am vel
                nulla eleifend, consequat elit id, tristique massa. Fusce dolor
                velit, blandit ac erat ac, vestibulum ornare diam. Sed
                sollicitudin viverra est, at aliquam metus ultrices id.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="ourcompany-container">
              <p className="ourcompany">Our Company</p>
              <p className="ourcompany-para1">
                Lorem ipsum dolor sit amet, consectetur adipisici elit, sed
                eiusmod tempor incidunt ut labore et dolore magna aliqua. Idque
                Caesaris facere voluntate liceret: sese habere. Magna pars
                studio-rum, prodita quaerimus. Magna pars <br></br>studiorum,
                prodita quaerimus. Fabio vel iudice vincam, sunt in culpa qui
                officia. Vivamus sagittis lacus vel augue laoreet rutrum
                faucibus. Nulla vitae elit libero, a pharetra augue
              </p>
              <p className="ourcompany-para2">
                Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.
                Non equidem invideo, miror magis posuere velit aliquet. Qui
                ipsorum lingua Celtae, nostra Galli appellantur. Prima luce, cum
                quibus mons aliud consensu ab eo. Petierunt uti sibi concilium
                totius Galliae in diem certam indicere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}

      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
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
        <div className="carousel-inner">
          <div class="carousel-item active">
            <img src={thirdimg} class="d-block w-100 slider-img" alt="..." />
            <div class="carousel-caption d-none d-md-block ">
              <section className="container">
                <div className="row mb-4">
                  <span className="col-md-2 text-right font-dosis">
                    <i class="fa-solid fa-quote-left"></i>
                  </span>

                  <div className="col-md-8">
                    <p className="font-dosis ">
                      Some representative placeholder content for the first
                      slide. Lorem ipsum dolor sit, amet consectetur adipisicing
                      elit. Temporibus, repudiandae eligendi? Eum asperiores
                      minus ullam animi, error repellendus distinctio mollitia
                      voluptatum, placeat aperiam voluptate, veniam beatae
                    </p>
                    <p className="font-dosis">
                      Ali Tufan
                      <p className="font-dosis">General Manager coca .co</p>
                    </p>
                  </div>

                  <span className="col-md-2 text-left font-dosis">
                    <i class="fa-solid fa-quote-right"></i>
                  </span>
                </div>
              </section>
            </div>
          </div>
          <div class="carousel-item">
            <img src={thirdimg} class="d-block w-100 slider-img" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <section className="container">
                <div className="row mb-4">
                  <span className="col-md-2 text-right font-dosis">
                    <i class="fa-solid fa-quote-left"></i>
                  </span>

                  <div className="col-md-8">
                    <p className="font-dosis ">
                      Some representative placeholder content for the first
                      slide. Lorem ipsum dolor sit, amet consectetur adipisicing
                      elit. Temporibus, repudiandae eligendi? Eum asperiores
                      minus ullam animi, error repellendus distinctio mollitia
                      voluptatum, placeat aperiam voluptate, veniam beatae
                    </p>
                    <p className="font-dosis">
                      Ali Tufan
                      <p className="font-dosis">General Manager coca .co</p>
                    </p>
                  </div>

                  <span className="col-md-2 text-left font-dosis">
                    <i class="fa-solid fa-quote-right"></i>
                  </span>
                </div>
              </section>
            </div>
          </div>
          <div class="carousel-item">
            <img src={thirdimg} class="d-block w-100 slider-img" alt="..." />
            <div class="carousel-caption d-none d-md-block">
            <section className="container">
                <div className="row mb-4">
                  <span className="col-md-2 text-right font-dosis">
                    <i class="fa-solid fa-quote-left"></i>
                  </span>

                  <div className="col-md-8">
                    <p className="font-dosis ">
                      Some representative placeholder content for the first
                      slide. Lorem ipsum dolor sit, amet consectetur adipisicing
                      elit. Temporibus, repudiandae eligendi? Eum asperiores
                      minus ullam animi, error repellendus distinctio mollitia
                      voluptatum, placeat aperiam voluptate, veniam beatae
                    </p>
                    <p className="font-dosis">
                      Ali Tufan
                      <p className="font-dosis">General Manager coca .co</p>
                    </p>
                  </div>

                  <span className="col-md-2 text-left font-dosis">
                    <i class="fa-solid fa-quote-right"></i>
                  </span>
                </div>
              </section>
            </div>
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
      </div>

      <section className="container mb-5 pb-5">
        <div className="row">
          <div className="col-md-12">
            <p className="about-our-service">Our Services</p>
            <p className="about-our-service-aim">
              Our aim is to fill a gap in niche market of trade{" "}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4   about-our-service-coloumn-forma1">
            <img src={forma1} alt="not found" />
            <p>Limousine Service</p>
          </div>
          <div className="col-md-4   about-our-service-coloumn-forma1">
            <img src={forma2} alt="not found" />
            <p>Chauffer Service</p>
          </div>
          <div className="col-md-4  about-our-service-coloumn about-our-service-coloumn-forma1">
            <img src={forma3} alt="not found" className="forma3" />
            <p>Airport Transfer</p>
          </div>
        </div>
        <div className="row">
          <p className="col-md-4 forma1-para">
            The exclusive way to travel Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Omnis molestias, ea necessitatibus esse
            repellendus eveniet.
          </p>
          <p className="col-md-4 forma1-para">
            Enjoy the comfort of our limousine anf business vans.prepare for
            your next business meeting in peace, or lat your Chauffer show you
            the highlights of the city.
          </p>
          <p className="col-md-4 forma1-para">
            However you may spend your time -you can fully rely on your
            Chauffer. Stay relaxed, and reach your destination safely. Step
            right in and sit back. We will take care of everythings else.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
