import React, { useState } from "react";
import "./AddVehicle.css";
import Images from "../Images";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const token = localStorage.getItem("token");
  const URL = process.env.REACT_APP_VEHICLE_REGISTER_API_URL;
  const navigate = useNavigate();

  
  const [addVehicleData, setAddVehicleData] = useState({
    superAdminId: "",
    vehicleDetails: "", 
    vehicleName:"",
    vehicleClass: "", // changed field name 
    vehicleNoPlate: "",
    vehicleChechisNo: "",
    vehicleRegistrationNo: "",
    vehicleLastServicing:"",
    model:"",//vehicleVariant: "",
    brand: "",
    color: "",
    capacity:"",
    vehicleCharges: "",
    // vehicleImg:"",
    vehicleRCDocument:"",
    vehicleInsuranceDocs:"",
    
    // vehicleCapcity: "",
    
    
    vehicleImagesOne: "",
    vehicleImagesTwo: "",
    vehicleImagesThree: "",
    agencyId: "",
  });

    let vehicleImg = [addVehicleData.vehicleImagesOne , addVehicleData.vehicleImagesTwo , addVehicleData.vehicleImagesThree]

    console.log("Type Of : ",typeof(vehicleImg));
    console.log("vehicleImg :", vehicleImg);
  const [selectedFiles, setSelectedFiles] = useState(
    Array.from({ length: 5 }, () => ({ file: null, error: null }))
  );

  const [imagePreviews, setImagePreviews] = useState(
    Array.from({ length: 5 }, () => null)
  );

  const handleFileSelect = (event, index) => {
    const files = event.target.files;
    if (files.length === 0) return;

    const file = files[0];
    const updatedFiles = [...selectedFiles];
    updatedFiles[index].file = file;
    updatedFiles[index].error = null;

    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image");
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index].file = null;
      newSelectedFiles[index].error = "Selected file is not an image";
      setSelectedFiles(newSelectedFiles);
      return;
    }
    else {
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

  const handleChange = (e) => {
    setAddVehicleData({ ...addVehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicleData.vehicleImagesOne = selectedFiles[0];
    addVehicleData.vehicleImagesTwo = selectedFiles[1];
    addVehicleData.vehicleImagesThree = selectedFiles[2];
    addVehicleData.vehicleRCDocument = selectedFiles[3];
    addVehicleData.vehicleInsuranceDocs = selectedFiles[4];
    addVehicleData.superAdminId = localStorage.getItem("superAdminId");
    addVehicleData.agencyId = localStorage.getItem("agencyId");
    console.log("addVehicleData", addVehicleData);

    let isValid = validationSchema();

    console.log("isValid", isValid);

    if (isValid) {
      AddVehicle();
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

  const AddVehicle = async () => {
    const headers = {
      headers: {
        token: token,
        type: "superAdmin",
      },
    };

    const myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("type", "superAdmin");

    const formdata = new FormData();
    if (
      localStorage.getItem("superAdminId") !== null &&
      localStorage.getItem("superAdminId") !== ""
    ) {
      formdata.append("superAdminId", addVehicleData.superAdminId);
    } else if (
      localStorage.getItem("agencyId") !== null &&
      localStorage.getItem("agencyId") !== ""
    ) {
      formdata.append("agencyId", addVehicleData.agencyId);
    }
    // type
    formdata.append("vehicleType", addVehicleData.vehicleClass)
    formdata.append("vehicleName", addVehicleData.vehicleName);
    formdata.append("vehicleNoPlate", addVehicleData.vehicleNoPlate);
    formdata.append("vehicleChechisNo", addVehicleData.vehicleChechisNo);
    formdata.append("vehicleRegistrationNo",addVehicleData.vehicleRegistrationNo);
    formdata.append("vehicleLastServising", addVehicleData.vehicleLastServicing);
    formdata.append("model", addVehicleData.model);
    formdata.append("brand", addVehicleData.brand);
    formdata.append("color", addVehicleData.color);
    formdata.append("capacity", addVehicleData.capacity);
    formdata.append("vehicleCharges", addVehicleData.vehicleCharges);
    formdata.append("vehicleRCDocument" , addVehicleData.vehicleRCDocument);
    formdata.append("vehicleRCDocuments", addVehicleData.vehicleInsuranceDocs);
    // array
    
    formdata.append("vehicleImg", vehicleImg);

    try {
      axios
        .post(URL, formdata, headers)
        .then((response) => {
          console.log("response", response);
          if (response.data.status === true) {
            alert(response.data.message);
            navigate("/home/allVehicle");
          } else {
            alert(response.message);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="add-vehicle-container">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-title margin_top_4 padding_left_20">
              <p>
                Add <span>Vehicle</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <form onSubmit={handleSubmit}>
          <div className="row add-driver-form">
            <div className="col-md-6">

              <label htmlFor="vehicleType" className="form-label">
                Vehicle Class
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="vehicleType"
                name="vehicleType"
                value={addVehicleData.vehicleType}
                onChange={handleChange}
                required
              >
                <option>Vehicle Select Class</option>
                <option value="Sedan">Sedan</option>
                <option value="HatchBack">HatchBack</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="vehicleBrand" className="form-label">
                Vehicle Brand
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Brand"
                name="vehicleBrand"
                id="vehicleBrand"
                value={addVehicleData.vehicleBrand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="vehicleVariant" className="form-label">
                Vehicle Variant
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Variant"
                name="vehicleVariant"
                id="vehicleVariant"
                value={addVehicleData.vehicleVariant}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="vehicleCapcity" className="form-label">
                Capacity
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Vehicle Capacity"
                name="vehicleCapcity"
                id="vehicleCapcity"
                value={addVehicleData.vehicleCapcity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="vehicleColor" className="form-label">
                Colour
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicles Colour"
                name="vehicleColor"
                id="vehicleColor"
                value={addVehicleData.vehicleColor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="vehiclesCharges" className="form-label">
                Charges / km
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Vehicle Charges"
                name="vehicleCharges"
                id="vehicleCharges"
                value={addVehicleData.vehicleCharges}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row  add-driver-form">
            <div className="col-md-12">
              <label for="document">Add Car Images</label>
            </div>
          </div>
          <div className="row  add-driver-form">
            <div className="col-md-4">
              <div className="upload-container">
                {selectedFiles[0].file ? (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <img
                      src={imagePreviews[0] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[0].file.name}
                  </label>
                ) : (
                  <label className="filelabel" htmlFor="FileInput-0">
                    <img src={Images("upload_document_icon")} alt="not-found" />
                    <p>Upload Document</p>
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
              {selectedFiles[0].error && (
                <p className="error-message">{selectedFiles[0].error}</p>
              )}
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {selectedFiles[1].file ? (
                  <label className="filelabel" htmlFor="FileInput-1">
                    <img
                      src={imagePreviews[1] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[1].file.name}
                  </label>
                ) : (
                  <label className="filelabel" htmlFor="FileInput-1">
                    <img src={Images("upload_document_icon")} alt="not-found" />
                    <p>Upload Document</p>
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
              {selectedFiles[1].error && (
                <p className="error-message">{selectedFiles[1].error}</p>
              )}
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {selectedFiles[2].file ? (
                  <label className="filelabel" htmlFor="FileInput-2">
                    <img
                      src={imagePreviews[2] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[2].file.name}
                  </label>
                ) : (
                  <label className="filelabel" htmlFor="FileInput-2">
                    <p>{selectedFiles[2].file && selectedFiles[2].file.name}</p>
                    <img src={Images("upload_document_icon")} alt="not-found" />
                    <p>Upload Document</p>
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
              {selectedFiles[2].error && (
                <p className="error-message">{selectedFiles[2].error}</p>
              )}
            </div>
          </div>
          <div className="row  add-driver-form">
            <div className="col-md-12">
              <div className="vehicleDetail">
                <p className="vehicle-details">Vehicle Details</p>
              </div>
            </div>
          </div>

          <div className="row  add-driver-form">
            <div className="col-md-6">
              <label htmlFor="vehicleNo" className="form-label">
                Vehicle Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Number"
                name="vehicleNo"
                id="vehicleNo"
                value={addVehicleData.vehicleNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="vehicleRegistrationNo" className="form-label">
                Vehicle Registration Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Registration Number"
                name="vehicleRegistrationNo"
                id="vehicleRegistrationNo"
                value={addVehicleData.vehicleRegistrationNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row  add-driver-form">
            <div className="col-md-6">
              <label htmlFor="vehicleChassisNo" className="form-label">
                Vehicle Chassis Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Chassis Number"
                name="vehicleChassisNo"
                id="vehicleChassisNo"
                value={addVehicleData.vehicleChassisNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="vehicleLastService" className="form-label">
                Vehicle Last Servicing
              </label>
              <input
                type="date"
                className="form-control"
                placeholder=""
                name="vehicleLastService"
                id="vehicleLastService"
                value={addVehicleData.vehicleLastService}
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
          </div>
          <div className="row  add-driver-form">
            <div className="col-md-6">
              <div className="vehicleregdoc">
                <label htmlFor="VehicleRegDoc">Vehicle RC Document</label>
                <div className="add-btn">
                  <button>Add+</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="vehicleregdoc">
                <label htmlFor="VehicleRegDoc">
                  Vehicle Insurance Document
                </label>

                <div className="add-btn">
                  <button>Add+</button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="upload-container">
                {selectedFiles[3].file ? (
                  <label className="filelabel" htmlFor="FileInput-3">
                    <img
                      src={imagePreviews[3] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[3].file.name}
                  </label>
                ) : (
                  <label className="filelabel img-doc" htmlFor="FileInput-3">
                    <p>{selectedFiles[3].file && selectedFiles[3].file.name}</p>
                    <img src={Images("upload_document_icon")} alt="not-found" />
                    <p>Upload Document</p>
                  </label>
                )}
                <input
                  className="FileUpload1"
                  id="FileInput-3"
                  name="booking_attachment-3"
                  type="file"
                  onChange={(event) => handleFileSelect(event, 3)} // Pass index to handleFileSelect
                />
              </div>
              {selectedFiles[3].error && (
                <p className="error-message">{selectedFiles[3].error}</p>
              )}
            </div>

            <div className="col-md-6">
              <div className="upload-container">
                {selectedFiles[4].file ? (
                  <label className="filelabel" htmlFor="FileInput-4">
                    <img
                      src={imagePreviews[4] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[4].file.name}
                  </label>
                ) : (
                  <label className="filelabel img-doc" htmlFor="FileInput-4">
                    <p>{selectedFiles[4].file && selectedFiles[4].file.name}</p>
                    <img src={Images("upload_document_icon")} alt="not-found" />
                    <p>Upload Document</p>
                  </label>
                )}
                <input
                  className="FileUpload1"
                  id="FileInput-4"
                  name="booking_attachment-4"
                  type="file"
                  onChange={(event) => handleFileSelect(event, 4)} // Pass index to handleFileSelect
                />
              </div>
              {selectedFiles[4].error && (
                <p className="error-message">{selectedFiles[4].error}</p>
              )}
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
  );
};

export default AddVehicle;
