import React, { useEffect, useState } from 'react'
import "../css/viewjobs.css"
import { useNavigate } from 'react-router-dom';
import axiosapi from '../axiosapi';

const ViewJobs = () => {
  const [showDetails,setShowDetails]=useState("");
const [postedJobData,setPostedJobData]=useState([]);
const navigatingTo=useNavigate();

const applyJob=(id)=>{
  sessionStorage.setItem("jobid",id)
  // const myId=JSON.stringify(id)
  // sessionStorage.setItem("updateId",myId);
  navigatingTo(`/applyform/${id}`);
}
const id=sessionStorage.getItem("id")
const getData=async()=>{
    try {
     const res=await axiosapi.get(`user/intern/${id}`)
     console.log(res, "backenjjfj");
     setPostedJobData(res.data.internships)
    
    } catch (error) {
     console.log(error);
    }
 }
 
useEffect(()=>{
    getData();

},[])
const viewDetails=(id)=>{
setShowDetails(id)
}

console.log(postedJobData, "data male bhetat aahe");

  return (
    <div>
       { postedJobData&&postedJobData.map((item)=>  <div className="container mycontainer mt-5 p-2 " key={item._id}>
<img
src='./degree1.png'
alt="no photo"
/>
<div className="container__text">
<h1>{item.title}</h1>
<p>
 {item.companyname}
</p>
<p className='text-primary'><a onClick={()=>viewDetails(item._id)}>view Details</a></p>
{
  showDetails===item._id&&<div>
    <ul>
      <li>Role:{item.role}</li>
      <li>Total Vacancies: {item.opening} </li>
      <li> Education Required: {item.Education} </li>
      <li>Key Skills: {item.Key_Skills} </li>
      <li> Experience :{item.experience} months</li>
      <li> Salary/Stipend: {item.salary}<span className='h6'>&#8377;/month</span> </li>
      <li>Job Description: {item.description}</li>
    </ul>
    <ul>
      <li><h4>Company Details</h4></li>
      <li>Industry Type :{item.Industry_Type} </li>
      <li>Branch Name/Location: {item.location} </li>
      <li>Shift Timing : {item.Shifts} </li>
      <li>Office Timing: {} </li>
      <li>Hired to be in Department: {item.Department}</li>
      <li>Employment Type: {item.Employment_Type}</li>
      <li>Email: {}</li>
      <li>Main Branch Address: {item.Address}</li>
      
    </ul>
  </div>
}


<button className="btn" onClick={()=>applyJob(item._id)}>
 Apply <i className="fa fa-arrow-right" />
</button>
</div>
</div>)}

    </div>
  )
}

export default ViewJobs;
{/* <div>
      
<div className="container mycontainer mt-5 p-2 ">
<img
src='./degree1.png'
alt="Pancake"
/>
<div className="container__text">
<h1>Software Developer</h1>
<p>
Take Off Edu Group
</p>
<p className='text-primary'><a onClick={()=>setShowDetails((prev)=>!prev)}>view Details</a></p>
{
showDetails&&<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque sit facilis fugit tempore minus vero impedit magni, soluta nam quas sequi saepe, dolorem, sunt maiores porro cum est maxime odio?</p>
}
<button className="btn">
Apply <i className="fa fa-arrow-right" />
</button>
</div>
</div>
<div className="container mycontainer mt-5 ">
<img
src='./degree1.png'
alt="Pancake"
/>
<div className="container__text">
<h1>Software Developer</h1>
<p>
Take Off Edu Group
</p>
<p className='text-primary'><a onClick={()=>setShowDetails((prev)=>!prev)}>view Details</a></p>
{
showDetails&&<p className='text-wrap'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque sit facilis fugit tempore minus vero impedit magni, soluta nam quas sequi saepe, dolorem, sunt maiores porro cum est maxime odio?</p>
}
<button className="btn">
Apply <i className="fa fa-arrow-right" />
</button>
</div>
</div>
<div className="container mycontainer mt-5 ">
<img
src='./degree1.png'
alt="Pancake"
/>
<div className="container__text">
<h1>Software Developer</h1>
<p>
Take Off Edu Group
</p>
<p className='text-primary'><a onClick={()=>setShowDetails((prev)=>!prev)}>view Details</a></p>
{
showDetails&&<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque sit facilis fugit tempore minus vero impedit magni, soluta nam quas sequi saepe, dolorem, sunt maiores porro cum est maxime odio?</p>
}
<button className="btn">
Apply <i className="fa fa-arrow-right" />
</button>
</div>
</div>

</div> */}