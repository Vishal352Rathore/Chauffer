import React, { useState, useEffect } from "react";
import "./AddAgent.css";
import Images from "../Images";
import { useDispatch, useSelector } from "react-redux";
import { AddAgentAction } from "../../Redux/Reducer/AddAgent_Reducers";
import { selectAddAgent } from "../../Redux/Reducer/AddAgent_Reducers";

const AddAgent = () => {

  const [selectedFile, setSelectedFile] = useState(null)

  const [AddAgentData, setAddAgentData] = useState({
    ownerName: "",
    companyName: "",
    companyEmail: "",
    password: "",
    vehicleType: "",
    countOfVehicle: "",
    serviceArea: "",
    agentDoc: "",
  });
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.addAgent);

  const handleChange = (e) => {
      setAddAgentData({ ...AddAgentData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (event) =>{
    const file = event.target.files[0]
    console.log("selectedFile" ,file);
    setSelectedFile(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddAgentAction(AddAgentData));
    AddAgentData.agentDoc = selectedFile ;

    ApiCalling();
  };

 const ApiCalling = () =>{
  console.log("AddAgentData" ,AddAgentData);
 }

  return (
    <div >
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-title margin_top_4 padding_left_20">
              <h3>
                Add <span>Agent</span>
              </h3>
            </div>
          </div>
        </div>
      </section>
      <div className="agent-container "> 

      <section className="container">
        <form onSubmit={handleSubmit}>
          <div class="row">
            <div class="col-md-6">
              <label htmlfor="ownerName" class="form-label">
                Owner Name
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Owner Name"
                name="ownerName"
                id="ownerName"
                value={AddAgentData.ownerName}
                onChange={handleChange}
              />
            </div>
            <div class="col-md-6">
              <label htmlfor="companyName" class="form-label">
                Company Name
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Company Name"
                name="companyName"
                id="companyName"
                value={AddAgentData.companyName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label htmlfor="companyEmail" class="form-label">
                Company Email
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Company Email"
                name="companyEmail"
                id="companyEmail"
                value={AddAgentData.companyEmail}
                onChange={handleChange}
              />
            </div>
            <div class="col-md-6">
              <label htmlfor="password" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password"
                name="password"
                id="password"
                value={AddAgentData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label htmlfor="vehicleType" class="form-label">
                Vehicle Type
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Vehicle Type"
                name="vehicleType"
                id="vehicleType"
                value={AddAgentData.vehicleType}
                onChange={handleChange}
              />
            </div>
            <div class="col-md-6">
              <label htmlfor="countOfVehicle" class="form-label">
                Count of Vehicle
              </label>
              <input
                type="number"
                class="form-control"
                placeholder="Count Of Vehicle"
                name="countOfVehicle"
                id="countOfVehicle"
                value={AddAgentData.countOfVehicle}
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label htmlfor="serviceArea" class="form-label">
                Services Area
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Service Area"
                name="serviceArea"
                id="serviceArea"
                value={AddAgentData.serviceArea}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label htmlfor="agent-doc" className="form-label filelabel">
                Document
              </label>
            </div>
          </div>

          <div className="col-md-12">
            <div className="upload-container">
              <label className="filelabel" htmlFor="FileInput-0">
                {selectedFile && <div>{selectedFile.name}</div>  }
                <img src={Images("upload_document_icon")} alt="not-found" />
                <p>Upload Document</p>
              </label>
              <input
                className="FileUpload1"
                id="FileInput-0"
                name="booking_attachment-0"
                type="file" // Pass index to handleFileSelect
                onChange={handleFileSelect}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mx-auto">
              <button className="form-btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>

        {/* <form>
            <div className="row">
              <div className="col">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Owner Name
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="owner name"
                />
              </div>
              <div className="col">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Owner Name
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="owner name"
                />
              </div>
              </div>
              
              </div>
            </div>
            </form> */}
      </section>
      </div>
    </div>
  );
};

export default AddAgent;
