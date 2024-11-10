import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./seeker/RegistrationForm";

import Practice from "./seeker/Practice";
import SignIn from "./seeker/SignIn";
import Footer from "./seeker/Footer";
import SignUp from "./seeker/SignUp";
import Profile from "./seeker/Profile";
import AdminHome from "./admin/AdminHome";
import { Toaster } from "react-hot-toast";
import CompanySignIn from "./company/CompanySignIn";
import CompanySignUp from "./company/CompanySignUp";
import UserHome from "./seeker/UserHome";
import CompanyHome from "./company/CompanyHome";
import Home from "./Home";
import CompanyUpdate from "./company/CompanyUpdate";
import UpdatePostedJobs from "./company/UpdatePostedJobs";
import ApplyJob from "./seeker/ApplyJob";
import ErrorPage from "./ErrorPage";
import ErrorBoundary from "./ErrorBoundary";
import UpdateProfile from "./seeker/UpdateProfile";
import { ToastContainer } from "react-toastify";
import AddQuestions from "./company/AddQuestions";
import Exam from "./seeker/Exam";
function App() {

  return (
    <>
      <div className="pic main-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />}></Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/companySignIn" element={<CompanySignIn />} />
            <Route path="/companySignUp" element={<CompanySignUp />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/userhome" element={<UserHome />} />
            <Route path="/reg" element={<RegistrationForm />}></Route>
            <Route path="/applyform/:jobid" element={<ApplyJob />} />

            <Route path="/addQuestions" element={<AddQuestions />} />
            <Route path="/exam/:id" element={<Exam />} />

            <Route path="/adminhome" element={<AdminHome />} />

            {/* Company Routes */}
            <Route path="/companyhome" element={<CompanyHome />} />
            <Route path="/companyupdate" element={<CompanyUpdate />} />
            <Route path="/updatepostedjob" element={<UpdatePostedJobs />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}
// {/* */}
export default () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
