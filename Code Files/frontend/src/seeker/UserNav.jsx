import React, { useState } from "react";
import Profile from "./Profile";
import RegistrationForm from "./RegistrationForm";
import ViewJobs from "./ViewJobs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ViewPostedJobs from "../company/ViewPostedJobs";
import axiosapi from "../axiosapi";
import ViewAppliedJobs from "./ViewAppliedJobs";
import { useForm } from "react-hook-form";

const UserNav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigatingTo = useNavigate();
  const location = useLocation();

  const [searchResults, setSearchResults] = useState([]);
  const [showResume, setShowResume] = useState("home");
  const [showDetailss, setShowDetailss] = useState("");
  const id = sessionStorage.getItem("id");
  const searchForm = useForm();
  const handlePageRender = (elem) => {
    setShowResume(elem);
    navigatingTo("/userhome");
  };

  const handleSearch = async (data) => {
    try {
      console.log(data, "data");
      const resultss = await axiosapi.get(
        `user/internship/${id}/?title=${data.title}`
      );
      console.log(resultss, "searched func");
      setSearchResults(resultss.data.internships);
      setShowResume("search");
      navigatingTo("/userhome");
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowResume("home");
    }
  };

  const viewDetailss = (id) => {
    setShowDetailss(id);
  };
  const applyJob = (id) => {
    sessionStorage.setItem("jobid", id);
    // const myId=JSON.stringify(id)
    // sessionStorage.setItem("updateId",myId);
    navigatingTo(`/applyform/${id}`);
  };

  console.log(showResume, "searchResults", location.pathname);
  return (
    <div>
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark fixed-top ">
        <Link className="navbar-brand ms-3 h5">
        JOBQUEST: <span className="h6">NAVIGATING YOUR CARRER JOURNEY </span> 
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <ul className="navbar-nav mr-auto">
            <li className="nav-item active" style={{ marginLeft: "200px" }}>
              <Link className="nav-link">
                <i />
                Welcome User...!
                <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul> */}

         {location.pathname === "/userhome" && <form
            className="d-flex"
            role="search"
            onSubmit={searchForm.handleSubmit(handleSearch)}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              {...searchForm.register("title")}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>}

          <ul className="navbar-nav" style={{ marginLeft: "200px" }}>
            <li className="nav-item active">
              <button
                className="nav-link"
                onClick={() => handlePageRender("home")}
              >
                <i className="fa fa-home" />
                Home
                <span className="sr-only">(current)</span>
              </button>
            </li>
            <li className="nav-item active">
              <button
                className="nav-link"
                onClick={() => handlePageRender("add")}
              >
                <i className="fa fa-solid fa-id-card-clip"></i>
                Build Profile
                <span className="sr-only">(current)</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link "
                onClick={() => handlePageRender("applied")}
              >
                <i className="fa fa-solid fa-graduation-cap"></i>
                Applied Internships
              </button>
            </li>
            <li className="nav-item">
              {" "}
              {/* data-bs-toggle="modal" data-bs-target="#staticBackdrop"*/}
              <button
                className="nav-link"
                onClick={() => handlePageRender("resume")}
              >
                <i className="fa fa-solid fa-user-tie"></i>
                Profile
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {showResume === "resume" && <Profile />}
      {showResume === "add" && <RegistrationForm />}
      {showResume === "home" && location.pathname === "/userhome" && (
        <ViewJobs />
      )}
      {showResume === "applied" && (
        <ViewAppliedJobs setShowResume={setShowResume} />
      )}
      {showResume === "search" && Array.isArray(searchResults)
        ? searchResults.map((item) => (
            <div className="container mycontainer mt-5 p-2 " key={item._id}>
              <img src="./degree1.png" alt="no photo" />
              <div className="container__text">
                <h1>{item.title}</h1>
                <p>{item.companyname}</p>
                <p className="text-primary">
                  <a onClick={() => viewDetailss(item._id)}>view Details</a>
                </p>
                {showDetailss === item._id && (
                  <div>
                    <ul>
                      <li>Role:{item.role}</li>
                      <li>Total Vacancies: {item.opening} </li>
                      <li> Education Required: {item.Education} </li>
                      <li>Key Skills: {item.Key_Skills} </li>
                      <li> Experience :{item.experience} months</li>
                      <li>
                        {" "}
                        Salary/Stipend: {item.salary}
                        <span className="h6">&#8377;/month</span>{" "}
                      </li>
                      <li>Job Description: {item.description}</li>
                    </ul>
                    <ul>
                      <li>
                        <h4>Company Details</h4>
                      </li>
                      <li>Industry Type :{item.Industry_Type} </li>
                      <li>Branch Name/Location: {item.location} </li>
                      <li>Shift Timing : {item.Shifts} </li>
                      <li>Office Timing: {} </li>
                      <li>Hired to be in Department: {item.Department}</li>
                      <li>Employment Type: {item.Employment_Type}</li>
                      <li>Email: {}</li>
                      <li>Main Branch Address: {item.Address}</li>
                    </ul>
                  </div>
                )}

                <button className="btn" onClick={() => applyJob(item._id)}>
                  Apply <i className="fa fa-arrow-right" />
                </button>
              </div>
            </div>
          ))
        : searchResults &&
          showResume === "search" && (
            <div
              className="container mycontainer mt-5 p-2 "
              key={searchResults._id}
            >
              <img src="./degree1.png" alt="no photo" />
              <div className="container__text">
                <h1>{searchResults.title}</h1>
                <p>{searchResults.companyname}</p>
                <p className="text-primary">
                  <a onClick={() => viewDetailss(searchResults._id)}>
                    view Details
                  </a>
                </p>
                {showDetailss === searchResults._id && (
                  <div>
                    <ul>
                      <li>Role:{searchResults.role}</li>
                      <li>Total Vacancies: {searchResults.opening} </li>
                      <li> Education Required: {searchResults.Education} </li>
                      <li>Key Skills: {searchResults.Key_Skills} </li>
                      <li> Experience :{searchResults.experience} months</li>
                      <li>
                        {" "}
                        Salary/Stipend: {searchResults.salary}
                        <span className="h6">&#8377;/month</span>{" "}
                      </li>
                      <li>Job Description: {searchResults.description}</li>
                    </ul>
                    <ul>
                      <li>
                        <h4>Company Details</h4>
                      </li>
                      <li>Industry Type :{searchResults.Industry_Type} </li>
                      <li>Branch Name/Location: {searchResults.location} </li>
                      <li>Shift Timing : {searchResults.Shifts} </li>
                      <li>Office Timing: {} </li>
                      <li>
                        Hired to be in Department: {searchResults.Department}
                      </li>
                      <li>Employment Type: {searchResults.Employment_Type}</li>
                      <li>Email: {}</li>
                      <li>Main Branch Address: {searchResults.Address}</li>
                    </ul>
                  </div>
                )}

                <button
                  className="btn"
                  onClick={() => applyJob(searchResults._id)}
                >
                  Apply <i className="fa fa-arrow-right" />
                </button>
              </div>
            </div>
          )}
    </div>
  );
};

export default UserNav;
