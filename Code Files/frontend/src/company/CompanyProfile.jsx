import React, { useEffect, useState } from "react";
import CompanyNav from "./CompanyNav";
import axiosapi from "../axiosapi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorPage from "../ErrorPage";

const CompanyProfile = () => {
  const [companyProf, setCompanyProf] = useState({});
  const compId = sessionStorage.getItem("compId");
  const navigatedTo = useNavigate();
  const profileData = async () => {
    try {
      const resulss = await axiosapi.get(`company/profile/${compId}`);
      console.log(resulss.data.company, "jhgjhsfagdgj");
      setCompanyProf(resulss.data.company);
    } catch (error) {
      console.log(error);
      <ErrorPage />;
    }
  };
  useEffect(() => {
    profileData();
  }, []);
  const companyLogout = () => {
    sessionStorage.setItem("compId", "");
    navigatedTo("/");
    toast.success("logged out");
  };
  return (
    <div
      className="d-flex justify-content-end align-items-center mx-5"
      style={{ minHeight: "70vh" }}
    >
      <div className="card " style={{ width: "18rem" }}>
        <img src="./companyuser.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{companyProf.companyname}</h5>
          <p className="card-text">
            <ul>
              <li>{companyProf.role}</li>
              <li>{companyProf.email}</li>
            </ul>
          </p>
          <div className="d-flex justify-content-between">
            <Link className="btn btn-primary" to="/companyupdate">
              Update
            </Link>
            <button className="btn btn-danger" onClick={companyLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
