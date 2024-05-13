import React, { useState, useEffect } from "react";
import "./AddAgent.css";
import Images from "../Images";
import { useDispatch, useSelector } from "react-redux";
import { AddAgentAction } from "../../Redux/Reducer/AddAgent_Reducers";
import { selectAddAgent } from "../../Redux/Reducer/AddAgent_Reducers";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAgent = ({ agencyData }) => {
  const AGENCY_STATUS_CHANGE_URL =
    process.env.REACT_APP_AGENCY_STATUS_CHANGE_API_URL;

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [selectedFile, setSelectedFile] = useState(null);

  const [AddAgentData, setAddAgentData] = useState({
    ownerName: "",
    companyName: "",
    companyEmail: "",
    password: "",
    vehicleType: "",
    countOfVehicle: "",
    serviceArea: "",
    agentDoc: "",
    status: "",
  });
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.addAgent);

  const handleChange = (e) => {
    setAddAgentData({ ...AddAgentData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log("selectedFile", file);
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiCalling();
  };

  const ApiCalling = async () => {
    try {
      const response = await axios.post(
        AGENCY_STATUS_CHANGE_URL,
        {
          agencyId: agencyData._id,
          agencyStatus: AddAgentData.status,
        },
        {
          headers: {
            token: token,
            type: "superAdmin",
          },
        }
      );

      if (response.data.status === true) {
        console.log("response.data.items", response.items);
        alert(response.data.message);
        navigate("/home/allAgent");
      } else {
        alert(response.data.message);
        console.log("response.data.items.drivers fail", response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="agent-container">
        <section className="container-fluid">
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
                  value={agencyData.name}
                  onChange={handleChange}
                />
              </div>
              <div class="col-md-6">
                <label htmlfor="companyName" class="form-label">
                  Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  name="companyEmail"
                  id="companyEmail"
                  value={agencyData.email}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label htmlfor="companyEmail" class="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Company Email"
                  name="companyEmail"
                  id="companyEmail"
                  value={agencyData.mobile}
                  onChange={handleChange}
                />
              </div>
              <div class="col-md-6">
                <label htmlfor="city" class="form-label">
                  City
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter city"
                  name="city"
                  id="city"
                  value={agencyData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label htmlfor="zipCode" class="form-label">
                  Zipcode
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="zipCode"
                  name="zipCode"
                  id="zipCode"
                  value={agencyData.zipCode}
                  onChange={handleChange}
                />
              </div>
              <div class="col-md-6">
                <label htmlfor="serviceArea" class="form-label">
                  Selected Status
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  id="status"
                  name="status"
                  value={AddAgentData.status}
                  onChange={handleChange}
                >
                  <option>Vehicle Select Class</option>
                  <option value="active">Approve</option>
                  <option value="inactive">Reject</option>
                </select>
              </div>
            </div>

            {/* <div className="row">
            <div className="col-md-12">
              <label htmlfor="agent-doc" className="form-label filelabel">
                Document
              </label>
            </div>
          </div> */}

            {/* <div className="col-md-12">
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
          </div> */}
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
