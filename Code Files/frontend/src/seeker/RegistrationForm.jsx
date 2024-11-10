import React, { useEffect, useState } from "react";
import "../css/register.css";
import UserNav from "./UserNav";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosapi from "../axiosapi";
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {
  const regForm = useForm();
  const { formState } = regForm;

  const [showExp, setShowExp] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [uploadResume, setUploadResume] = useState();
  const setImage = (e) => setSelectedImage(e.target.files[0]);
  const setResume = (e) => setUploadResume(e.target.files[0]);
  const id = sessionStorage.getItem("id");

  const navigateTo = useNavigate();
  const registration = async (data) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      formData.append("image", selectedImage);
      formData.append("resume", uploadResume);
      const res = await axiosapi.post(`/user/profile/${id}`, formData);
      console.log(res);
      toast.success("Successfully Data updated");
      navigateTo("/userhome");
    } catch (error) {
      toast.error("Error Occured please try again....!");
      console.log(error);
    }
    console.log(data);
  };

  const viewUser = async () => {
    try {
      const viewresuls = await axiosapi.get(`/user/profile/${id}`);
      console.log(viewresuls.data.userdata.profile, "userssss");
      regForm.setValue("firstname", viewresuls.data.userdata.profile.firstname);
      regForm.setValue("lastname", viewresuls.data.userdata.profile.lastname);
      regForm.setValue("email", viewresuls.data.userdata.profile.email);
      regForm.setValue("mobileno", viewresuls.data.userdata.profile.mobileno);
      regForm.setValue("address", viewresuls.data.userdata.profile.address);
      regForm.setValue("gender", viewresuls.data.userdata.profile.gender);
      // regForm.setValue("date_of_birth",viewresuls.data.userdata.profile.date_of_birth)
      // regForm.setValue("image",viewresuls.data.userdata.profile.image)
      regForm.setValue(
        "qualification",
        viewresuls.data.userdata.profile.qualification
      );
      regForm.setValue("college", viewresuls.data.userdata.profile.college);
      regForm.setValue("state", viewresuls.data.userdata.profile.state);
      regForm.setValue(
        "year_of_passing",
        viewresuls.data.userdata.profile.year_of_passing
      );
      regForm.setValue(
        "totalexperience",
        viewresuls.data.userdata.profile.totalexperience
      );
      regForm.setValue(
        "percentage",
        viewresuls.data.userdata.profile.percentage
      );
      regForm.setValue("about", viewresuls.data.userdata.profile.about);
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
                <form
                  onSubmit={regForm.handleSubmit(registration)}
                  encType="multipart/form-data"
                >
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
                            {...regForm.register("firstname")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Last Name</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...regForm.register("lastname")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Email</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...regForm.register("email")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label ">Mobile Number</label>
                          <input
                            type="text"
                            className=" form-control "
                            {...regForm.register("mobileno")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className=" form-label ">Address</label>
                          <textarea
                            type="text"
                            className=" form-control "
                            {...regForm.register("address")}
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
                              {...regForm.register("gender")}
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
                              {...regForm.register("gender")}
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
                            {...regForm.register("date_of_birth")}
                          />
                        </div>
                        <div className="col-md-12 mb-3">
                          <label className=" form-label ">Upload Photo</label>
                          <input
                            type="file"
                            className=" form-control form-control-lg "
                            onChange={setImage}
                            // {...regForm.register("image", {
                            //   required: 'Please choose a photo.',
                            //   validate: (value) => {
                            //     const allowedTypes = ['image/jpeg', 'image/png'];
                            //     const maxSizeMB = 2;

                            //     if (!value[0]) {
                            //       return 'Please choose a file.';
                            //     }

                            //     if (!allowedTypes.includes(value[0].type)) {
                            //       return 'Invalid file type. Please choose a JPEG or PNG image.';
                            //     }

                            //     if (value[0].size > maxSizeMB * 1024 * 1024) {
                            //       return `File size exceeds the maximum limit of ${maxSizeMB} MB.`;
                            //     }

                            //     return true;
                            //   },
                            // })}
                          />
                          {regForm.formState.errors.image && (
                            <p className="text-danger">
                              {regForm.formState.errors.image.message}
                            </p>
                          )}
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
                            {...regForm.register("qualification")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            College/Scool
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...regForm.register("college")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            State
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...regForm.register("state")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className=" form-label text-white ">
                            Year of Passing
                          </label>
                          <input
                            type="text"
                            className=" form-control "
                            {...regForm.register("year_of_passing")}
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
                            {...regForm.register("percentage", {
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
                          {regForm.formState.errors.percentage && (
                            <p className="text-danger">
                              {regForm.formState.errors.percentage.message}
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
                                {...regForm.register("organization")}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className=" form-label text-white ">
                                Designation
                              </label>
                              <input
                                type="text"
                                className=" form-control "
                                {...regForm.register("designation")}
                              />
                            </div>
                            <div className="col-md-3">
                              <label className=" form-label text-white ">
                                From Date
                              </label>
                              <input
                                type="date"
                                className=" form-control "
                                {...regForm.register("from_date")}
                              />
                            </div>
                            <div className="col-md-3">
                              <label className=" form-label text-white ">
                                To Date
                              </label>
                              <input
                                type="date"
                                className=" form-control "
                                {...regForm.register("to_date")}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className=" form-label text-white ">
                                Total Experience{" "}
                                <small className=" text-muted ">
                                  (In months)
                                </small>
                              </label>
                              <input
                                type="text"
                                className=" form-control "
                                {...regForm.register("totalexperience")}
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
                            accept=".pdf,.doc,.docx"
                            // {...regForm.register("resume", {
                            //   required: 'Please choose a resume file.',
                            //   validate: (value) => {
                            //     const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                            //     const maxSizeMB = 5;

                            //     if (!value[0]) {
                            //       return 'Please choose a file.';
                            //     }

                            //     if (!allowedTypes.includes(value[0].type)) {
                            //       return 'Invalid file type. Please choose a PDF or Word document.';
                            //     }

                            //     if (value[0].size > maxSizeMB * 1024 * 1024) {
                            //       return `File size exceeds the maximum limit of ${maxSizeMB} MB.`;
                            //     }

                            //     return true;
                            //   },
                            // })}
                          />
                          {regForm.formState.errors.resume && (
                            <p className="text-danger">
                              {regForm.formState.errors.resume.message}
                            </p>
                          )}
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
                            {...regForm.register("about")}
                          />
                        </div>
                        <div
                          className="col-md-12"
                          style={{ paddingLeft: "250px", marginTop: "" }}
                        >
                          <button type="submit" className="btn btn-primary btn-lg">
                            Submit
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

export default RegistrationForm;
