import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosapi from "../axiosapi";

const ViewAppliedJobs = ({setShowResume}) => {
  const [showDetails, setShowDetails] = useState("");
  const [postedJobData, setPostedJobData] = useState([]);
  const navigatingTo = useNavigate();
  const uid = sessionStorage.getItem("id");
  const [status, setStatus] = useState();

  const getData = async () => {
    try {
      // "need to change end point"
      const res = await axiosapi.get(`user/apply/${uid}`);
      console.log(res, "backenjjfj");
      setPostedJobData(res.data.interns);
      setStatus(res.data.internship);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const viewDetails = (id) => {
    setShowDetails(id);
  };

  //console.log(postedJobData, "data male bhetat aahe");

  return (
    <div>
      {postedJobData &&
        postedJobData.map((item, index) => (
          <div className="container mycontainer mt-5 p-2 " key={item._id}>
            <img src="./applied.png" alt="no photo" />

            <div className="container__text">
              <h1>{item.title}</h1>
              <p>{item.companyname}</p>
              <p className="text-primary">
                <a onClick={() => viewDetails(item._id)}>view Details</a>
              </p>
              {showDetails === item._id && (
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
                  <ul>
                    <li>
                      <h4
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="If status is Accepted you can expect a call"
                      >
                        {" "}
                        Application Status :{" "}
                        {status.map((element) =>
                          element.intern === item._id
                            ? element.status
                              ? "Accepted"
                              : "Processing"
                            : ""
                        )}
                      </h4>
                    </li>
                  </ul>
                </div>
              )}

              {/* <button className="btn" onClick={()=>applyJob(item._id)}>
     Apply <i className="fa fa-arrow-right" />
    </button> */}
            </div>

            <div>
              {status.map((element) =>
                element.intern === item._id ? (
                  element.status ? (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => {navigatingTo(`/exam/${item._id}`); setShowResume("exam")}}
                      >
                        Exam
                      </button>
                    </>
                  ) : (
                    "Processing"
                  )
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ViewAppliedJobs;
