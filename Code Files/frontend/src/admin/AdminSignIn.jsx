import React, { useState } from "react";
import "../css/signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminNav from "./AdminNav";
import toast from "react-hot-toast";
const AdminSignIn = () => {
  const adminForm = useForm();
  const navigateTo = useNavigate();

  const signIn = (data) => {
    console.log(data);
    data.email == "admin@gmail.com" && data.password == "admin123"
      ? ""
      : console.log("failed");
    if (data.email == "admin@gmail.com" && data.password == "admin123") {
      toast.success("Logged in successful");
      navigateTo("/adminhome");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div >
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto mt-lg-5 ">
        <div className="card card0 border-0" style={{marginTop:"30px"}}>
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row">
                  {" "}
                  {/* logo Search Internship Portal*/}
                  <p className="logo text-danger ">Admin Sign In</p>
                  {/* <img src="https://i.imgur.com/CXQmsmF.png" className="logo" /> */}
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  {/* img*/}
                  <img src="./admin.jpg" className="image" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form onSubmit={adminForm.handleSubmit(signIn)}>
                <div className="card2 card border-0 px-4 py-5">
                  <div className="row px-3 mb-4">
                    <div className="line" />
                    <small className="or text-center">Login</small>
                    <div className="line" />
                  </div>
                  <div className="row px-3">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Email Address</h6>
                    </label>
                    <input
                      className="mb-4"
                      type="text"
                      name="email"
                      placeholder="Enter a valid email address"
                      {...adminForm.register("email")}
                    />
                  </div>
                  <div className="row px-3">
                    <label className="mb-1">
                      <h6 className="mb-0 text-sm">Password</h6>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      {...adminForm.register("password")}
                    />
                  </div>

                  <div className="row mb-3 px-3">
                    <button type="submit" className="btn btn-blue text-center">
                      Login
                    </button>
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

export default AdminSignIn;
