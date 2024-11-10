import React from "react";
import "../css/register.css";
import { useForm } from "react-hook-form";
import axiosapi from "../axiosapi";
import { toast } from "react-hot-toast";
const PostJobs = () => {
  const postform = useForm();
  const compId = sessionStorage.getItem("compId");
  const postjobfunc = async (data) => {
    try {
      const res = await axiosapi.post(`company/intern/${compId}`, data);
      console.log(res, "company post");
      toast.success(
        "Job Post created Successfully. it will be posted once it is approved"
      );
    } catch (error) {
      toast.error(error.response.data.errors[0]?.msg);
      console.log(error.response.data.errors[0]?.msg, "error");
      error.response.data.errors[0]?.msg;
    }
  };
  return (
    <div>
      <div className="container-fluid   ">
        <div className="row d-flex justify-content-center align-items-center h-100 container-fluid ">
          <div className="col-12 m-3 d-flex justify-content-center align-items-center w-75">
            <div
              className="card card-registration card-registration-2 mt-lg-5 shadow-lg mb-5 bg-white rounded"
              style={{
                borderRadius: "15px",
                position: "relative",
                top: "60px",
              }}
            >
              <form onSubmit={postform.handleSubmit(postjobfunc)}>
                <div className="card-body p-0">
                  <div className="row ">
                    {/* will need changes */}
                    <div className=" col-md-6 p-5 bg-white ">
                      <h3
                        className="fw-normal mb-5"
                        style={{ color: "#4835d4" }}
                      >
                        Company Details
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="fname" className=" form-label ">
                            Company Name
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            id="fname"
                            {...postform.register("companyname")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Industry Type</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("Industry_Type")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">
                            Branch Name/Location
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            placeholder="provide google map link"
                            {...postform.register("location")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Shift Timing</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("Shifts")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Office Timing</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("time")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">
                            Hired to be in Department
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("Department")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label">Employment Type</label>
                          <select
                            name=""
                            id=""
                            className=" form-select"
                            {...postform.register("Employment_Type")}
                          >
                            <option value="">choose</option>
                            <option value="Part-Time">Part-Time </option>
                            <option value="Full-Time">Full-Time </option>
                            <option value="Work-From-Home">
                              Work-From-Home
                            </option>
                          </select>
                        </div>
                        {/* <div className="col-md-6">
                          <label className=" form-label ">Email</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("email")}
                          />
                        </div> */}
                        <div className="col-md-12">
                          <label className=" form-label ">
                            Main Branch Address
                          </label>
                          <textarea
                            type="text"
                            className=" form-control "
                            {...postform.register("Address")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 bg-indigo p-5">
                      <h3
                        className="fw-normal mb-5 text-white"
                        style={{ color: "#4835d4" }}
                      >
                        Job/Intenship Detalis
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Title
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("title")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Role
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("role")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Total Vacancies
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("opening")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Education Required
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("Education")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className=" form-label text-white ">
                            Key Skills
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("Key_Skills")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Experience
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("experience")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Salary/Stipend
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...postform.register("salary")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className=" form-label text-white ">
                            Job Description{" "}
                            <span>
                              <small className=" text-white-50 ">
                                (Explain in detail )
                              </small>
                            </span>
                          </label>
                          <textarea
                            type="text"
                            className=" form-control "
                            {...postform.register("description")}
                          />
                        </div>
                        <div className="col-md-12 mt-3 text-center">
                          <button
                            type="submit"
                            className="btn btn-info text-white btn-lg"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
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

export default PostJobs;
