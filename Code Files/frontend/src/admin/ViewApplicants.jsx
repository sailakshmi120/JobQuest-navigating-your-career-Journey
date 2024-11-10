import React, { useEffect, useState } from "react";
import axiosapi, { baseURL } from "../axiosapi";
import { toast } from "react-toastify";

const ViewApplicants = () => {
  const [applications, setApplications] = useState();
  const [message, setMessage] = useState();
  const getApplicants = async () => {
    try {
      await axiosapi.get("/admin/applications").then((response) => {
        setApplications(response.data.applications);
        setMessage(response.data.message);
      });
    } catch (error) {
      console.log(error, "applications error");
    }
  };
  useEffect(() => {
    getApplicants();
  }, []);
  const downloadResume = (resume) => {
    // Assuming userProf.resume contains the URL of the resume file
    const resumeUrl = `${baseURL}resume/${resume}`;

    // Create an invisible anchor element
    const a = document.createElement("a");
    a.target = "_blank";
    a.style.display = "none";
    a.href = resumeUrl;
    a.download = "resume.pdf"; // Set the desired filename for the downloaded file

    // Append the anchor to the body and trigger the click event
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const acceptReject = async (val, userId, intern) => {
    try {
      await axiosapi
        .post(`admin/applications/${userId}/${intern}`, { status: val })
        .then((res) => {
          window.location.reload();
          toast("Application Sent to company");
          console.log(res, "accepted");
        });
    } catch (error) {
      console.log(error, "accept reject func");
    }
  };

  console.log(applications);

  return (
    <div>
      {applications ? (
        applications.map((item) => (
          <div className="container mycontainer mt-5 " key={item._id}>
            <div className="container__text">
              <p className="">
                Name: <strong>{item.fullname}</strong>
              </p>
              <p>
                Email: <strong>{item.email}</strong>
              </p>
              <p>
                Qualification: <strong>{item.qualification}</strong>
              </p>
              <p>
                Percentage: <strong>{item.percentage} % </strong>
              </p>
              <p className="text-primary">
                <a onClick={() => downloadResume(item.resume)} target="_blank">
                  view Resume
                </a>
              </p>

              {item.status ? (
                <button
                  className="mybutton rej"
                  onClick={() => acceptReject(false, item.user, item.intern)}
                >
                  Reject
                </button>
              ) : (
                <button
                  className="mybutton"
                  onClick={() => acceptReject(true, item.user, item.intern)}
                >
                  Accept
                </button>
              )}

              <p>
                {item.Address} , {item.mobileno}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-danger" style={{ marginTop: "7rem" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ViewApplicants;
