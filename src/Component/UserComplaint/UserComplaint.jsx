import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./UserComplaint.css";

const UserComplaint = () => {
  const [userComplainData, setUserComplainData] = useState(null);
  const token = localStorage.getItem("token");

  const COMPLAINT_LIST_API_URL = process.env.REACT_APP_COMPLAINT_LIST_API_URL;

  const headers = {
    //  "Content-Type": "application/json",
    token: token,
    type: "superAdmin",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (token) {
        const response = await axios.get(
          COMPLAINT_LIST_API_URL,
          {
            headers: headers,
          }
        );
        console.log("response for ride", response);
        setUserComplainData(response.data.items);
      } else {
        console.log("response fail for ride"); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
