
import { param } from 'express-validator';
import { body } from 'express-validator';
import { Router } from "express";
const router = Router();
const multer = require('multer')
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from "express";
const company = require('../model/company')
const apply = require('../model/apply')
const jobs = require('../model/intern')
const profile = require('../model/profile')
const intern = require('../model/intern')
const admin = require('../model/Admin')
const adminintern = require('../model/adminapplication')
const { validate, adminvalidation, userid, id } = require('../validations/admin')




//admin default login
router.post('/login', validate(adminvalidation), async (req , res, next) => {
    const { email, password } = req.body;
    try {
        if (email === "admin@gmail.com" && password === "admin") {
            res.status(200).json({
                success: true,
                message: "sucessfully login"
            })
        } else {
            res.status(200).json({
                success: false,
                message: "incorrect email and password "
            })

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})


//get all company
router.get('/company', async (req, res, next) => {
    try {
        const companys = await company.find();
        if (companys) {
            res.status(200).json({
                success: true,
                companys
            })
        } else {
            res.status(404).json({
                success: false,
                message: "no company found"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})


//get single company by id
router.get('/company/:id', validate(id), async (req, res, next) => {
    const id = req.params.id;
    try {
        const companys = await company.findById(id);
        if (companys) {
            res.status(200).json({
                success: true,
                companys
            })
        } else {
            res.status(404).json({
                success: false,
                message: "no company found in this id"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})



//get the all register profile
router.get('/users', async (req, res, next) => {
    try {
        const users = await profile.find()
        if (users) {
            res.status(200).json({
                success: true,
                users
            })
        } else {
            res.status(404).json({
                success: false,
                message: "no data found"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})


//get the one user by is id
router.get('/user/:id', validate(userid), async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await profile.findOne({ user: userId })
        if (user) {
            res.status(200).json({
                success: true,
                Student: user
            })
        } else {
            res.status(404).json({
                success: false,
                message: "no data found"
            })

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})


//get the all internship from company
router.get('/intern', async (req, res, next) => {
    try {
        const interns = await intern.find();
        if (interns) {
            res.status(200).json({
                success: true,
                interns
            })
        } else {
            res.status(404).json({
                success: false,
                message: "no intern found"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})


//admin  approve
router.post('/admin/:internids', async (req, res, next) => {
    const internIds = req.params.internids;

    try {
        // Find the internship with the specified internid
        const internship = await intern.findById(internIds);

        if (!internship) {
            return res.status(404).json({
                success: false,
                message: "No internship found for this id",
            });
        }

      const update = await intern.findByIdAndUpdate(internIds,{status:true});
      if(update){
        res.status(200).json({
            success:true,
            message:"admin accepted",
            update

        })
      }else{
       // await intern.findByIdAndUpdate(internIds,{status:false});
        res.status(400).json({
            success:false,
            message:"admin not accepted"
        })
      }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});





//reject the internship
// router.put('/reject/:id',async(req:Request,res:Response,next:NextFunction)=>{
//     const id = req.params.id;
//     try{
//         const interns = await intern.findById(id);
//         if(!interns){
//             res.status(404).json({
//                 success:false,
//                 message:"no intern found this id"
//             })
//         }else{
//             const {status} = req.body
//             const update = await intern.findByIdAndUpdate(id,{status:status})
//             if(update){
//                 res.status(200).json({
//                     success:true,
//                     mesage:"rejected by admin"

//                 })
//             }else{
//                 res.status(400).json({
//                     success:false,
//                     message:"some want roung try again"
//                 })
//             }
//         }

//     }catch(error){
//         console.log(error)
//         res.status(500).json({
//             success:false,
//             message:"internal server error"
//         })
//     }
// })


//admin can get all jobs in student posted
router.get('/admin', async (req, res, next) => {
    try {
        const jobs = await admin.find();
        if (jobs) {
            res.status(200).json({
                success: true,
                jobs

            })
        } else {
            res.status(404).json({
                success: false,
                message: "no jobs found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})


//admin can get all jobs by company id
router.get('/admin/:companyid', async (req, res, next) => {
    const companyid = req.params.companyid
    try {
        const jobs = await admin.findOne({ company: companyid });
        if (jobs) {
            res.status(200).json({
                success: true,
                jobs

            })
        } else {
            res.status(404).json({
                success: false,
                message: "no jobs found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})


//admin get the internshp by id

router.get('/admin/:internid', async (req, res, next) => {
    const internid = req.params.internid;

    try {
        const jobs = await admin.find({ intern: internid });

        if (jobs.length > 0) {
            res.status(200).json({
                success: true,
                jobs
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No jobs found for this internid"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




//get the total internship with company id
router.get('/intern/:id', async (req, res, next) => {
    const companyid = req.params.id;
    try {
        const companys = await company.findById(companyid);
        if (!companys) {
            res.status(404).json({
                success: false,
                message: "data not found"
            })
        }
        const userprofile = await intern.findOne({ company: companyid })
        if (userprofile) {
            res.status(200).json({
                success: true,
                job: userprofile
            })
        } else {
            res.status(404).json({
                success: false,
                message: "data not found"
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })

    }
})



//section - d application






const store = multer.diskStorage({
    destination: "applications",
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

const resumes = multer({ storage: store });





//admin get all aplicationsforms
router.get('/applications', async (req, res, next) => {
    try {
        const applications = await apply.find();
        
        // Use filter to find applications with status 'processing'
        const fresh = applications.filter((item) => item.status === false);
        
        if (fresh.length > 0) {
            res.status(200).json({
                success: true,
                applications: fresh
            });
        } else {
            res.status(200).json({
                success: false,
                message: "No fresh applications"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




//get the change status all applyctionform
router.post('/applications/:userid/:internid', async (req, res, next) => {
    const { userid,internid } = req.params; // Remove .userid from req.params.userid
    try {
        // Find applications for the specified user
        const userApplications = await apply.find({ user: userid,intern:internid });
        

      const id = await userApplications.map((item)=>{
       return item._id
      })


      
        if (!userApplications || userApplications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applications found for this user",
            });
        }
          
        // Update the status to true (admin accepted) for all user applications
        const update = await apply.findByIdAndUpdate(id, { status: true });

        if (update) {
            res.status(200).json({
                success: true,
                message: "Admin accepted  applications",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Admin status update failed",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});




//get the all application from internid
router.get('/applications/:id', async (req, res, next) => {
    const internid = req.params.id
    try {
        const checkid = await jobs.findById(internid);
        if (!checkid) {
            res.status(404).json({
                success: false,
                message: "no internship found in this id"
            })
        }
        const application = await apply.findOne({ intern: internid })
        if (application) {
            res.status(200).json({
                success: true,
                user: application
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})



module.exports = router