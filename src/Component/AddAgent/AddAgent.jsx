import React, { useState } from "react";
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

  const handleChange = (e) => {
    setAddAgentData({ ...AddAgentData, [e.target.name]: e.target.value });
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
              <div class="label">Contact Person Name</div>
               <div class="value">{agencyData.ContactPerson}</div>
              </div>
              <div class="col-md-6">
              <div class="label">Email</div>
               <div class="value">{agencyData.ContactEmail}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
              <div class="label">Contact No</div>
               <div class="value">{agencyData.ContactNumber}</div>
              </div>
              <div class="col-md-6">
              <div class="label">City</div>
               <div class="value">{agencyData.PhysicalAddress}</div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
              <div class="label">Zipcode</div>
               <div class="value">{agencyData.zipCode}</div>
              </div>
              <div class="col-md-6">
                <div htmlfor="serviceArea" class="label">
                  Selected Status
                </div>
                <select
                  class="value"
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
