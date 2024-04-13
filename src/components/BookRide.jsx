
import React from 'react'
import logo from "../cab_images/logo.png";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MultiStepForm from "./StepBar";
import ServiceClass from './ServiceClass';
import Pickup from './Pickup';
import Payment from './Payment'
import "../CssStyle/StepBar.css";


const CHECKOUT_STEPS = [
    {
      name: "service Class",
      Component: ServiceClass,
    },
    {
      name: "Payment",
      Component: Payment,
    },
    {
      name: "Done",
      Component: () => <div> Your order has been delivered.</div>,
    },
  ];




const BookRide = () => {
  const navigate = useNavigate();


useEffect(() => {
  
  console.log("localStorage.getItem from book ride",localStorage.getItem("category"))

  if (localStorage.getItem("category") === "Airport Transfer") {
    // Add Pickup Info step if condition is true
    CHECKOUT_STEPS.splice(1, 0, {
      name: "Pickup Info",
      Component: Pickup,
    });
  }

}, [])



  return (
    <div className="bookride-container">
      <section className="">
        <div className="row">
          <div className="col-md-12">
            <div className="signup-logo-container">
              <img src={logo} alt="not-found" onClick={() => navigate("/")} />
            </div>
          </div>
        </div>
      </section>


      <section className="row">
          <div className="col-md-12 ">
            <div className="serviceclass">
              <MultiStepForm stepsConfig={CHECKOUT_STEPS} actionIndex ={1}/>
            </div>
          </div>
        </section>

  
    </div>
  );
};

export default BookRide;

