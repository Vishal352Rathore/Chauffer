import React, { useState ,useEffect } from "react";
import "../CssStyle/Payment.css";
import card from "../cab_images/cards.png";
import Footer from "../Shared/Footer";
import { useNavigate } from "react-router-dom";
 import { useSelector ,useDispatch } from 'react-redux'
 import { updatePaymentData } from "../Actions/actions.js";


const PaymentCard = ({handleNextButon ,handlePreviousButton}) => {
  const navigate = useNavigate();
  const paymentDetailFromRedux = useSelector((state) => state.paymentDetailReducer);
  const dispatch = useDispatch();

  const [paymentDetails, setPaymentDetails] = useState({
    nameofcard: "",
    cardnumber: "",
    expirationdate: "",
    cvv: "",
  });

  useEffect(() => {
    setPaymentDetails(paymentDetailFromRedux);
  }, [paymentDetailFromRedux]);

  const isUserLogin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) {
        console.log("user is logined",paymentDetails)
        dispatch(updatePaymentData(paymentDetails))
        handleNextButon();
      } else {
        dispatch(updatePaymentData(paymentDetails))
        navigate("/login", { state: { from: "/services/bookride" } })
        console.log("user is not login")
      }
       
    } catch (error) {
      console.log("Error in login Data :", error); 
    }
  };

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };


  return (
    <div className="payment-container ">
      <section className="container">

        {/* Add credit card form */}

        <section className="row mb-5 pb-5">
          <div
            className="col-md-12"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p className="add-credit-card-form-title">Add credit card</p>
            <form className="add-credit-card-form">
              <div className="mb-3 mt-3">
                <label htmlFor="nameofcard" className="form-label">
                  Name of card
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameofcard"
                  name="nameofcard"
                  value={paymentDetails.nameofcard}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="cardnumber" className="form-label">
                  Card Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="cardnumber"
                  name="cardnumber"
                  value={paymentDetails.cardnumber}
                  onChange={handleChange}
                />
                <span>
                  <img src={card} alt="not found" />
                </span>

                {/* <img src=" " alt="not found" /> */}

                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <label htmlFor="expdate" className="form-label">
                      Expiration date *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="expirationdate"
                      name="expirationdate"
                      value={paymentDetails.expirationdate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <label htmlFor="cvv" className="form-label">
                      CVV *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="savecardtolist">
                      <i className="fa-solid fa-square-check"></i> Save card to
                      your list
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <ul
                      className="instruction"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <li>
                        Our servers are encrypted with TLS/SSL to ensure
                        security and privacy.
                      </li>
                      <li>
                        The amount will be held from your selected payment
                        method after the booking. We only charge you after the
                        ride is
                        <br></br>
                        finished.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
            
          </div>
          <div className="row d-flex justify-content-between ">
              <div className="col-md-3 col-sm-6">
                <button className="pay-skip-pickup-btn"
                  onClick={handlePreviousButton}
                >
                  Skip pickup info
                </button>
              </div>
              <div className="col-md-3 col-sm-6">
                <button className="pay-continue-btn" onClick={isUserLogin}>Continue</button>
              </div>
            </div>
        </section>

      </section>
      <Footer/>
    </div>
  );
};

export default PaymentCard;
