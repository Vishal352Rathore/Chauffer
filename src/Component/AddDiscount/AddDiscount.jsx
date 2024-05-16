import React, { useState } from 'react'
import "./AddDiscount.css"


const AddDiscount = () => {

    const [addDiscountData, setAddDiscountData] = useState({
        discountName: "",
        from: "",
        to: "",
        offAmount: "",
        discoutType :""
      });


    const handleChange = (e) => {
        setAddDiscountData({ ...addDiscountData, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
      };
   
  return (
    <div className="add-discount">
    <section className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="all-driver-header">
            <div className="form-title  padding_left_20  ">
              <p>
                Add <span>Discount</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="container">
        <form onSubmit={handleSubmit}>
          <div className="row add-driver-form">
  
            <div className="col-md-6">
              <label htmlfor="discountName" class="form-label">
                Discount Coupon Name
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Discount Coupon Name"
                name="discountName"
                id="discountName"
                value={addDiscountData.discountName}
                onChange={handleChange}
              />
            </div>
            <div class="col-md-6">
              <label htmlfor="vehicleVariant" class="form-label">
                DIscount Offer
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="DIscount Offer"
                name="vehicleVariant"
                id="vehicleVariant"
                value={addDiscountData.vehicleVariant}
                onChange={handleChange}
              />
            </div>
       
            <div class="col-md-6">
              <label htmlfor="From" class="form-label">
                From
              </label>
              <input
                type="date"
                class="form-control"
                placeholder="Discount valid from"
                name="from"
                id="from"
                value={addDiscountData.from}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]} // Set max date to today
                pattern="\d{2}-\d{2}-\d{4}"
                required
              />
            </div>

            <div class="col-md-6">
              <label htmlfor="To" class="form-label">
                To
              </label>
              <input
                type="date"
                class="form-control"
                placeholder="Discount valid till"
                name="To"
                id="To"
                value={addDiscountData.to}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]} // Set max date to today
                pattern="\d{2}-\d{2}-\d{4}"
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please enter Vehicle Last Servicing"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            <div class="col-md-6">
                <div htmlfor="discoutType" class="label">
                  Discount Type
                </div>
                <select
                  class="value"
                  aria-label="Default select example"
                  id="discoutType"
                  name="discoutType"
                  value={addDiscountData.discoutType}
                  onChange={handleChange}
                >
                  <option>Vehicle Discout Type</option>
                  <option value="amount">Amount $</option>
                  <option value="percentage">Percentage %</option>
                </select>
              </div>

            <div class="col-md-6">
              <label htmlfor="offAmount" class="form-label">
               Off Amount
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Off Amount"
                name="offAmount"
                id="offAmount"
                value={addDiscountData.offAmount}
                onChange={handleChange}
              />
            </div>
          </div>
      
         <div className="row  add-driver-form">
            <div className="col-md-4 add-vehicle-btn-div ">
              <button className="form-btn " onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
  </div>
  )
}

export default AddDiscount
