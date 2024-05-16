import React , { useState }from "react";
import { Link } from "react-router-dom";

export const Discount = () => {
  const [currentPage, setCurrentPage] = useState("form");

  const handlePageChange = (e, page) => {
      e.preventDefault();
      setCurrentPage(page);
    };
    
  const renderPage = () => {
    // switch (currentPage) {
    //   case "active":
    //     return <AddAgent agencyData={agencyData}/>;
    //   case "inactive":
    //     return (
    //       <AllDriverData superAdminId={superAdminId} agencyId={agencyId} />
    //     );
    //   case "expire":
    //     return (
    //       <AllVehicleData superAdminId={superAdminId} agencyId={agencyId} />
    //     );
    //   default:
    //     return <AddAgent />;
    // }
  };


  return (
    <div className="discount">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-driver-header">
              <div className="form-title  padding_left_20  ">
                <p>
                  All <span>Discount</span>
                </p>
              </div>
              <div className="add-driver-navigate-btn-div">
                <span>
                  <Link to="addDiscount" className="add-driver-btn">
                    {" "}
                    Add Discount
                  </Link>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <header>
          <nav className="agency-detail-header">
            <ul className="tab-bar">
              <li
                className="nav-item"
                onClick={(e) => handlePageChange(e, "active")}
              >
                Active
              </li>
              <li
                className="nav-item"
                onClick={(e) => handlePageChange(e, "inactive")}
              >
                Inactive
              </li>
              <li
                className="nav-item"
                onClick={(e) => handlePageChange(e, "expire")}
              >
                Expire
              </li>
            </ul>
          </nav>
        </header>
        <main className="agency-detail-data">{renderPage()}</main>
    </div>
  );
};
