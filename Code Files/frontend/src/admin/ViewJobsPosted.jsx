import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosapi from "../axiosapi";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";

const ViewJobsPosted = () => {
  const [showDetails, setShowDetails] = useState("");
  const [postedJobData, setPostedJobData] = useState([]);
  const navigatingTo = useNavigate();
  const approvePosting = async (id) => {
    try {
      const resssult = await axiosapi.post(`admin/admin/${id}`, {
        status: true,
      });
      // const myId=JSON.stringify(id)
      //sessionStorage.setItem("updateId",myId);
      //navigatingTo("/updatepostedjob");
      toast.success("Approved");
      console.log(resssult, "mcbvnbmxmv");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const getData = async () => {
    try {
      const res = await axiosapi.get("admin/intern");
      console.log(res.data.interns, "backenjjfj");
      setPostedJobData(res.data.interns);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectJob = async (id) => {
    try {
      const resssult = await axiosapi.post(`admin/admin/${id}`, {
        status: false,
      });
      console.log(resssult, "datas");
      toast.success("Rejected");
      // navigatingTo("/companyhome")
    } catch (error) {
      console.log(error);
    }
    console.log(id, "idjk");
  };
  useEffect(() => {
    getData();
  }, []);
  const viewDetails = (id) => {
    setShowDetails(id);
  };

  return (
    <div>
      {postedJobData &&
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
              {/* {item.status? <button type='button' style={{backgroundColor:"red", borderRadius:"5px"}}
    onClick={()=>rejectJob(item._id)}
    >Reject</button>:<p className='text-danger'>Already Rejected</p>} */}
              {item.status ? (
                <button
                  className="btn"
                  onClick={() => approvePosting(item._id)}
                  disabled
                >
                  <i className="fa fa-arrow-right" />
                  Approved
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => approvePosting(item._id)}
                >
                  Approve <i className="fa fa-arrow-right" />
                </button>
              )}
              {/* <button className="btn" onClick={()=>approvePosting(item._id)}>
     Approve <i className="fa fa-arrow-right" />
    </button> */}
            </div>
          </div>
        ))}
      <ToastContainer />
    </div>
  );
};

export default ViewJobsPosted;
