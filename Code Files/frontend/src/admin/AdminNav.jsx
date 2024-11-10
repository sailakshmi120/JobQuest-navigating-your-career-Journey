import React, { useState } from "react";
import "../css/userhome.css";
import { Link } from "react-router-dom";
import ViewCompanies from "./ViewCompanies";
import ViewUsers from "./ViewUsers";
import ViewPostedJobs from "../company/ViewPostedJobs";
import ViewJobsPosted from "./ViewJobsPosted";
import ViewApplicants from "./ViewApplicants";
const AdminNav = () => {
  const [showcomp, setShowcomp] = useState("home");
  const handleShow = (elem) => {
    setShowcomp(elem);
  };
  return (
    <div>
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
                  <i />
                  Welcome Admin...!
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul> */}

            <ul className="navbar-nav" style={{ marginLeft: "200px" }}>
              <li className="nav-item active">
                <Link className="nav-link" onClick={() => handleShow("home")}>
                  <i className="fa fa-home" />
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " onClick={() => handleShow("users")}>
                  <i className="fa fa-solid fa-graduation-cap"></i>
                  View Users
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  onClick={() => handleShow("companies")}
                >
                  <i className="fa-solid fa-briefcase fa"></i>
                  View Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " onClick={() => handleShow("jobs")}>
                  <i className="fa fa-solid fa-id-badge"></i>
                  View Posted Jobs
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                {/* data-bs-toggle="modal" data-bs-target="#staticBackdrop"onClick={()=> setShowResume((prev)=>!prev)}*/}
                <Link className="nav-link" onClick={() => handleShow("apps")}>
                  <i className="fa fa-solid fa-user-tie"></i>
                  View Applicants
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/">
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {showcomp === "companies" && <ViewCompanies />}
        {showcomp === "users" && <ViewUsers />}
        {showcomp === "jobs" && <ViewJobsPosted />}
        {showcomp === "apps" && <ViewApplicants />}
      </div>
      )
    </div>
  );
};

export default AdminNav;
