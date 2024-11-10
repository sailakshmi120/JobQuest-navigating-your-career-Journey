import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import UserNav from "./UserNav";

const qualificationsTypes = ["U G", "P G"];

const qualifications = [
  {
    type: "U G",
    qualification: ["B.Tech", "B.E", "B.Sc", "B.Com", "B.A", "B.B.A", "B.C.A"],
  },
  {
    type: "P G",
    qualification: ["M.Tech", "M.E", "M.Sc", "M.Com", "M.A", "M.B.A", "M.C.A"],
  },
];

const ApplyJob = () => {
  const { jobid } = useParams();
  const userid = sessionStorage.getItem("id");
  const [selectedImage, setSelectedImage] = useState();
  const navigateTo = useNavigate();
  const setImage = (e) => setSelectedImage(e.target.files[0]);

  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState();
  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   setSelectedImage(files);
  // };
  const applyform = useForm();
  const applyfunc = async (data) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      formData.append("resume", selectedImage);
      const ressultss = await axiosapi.post(
        `/user/apply/${userid}/${jobid}`,
        formData
      );
      console.log(ressultss, "apply");
      toast.success("Applied Successfully");
      navigateTo("/userhome");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.response.data.message);
    }
  };
  const id = sessionStorage.getItem("id");

  return (
    <div style={{ paddingTop: "30px" }}>
      <UserNav />
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className=" col-lg-7 my-5">
            <div className="card">
              <form
                onSubmit={applyform.handleSubmit(applyfunc)}
                encType="multipart/form-data"
              >
                <div className="card-body px-4 ">
                  <h1 className="text-center mb-4">Apply for a job</h1>
                  <div className="row align-items-center pt-4 pb-3">
                    <hr className=" my-3" />
                    <div className="col-md-3 ps-5 ">
                      <h6 className="mb-0">Full name</h6>
                    </div>
                    <div className="col-md-9 pe-5 ">
                      <input
                        type="text"
                        className="form-label"
                        {...applyform.register("fullname", {
                          required: "Required",
                        })}
                      />
                    </div>
                    <hr className=" my-3 " />

                    <div className="col-md-3 ps-5 ">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-md-9 pe-5 ">
                      <input
                        type="text"
                        {...applyform.register("email", {
                          required: "Required",
                        })}
                      />
                    </div>
                    <hr className="my-3" />

                    <div className="col-md-3 ps-5 ">
                      <h6 className="mb-0">Mobile Number</h6>
                    </div>
                    <div className="col-md-9 pe-5 ">
                      <input
                        type="text"
                        {...applyform.register("mobileno", {
                          required: "Required",
                        })}
                      />
                    </div>
                    <hr className="my-3" />

                    <div className="col-md-3 ps-5 ">
                      <h6 className="mb-0">Qualification Type</h6>
                    </div>
                    <div className="col-md-9 pe-5 ">
                      <select
                        className="form-select"
                        onChange={(e) => setSelectedType(e.target.value)}
                      >
                        <option value="">Select Qualification Type</option>
                        {qualificationsTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <hr className="my-3" />

                    <div className="col-md-3 ps-5 ">
                      <h6 className="mb-0">Qualification</h6>
                    </div>
                    <div className="col-md-9 pe-5 ">
                      <select
                        className="form-select"
                        {...applyform.register("qualification", {
                          required: "Required",
                        })}
                      >
                        <option value="">Select Qualification</option>
                        {qualifications
                          .find((q) => q.type === selectedType)
                          ?.qualification.map((qualification) => (
                            <option key={qualification} value={qualification}>
                              {qualification}
                            </option>
                          ))}
                      </select>
                    </div>
                    
                    <hr className="my-3" />

                    <div className="col-md-3 ps-5 ">
                      <h6 className="mb-0">Percentage</h6>
                    </div>
                    <div className="col-md-9 pe-5 ">
                      <input
                        type="number"
                        className=" form-control "
                        min={0}
                        max={100}
                        {...applyform.register("percentage", {
                          max: {
                            value: 100,
                            message: "Percentage should be less than 100",
                          },
                          min: {
                            value: 0,
                            message: "Percentage should be greater than 0",
                          },
                        })}
                      />
                      {applyform.formState.errors.percentage && (
                        <p className="text-danger">
                          {applyform.formState.errors.percentage.message}
                        </p>
                      )}
                    </div>
                    <hr className="my-3" />

                    <div className="col-md-3 ps-5 ">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-md-9 pe-5 ">
                      <textarea
                        type="text"
                        {...applyform.register("Address", {
                          required: "Required",
                        })}
                      />
                    </div>
                    <hr className="my-3" />

                    <div className="col-md-3 ps-5 ">
                      <h6 className="mb-0">Upload Resume</h6>
                    </div>
                    <div className="col-md-9 pe-5 ">
                      <input
                        type="file"
                        className="form-control"
                        //value={selectedImage}
                        onChange={setImage}
                        accept=".pdf,.doc,.docx"
                        required
                      />
                      <div className="small text-muted mt-2">
                        Upload your CV/Resume or any other relevant file. Max
                        file size 50 MB
                      </div>
                    </div>
                    <hr className="my-3" />
                    <div className="col-md-9 pe-5 ms-lg-auto ">
                      <button
                        className="my-4 btn btn-lg btn-primary"
                        type="submit"
                      >
                        Send Application
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
