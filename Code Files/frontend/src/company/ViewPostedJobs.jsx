import React, { useEffect, useState } from "react";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UpdatePostedJobs from "./UpdatePostedJobs";

const ViewPostedJobs = () => {
  const [showDetails, setShowDetails] = useState("");
  const [postedJobData, setPostedJobData] = useState([]);
  const navigatingTo = useNavigate();
  const [showUpdatePostForm, setShowUpdatePostForm] = useState(true);
  const compId = sessionStorage.getItem("compId");
  const updatePosting = (id) => {
    sessionStorage.setItem("updateId", id);
    setShowUpdatePostForm(false);
  };
  const getData = async () => {
    try {
      const res = await axiosapi.get(`company/intern/${compId}`);
      console.log(res, "getting all posted jobs");
      setPostedJobData(res.data.job);
    } catch (error) {
      console.log(error, "not getting posted jobs");
    }
  };
  const deleteJob = async (id) => {
    try {
      const result = await axiosapi
        .delete(`company/intern/${compId}/${id}`)
        .then(toast.success("deleted Successfully"));
      navigatingTo("/companyhome");
      getData();
    } catch (error) {
      console.log(error, "delete Error");
    }
    //console.log(id, "idjk");
  };
  useEffect(() => {
    getData();
  }, []);
  const viewDetails = (id) => {
    setShowDetails(id);
  };

  //console.log(postedJobData, "data male bhetat aahe");

  return (
    <div style={{ marginTop: "70px" }}>
      {showUpdatePostForm &&
        Array.isArray(postedJobData) &&
        postedJobData.map((item) => (
          <div className="container mycontainer mt-5 p-2 " key={item._id}>
            <img src="./degree1.png" alt="no photo" />
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
                    <li>
                      Branch Name/Location: <a href=""> {item.location}</a>{" "}
                    </li>
                    <li>Shift Timing : {item.Shifts} </li>
                    <li>Office Timing: {} </li>
                    <li>Hired to be in Department: {item.Department}</li>
                    <li>Employment Type: {item.Employment_Type}</li>
                    <li>Email: {}</li>
                    <li>Main Branch Address: {item.Address}</li>
                  </ul>
                  <ul>
                    {" "}
                    <li>
                      <h4>
                        {" "}
                        Application Status :{" "}
                        {item.status ? "Accepted" : "Proccessing"}
                      </h4>
                    </li>
                  </ul>
                </div>
              )}
              <button
                type="button"
                style={{ backgroundColor: "red", borderRadius: "5px", color: "white", border: "white" }}
                onClick={() => deleteJob(item._id)}
              >
                Delete
              </button>

              <button className="btn" onClick={() => updatePosting(item._id)}>
                Update <i className="fa fa-arrow-right" />
              </button>
            </div>
          </div>
        ))}
      {!showUpdatePostForm && <UpdatePostedJobs />}
    </div>
  );
};

export default ViewPostedJobs;
