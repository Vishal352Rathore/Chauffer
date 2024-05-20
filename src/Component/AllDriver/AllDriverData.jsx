import React, { useState, useEffect } from "react";
import Images from "../Images";
import UseApi from "../Hooks/UseApi"; // Ensure the correct path to the hook
import './AllDriver.css'

const AllDriverData = ({ superAdminId, agencyId }) => {
  const [driverData, setDriverData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState(null);
  const token = localStorage.getItem("token");

  const URL = process.env.REACT_APP_DRIVER_LIST_API_URL;
  const DRIVER_SEARCH_URL = process.env.REACT_APP_DRIVER_SEARCH_API_URL;

  const { loading, error, data, callApi } = UseApi();
  console.log("ALL Driver API DATA:", data);

  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchData();
    } else {
      fetchSearchData();
    }
  }, [page,searchQuery]);
  
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const fetchData = async () => {
    const raw = JSON.stringify({
      superAdminId: superAdminId,
      agencyId: agencyId,
      page: page,
    });

    const headers = {
      "Content-Type": "application/json",
      "token": token,
      "type": "superAdmin",
    };

    await callApi({
      url: URL,
      method: "POST",
      headers: headers,
      body: raw,
    }).then(()=>{

      console.log("dataFromThen",data);
      if (data && data.status) {
        setDriverData(data.items.drivers);
        setFilteredDrivers(data.items.drivers);
        setTotalPages(Math.ceil(data.items.totalCount / 10));
        console.log("response.data.items", data);
      } else if (error) {
        console.error("ERROR:", error);
        alert("Error occurred while fetching driver data");
      }

    })

    
  };

  const fetchSearchData = async () => {

    if (searchQuery.trim() === "") {
      return;
    }

    const raw = JSON.stringify({
      superAdminId: superAdminId,
      agencyId: agencyId,
      searchBy: searchQuery,
      page: page,
    });

    const headers = {
      "Content-Type": "application/json",
      "token": token,
      "type": "superAdmin",
    };

    await callApi({
      url: DRIVER_SEARCH_URL,
      method: "POST",
      headers: headers,
      body: raw,
    }).then(()=>{
      if (data && data.status) {
        setFilteredDrivers(data.items.drivers);
        setTotalPages(Math.ceil(data.items.totalCount / 10));
        console.log("response.data.items", data.items);
      } else {
        setFilteredDrivers([]);
        setTotalPages(1);
        console.error("Failed to fetch filtered driver data", data);
      }
    })


  };


  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
      console.log("selectedPage", selectedPage);
    }
  };



  return (
    <div>
      <div className="search-box-section">
        <label htmlFor="searchby">Search :</label>
        <div className="search-box">
          <img src={Images("search_icon")} alt="not found" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="all-driver-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <table>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Driver name </th>
                    <th>Email Id</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDrivers &&
                    filteredDrivers.map((driver, index) => (
                      <tr key={driver._id}>
                        <td>{index + 1 + (page - 1) * 10}</td>
                        <td>{driver.drivername}</td>
                        <td>{driver.email}</td>
                        <td>{driver.createdAt}</td>
                        <td>
                          {driver.status === "active" ? (
                            <button style={{ background: "#5DCA95" }}>Done</button>
                          ) : (
                            <button>Pending</button>
                          )}
                        </td>
                        <td>
                          <div className="action_icon">
                            <img src={Images("view_icon")} alt="not found" />
                            <img src={Images("delete_icon")} alt="not found" />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <section className="container">
        <div className="row">
          <div className="col-md-12">
            {driverData && (
              <div className="pagination">
                <span
                  onClick={() => selectPageHandler(page - 1)}
                  className={page > 1 ? "prev_page" : "pagination__disable"}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </span>
                {[...Array(totalPages)].map((_, i) => (
                  <span
                    key={i}
                    className={page === i + 1 ? "pagination__selected" : "inactive_page"}
                    onClick={() => selectPageHandler(i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
                <span
                  onClick={() => selectPageHandler(page + 1)}
                  className={page < totalPages ? "next-page" : "pagination__disable"}
                >
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllDriverData;
