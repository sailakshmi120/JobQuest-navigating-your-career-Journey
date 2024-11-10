import React, { useEffect, useState } from "react";
import "../css/resume.css";
import axiosapi, { baseURL } from "../axiosapi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UpdateProfile from "./UpdateProfile";
const Profile = () => {
  const [userProf, setUserProf] = useState(null);
  const [showUpdateForm, setShowForm] = useState(true);
  const navigator = useNavigate();
  const id = sessionStorage.getItem("id");
  const viewUser = async () => {
    try {
      const viewresuls = await axiosapi.get(`/user/profile/${id}`);
      setUserProf(viewresuls.data.userdata.profile);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile = () => {
    setShowForm(false);
  };

  const userLogout = (id) => {
    toast.success("");
    sessionStorage.removeItem("id");
    navigator("/");
  };
  useEffect(() => {
    viewUser();
  }, []);
  const downloadResume = () => {
    // Assuming userProf.resume contains the URL of the resume file
    const resumeUrl = `${baseURL}uploads/${userProf.resume}`;

    // Create an invisible anchor element
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = resumeUrl;
    a.download = "resume.pdf"; // Set the desired filename for the downloaded file

    // Append the anchor to the body and trigger the click event
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <div style={{ paddingTop: "50px" }}>
        {userProf && showUpdateForm ? (
          <div className="rela-block page">
            <div className="rela-block top-bar">
              <div className="caps name">
                <div className="abs-center">
                  {userProf.firstname} {userProf.lastname}{" "}
                </div>
              </div>
            </div>
            <div className="side-bar">
              <div className="mugshot">
                <div className="logo">
                  {/* <svg viewBox="0 0 80 80" className="rela-block logo-svg">
                    <path
                      d="M 10 10 L 52 10 L 72 30 L 72 70 L 30 70 L 10 50 Z"
                      strokeWidth="2.5"
                      fill="none"
                    />
                  </svg> */}
                  <img
                    src={`${baseURL}uploads/${userProf.image}`}
                    alt="./companyuser.jpg"
                    className="rela-block logo-svg"
                  />
                </div>
              </div>
              <p>
                <h3>Address Details</h3>
              </p>
              <p>Mobile No:- {userProf.mobileno}</p>

              <p>Email:- {userProf.email}</p>
              <p>
                Date of birth:-
                {new Date(userProf.date_of_birth).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
              </p>
              <button
                className="btn btn-secondary "
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Download resume"
                onClick={downloadResume}
              >
                Resume<i className="fa-regular fa-file"></i>
              </button>
              <br />
            </div>
            <div className="rela-block content-container">
              <h2 className="rela-block caps title">Profile</h2>
              <div className="rela-block separator" />
              <div className="rela-block caps greyed">About Me</div>
              <p className="long-margin">
                {userProf.about}
                {/* chillwave dreamcatcher hella wolf paleo. Knausgaard semiotics truffaut
        cornhole hoodie, YOLO meggings gochujang tofu. Locavore ugh kale chips
        iPhone biodiesel typewriter freegan, kinfolk brooklyn kitsch man bun.
        Austin neutra etsy, lumbersexual paleo cornhole sriracha kinfolk
        meggings kickstarter.{" "} */}
              </p>
              <div className="rela-block caps greyed">Qualification</div>
              <h3>Degree</h3>
              <p className="light">{userProf.qualification}</p>
              <p className="justified">
                <ul>
                  <li>College: {userProf.college}</li>
                  <li>Year Of Passing:- {userProf.year_of_passing}</li>
                </ul>
                {/* denim messenger bag leggings. Hoodie PBR&amp;B photo booth, vegan
        chillwave meh paleo freegan ramps. Letterpress shabby chic fixie
        semiotics. Meditation sriracha banjo pour-over. Gochujang pickled
        hashtag mixtape cred chambray. Freegan microdosing VHS, 90's bicycle
        rights aesthetic hella PBR&amp;B.{" "} */}
              </p>
              <div className="rela-block caps greyed">Experience</div>
              <h3>InternShip</h3>
              <li>Organization: {userProf.organization}</li>
              <li>Designation: {userProf.designation}</li>
              <li>Total Months: {userProf.totalexperience}</li>
              {/* <p>denim messenger bag leggings. Hoodie PBR&amp;B photo booth, vegan
        chillwave meh paleo freegan ramps. Letterpress shabby chic fixie
        semiotics. Meditation sriracha banjo pour-over. Gochujang pickled
        hashtag mixtape cred chambray. Freegan microdosing VHS, 90's bicycle
        rights aesthetic hella PBR&amp;B.{" "}</p> */}
              <div className="d-flex justify-content-between">
              <button className="btn btn-primary" onClick={updateProfile}>
                update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => userLogout(id)}
              >
                logout
              </button>
              </div>
            </div>
          </div>
        ) : (
          showUpdateForm && (
            <div
              className="card ms-auto"
              style={{ width: "18rem", marginTop: "100px" }}
            >
              <img src="./companyuser.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">...</h5>
                <p className="card-text">You did not build your profile</p>
                <button
                  className="btn btn-outline-danger "
                  onClick={() => userLogout(id)}
                >
                  Logout
                </button>
              </div>
            </div>
          )
        )}
        {showUpdateForm ? "" : <UpdateProfile />}
      </div>
    </div>
  );
};

export default Profile;

// const ViewUsers = () => {
//     const [userProf, setUserProf]=useState([]);
//     const viewAllUsers=async()=>{
//         try {
//             const viewresuls=await axiosapi.get("admin/users");
//         console.log(viewresuls.data.users, "userssss");
//         setUserProf(viewresuls.data.users)
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     useEffect(()=>{
//         viewAllUsers();
//     }, [])
//   return (
//     <div className="">

//     <div className='container'>
//   <div className='row'>
//     {userProf ? (
//       userProf.map((userProf) => (
//         <div className='col-4' key={companyProf._id}>
//           <div className='card mt-lg-5' style={{ width: '18rem' }}>
//           <img src="./companyuser.jpg" className="card-img-top" alt="..." />
//          <div className="card-body">
//            <h5 className="card-title">{companyProf.firstname} {companyProf.lastname} </h5>
//            <p className="card-text">
//             <ul>
//             <li>{companyProf.mobileno}</li>
//             <li>{companyProf.email}</li>
//             <li>{companyProf.college}</li>
//                <li>{companyProf.gender}</li>
//                <li>{companyProf.qualification}</li>
//                <li>{companyProf.year_of_passing}</li>
//                <li>{companyProf.date_of_birth}</li>

//             </ul>
//            </p>
//            {/* <Link  className="btn btn-primary" to="/companyupdate">
//              Accept
//            </Link>
//            <button className="btn btn-danger" >
//              Delete
//            </button> */}
//          </div>
//           </div>
//         </div>
//       ))
//     ) : (
//       <p className='text-danger'>No User Registered</p>
//     )}
//   </div>
// </div>

//     </div>
//   )
// }
