import React, { useEffect, useState } from "react";
import axiosapi, { baseURL } from "../axiosapi";

const ViewUsers = () => {
  const [userProf, setUserProf] = useState([]);
  const viewAllUsers = async () => {
    try {
      const viewresuls = await axiosapi.get("admin/users");
      console.log(viewresuls.data.users, "userssss");
      setUserProf(viewresuls.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    viewAllUsers();
  }, []);
  return (
    <div className="" style={{ paddingTop: "40px" }}>
      <div className="container mt-5 ">
        <div className="row">
          {userProf ? (
            userProf.map((companyProf) => (
              <div className="col-4" key={companyProf._id}>
                <div
                  className="card p-3"
                  style={{ width: "75%", backgroundColor: "#d0f2d9" }}
                >
                  <img
                    src={`${baseURL}uploads/${companyProf.image}`}
                    className="card-img-top"
                    alt="..."
                    width={50}
                    height={"180px"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {companyProf.firstname} {companyProf.lastname}{" "}
                    </h5>
                    <p className="card-text">
                      <ul>
                        <li>{companyProf.mobileno}</li>
                        <li>{companyProf.email}</li>
                        <li>{companyProf.college}</li>
                        <li>{companyProf.gender}</li>
                        <li>{companyProf.qualification}</li>
                        <li>{companyProf.percentage}</li>
                        <li>{companyProf.year_of_passing}</li>
                        <li>{companyProf.date_of_birth}</li>
                      </ul>
                    </p>
                    {/* <Link  className="btn btn-primary" to="/companyupdate">
             Accept
           </Link>
           <button className="btn btn-danger" >
             Delete
           </button> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-danger">No User Registered</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ViewUsers;
