import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";
const CompanySignIn = () => {
  const [showForgetForm, setShowForgetForm] = useState(true);
  const companySignInForm = useForm();
  const forgetCompanyForm = useForm();
  const navigateTo = useNavigate();
  const companysignin = async (data) => {
    try {
      const res = await axiosapi.post("company/login", data);
      console.log(res, "log data");
      const compId = res.data.checkUser._id;
      sessionStorage.setItem("compId", compId);
      res.status === 200 && navigateTo("/companyhome");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error, "msg");
      toast.error(error.response.data.message);
    }
  };

  const companyForget = async (data) => {
    try {
      const myres = await axiosapi.put("company/forgot", {
        email: data.email,
        password: data.password,
      });
      console.log(myres);
      toast.success("Password Changed successfully");
      navigateTo("/");
      sessionStorage.setItem("compId", "");
    } catch (error) {
      toast.error("something went wrong.....?");
      console.error(error);
    }
  };
  return (
    <div>
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto mt-5 ">
        <div className="card card0 border-0" style={{marginTop:"30px"}}>
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row">
                  {" "}
                  {/* logo*/}
                  <p className="logo text-warning ">Company Sign In </p>
                  {/* <img src="https://i.imgur.com/CXQmsmF.png" className="logo" /> */}
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  {/* img*/}
                  <img src="./company.jpg" className="image" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/* Rendering signin  by default and on click forget password forget  form is there */}
              {showForgetForm ? (
                <form onSubmit={companySignInForm.handleSubmit(companysignin)}>
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
                        {...companySignInForm.register("email")}
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
                        {...companySignInForm.register("password")}
                      />
                    </div>
                    <div className="row px-3 mb-4">
                      <a
                        className="ml-auto mb-0 text-sm"
                        onClick={() => setShowForgetForm(false)}
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="row mb-3 px-3">
                      <button
                        type="submit"
                        className="btn btn-blue text-center"
                      >
                        Login
                      </button>
                    </div>
                    <div className="row mb-4 px-3">
                      <small className="font-weight-bold">
                        Don't have an account?{" "}
                        <Link to="/companySignUp" className="text-danger ">
                          Register
                        </Link>
                      </small>
                    </div>
                  </div>
                </form>
              ) : (
                //condition for forget password
                <form onSubmit={forgetCompanyForm.handleSubmit(companyForget)}>
                  <div className="card2 card border-0 px-4 py-5">
                    <div className="row px-3 mb-4">
                      <div className="line" />
                      <small className="or text-center">Forget </small>
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
                        {...forgetCompanyForm.register("email")}
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
                        {...forgetCompanyForm.register("password")}
                      />
                    </div>
                    <div className="row px-3">
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">Confirm Password</h6>
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        {...forgetCompanyForm.register("confirmpassword")}
                      />
                    </div>
                    <div className="row px-3 mb-4">
                      {/* <a href="#" className="ml-auto mb-0 text-sm" onClick={()=>setShowForgetForm(false)}>
            Forgot Password?
          </a> */}
                    </div>
                    <div className="row mb-3 px-3">
                      <button
                        type="submit"
                        className="btn btn-blue text-center"
                      >
                        Change Password
                      </button>
                    </div>
                    <div className="row mb-4 px-3">
                      <small className="font-weight-bold">
                        Don't have an account?{" "}
                        <Link to="/companySignUp" className="text-danger ">
                          Register
                        </Link>
                      </small>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          {/* <div className="bg-blue py-4">
      <div className="row px-3">
        <small className="ml-4 ml-sm-5 mb-2">
          Copyright © 2024. All rights reserved.
        </small>
        <div className="social-contact ml-4 ml-sm-auto">
          <span className="fa fa-facebook mr-4 text-sm" />
          <span className="fa fa-google-plus mr-4 text-sm" />
          <span className="fa fa-linkedin mr-4 text-sm" />
          <span className="fa fa-twitter mr-4 mr-sm-5 text-sm" />
        </div>
      </div>
    </div> */}
        </div>
      </div>
    </div>
  );
};

export default CompanySignIn;
