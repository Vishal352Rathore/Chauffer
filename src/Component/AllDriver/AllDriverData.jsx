import React from "react";
import { useState, useEffect } from "react";
import Images from "../Images";
import axios from "axios";

const AllDriverData = ({ superAdminId, agencyId }) => {
  const [driverData, setDriverData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState(null);
  const token = localStorage.getItem("token");
  const URL = process.env.REACT_APP_DRIVER_LIST_API_URL;
  const DRIVER_SEARCH_URL = process.env.REACT_APP_DRIVER_SEARCH_API_URL;

  const fetchData = async () => {
    const raw = JSON.stringify({
      superAdminId: superAdminId,
      agencyId: agencyId,
      page: page,
    });

    const myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("type", "superAdmin");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      fetch(URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === true) {
            setDriverData(result.items.drivers);
            setFilteredDrivers(result.items.drivers);
            setTotalPages(Math.ceil(result.items.totalCount / 10));
            console.log("response.data.items", result);
          } else {
            console.log("response.data.items", result);
          }
        })
        .catch((error) => console.error("error", error));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchData();
    } else {
      filteredDriverData();
    }
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
  // const handleSearchInputChange = (event) => {
  //   // const query = event.target.value.toLowerCase();
  //   // setSearchQuery(query);
  //   // if (searchQuery.trim() === "") {
  //   //   setFilteredDrivers(driverData); // Reset to full list if input field is cleared
  //   //   return;
  //   // }
  //   // const keywords = query.split(" ");
  //   //  filteredDriverData(query);
  //   // const filtered = driverData.filter((driver) =>
  //   //   keywords.every((keyword) => {
  //   //     if (keyword === "active" || keyword === "inactive") {
  //   //       return driver.status.toLowerCase() === keyword;
  //   //     }
  //   //     return Object.values(driver).some(
  //   //       (value) =>
  //   //         typeof value === "string" && value.toLowerCase().includes(keyword)
  //   //     );
  //   //   })
  //   // );
  // };

  useEffect(() => {
    filteredDriverData();
  }, [searchQuery]);

  const filteredDriverData = async () => {
    console.log("searchQuery", searchQuery);

    if (searchQuery.trim() === "") {
      setPage(1);
      return;
    }

    try {
      const result = await axios.post(
        DRIVER_SEARCH_URL,
        {
          superAdminId: superAdminId,
          agencyId: agencyId,
          searchBy: searchQuery,
          page: page,
        },
        {
          headers: {
            token: token,
            type: "superAdmin",
          },
        }
      );

      if (result.data.status === true) {
        setFilteredDrivers(result.data.items.drivers);
        setTotalPages(Math.ceil(result.data.items.totalCount / 10));
        console.log("response.data.items", result.data.items);
      } else {
        setFilteredDrivers(result.data.items.drivers);
        setTotalPages(Math.ceil(result.data.items.totalCount / 10));
        console.log("response.data.items.drivers fail", result);
      }
    } catch (error) {
      console.log("error", error);
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
      <div className="all-driver-conainer">
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
                    filteredDrivers.map((driver, index) => {
                      return (
                        <tr key={driver._id}>
                          <>
                            <td> {index + 1 + (page - 1) * 10}</td>
                            <td> {driver.drivername}</td>
                            <td>{driver.email}</td>
                            <td>{driver.createdAt}</td>
                            {driver.status && driver.status === "active" ? (
                              <td>
                                <button style={{ background: "#5DCA95" }}>
                                  Done
                                </button>
                              </td>
                            ) : (
                              <td>
                                <button>Pending</button>
                              </td>
                            )}
                            <td>
                              <div className="action_icon">
                                <img
                                  src={Images("view_icon")}
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
            {driverData && (
              <div className="pagination ">
                <span
                  onClick={() => selectPageHandler(page - 1)}
                  className={page > 1 ? "prev_page" : "pagination__disable"}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </span>
                {[...Array(totalPages)].map((_, i) => {
                  return (
                    <span
                      key={i}
                      className={
                        page === i + 1
                          ? "pagination__selected"
                          : "inactive_page"
                      }
                      onClick={() => selectPageHandler(i + 1)}
                    >
                      {i + 1}
                    </span>
                  );
                })}
                <span
                  onClick={() => selectPageHandler(page + 1)}
                  className={
                    page < totalPages ? "next-page" : "pagination__disable"
                  }
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
