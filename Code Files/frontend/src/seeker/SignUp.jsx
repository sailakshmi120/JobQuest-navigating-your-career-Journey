import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signin.css";
import { useForm } from "react-hook-form";
import axiosapi from "../axiosapi";
import { toast } from "react-hot-toast";
const SignUp = () => {
  const signUpForm = useForm();
  const navigateTo=useNavigate()
  const signUpfunc = async (data) => {
    try {
      const res = await axiosapi.post("/user/register", data);
      console.log(res.data.message);
      toast.success(res.data.message);
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <div>
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
          <div className="card card0 border-0">
            <div className="row d-flex">
              <div className="col-lg-6">
                <form onSubmit={signUpForm.handleSubmit(signUpfunc)}>
                  <div className="card2 card border-0 px-4 py-5">
                    <div className="row px-3 mb-4">
                      <div className="line" />
                      <small className="or text-center">Signup</small>
                      <div className="line" />
                    </div>
                    <div className="row px-3">
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">Full Name</h6>
                      </label>
                      <input
                        className="mb-4"
                        type="text"
                        name="email"
                        placeholder="Enter a Full Nme"
                        {...signUpForm.register("fullname")}
                      />
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
                        {...signUpForm.register("email", {
                          required: "required",
                        })}
                      />
                      <p className=" text-danger ">
                        {signUpForm.formState.errors.email &&
                          signUpForm.formState.errors.email.message}
                      </p>
                    </div>
                    <div className="row px-3">
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">Password</h6>
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        {...signUpForm.register("password", {
                          required: "Password required",
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=<>?])[a-zA-Z0-9!@#$%^&*()-_+=<>?]{8,}$/,
                            message: `Minimum length should be 8 charecter,
                  At least one special charecter,
                  and At least one capital letter`,
                          },
                        })}
                      />
                      <p className=" text-danger ">
                        {signUpForm.formState.errors.password &&
                          signUpForm.formState.errors.password.message}
                      </p>
                    </div>
                    <div className="row px-3 mb-4">
                      {/* <a href="#" className="ml-auto mb-0 text-sm">
              Forgot Password?
            </a> */}
                    </div>
                    <div className="row mb-3 px-3">
                      <button
                        type="submit"
                        className="btn btn-blue text-center"
                      >
                        SignUp
                      </button>
                    </div>
                    <div className="row mb-4 px-3">
                      <small className="font-weight-bold">
                        Already have an account?{" "}
                        <Link className="text-danger" to="/signin">
                          Sign In
                        </Link>
                      </small>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <div className="card1 pb-5">
                  <div className="row">
                    <p className="logo">Search Internship Portal</p>

                    {/* <img src="https://i.imgur.com/CXQmsmF.png" className="logo" /> */}
                  </div>
                  <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                    <img src="./signin.png" className="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
