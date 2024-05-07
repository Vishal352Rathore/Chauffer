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
    vehicleType: "",
    vehicleBrand: "",
    vehicleVariant: "",
    vehicleCapcity: "",
    vehicleColor: "",
    vehicleCharges: "",
    vehicleImagesOne: "",
    vehicleImagesTwo: "",
    vehicleImagesThree: "",
    vehicleNo: "",
    vehicleRegistrationNo: "",
    vehicleChassisNo: "",
    vehicleLastService: "",
    vehicleRcDoc: "",
    vehicleInsuranceDoc: "",
    superAdminId: "",
    agencyId:""
  });
  const [selectedFiles, setSelectedFiles] = useState(
    Array.from({ length: 5 }, () => null)
  );
  const [imagePreviews, setImagePreviews] = useState(
    Array.from({ length: 5 }, () => null)
  );
  const handleFileSelect = (event, index) => {
    const files = event.target.files;
    if (files.length === 0) return;

    const file = files[0];
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = file;
    setSelectedFiles(updatedFiles);

    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image.");
      setSelectedFiles("");
      return;
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
    addVehicleData.vehicleImagesOne =  selectedFiles[0]
    addVehicleData.vehicleImagesTwo = selectedFiles[1];
    addVehicleData.vehicleImagesThree = selectedFiles[2];
    addVehicleData.vehicleRcDoc = selectedFiles[3];
    addVehicleData.vehicleInsuranceDoc = selectedFiles[4];
    addVehicleData.superAdminId = localStorage.getItem("superAdminId");
    addVehicleData.agencyId = localStorage.getItem("agencyId");
    console.log("addVehicleData", addVehicleData);
    AddVehicle();
  };

  const AddVehicle = async () => {
    const headers = {
      headers: {
        token: token,
        type: "superAdmin",
      }
    };

    const myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("type", "superAdmin");

    const formdata = new FormData();
    if(localStorage.getItem("superAdminId") !== null && localStorage.getItem("superAdminId") !== ""){
      formdata.append("superAdminId", addVehicleData.superAdminId); 
    }else if(localStorage.getItem("agencyId") !== null && localStorage.getItem("agencyId") !== ""){
      formdata.append("agencyId", addVehicleData.agencyId); 
    }
    formdata.append("vehicleName", addVehicleData.vehicleType);
    formdata.append("vehicleNoPlate", addVehicleData.vehicleNo);
    formdata.append("vehicleChechisNo", addVehicleData.vehicleChassisNo);
    formdata.append( "vehicleRegistrationNo", addVehicleData.vehicleRegistrationNo );
    formdata.append("vehicleLastServising", addVehicleData.vehicleLastService);
    formdata.append("model", addVehicleData.vehicleVariant);
    formdata.append("brand", addVehicleData.vehicleBrand);
    formdata.append("color", addVehicleData.vehicleColor);
    formdata.append("capacity", addVehicleData.vehicleCapcity);
    formdata.append("vehicleCharges", addVehicleData.vehicleCharges);
    formdata.append("vehicleRCDocument", addVehicleData.vehicleRcDoc);
    formdata.append("vehicleImg", addVehicleData.vehicleImagesOne);
  
    try {
      axios
        .post(URL, formdata, headers)
        .then((response) => {
          console.log("response", response);
          if (response.data.status === true) {
            alert(response.data.message);
            navigate("/home/allVehicle");
          } else {
            alert(response.data.message);
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
              <label htmlfor="vehicleType" class="form-label">
                Vehicle Type
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                id="vehicleType"
                name="vehicleType"
                value={addVehicleData.vehicleType}
                onChange={handleChange}
              >
                <option>Vehicle Select Class</option>
                <option value="Sedan">Sedan</option>
                <option value="HatchBack">HatchBack</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlfor="vehicleBrand" class="form-label">
                Vehicle Brand
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Vehicle Brand"
                name="vehicleBrand"
                id="vehicleBrand"
                value={addVehicleData.vehicleBrand}
                onChange={handleChange}
              />
            </div>
            <div class="col-md-6">
              <label htmlfor="vehicleVariant" class="form-label">
                Vehicle Variant
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Vehicle Variant"
                name="vehicleVariant"
                id="vehicleVariant"
                value={addVehicleData.vehicleVariant}
                onChange={handleChange}
              />
            </div>

            <div class="col-md-6">
              <label htmlfor="vehicleCapcity" class="form-label">
                Capacity
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Vehicle Capacity"
                name="vehicleCapcity"
                id="vehicleCapcity"
                value={addVehicleData.vehicleCapcity}
                onChange={handleChange}
              />
            </div>

            <div class="col-md-6">
              <label htmlfor="vehicleColor" class="form-label">
                Colour
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Vehicles Colour"
                name="vehicleColor"
                id="vehicleColor"
                value={addVehicleData.vehicleColor}
                onChange={handleChange}
              />
            </div>

            <div class="col-md-6">
              <label htmlfor="vehiclesCharges" class="form-label">
                Charges / km
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Vehicle Charges"
                name="vehicleCharges"
                id="vehicleCharges"
                value={addVehicleData.vehicleCharges}
                onChange={handleChange}
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
                {selectedFiles[0] ? (
                  <label className="filelabel" htmlFor="vehicleImage-2">
                    <img
                      src={imagePreviews[0] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[0].name}
                  </label>
                ) : (
                  <div>
                    {" "}
                    <label className="filelabel" htmlFor="FileInput-0">
                      <img
                        src={Images("upload_document_icon")}
                        alt="not-found"
                      />
                      <p>Upload Document</p>
                    </label>
                    <input
                      className="FileUpload1"
                      id="FileInput-0"
                      name="booking_attachment-0"
                      type="file"
                      onChange={(event) => handleFileSelect(event, 0)} // Pass index to handleFileSelect
                    />{" "}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {selectedFiles[1] ? (
                  <label className="filelabel" htmlFor="vehicleImage-2">
                    <img
                      src={imagePreviews[1] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[1].name}
                  </label>
                ) : (
                  <div>
                    <label className="filelabel" htmlFor="FileInput-1">
                      <img
                        src={Images("upload_document_icon")}
                        alt="not-found"
                      />
                      <p>Upload Document</p>
                    </label>
                    <input
                      className="FileUpload1"
                      id="FileInput-1"
                      name="booking_attachment-1"
                      type="file"
                      onChange={(event) => handleFileSelect(event, 1)} // Pass index to handleFileSelect
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="upload-container">
                {selectedFiles[2] ? (
                  <label className="filelabel" htmlFor="vehicleImage-2">
                    <img
                      src={imagePreviews[2] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[2].name}
                  </label>
                ) : (
                  <div>
                    <label className="filelabel" htmlFor="FileInput-2">
                      <p>{selectedFiles[2] && selectedFiles[2].name}</p>
                      <img
                        src={Images("upload_document_icon")}
                        alt="not-found"
                      />
                      <p>Upload Document</p>
                    </label>
                    <input
                      className="FileUpload1"
                      id="FileInput-2"
                      name="booking_attachment-2"
                      type="file"
                      onChange={(event) => handleFileSelect(event, 2)} // Pass index to handleFileSelect
                    />
                  </div>
                )}
              </div>
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
            <div class="col-md-6">
              <label htmlfor="vehicleNo" class="form-label">
                Vehicle Number
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Vehicle Number"
                name="vehicleNo"
                id="vehicleNo"
                value={addVehicleData.vehicleNo}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlfor="vehicleRegistrationNo" class="form-label">
                Vehicle Registration Number
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Vehicle Registration Number"
                name="vehicleRegistrationNo"
                id="vehicleRegistrationNo"
                value={addVehicleData.vehicleRegistrationNo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row  add-driver-form">
            <div class="col-md-6">
              <label htmlfor="vehicleChassisNo" class="form-label">
                Vehicle Chassis Number
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Vehicle Chassis Number"
                name="vehicleChassisNo"
                id="vehicleChassisNo"
                value={addVehicleData.vehicleChassisNo}
                onChange={handleChange}
              />
            </div>
            <div class="col-md-6">
              <label htmlfor="vehicleLastService" class="form-label">
                Vehicle Last Servicing
              </label>
              <input
                type="date"
                class="form-control"
                placeholder=""
                name="vehicleLastService"
                id="vehicleLastService"
                value={addVehicleData.vehicleLastService}
                onChange={handleChange}
                pattern="\d{2}-\d{2}-\d{4}"
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
              <div className="upload-container">
              {selectedFiles[3] ? (
                  <label className="filelabel" htmlFor="vehicleImage-2">
                    <img
                      src={imagePreviews[3] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[3].name}
                  </label>
                ) : ( <div>        
                  <label className="filelabel img-doc" htmlFor="FileInput-3">
                  <p>{selectedFiles[3] && selectedFiles[3].name}</p>
                  <img src={Images("upload_document_icon")} alt="not-found" />
                  <p>Upload Document</p>
                </label>
                <input
                  className="FileUpload1"
                  id="FileInput-3"
                  name="booking_attachment-3"
                  type="file"
                  onChange={(event) => handleFileSelect(event, 3)} // Pass index to handleFileSelect
                />
                </div>)}
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
              <div className="upload-container">
              {selectedFiles[4] ? (
                  <label className="filelabel" htmlFor="vehicleImage-2">
                    <img
                      src={imagePreviews[4] || "#"}
                      alt="images"
                      id="imgpreview"
                    />
                    {selectedFiles[4].name}
                  </label>
                ) : ( <div>
               <label className="filelabel img-doc" htmlFor="FileInput-4">
                  <p>{selectedFiles[4] && selectedFiles[4].name}</p>
                  <img src={Images("upload_document_icon")} alt="not-found" />
                  <p>Upload Document</p>
                </label>
                <input
                  className="FileUpload1"
                  id="FileInput-4"
                  name="booking_attachment-4"
                  type="file"
                  onChange={(event) => handleFileSelect(event, 4)} // Pass index to handleFileSelect
                />
                 </div> )}
              </div>
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
