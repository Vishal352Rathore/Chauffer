import React from "react";
import Images from "../Images";
import './RideDetails.css'

const RideDetails = () => {
  return (
    <div className="ride-detail">
        <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-rides-header">
              <div className="form-title padding_left_20  ">
                <p>
                  All <span>Rides</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <div className="ride-detail-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h4>General Details</h4>
              
              <table>
                <tr>
                  <th>Name</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Email</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Phone</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Ride Distance</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Passengers</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Any children</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Booked by</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Ride status</th>
                  <td></td>
                </tr>
              </table>
               
              <h4>Driver Detail</h4>
            

              <div>
                <img src={Images("defaultProfile")} alt="Not found"/>
              </div>
              <table>
                <tr>
                  <th>Name</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Email</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Phone</th>
                  <td></td>
                </tr>
                </table>
            </div>
            <div className="col-md-6">
              <h4>Billing Details</h4>

              <table>
                <tr>
                  <th>Bill Id</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Date Created </th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Phone</th>
                  <td></td>
                </tr>
                <tr>
                  {" "}
                  <th>Payment method</th>
                  <td></td>
                </tr>
   
              </table>
               
              <h4>Map View</h4>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
