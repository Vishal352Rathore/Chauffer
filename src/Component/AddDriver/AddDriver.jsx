import React, { useState, useEffect } from "react";
import Images from "../Images";
import "./AddDriver.css";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import UseApi from "../../Component/Hooks/UseApi"; // Import the custom hook

const AddDriver = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [isSubmit, setIsSubmit] = useState(false);
  const URL = process.env.REACT_APP_DRIVER_REGISTER_API_URL;

  const [parentElement, setParentElement] = useState(null);

  useEffect(() => {
    setParentElement(document.getElementById("home-container"));
  }, []);

  

  const [driverData, setDriverData] = useState({
    driverProfile: [],
    drivername: "",
    email: "",
    mobile: "",
    address: "",
    experience: "",
    drivingLicence: [],
    governmentid: [],
    other_docs: [],
    superAdminId: "",
    agencyId: "",
  });

  const [selectedFiles, setSelectedFiles] = useState(
    Array.from({ length: 4 }, () => ({ file: null, error: null }))
  );

  const [imagePreviews, setImagePreviews] = useState(
    Array.from({ length: 4 }, () => null)
  );

  const { loading, error, data, callApi } = UseApi(); // Use the custom hook

  console.log("API DATA :",data);

  const handleFileSelect = (event, index) => {
    const files = event.target.files;
    if (files.length === 0) return;

    const file = files[0];
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].file = file;
    updatedFiles[index].error = "";

    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image");

      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index].file = "";
      newSelectedFiles[index].error = "Selected file is not an image";
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
    driverData.driverProfile = selectedFiles[3].file;
    driverData.drivingLicence = selectedFiles[0].file;
    driverData.governmentid = selectedFiles[1].file;
    driverData.other_docs = selectedFiles[2].file;
    driverData.superAdminId = localStorage.getItem("superAdminId");
    driverData.agencyId = localStorage.getItem("agencyId");
    console.log("driverData", driverData);

    const isValid = validationSchema();
    console.log("isValid", isValid);

    if (isValid) {
      DriverRegister();
      setIsLoading(true);
      setIsSubmit(true);
      if (parentElement) {
        parentElement.style.filter = "blur(1.2px)";
      }
    }
  };

  const validationSchema = () => {
    const updatedSelectedFiles = selectedFiles.map((fileObj, index) => {
      if (fileObj.file === null) {
        selectedFiles[index].error = "File is required";
      } else {
        selectedFiles[index].error = null;
      }
      return fileObj;
    });

    setSelectedFiles(updatedSelectedFiles);
    return selectedFiles.every((fileObj) => fileObj.file !== null);
  };

  const DriverRegister = async () => {
    const headers = {
      token: token,
      type: "superAdmin",
    };

    const formData = new FormData();
    formData.append("drivingLicence", driverData.drivingLicence);
    formData.append("email", driverData.email);
    formData.append("drivername", driverData.drivername);
    formData.append("mobile", driverData.mobile);
    formData.append("address", driverData.address);
    formData.append("aadharCard", driverData.governmentid);
    formData.append("otherDocs", driverData.other_docs);
    formData.append("profileImage", driverData.driverProfile);
    formData.append("experience", `${driverData.experience}years`);

    if (localStorage.getItem("superAdminId")) {
      formData.append("superAdminId", driverData.superAdminId);
    } else if (localStorage.getItem("agencyId")) {
      formData.append("agencyId", driverData.agencyId);
    }

    await callApi({
      url: URL,
      method: "POST",
      headers: headers,
      body: formData,
    });

    
    setIsLoading(false);
    setIsSubmit(false);
    if (parentElement) {
      parentElement.style.filter = "blur(0px)";  
    
      const alertShowing = (response) => {
        alert(response.message);
        navigate("/home/allDriver");
    };

      if (data && data.status) {
        console.log("Inside if ")
        alertShowing(data);
        navigate("/home/allDriver");
      } 
      else if (error) {
        console.error("Error:", error);
        alert("Error occurred while registering driver");
      }
    }
      
   

    
  };

 

  return (
    <div className="add-driver">
      <Spinner className={`spinner ${loading ? "isLoading" : ""}`} animation="border" />
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-title margin_top_4 padding_left_20">
              <p>
                Add <span>Driver</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mx-auto">
              {selectedFiles[3].file ? (
                <label htmlFor="FileInput-3">
                  <div className="profile">
                    <div className="profile-preview">
                      <img src={imagePreviews[3] || "#"} alt="images" id="imageProfile" />
                    </div>
                  </div>
                </label>
              ) : (
                <label className="filelabel" htmlFor="FileInput-3">
                  <div className="Profile-upload">
                    <div className="driver-image">
                      <img src={Images("defaultProfile")} alt="not found" />
                    </div>
                    <div className="profile-image">
                      <img src={Images("profile_img")} alt="not found" />
                    </div>
                  </div>
                  {selectedFiles[3].error && selectedFiles[3].error}
                </label>
              )}
              <input
                type="file"
                id="FileInput-3"
                className="FileUpload1"
                onChange={(event) => handleFileSelect(event, 3)}
                name="booking_attachment-3"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row add-driver-form">
            <div className="col-md-6">
              <label htmlFor="drivername">Full Name</label>
              <input
                type="text"
                id="drivername"
                name="drivername"
                placeholder="Driver Name"
                value={driverData.drivername}
                onChange={handleChange}
                required
                pattern="[A-Z][a-z]+\s[A-Z][a-z]+"
                onInvalid={(e) => e.target.setCustomValidity("Please enter full Name")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={driverData.email}
                onChange={handleChange}
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-z]+\.[a-z]{2,}$"
                onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="mobile">Contact No</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter Your Phone NO"
                value={driverData.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                onInvalid={(e) => e.target.setCustomValidity("Please enter 10 digits numeric phone no.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="address">Full Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter Your Address"
                value={driverData.address}
                onChange={handleChange}
                required
                onInvalid={(e) => e.target.setCustomValidity("Please enter your current address.")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
            <div className="col-md-6">
              <div>
                <label htmlFor="experience">Experience in years</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={driverData.experience}
                  onChange={handleChange}
                  placeholder="Enter Your Experience"
                  required
                  pattern="[0-9]{1,2}"
                  maxLength="2"
                  onInvalid={(e) => e.target.setCustomValidity("Please enter a valid experience.")}
                  onInput={(e) => e.target.setCustomValidity("")}
                  min="1"
                  max="100"
                />
              </div>
            </div>
          </div>
          <div className="row add-driver-form">
            <div className="col-md-6">
              <label htmlFor="document">Add Document</label>
            </div>
          </div>
          <div className="row add-driver-form">
            <div className="col-md-4 ">
              <div className="upload-container">
                {selectedFiles[0].file ? (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <img src={imagePreviews[0] || "#"} alt="images" id="imagePreview" />
                    {selectedFiles[0].file.name}
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
              {selectedFiles[0].error && selectedFiles[0].error}
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {selectedFiles[1].file ? (
                  <label className="filelabel" htmlFor="FileInput-1">
                    <img src={imagePreviews[1] || "#"} alt="images" id="imagePreview" />
                    {selectedFiles[1].file.name}
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
              {selectedFiles[1].error && selectedFiles[1].error}
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {selectedFiles[2].file ? (
                  <label className="filelabel" htmlFor="FileInput-2">
                    <img src={imagePreviews[2] || "#"} alt="images" id="imagePreview" />
                    {selectedFiles[2].file.name}
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
              {selectedFiles[2].error && selectedFiles[2].error}
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 add-driver-btn-div">
              <button className={`${isSubmit ? "submitted-btn" : "form-btn"}`} type="submit" disabled={isSubmit}>
                {isSubmit ? "Submitted" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
