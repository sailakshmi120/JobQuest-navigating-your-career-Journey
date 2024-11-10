import React, { useEffect } from "react";
import "../css/register.css";
import { useForm } from "react-hook-form";
import axiosapi from "../axiosapi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CompanyNav from "./CompanyNav";
const UpdatePostedJobs = () => {
  const updatePostform = useForm();
  const compId = sessionStorage.getItem("compId");
  const updateId = sessionStorage.getItem("updateId");
  const navigationTo = useNavigate();
  const { setValue } = updatePostform;
  const updatepostjobfunc = async (data) => {
    try {
      const res = await axiosapi.put(
        `company/intern/${compId}/${updateId}`,
        data
      );
      console.log(res, "company post");
      toast.success(
        "Job Post Updated Successfully. it will be posted once it is approved"
      );
      navigationTo("/companyhome");
    } catch (error) {
      toast.error();
      console.log(error, "up err");
      error.response.data.errors.map((item) => toast.error(item.msg));
    }
    console.log(data);
  };

  const getPostedJobs = async () => {
    try {
      const upres = await axiosapi.get(`company/intern/${compId}/${updateId}`);
      console.log(upres.data.interns, "fhksjdkjalsjS");
      for (let [key, value] of Object.entries(upres.data.interns)) {
        setValue(key, value);
      }
      // setValue("companyname",upres.data.job.companyname);
      // setValue("location",upres.data.job.location);
      // setValue("Shifts",upres.data.job.Shifts);
      // setValue("Department",upres.data.job.Department);
      // setValue("Employment_Type",upres.data.job.Employment_Type);
      // setValue("email",upres.data.job.email);
      // setValue("Address",upres.data.job.Address);
      // setValue("title",upres.data.job.title);
      // setValue("role",upres.data.job.role);
      // setValue("opening",upres.data.job.opening);
      // setValue("Education",upres.data.job.Education);
      // setValue("Key_Skills",upres.data.job.Key_Skills);
      // setValue("experience",upres.data.job.experience);
      // setValue("salary",upres.data.job.salary);
      // setValue("companyname",upres.data.job.description);
    } catch (error) {
      console.log(error, "update err");
    }
  };
  useEffect(() => {
    getPostedJobs();
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center h-100 container-fluid">
          <div className="col-12 m-3 d-flex justify-content-center align-items-center w-75">
            <div
              className="card card-registration card-registration-2 mt-lg-5 shadow-lg mb-5 bg-white rounded"
              style={{
                borderRadius: "15px",
                position: "relative",
                // top: "50px",
              }}
            >
              <form onSubmit={updatePostform.handleSubmit(updatepostjobfunc)}>
                <div className="card-body p-0">
                  <div className="row">
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
                            {...updatePostform.register("companyname")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Industry Type</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("Industry_Type")}
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
                            {...updatePostform.register("location")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Shift Timing</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("Shifts")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Office Timing</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("time")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">
                            Hired to be in Department
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("Department")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label">Employment Type</label>
                          <select
                            name=""
                            id=""
                            className=" form-select"
                            {...updatePostform.register("Employment_Type")}
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
                        <input type="text" className=" form-control " 
                          {...updatePostform.register("email")}
                          />
                      </div> */}
                        <div className="col-md-12">
                          <label className=" form-label ">
                            Main Branch Address
                          </label>
                          <textarea
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("Address")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 bg-indigo p-5">
                      <h3
                        className="fw-normal mb-5 text-white"
                        style={{ color: "#4835d4" }}
                      >
                        Internship Detalis
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Title
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("title")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Role
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("role")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Total Vacancies
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("opening")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Education Required
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("Education")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className=" form-label text-white ">
                            Key Skills
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("Key_Skills")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Experience
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("experience")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Salary/Stipend
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("salary")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className=" form-label text-white ">
                            Job Description{" "}
                            <span>
                              {" "}
                              <small className=" text-white-50 ">
                                (Explain in detail )
                              </small>
                            </span>
                          </label>
                          <textarea
                            type="text"
                            className=" form-control "
                            {...updatePostform.register("description")}
                          />
                        </div>
                        <div className="col-md-12 mt-3 text-center">
                          <button
                            type="submit"
                            className="btn btn-info text-white btn-lg"
                          >
                            Update
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

export default UpdatePostedJobs;
