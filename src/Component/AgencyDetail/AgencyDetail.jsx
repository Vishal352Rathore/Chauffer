import React, { useState } from "react";
import AllDriverData from "../AllDriver/AllDriverData";
import { useParams ,useLocation } from "react-router-dom";
import AllVehicleData from "../AllVehicle/AllVehicleData";
import AddAgent from "../AddAgent/AddAgent";
import "./AgencyDetail.css"

const AgencyDetail = () => {
  const superAdminId = "";
  const { agencyId } = useParams();
  const location = useLocation()
  const { agencyData } =  location.state
  const [currentPage, setCurrentPage] = useState("form");


  const renderPage = () => {
    switch (currentPage) {
      case "form":
        return <AddAgent agencyData={agencyData}/>;
      case "driver":
        return (
          <AllDriverData superAdminId={superAdminId} agencyId={agencyId} />
        );
      case "vehicle":
        return (
          <AllVehicleData superAdminId={superAdminId} agencyId={agencyId} />
        );
      default:
        return <AddAgent />;
    }
  };

  const handlePageChange = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div className="agency-detail">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-driver-header">
              <div className="form-title  padding_left_20">
                <p>
                  Agency <span>Detail</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div >
        <header>
          <nav className="agency-detail-header">
            <ul className="tab-bar">
              <li
                className="nav-item"
                onClick={(e) => handlePageChange(e, "form")}
              >
                Form
              </li>
              <li
                className="nav-item"
                onClick={(e) => handlePageChange(e, "driver")}
              >
                Driver
              </li>
              <li
                className="nav-item"
                onClick={(e) => handlePageChange(e, "vehicle")}
              >
                Vehicle
              </li>
            </ul>
          </nav>
        </header>
        <main className="agency-detail-data">{renderPage()}</main>
        </div>
      </section>
    </div>
  );
};

export default AgencyDetail;
