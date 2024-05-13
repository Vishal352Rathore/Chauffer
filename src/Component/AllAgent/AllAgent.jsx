import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Images from "../Images";
import "./AllAgent.css";

const AllAgent = () => {
  const [agencyData, setAgencyData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAgency, setFilteredAgency] = useState(null);
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("adminId");
  const URL = process.env.REACT_APP_AGENCY_LIST_API_URL;

  const fetchData = async () => {

    const raw = JSON.stringify({
      page : page
    });


    const myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("type", "superAdmin");
    myHeaders.append("Content-Type", "application/json");

    
    console.log("raw", raw);

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
          console.log("response.data.items", result);
          if (result.status === true) {
            setAgencyData(result.items.agencies);
            setFilteredAgency(result.items.agencies);
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

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredAgency(agencyData);
      return;
    }

    const keywords = query.split(" ");
    const filtered = agencyData.filter((driver) =>
      keywords.every((keyword) => {
        if (keyword === "active" || keyword === "inactive") {
          return driver.status.toLowerCase() === keyword;
        }
        return Object.values(driver).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(keyword)
        );
      })
    );
    setFilteredAgency(filtered);
  };

  return (
    <div className="all-agent">
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="all-driver-header">
              <div className="form-title  padding_left_20  ">
                <p>
                  All <span>Agents</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="search-box-section">
        <label htmlFor="searchby">Search :</label>

        <div className="search-box">
          <img src={Images("search_icon")} alt="not found" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>

      <div className="all-agent-conainer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <table>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Agency name </th>
                    <th>Email</th>
                    <th>Contact No</th>
                    <th>City</th>
                    <th>Zip Code</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgency &&
                    filteredAgency.map((agency, index) => {
                      return (
                        <tr key={agency._id}>
                          <>
                            <td>{index + 1 + (page - 1) * 10}</td>
                            <td> {agency.name}</td>
                            <td>{agency.email}</td>
                            <td>{agency.mobile}</td>
                            <td>{agency.city}</td>
                            <td>{agency.zipCode}</td>
                            {agency.status && agency.status === "active" ? (
                              <td>
                                <button style={{ background: "#5DCA95" }}>
                                  Approved
                                </button>
                              </td>
                            ) : (
                              <td>
                                <button>Pending</button>
                              </td>
                            )}
                            <td>
                              <div className="action_icon">
                                <Link
                                  to={`agencyDetail/${agency._id}`}
                                  state={{ agencyData: agency }}
                                >
                                  <img
                                    src={Images("view_icon")}
                                    alt="not found"
                                  />
                                </Link>
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
            {agencyData && (
              <div className="pagination">
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
                  <i class="fa-solid fa-angle-right"></i>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllAgent;
