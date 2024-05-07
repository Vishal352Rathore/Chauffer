import React from "react";
import { useState } from "react";
import "./UserComplaint.css";

const UserComplaint = () => {
  const [userComplainData, setUserComplainData] = useState(null);

  return (
  
      <div className="user-complain-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>User name</th>
                    <th>Ride Id</th>
                    <th>Comp. Date</th>
                    <th>Comp. For</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  {userComplainData &&
                    userComplainData.map((complain) => {
                      return (
                        <tr key={complain._id}>
                          <>
                            <td> {complain._id}</td>
                            <td> {complain.dropLocation}</td>
                            <td>{complain.firstName}</td>
                            <td>{complain.rideType}</td>
                            <td>{complain.status}</td>
                            <td>
                              {complain.date}
                              {complain.time}
                            </td>
                            <td>
                              <input type="checkbox" />
                            </td>
                          </>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default UserComplaint;
