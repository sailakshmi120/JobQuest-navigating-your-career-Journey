import React, { useEffect, useState } from "react";
import axiosapi from "../axiosapi";
import { Link } from "react-router-dom";

const ViewCompanies = () => {
  const [companyProf, setCompanyProf] = useState([]);
  const viewAllCompanies = async () => {
    try {
      const viewres = await axiosapi.get("admin/company");
      console.log(viewres.data.companys, "companiesa");
      setCompanyProf(viewres.data.companys);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    viewAllCompanies();
  }, []);
  return (
    <div className="" style={{ paddingTop: "40px" }}>
      <div className="container mt-5 ">
        <div className="row">
          {companyProf ? (
            companyProf.map((companyProf) => (
              <div className="col-4" key={companyProf.companyname}>
                <div className="card p-3" style={{ width: "75%" }}>
                  <img
                    src="./companyuser.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{companyProf.companyname}</h5>
                    <p className="card-text">
                      <ul>
                        <li>{companyProf.role}</li>
                        <li>{companyProf.email}</li>
                      </ul>
                    </p>
                    {/* <Link className="btn btn-primary" to="/companyupdate">
                      Accept
                    </Link>
                    <button className="btn btn-danger">Delete</button> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-danger">No company Registered</p>
          )}
        </div>  
      </div>
    </div>
  );
};

export default ViewCompanies;
