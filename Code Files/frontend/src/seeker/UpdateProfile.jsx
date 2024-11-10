import React, { useEffect, useState } from "react";
import "../css/register.css";
import UserNav from "./UserNav";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosapi from "../axiosapi";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const updateForm = useForm();
  const [showExp, setShowExp] = useState(false);
  const navigateTo = useNavigate();
  const id = sessionStorage.getItem("id");
  const [selectedImage, setSelectedImage] = useState();
  const [uploadResume, setUploadResume] = useState();
  const setImage = (e) => setSelectedImage(e.target.files[0]);
  const setResume = (e) => setUploadResume(e.target.files[0]);

  const UpadateFunc = async (data) => {
    console.log(id, "majhi id");
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      formData.append("image", selectedImage);
      formData.append("resume", uploadResume);

      console.log(formData, "formdatas");
      const res = await axiosapi.put(`/user/profile/${id}`, formData);
      console.log(res);
      toast.success("Successfully Data updated");
      navigateTo("/userhome");
    } catch (error) {
      toast.error("Error Occured please try again....!");
      console.log(error);
    }
  };

  const viewUser = async () => {
    try {
      const viewresuls = await axiosapi.get(`/user/profile/${id}`);
      console.log(viewresuls.data.userdata.profile, "userssss");
      for (const [key, value] of Object.entries(
        viewresuls.data.userdata.profile
      )) {
        updateForm.setValue(key, value);
      }
      // updateForm.setValue("firstname", viewresuls.data.userdata.profile.firstname);
      // updateForm.setValue("lastname", viewresuls.data.userdata.profile.lastname);
      // updateForm.setValue("email", viewresuls.data.userdata.profile.email);
      // updateForm.setValue("mobileno", viewresuls.data.userdata.profile.mobileno);
      // updateForm.setValue("address", viewresuls.data.userdata.profile.address);
      // updateForm.setValue("gender", viewresuls.data.userdata.profile.gender);
      // // updateForm.setValue("date_of_birth",viewresuls.data.userdata.profile.date_of_birth)
      // // updateForm.setValue("image",viewresuls.data.userdata.profile.image)
      // updateForm.setValue(
      //   "qualification",
      //   viewresuls.data.userdata.profile.qualification
      // );
      // updateForm.setValue("college", viewresuls.data.userdata.profile.college);
      // updateForm.setValue("state", viewresuls.data.userdata.profile.state);
      // updateForm.setValue("about", viewresuls.data.userdata.profile.about);
      // updateForm.setValue(
      //   "year_of_passing",
      //   viewresuls.data.userdata.profile.year_of_passing
      // );
      // updateForm.setValue(
      //   "totalexperience",
      //   viewresuls.data.userdata.profile.totalexperience
      // );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    viewUser();
  }, []);
  return (
    <>
      <div className="container-fluid h-custom bg-info  ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 m-3 ">
            <div
              className="card card-registration card-registration-2 mt-lg-5"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <form onSubmit={updateForm.handleSubmit(UpadateFunc)}>
                  <div className="row">
                    {/* will need changes */}
                    <div className=" col-md-6 p-5 bg-white ">
                      <h3
                        className="fw-normal mb-5"
                        style={{ color: "#4835d4" }}
                      >
                        Personal Infomation
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="fname" className=" form-label ">
                            First Name
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            id="fname"
                            {...updateForm.register("firstname")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Last Name</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updateForm.register("lastname")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Email</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updateForm.register("email")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Mobile Number</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updateForm.register("mobileno")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className=" form-label ">Address</label>
                          <textarea
                            type="text"
                            className=" form-control "
                            {...updateForm.register("address")}
                          />
                        </div>
                        {/* <div className="col-md-6">
                        <label className=" form-label ">
                          Aletrnate Mobile Number
                        </label>
                        <input type="text" className=" form-control " />
                      </div> */}
                        <div className="col-md-6">
                          <label className="form-check-label" htmlFor="male">
                            Gender
                          </label>
                          <div
                            className="form-check form-check-inline"
                            style={{ paddingLeft: "30px", marginTop: "35px" }}
                          >
                            <input
                              type="radio"
                              className="form-check-input"
                              name="gender"
                              id="male"
                              value={"male"}
                              {...updateForm.register("gender")}
                            />
                            <label className="form-check-label" htmlFor="male">
                              Male
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="gender"
                              id="female"
                              value={"female"}
                              {...updateForm.register("gender")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="female"
                            >
                              Female
                            </label>
                          </div>
                        </div>

                        {/* <div className="col-md-6">
                        <label className=" form-label ">Father Full Name</label>
                        <input type="text" className=" form-control " />
                      </div> */}
                        <div className="col-md-6">
                          <label className=" form-label ">Date of Birth</label>
                          <input
                            type="date"
                            className=" form-control "
                            {...updateForm.register("date_of_birth")}
                          />
                        </div>
                        <div className="col-md-12 mb-3">
                          <label className=" form-label ">Upload Photo</label>
                          <input
                            type="file"
                            className=" form-control form-control-lg "
                            onChange={setImage}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 bg-indigo p-5">
                      <h3
                        className="fw-normal mb-5 text-white"
                        style={{ color: "#4835d4" }}
                      >
                        Qualification Details
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Degree/Diploma
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updateForm.register("qualification")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            College/Scool
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updateForm.register("college")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            State
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updateForm.register("state")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Year of Passing
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...updateForm.register("year_of_passing")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Percentage/GPA
                          </label>
                          <input
                            type="number"
                            className=" form-control "
                            min={0}
                            max={100}
                            {...updateForm.register("percentage", {
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
                          {updateForm.formState.errors.percentage && (
                            <p className="text-danger">
                              {updateForm.formState.errors.percentage.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label
                            className="form-check-label text-white"
                            htmlFor="male"
                          >
                            Experienced
                          </label>
                          <div
                            className="form-check form-check-inline"
                            style={{ paddingLeft: "30px", marginTop: "35px" }}
                          >
                            <input
                              type="radio"
                              className="form-check-input"
                              name="experience"
                              id="yes"
                              onClick={() => setShowExp(true)}
                            />
                            <label
                              className="form-check-label text-white"
                              htmlFor="yes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="experience"
                              id="No"
                              onClick={() => setShowExp(false)}
                            />
                            <label
                              className="form-check-label text-white"
                              htmlFor="No"
                            >
                              No
                            </label>
                          </div>
                        </div>
                        {showExp && (
                          <div className="row">
                            <div className="col-md-6">
                              <label className=" form-label text-white ">
                                Organization
                              </label>
                              <input
                                type="text"
                                className=" form-control "
                                {...updateForm.register("organization")}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className=" form-label text-white ">
                                Designation
                              </label>
                              <input
                                type="text"
                                className=" form-control "
                                {...updateForm.register("designation")}
                              />
                            </div>
                            <div className="col-md-3">
                              <label className=" form-label text-white ">
                                From Date
                              </label>
                              <input
                                type="date"
                                className=" form-control "
                                {...updateForm.register("from_date")}
                              />
                            </div>
                            <div className="col-md-3">
                              <label className=" form-label text-white ">
                                To Date
                              </label>
                              <input
                                type="date"
                                className=" form-control "
                                {...updateForm.register("to_date")}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className=" form-label text-white ">
                                Total Experience
                              </label>
                              <input
                                type="text"
                                className=" form-control "
                                {...updateForm.register("totalexperience")}
                              />
                            </div>
                          </div>
                        )}
                        <div className="col-md-12 mb-3">
                          <label className=" form-label text-white">
                            Upload Resume
                          </label>
                          <input
                            type="file"
                            className=" form-control form-control-lg "
                            onChange={setResume}
                            accept=".pdf"
                          />
                        </div>
                        <div className="col-md-12">
                          <label className=" form-label text-white ">
                            About You{" "}
                            <span>
                              {" "}
                              <small className=" text-white-50 ">
                                (Explain in detail employer will see it)
                              </small>
                            </span>
                          </label>
                          <textarea
                            type="text"
                            className=" form-control "
                            {...updateForm.register("about")}
                          />
                        </div>
                        <div
                          className="col-md-12"
                          style={{ paddingLeft: "250px", marginTop: "" }}
                        >
                          <button type="submit" className="btn btn-primary btn-lg">
                            Update
                          </button>
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
    </>
  );
};

export default UpdateProfile;
