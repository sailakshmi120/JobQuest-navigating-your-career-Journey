import React, { useEffect, useState } from "react";
import ViewJobs from "./seeker/ViewJobs";
import AdminSignIn from "./admin/AdminSignIn";
import SignIn from "./seeker/SignIn";
import CompanySignIn from "./company/CompanySignIn";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  // useEffect(() => {
  //     if (showAdminSignIn) {
  //       setShhowUserSignIn(false);
  //       setShowCompanySignIn(false);
  //     } else if (showUserSignIn) {
  //       setShowAdminSignIn(false);
  //       setShowCompanySignIn(false);
  //     } else if (showCompanySignIn) {
  //       setShowAdminSignIn(false);
  //       setShhowUserSignIn(false);
  //     }
  //   }, [showAdminSignIn, showUserSignIn, showCompanySignIn]);

  return (
    <div>
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark fixed-top ">
        <Link className="navbar-brand mx-3 ">
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
          <ul className="navbar-nav ">
            <li className="nav-item active">
              {/* <Link className="nav-link">
                <i />
                <marquee behavior="alternate" direction="left" scrollAmount="8">
                  Welcome to JOB portal
                </marquee>

                <span className="sr-only">(current)</span>
              </Link> */}
            </li>
          </ul>

          {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-success" type="submit">Search</button>
          </form> */}

          <ul className="navbar-nav" style={{ marginLeft: "500px" }}>
            <li className="nav-item active">
              <Link className="nav-link">
                <i className="fa fa-home" />
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link "
                onClick={() => handleButtonClick("user")}
              >
                <i className="fa fa-solid fa-graduation-cap"></i>
                Student
              </Link>
            </li>
            <li className="nav-item">
              {" "}
              {/* data-bs-toggle="modal" data-bs-target="#staticBackdrop"*/}
              <Link
                className="nav-link"
                onClick={() => handleButtonClick("company")}
              >
                <i className="fa fa-solid fa-id-badge"></i>
                Employer
              </Link>
            </li>
            <li className="nav-item">
              {" "}
              {/* data-bs-toggle="modal" data-bs-target="#staticBackdrop"*/}
              <Link
                className="nav-link"
                onClick={() => handleButtonClick("admin")}
              >
                <i className="fa fa-solid fa-user-tie"></i>
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {activeComponent === "admin" && <AdminSignIn />}
      {activeComponent === "user" && <SignIn />}
      {activeComponent === "company" && <CompanySignIn />}
    </div>
  );
};

export default Home;
