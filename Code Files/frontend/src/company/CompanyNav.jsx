import React, { useState } from "react";
import "../css/userhome.css";
import PostJobs from "./PostJobs";
import ViewPostedJobs from "./ViewPostedJobs";
import CompanyProfile from "./CompanyProfile";
import { Link, useNavigate } from "react-router-dom";

import ViewApplicantsCompany from "./ViewApplicantsCompany";
const CompanyNav = () => {
  const [showPostJob, setShowPostJobs] = useState("home");
  const navigate = useNavigate();

  const handleViews = (elem) => {
    setShowPostJobs(elem);
    navigate("/companyhome");
  };
  return (
    <div>
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark fixed-top ">
        <Link className="navbar-brand ms-3">
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
                <p className="h5 text-white">Welcome</p>
                <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul> */}

          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}

          <ul className="navbar-nav" style={{ marginLeft: "200px" }}>
            <li className="nav-item active">
              <button className="nav-link" onClick={() => handleViews("home")}>
                <i className="fa fa-home" />
                Home
                <span className="sr-only">(current)</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link "
                onClick={() => handleViews("addjobs")}
              >
                <i className="fa fa-solid fa-chalkboard-user"></i>
                Post Jobs
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link "
                onClick={() => handleViews("viewjobs")}
              >
                <i className="fa-solid fa-briefcase fa"></i>
                View Posted Jobs
              </button>
            </li>
            <li className="nav-item">
              {" "}
              {/* data-bs-toggle="modal" data-bs-target="#staticBackdrop"*/}
              <button
                className="nav-link"
                onClick={() => handleViews("viewapps")}
              >
                <i className="fa fa-solid fa-id-badge"></i>
                View Applicants
              </button>
            </li>
            <li className="nav-item">
              {" "}
              {/* data-bs-toggle="modal" data-bs-target="#staticBackdrop"*/}
              <button
                className="nav-link"
                onClick={() => handleViews("profile")}
              >
                <i className="fa fa-solid fa-user-tie"></i>
                Profile
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {showPostJob === "addjobs" && <PostJobs />}
      {showPostJob === "viewjobs" && <ViewPostedJobs />}
      {showPostJob === "profile" && <CompanyProfile />}
      {showPostJob === "viewapps" && (
        <ViewApplicantsCompany setShowPostJobs={setShowPostJobs} />
      )}
    </div>
  );
};

export default CompanyNav;
