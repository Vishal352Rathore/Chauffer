import React, { useState } from "react";
import Images from "../Images";
import "./AddDriver.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDriver = () => {
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_DRIVER_REGISTER_API_URL;

  const token = localStorage.getItem("token");

  const [driverData, setDriverData] = useState({
    drivername: "",
    email: "",
    mobile: "",
    address: "",
    experience: "",
    drivingLicence: [],
    governmentid: [],
    other_docs: [],
    superAdminId: "",
    agencyId : ""
  });

  const [selectedFiles, setSelectedFiles] = useState(
    Array.from({ length: 3 }, () => null)
  );
  const [imagePreviews, setImagePreviews] = useState(
    Array.from({ length: 3 }, () => null)
  );

  const handleFileSelect = (event, index) => {
    const files = event.target.files;
    if (files.length === 0) return;

    const file = files[0];
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;

    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image.");
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = "";
      setSelectedFiles(newSelectedFiles);
      return;
    } else {
      setSelectedFiles(updatedFiles);
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const imageDataUrl = event.target.result;
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = imageDataUrl;
      setImagePreviews(updatedPreviews);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    setDriverData({ ...driverData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    driverData.drivingLicence = selectedFiles[0];
    driverData.governmentid = selectedFiles[1];
    driverData.other_docs = selectedFiles[2];
    driverData.superAdminId = localStorage.getItem("superAdminId");
    driverData.agencyId = localStorage.getItem("agencyId");

    console.log("driverData", driverData);
    DriverRegister();
  };

  const DriverRegister = () => {
    const headers = {
      headers: {
        token: token,
        type: "superAdmin",
      },
    };

    const formdata = new FormData();
    formdata.append("drivingLicence", driverData.drivingLicence);
    formdata.append("email", driverData.email);
    formdata.append("drivername", driverData.drivername);
    formdata.append("mobile", driverData.mobile);
    formdata.append("address", driverData.address);
    formdata.append("aadharCard", driverData.governmentid);
    formdata.append("otherDocs", driverData.other_docs);
    formdata.append("experience", `${driverData.experience}years`);
    if(localStorage.getItem("superAdminId") !== null && localStorage.getItem("superAdminId") !== ""){
      formdata.append("superAdminId", driverData.superAdminId); 
    }else if(localStorage.getItem("agencyId") !== null && localStorage.getItem("agencyId") !== ""){
      formdata.append("agencyId", driverData.agencyId); 
    }

    try {
      axios
        .post(URL, formdata, headers)
        .then((response) => {
          console.log("response", response);
          if (response.data.status === true) {
            alert(response.data.message);
            navigate("/home/allDriver");
          } else {
            alert(response.message);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="add-driver">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-title  margin_top_4 padding_left_20 ">
              <p>
                Add <span>Driver</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="driver-image">
              <img src={Images("defaultProfile")} alt="not found" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row add-driver-form">
            <div className="col-md-6">
              <label for="drivername">Name</label>
              <input
                type="text"
                id="drivername"
                name="drivername"
                placeholder="Name"
                value={driverData.drivername}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={driverData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label for="mobile">Contact No</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Contact no"
                value={driverData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label for="address">Full Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Full address"
                value={driverData.address}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <div>
                <label htmlfor="experience">Experience in years</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={driverData.experience}
                  onChange={handleChange}
                  placeholder="Experience in years"
                />
              </div>
            </div>
          </div>
          <div className="row add-driver-form">
            <div className="col-md-6">
              <label for="document">Add Document</label>
            </div>
          </div>
          <div className="row add-driver-form">
            <div className="col-md-4 ">
              <div className="upload-container">
                {selectedFiles[0] ? (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <img
                      src={imagePreviews[0] || "#"}
                      alt="images"
                      id="imagePreview"
                    />
                    {selectedFiles[0].name}
                  </label>
                ) : (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <img src={Images("upload_document_icon")} alt="not-found" />
                    <p>Upload Document</p>
                    <span>Driving License</span>
                  </label>
                )}
                <input
                  className="FileUpload1"
                  id="FileInput-0"
                  name="booking_attachment-0"
                  type="file"
                  onChange={(event) => handleFileSelect(event, 0)} // Pass index to handleFileSelect
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {selectedFiles[1] ? (
                  <label className="filelabel" htmlFor="FileInput-1">
                    <img
                      src={imagePreviews[1] || "#"}
                      alt="images"
                      id="imagePreview"
                    />
                    {selectedFiles[1].name}
                  </label>
                ) : (
                  <label className="filelabel" htmlFor="FileInput-1">
                    <img src={Images("upload_document_icon")} alt="not-found" />
                    <p>Upload Document</p>
                    <span>Govt Id</span>
                  </label>
                )}
                <input
                  className="FileUpload1"
                  id="FileInput-1"
                  name="booking_attachment-1"
                  type="file"
                  onChange={(event) => handleFileSelect(event, 1)} // Pass index to handleFileSelect
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {selectedFiles[2] ? (
                  <label className="filelabel" htmlFor="FileInput-2">
                    <img
                      src={imagePreviews[2] || "#"}
                      alt="images"
                      id="imagePreview"
                    />
                    {selectedFiles[2].name}
                  </label>
                ) : (
                  <label className="filelabel" htmlFor="FileInput-2">
                    <img src={Images("upload_document_icon")} alt="not-found" />
                    <p>Upload Document</p>
                    <span>Other Doc</span>
                  </label>
                )}
                <input
                  className="FileUpload1"
                  id="FileInput-2"
                  name="booking_attachment-2"
                  type="file"
                  onChange={(event) => handleFileSelect(event, 2)} // Pass index to handleFileSelect
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 add-driver-btn-div">
              <button className="form-btn " type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriver;
