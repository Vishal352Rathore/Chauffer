import { Link } from "react-router-dom";
import AllVehicleData from "./AllVehicleData";

const AllVehicle = () => {
 
  const superAdminId = localStorage.getItem("superAdminId");
  const agencyId = localStorage.getItem("agencyId");
  
  return (
    <div>
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-vehicle-header">
              <div className="form-title  padding_left_20  ">
                <p>
                  All <span>Vehicles</span>
                  {/* form title ,p,span css in AddDriver.css */}
                </p>
              </div>
              {
                agencyId ? (
                  <div className="add-driver-navigate-btn-div">
                <span>
                  <Link className="add-driver-btn" to="addVehicle">
                    {" "}
                    Add Vehicle
                  </Link>{" "}
                </span>
              </div>
                ):""
              }
            </div>
          </div>
        </div>
      </section>

     <AllVehicleData superAdminId={superAdminId} agencyId={agencyId}/>
    </div>
  );
};

export default AllVehicle;
