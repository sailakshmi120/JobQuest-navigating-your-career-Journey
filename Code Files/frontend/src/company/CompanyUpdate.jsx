import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axiosapi from '../axiosapi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CompanyUpdate = () => {
    const companyUpdateForm=useForm();
    const compId= sessionStorage.getItem("compId")
    const navigates=useNavigate();
    // const [companyData, setcompanyData]=useState();
const {setValue}=companyUpdateForm;
    const getCompData=async()=>{
        try {
            const ressult= await axiosapi.get(`company/profile/${compId}`);
            console.log(ressult.data.company, "companies");
          for(let [key, value] of Object.entries(ressult.data.company)){
            setValue(key, value)
          }
            

        } catch (error) {
           console.error(error,"getting appi error");
        }
    }
    useEffect(()=>{
        getCompData();
    })
    const companysUpdate=async(data)=>{
        try {
            const ress=await axiosapi.put(`company/profile/${compId}`,data);
            console.log(ress);
            toast.success("Details Updated")
            navigates("/");
        } catch (error) {
toast.error("Something went wrong")
            //console.log(error);
            console.error(error);
        }

    }
  return (
    <div>
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
<div className="card card0 border-0">
<div className="row d-flex">
  <div className="col-lg-6">
    <form onSubmit={companyUpdateForm.handleSubmit(companysUpdate)} >
    <div className="card2 card border-0 px-4 py-5">
      
      <div className="row px-3 mb-4">
        <div className="line" />
        <small className="or1 text-center">Update</small>
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
        
          {...companyUpdateForm.register("companyname")}

        />
      </div>
      <div className="row px-3">
        <label className="mb-1">
          <h6 className="mb-0 text-sm">Role</h6>
        </label>
        <select
          className="mb-4 form-select"
         
          name="role"
          {...companyUpdateForm.register("role")}
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
          {...companyUpdateForm.register("email")}

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
          {...companyUpdateForm.register("password")}

        />
      </div>
      <div className="row px-3 mb-4">
       
        {/* <a href="#" className="ml-auto mb-0 text-sm">
          Forgot Password?
        </a> */}
      </div>
      <div className="row mb-3 px-3">
        <button type="submit" className="btn btn-blue text-center">
       Update
        </button>
      </div>
      
    </div>
    </form>
  </div>
  <div className="col-lg-6">
  <div className="card1 pb-5">
      <div className="row">
        <p className="logo text-danger h5"> </p>

       
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
  )
}

export default CompanyUpdate