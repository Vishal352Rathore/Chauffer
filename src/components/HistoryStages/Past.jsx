import React from 'react'
import axios from "axios";
import AddressFromLatLng from "../AddressFromLatLong";
import { useState, useEffect } from "react";

const Past = () => {
    const URL = "https://chauffer-staging-tse4a.ondigitalocean.app/v1/ride/allRide";
    const token = localStorage.getItem("token");
    const [rideData, setRideData] = useState(null);
  
  
      const headers = {
          "Content-Type": "application/json",
          token: token,
        };
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(URL, {
                method: "GET",
                headers: headers,
              });
              console.error("response for ride", response);
              setRideData(response.data.items);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
          fetchData();
        }, []);
        
  return (
    <div className="ride-history-conainer">
    <div className="container">
      <div className="row">
        <div className="col">
          {rideData &&
            rideData.map((ride) => {
              const [latitude, longitude] = ride.pickUpLocation
                .split(",")
                .map((coord) => parseFloat(coord.trim()));
              const [dropLatitude, dropLongitude] = ride.dropLocation
                .split(",")
                .map((coord) => parseFloat(coord.trim()));
              return (
                <div key={ride._id}>
                  {ride.status === 1 && (
                    <div className="ride-history-block">
                      <p>Pickup location</p>
                      <AddressFromLatLng
                        latitude={latitude}
                        longitude={longitude}
                      />
                      <p>Drop location</p>
                      <AddressFromLatLng
                        latitude={dropLatitude}
                        longitude={dropLongitude}
                      />

                      <p>Amount - {ride.amount}</p>
                      <p>Date - {ride.date}</p>
                      <p>Brand - {ride.brand}</p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Past
