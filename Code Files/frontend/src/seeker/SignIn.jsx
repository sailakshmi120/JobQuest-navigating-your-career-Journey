import React, { useState } from "react";
import "../css/signin.css";
import { Link, useNavigate } from "react-router-dom";
import axiosapi from "../axiosapi";
import toast from "react-hot-toast";
import SignUp from "./SignUp";
import { useForm } from "react-hook-form";
import axios from "axios";
useNavigate;

const SignIn = () => {
  const [showForgetForm, setShowForgetForm] = useState(true);
  const signInForm = useForm();
  const forgetForm = useForm();
  const navigateTo = useNavigate();

  const signinFunc = async (data) => {
    console.log(data, "data");
    try {
      const res = await axiosapi.post("user/login", data);
      const id = res.data.checkUser._id;
      sessionStorage.setItem("id", id);
      console.log(res, "backend");
      res.status == 200 && navigateTo("/userhome");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const forgetfunc = async (data) => {
    try {
      const resfsf = await axiosapi.put("user/forgot", {
        email: data.email,
        password: data.password,
      });
      console.log(resfsf, "qiqwfhqpieir");
      toast.success("Password Changed Successfully");
      navigateTo("/");
      sessionStorage.setItem("id", "");
    } catch (error) {
      console.log(error);
      navigateTo("*");
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
                  <p className="logo text-info ">
                    <b>User Sign In</b>
                  </p>
                  {/* <img src="https://i.imgur.com/CXQmsmF.png" className="logo" /> */}
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  {/* img*/}
                  <img src="./signin.png" className="image" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/* Rendering signin  by default and on click forget password forget  form is there */}
              {showForgetForm ? (
                <form onSubmit={signInForm.handleSubmit(signinFunc)}>
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
                        {...signInForm.register("email")}
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
                        {...signInForm.register("password")}
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
                        <Link to="/signup" className="text-danger ">
                          Register
                        </Link>
                      </small>
                    </div>
                  </div>
                </form>
              ) : (
                //condition for forget password

                <form onSubmit={forgetForm.handleSubmit(forgetfunc)}>
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
                        {...forgetForm.register("email")}
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
                        {...forgetForm.register("password", {
                          required: "Password required",
                        })}
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
                        {...forgetForm.register("confirmpassword", {
                          required: "password required",
                          validate: (value) =>
                            value === forgetForm.watch("password") ||
                            "Passwords do not match",
                        })}
                      />
                      {forgetForm.formState.errors.confirmPassword && (
                        <p className="text-danger">
                          {forgetForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
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
                        <Link to="/signup" className="text-danger ">
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

export default SignIn;
