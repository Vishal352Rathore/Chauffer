import React, { useState, useEffect } from "react";
import "./AllVehicle.css";
import Images from "../Images";

const AllVehicleData = ({superAdminId,agencyId}) => {
    const [vehicleData, setVehicleData] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState(null);
    const token = localStorage.getItem("token");
    const URL = process.env.REACT_APP_VEHICLE_LIST_API_URL;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("token", token);
          myHeaders.append("type", "superAdmin");
          myHeaders.append("Content-Type", "application/json");
  
          const raw = JSON.stringify({
            superAdminId: superAdminId,
            agencyId : agencyId,
            page: page,
          });
  
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
  
          fetch(URL, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              if (result.status === true) {
                setVehicleData(result.items.vehicles);
                setFilteredVehicles(result.items.vehicles);
                setTotalPages(Math.ceil(result.items.totalCount / 10));
  
                console.log("response.data.items", result);
              } else {
                console.log("response.data.items", result);
              }
            })
            .catch((error) => console.error(error));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [page]);
  
    const selectPageHandler = (selectedPage) => {
      if (
        selectedPage >= 1 &&
        selectedPage <= totalPages &&
        selectedPage !== page
      ) {
        setPage(selectedPage);
        console.log("selectedPage", selectedPage);
      }
    };
  
    // Function to handle search input change
    const handleSearchInputChange = (event) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
  
      if (query.trim() === "") {
        setFilteredVehicles(vehicleData); // Reset to full list if input field is cleared
        return;
      }
  
      const keywords = query.split(" ");
      const filtered = vehicleData.filter((vehicle) =>
        keywords.every((keyword) => {
          if (keyword === "active" || keyword === "inactive") {
            return vehicle.status.toLowerCase() === keyword;
          }
          return Object.values(vehicle).some(
            (value) =>
              typeof value === "string" && value.toLowerCase().includes(keyword)
          );
        })
      );
      setFilteredVehicles(filtered);
    };
  return (
    <div>
        <div className="vehicle-search-section">
      <label for="searchby">Search </label>
      

        <div className="search-box">
          <img src={Images("search_icon")} alt="not found" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>

      <div className="all-vehicle-conainer">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <table>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Vehicle No. </th>
                    <th>Vehicle Brand</th>
                    <th>Registration No</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles &&
                    filteredVehicles.map((vehicle, index) => {
                      return (
                        <tr key={vehicle._id}>
                          <>
                            <td>{index + 1 + (page - 1) * 10}</td>
                            <td> {vehicle.vehicleNoPlate}</td>
                            <td> {vehicle.brand}</td>
                            <td>{vehicle.vehicleRegistrationNo}</td>
                            <td>
                            <div className="action_icon">
                                <img
                                  src={Images("view_icon")}
                                  alt="not found"
                                />
                                <img
                                  src={Images("edit_icon")}
                                  alt="not found"
                                />
                                <img
                                  src={Images("delete_icon")}
                                  alt="not found"
                                />
                              </div>
                            </td>
                          </>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section className="container">
        <div className="row">
          <div className="col-md-12">
            {vehicleData && (
              <div className="pagination ">
                <span
                  onClick={() => selectPageHandler(page - 1)}
                  className={page > 1 ? "prev_page" : "pagination__disable"}
                >
                  <i class="fa-solid fa-chevron-left"></i>
                </span>

                {[...Array(totalPages)].map((_, i) => {
                  return (
                    <span
                      key={i}
                      className={page === i + 1 ? "pagination__selected" : "inactive_page"}
                      onClick={() => selectPageHandler(i + 1)}
                      
                    >
                      {i + 1}
                    </span>
                  );
                })}

                <span
                  onClick={() => selectPageHandler(page + 1)}
                  className={page < totalPages ? "next-page" : "pagination__disable"}
                >
                  <i class="fa-solid fa-angle-right"></i>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AllVehicleData
