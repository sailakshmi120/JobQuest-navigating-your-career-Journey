import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import axiosapi from '../axiosapi';
import toast from 'react-hot-toast';

const CompanySignUp = () => {
  const companySignUpForm=useForm();
  const  navigateTo=useNavigate()
  const companysignup=async(data)=>{
   try {
    const res= await axiosapi.post("company/register", data);
    console.log(res.data.message, "backend comp");
    console.log(data);
    toast.success(res.data.message);
    navigateTo("/")
   } catch (error) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message)
   }
  }
  return (
    <div>
    <div>
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
<div className="card card0 border-0">
<div className="row d-flex">
  <div className="col-lg-6">
    <form onSubmit={companySignUpForm.handleSubmit(companysignup)} >
    <div className="card2 card border-0 px-4 py-5">
      
      <div className="row px-3 mb-4">
        <div className="line" />
        <small className="or text-center">Signup</small>
        <div className="line" />
      </div>
      <div className="row px-3">
        <label className="mb-1">
          <h6 className="mb-0 text-sm">Company Name</h6>
        </label>
        <input
          className="mb-4"
          type="text"
          name="email"
        
          {...companySignUpForm.register("companyname")}

        />
      </div>
      <div className="row px-3">
        <label className="mb-1">
          <h6 className="mb-0 text-sm">Role</h6>
        </label>
        <select
          className="mb-4 form-select"
         
          name="role"
          {...companySignUpForm.register("role")}
        >
            <option value="">Choose</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="CEO">CEO</option>
            <option value="Owner">Owner</option>
        </select>
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
          {...companySignUpForm.register("email")}

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
          {...companySignUpForm.register("password")}

        />
      </div>
      <div className="row px-3 mb-4">
       
        {/* <a href="#" className="ml-auto mb-0 text-sm">
          Forgot Password?
        </a> */}
      </div>
      <div className="row mb-3 px-3">
        <button type="submit" className="btn btn-blue text-center">
          SignUp
        </button>
      </div>
      <div className="row mb-4 px-3">
        <small className="font-weight-bold">
          Already have an account? <Link className="text-danger" to="/companySignIn">Sign In</Link>
        </small>
      </div>
    </div>
    </form>
  </div>
  <div className="col-lg-6">
  <div className="card1 pb-5">
      <div className="row">
        <p className="logo text-danger h5">Company Sign Up</p>

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
  )
}

export default CompanySignUp