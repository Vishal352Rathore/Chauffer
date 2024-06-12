import React, { useState, useEffect } from "react";
import "./AddVehicle.css";
import Images from "../Images";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const AddVehicle = () => {
  const token = localStorage.getItem("token");
  const URL = process.env.REACT_APP_VEHICLE_REGISTER_API_URL;
  const UN_ALLOTED_DRIVER_URL = process.env.REACT_APP_UNALLOTED_DRIVER_API_URL;
  const VEHICLE_UPDATE_URL = process.env.REACT_APP_VEHICLE_UPDATE_API_URL;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [parentElement, setParentElement] = useState(null);

  const location = useLocation();
  const { vehicleData } = location.state === null ? null : location.state;

  const [unAllotedDrivers, setUnAllotedDrivers] = useState(null);

  useEffect(() => {
    setParentElement(document.getElementById("home-container"));
  }, []);

  const [addVehicleData, setAddVehicleData] = useState({
    vehicleType: "",
    brand: "",
    model: "",
    capacity: "",
    color: "",
    vehicleCharges: "",
    vehicleImagesOne: "",
    vehicleImagesTwo: "",
    vehicleImagesThree: "",
    vehicleNoPlate: "",
    vehicleRegistrationNo: "",
    vehicleChechisNo: "",
    vehicleLastServising: "",
    vehicleRCDocument: "",
    vehicleInsuranceDocs: "",
    superAdminId: "",
    agencyId: "",
    driverId: "",
  });

  useEffect(() => {
    if (vehicleData) {
      setAddVehicleData((prevState) => ({
        ...prevState,
        ...vehicleData,
      }));

      FileSetUp();
    }
  }, [vehicleData]);

  const FileSetUp = () => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[0].file = vehicleData.vehicleImg[0];
    newSelectedFiles[1].file = vehicleData.vehicleImg[1];
    newSelectedFiles[2].file = vehicleData.vehicleImg[2];
    newSelectedFiles[3].file = vehicleData.vehicleRCDocument;
    newSelectedFiles[4].file = vehicleData.vehicleInsuranceDocs;

    setSelectedFiles(newSelectedFiles);

    const updatedPreviews = [...imagePreviews];
    updatedPreviews[0] = vehicleData.vehicleImg[0];
    updatedPreviews[1] = vehicleData.vehicleImg[1];
    updatedPreviews[2] = vehicleData.vehicleImg[2];
    updatedPreviews[3] = vehicleData.vehicleRCDocument;
    updatedPreviews[4] = vehicleData.vehicleInsuranceDocs;

    setImagePreviews(updatedPreviews);
  };

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

  const handleChange = (e) => {
    setAddVehicleData({ ...addVehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicleData.vehicleImagesOne = selectedFiles[0].file;
    addVehicleData.vehicleImagesTwo = selectedFiles[1].file;
    addVehicleData.vehicleImagesThree = selectedFiles[2].file;
    addVehicleData.vehicleRCDocument = selectedFiles[3].file;
    addVehicleData.vehicleInsuranceDocs = selectedFiles[4].file;
    addVehicleData.superAdminId = localStorage.getItem("superAdminId");
    addVehicleData.agencyId = localStorage.getItem("agencyId");
    console.log("addVehicleData", addVehicleData);

    let isValid = validationSchema();

    console.log("isValid", isValid);

    if (isValid) {
      vehicleData === null ? AddVehicle() : EditVehicle();
      setIsLoading(true);
      setIsSubmit(true);
      if (parentElement) {
        parentElement.style.filter = "blur(1.2px)";
        parentElement.style.pointerEvents = "none";
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

  const AddVehicle = async () => {
    const headers = {
      headers: {
        token: token,
        type: "superAdmin",
      },
    };

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
    formdata.append("vehicleName", addVehicleData.vehicleType);
    formdata.append("vehicleType", addVehicleData.vehicleType);
    formdata.append("vehicleNoPlate", addVehicleData.vehicleNoPlate);
    formdata.append("vehicleChechisNo", addVehicleData.vehicleChechisNo);
    formdata.append(
      "vehicleRegistrationNo",
      addVehicleData.vehicleRegistrationNo
    );
    formdata.append(
      "vehicleLastServising",
      addVehicleData.vehicleLastServising
    );
    formdata.append("model", addVehicleData.model);
    formdata.append("brand", addVehicleData.brand);
    formdata.append("color", addVehicleData.color);
    formdata.append("capacity", addVehicleData.capacity);
    formdata.append("vehicleCharges", addVehicleData.vehicleCharges);
    formdata.append("vehicleRCDocument", addVehicleData.vehicleRCDocument);
    formdata.append("vehicleImg", addVehicleData.vehicleImagesOne);
    formdata.append("vehicleImg", addVehicleData.vehicleImagesTwo);
    formdata.append("vehicleImg", addVehicleData.vehicleImagesThree);
    formdata.append(
      "vehicleInsuranceDocs",
      addVehicleData.vehicleInsuranceDocs
    );
    formdata.append("driverId", addVehicleData.driverId);

    console.log([...formdata.entries()]);
    try {
      axios
        .post(URL, formdata, headers)
        .then((response) => {
          console.log("response", response);
          if (response.data.status === true) {
            setIsLoading(false);
            setIsSubmit(false);
            if (parentElement) {
              parentElement.style.filter = "blur(0px)";
              parentElement.style.pointerEvents = "auto";
            }
            alert(response.data.message);
            navigate("/home/allVehicle");
          } else {
            setIsLoading(false);
            setIsSubmit(false);
            if (parentElement) {
              parentElement.style.filter = "blur(0px)";
              parentElement.style.pointerEvents = "auto";
            }
            alert(response.data.message);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setIsSubmit(false);
          if (parentElement) {
            parentElement.style.filter = "blur(0px)";
            parentElement.style.pointerEvents = "auto";
          }
          console.log(error);
        });
    } catch (error) {
      setIsLoading(false);
      setIsSubmit(false);
      if (parentElement) {
        parentElement.style.filter = "blur(0px)";
        parentElement.style.pointerEvents = "auto";
      }
      console.log("error", error);
    }
  };

  const EditVehicle = async () => {
    console.log("EditVehicle");
    const headers = {
      headers: {
        token: token,
        type: "superAdmin",
      },
    };

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
    formdata.append("vehicleName", addVehicleData.vehicleType);
    formdata.append("vehicleType", addVehicleData.vehicleType);
    formdata.append("vehicleNoPlate", addVehicleData.vehicleNoPlate);
    formdata.append("vehicleChechisNo", addVehicleData.vehicleChechisNo);
    formdata.append(
      "vehicleRegistrationNo",
      addVehicleData.vehicleRegistrationNo
    );
    formdata.append(
      "vehicleLastServising",
      addVehicleData.vehicleLastServising
    );
    formdata.append("model", addVehicleData.model);
    formdata.append("brand", addVehicleData.brand);
    formdata.append("color", addVehicleData.color);
    formdata.append("capacity", addVehicleData.capacity);
    formdata.append("vehicleCharges", addVehicleData.vehicleCharges);
    formdata.append("vehicleRCDocument", addVehicleData.vehicleRCDocument);
    formdata.append("vehicleImg", addVehicleData.vehicleImagesOne);
    formdata.append("vehicleImg", addVehicleData.vehicleImagesTwo);
    formdata.append("vehicleImg", addVehicleData.vehicleImagesThree);
    formdata.append(
      "vehicleInsuranceDocs",
      addVehicleData.vehicleInsuranceDocs
    );
    formdata.append("driverId", addVehicleData.driverId);

    console.log([...formdata.entries()]);
    try {
      axios
        .post(VEHICLE_UPDATE_URL, formdata, headers)
        .then((response) => {
          console.log("response", response);
          if (response.data.status === true) {
            setIsLoading(false);
            setIsSubmit(false);
            if (parentElement) {
              parentElement.style.filter = "blur(0px)";
              parentElement.style.pointerEvents = "auto";
            }
            alert(response.data.message);
            navigate("/home/allVehicle");
          } else {
            setIsLoading(false);
            setIsSubmit(false);
            if (parentElement) {
              parentElement.style.filter = "blur(0px)";
              parentElement.style.pointerEvents = "auto";
            }
            alert(response.data.message);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setIsSubmit(false);
          if (parentElement) {
            parentElement.style.filter = "blur(0px)";
            parentElement.style.pointerEvents = "auto";
          }
          console.log(error);
        });
    } catch (error) {
      setIsLoading(false);
      setIsSubmit(false);
      if (parentElement) {
        parentElement.style.filter = "blur(0px)";
        parentElement.style.pointerEvents = "auto";
      }
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUnallotedDrivers();
  }, []);

  const getUnallotedDrivers = async () => {
    const headers = {
      headers: {
        token: token,
        type: "superAdmin",
      },
    };

    try {
      await axios
        .get(UN_ALLOTED_DRIVER_URL, headers)
        .then((res) => {
          setUnAllotedDrivers(res.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error from try catch", error);
    }
  };

  return (
    <div className="add-vehicle-container">
      <Spinner
        className={`spinner ${isLoading ? "isLoading" : ""}`}
        animation="border"
      />

      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-title margin_top_4 padding_left_20">
              <p>
                {vehicleData === null ? "Add" : "Edit"} <span>Vehicle</span>
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
                Vehicle Type
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
              <label htmlFor="brand" className="form-label">
                Vehicle Brand
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Brand"
                name="brand"
                id="brand"
                value={addVehicleData.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="model" className="form-label">
                Vehicle Variant
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Variant"
                name="model"
                id="model"
                value={addVehicleData.model}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="capacity" className="form-label">
                Capacity
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Vehicle Capacity"
                name="capacity"
                id="capacity"
                value={addVehicleData.capacity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="color" className="form-label">
                Colour
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicles Colour"
                name="color"
                id="color"
                value={addVehicleData.color}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="vehicleCharges" className="form-label">
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
              <label htmlFor="document">Add Car Images</label>
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
              <label htmlFor="vehicleNoPlate" className="form-label">
                Vehicle Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Number"
                name="vehicleNoPlate"
                id="vehicleNoPlate"
                value={addVehicleData.vehicleNoPlate}
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
              <label htmlFor="vehicleChechisNo" className="form-label">
                Vehicle Chassis Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vehicle Chassis Number"
                name="vehicleChechisNo"
                id="vehicleChechisNo"
                value={addVehicleData.vehicleChechisNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="vehicleLastServising" className="form-label">
                Vehicle Last Servicing
              </label>
              <input
                type="date"
                className="form-control"
                placeholder=""
                name="vehicleLastServising"
                id="vehicleLastServising"
                value={addVehicleData.vehicleLastServising}
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
                {/* <div className="add-btn">
                  <button>Add+</button>
                </div> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="vehicleregdoc">
                <label htmlFor="VehicleRegDoc">
                  Vehicle Insurance Document
                </label>

                {/* <div className="add-btn">
                  <button>Add+</button>
                </div> */}
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

            <div className="col-md-6">
              <label htmlFor="driverId" className="form-label">
                Driver
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="driverId"
                name="driverId"
                value={addVehicleData.driverId}
                onChange={handleChange}
                required
              >
                <option value="">Select Driver</option>
                {unAllotedDrivers &&
                  unAllotedDrivers.map((driver) => (
                    <option key={driver._id} value={driver._id}>
                      {driver.drivername}
                    </option>
                  ))}
              </select>
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
