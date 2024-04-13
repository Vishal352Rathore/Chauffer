import { React, useEffect, useState } from "react";
import "../CssStyle/ServiceClass.css";
import "bootstrap/dist/css/bootstrap.min.css";
import car1 from "../cab_images/blackcar1.png";
import family from "../cab_images/familyicon.png";
import bag from "../cab_images/bagicon.png";
import Footer from "../Shared/Footer";
import axios from "axios";

const ServiceClass = ({handleNextButon}) => {
  const URL = "https://chauffer-staging-tse4a.ondigitalocean.app/v1/vehicle/getAllVehicle";
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setVehicleData(response.data.items);
        console.log("response.data.items",response.data.items)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="serviceclass-container">
      <section className="container">
        {/*above code is common in pickup component  */}

        <section className="row">
          { vehicleData?.map((vehicle) => {
            return (
              <div key={vehicle._id} className="col-md-6 ">
                <div className="business-class-container">
                  <div className="car-container">
                    <div>
                      <img src={car1} alt="not found" />
                    </div>
                    <p>Business class</p>
                    <p>{vehicle.brand}</p>
                    <div className="business-class-icon-row">
                      <div>
                        <img src={family} alt="not found" />
                        <span>{vehicle.seatingCapacity}</span>
                      </div>
                      <div>
                        <img src={bag} alt="not found" />
                        <span>{vehicle.maxLaggauge}</span>
                      </div>
                    </div>
                    <p>{vehicle.vehicleFare} USD</p>
                  </div>
                </div>
              </div>
            );
          })}

        </section>

        <section className="row">
          <div className="col-md-12">
            <div className="all-class-include-container">
              <div className="all-class-include font-inter">
                <p>All classes include:</p>
                <ul>
                  <li>Free cancellation up until 1 hour before pickup</li>
                  <li>Free 15 minutes of wait time</li>
                  <li>Meet & Greet</li>
                  <li>Complimentary bottle of water</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="row">
          <div className="col-md-12">
            <div className="please-note-container">
              <div className="please-note-include font-inter">
                <p>Please note:</p>
                <ul>
                  <li>
                    Guest/luggage capacities must be abided by for safety
                    reasons. If you are unsure, select a larger class as
                    chauffeurs may turn down service when they are exceeded.
                  </li>
                  <li>
                    The vehicle images above are examples. You may get a
                    different vehicle of similar quality.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="row  mb-5 pb-5">
          <div className="col-md-3 offset-md-9">
            <button
              className="continue-btn"
              onClick={handleNextButon}
            >
              Continue
            </button>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default ServiceClass;
