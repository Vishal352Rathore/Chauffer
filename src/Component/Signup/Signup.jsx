import React, { useState } from "react";
import "./Signup.css";
import Images from "../Images";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
const libraries = ["places"];

const Signup = () => {
  const [selectedFiles, setSelectedFiles] = useState("");
  const YOUR_GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    uploadDocument: "",
    city: "",
    zipCode: "",
  });
  const url = process.env.REACT_APP_AGENCY_REGISTER_API_URL;



  const handlePlaceSelect = (place, name) => {
    setSignupData((signupData) => ({
      ...signupData,
      [name]: place.formatted_address,
    }));
    // const { lat, lng } = place.geometry.location;
    // setCoordinates(prevCoordinates =>({...prevCoordinates , [name] : `${lat()},${lng()}` }))
    // console.log('Coordinates:name', `${name} ${lat()},${lng()}` );
    console.log("Selected place:", place.formatted_address);
  };

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signupData.uploadDocument = selectedFiles;
    console.log("signupData", signupData);
    addAgent();
  };

  const addAgent = async () => {
    const formdata = new FormData();
    formdata.append("name", signupData.name);
    formdata.append("email", signupData.email);
    formdata.append("password", signupData.password);
    formdata.append("mobile", signupData.mobile);
    formdata.append("uploadDocument", signupData.uploadDocument);
    formdata.append("city", signupData.city);
    formdata.append("zipCode", signupData.zipCode);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
       await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === true) {
            console.log("Agency added successfully", result);
            alert(result.message);
            navigate("/login");
          } else {
            alert(result.message);
          }
        })
        .catch((error) => console.error("error", error));

    } catch (err) {
      console.log("Error :", err.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 set_postion">
            <img src={Images("login_image")} alt="not found" />
            <div className="signup-image">
              <h2>Welcome back!</h2>
              <p>You can sign in to access with your existing profile</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="signup-form-container">
              <div className="signup-form">
                <div className="signup-heading-container">

                <div className="signup-heading">
                  <h2>Chaffer Agency Registration</h2>
                  <p>
                    Please enter your Registeration information or <br />
                    <Link to="/login">click here</Link> to Login
                  </p>
                </div>
                </div>
                <form onSubmit={handleSubmit} className="signup-container">
                  <div className="mb-3">
                    <label htmlFor="name"></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                      value={signupData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email"></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      value={signupData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile"></label>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      id="mobile"
                      name="mobile"
                      placeholder="Contact number"
                      value={signupData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="file-upload-container">
                      <div>{selectedFiles && selectedFiles.name}</div>
                      <input
                        className="FileUpload1"
                        id="FileInput-0"
                        name="booking_attachment-0"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password"></label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Please enter password"
                      value={signupData.password}
                      onChange={handleChange}
                      pattern="[0-9]*"
                    />
                  </div>
                  <div className="mb-3">
                    <LoadScript
                      googleMapsApiKey={YOUR_GOOGLE_MAPS_API_KEY}
                      libraries={libraries}
                    >
                      <Autocomplete
                        onLoad={(autocomplete) => {
                          autocomplete.addListener("place_changed", () =>
                            handlePlaceSelect(autocomplete.getPlace(), "city")
                          );
                        }}
                      >
                        <div className="input-div">
                          <label htmlfor="vehicleClass"></label>
                          <input
                            type="text"
                            placeholder="Please select city"
                            id="city"
                            name="city"
                            value={signupData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </Autocomplete>
                    </LoadScript>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="zipCode"></label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={signupData.zipCode}
                      onChange={handleChange}
                      pattern="[0-9]*"
                    />
                  </div>
                  <button type="submit" className="">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
