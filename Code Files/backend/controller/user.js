import { request } from "express";
import { body } from "express-validator";

const { Router } = require("express");
const router = Router();
const multer = require("multer");
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
const user = require("../model/user");
const profile = require("../model/profile");
const intern = require("../model/intern");
const Question = require("../model/Questions");
const AnswerSubmission = require("../model/QuestionAnswer");
const applyintern = require("../model/apply");
const admin = require("../model/Admin");
import { NextFunction, Request, Response } from "express";
const {
  validate,
  registervalidation,
  loginvalidation,
  profilevalidation,
  getvalidation,
} = require("../validations/user");

//student register
router.post(
  "/register",
  validate(registervalidation),
  async (req, res, next) => {
    const { fullname, email, password } = req.body;

    try {
      // Check if the email already exists
      const checkEmail = await user.findOne({ email });

      if (checkEmail) {
        // If email exists, return a response immediately
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      // If email doesn't exist, proceed to create a new user
      const newUser = await user.create({
        fullname,
        email,
        password,
      });

      if (newUser) {
        res.status(201).json({
          success: true,
          message: "Successfully created",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Bad request",
        });
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

//student login
router.post(
  "/login",
  validate(loginvalidation),
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Use findOne method to find a user by email
      const checkUser = await user.findOne({ email });

      // Check if a user with the provided email exists
      if (!checkUser) {
        res.status(400).json({
          success: false,
          message: "Invalid email",
        });
      } else {
        // If a user is found, you can proceed to check the password or any other logic
        // For simplicity, let's assume you have a function checkPassword that checks the password
        const isPasswordValid = await checkPassword(
          password,
          checkUser.password
        );

        if (isPasswordValid) {
          // If the password is valid, proceed to the next middleware or route handler
          res.status(200).json({
            success: true,
            message: "Login successfully",
            checkUser,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Invalid password",
          });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

//forgot password
router.put(
  "/forgot",
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const checkemail = await user.findOne({ email: email });
      if (!checkemail) {
        res.status(404).json({
          success: false,
          message: "email is not found",
        });
      } else {
        await user.findByIdAndUpdate(checkemail._id, {
          password,
        });
        res.status(200).json({
          success: true,

          message: "update succefully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

router.get(
  "/user/:id",
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const users = await user.findById(id);
      if (users) {
        res.status(200).json({
          success: true,
          users,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "usaer not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req:Request,file:any,cb:any)=>{
//         cb(null,file.originalname)

//     }
// })

// //student build their profile
// router.post('/profile/:Id',validate(profilevalidation) ,async (req: Request, res: Response, next: NextFunction) => {
//     const Id = req.params.Id;

//     const {
//         firstname, middlename, lastname, image, email, mobileno, gender, date_of_birth,
//         qualification, college, state, year_of_passing, percentage,organization,designation,from_date,to_date,totalexperience,resume
//     } = req.body;

//     try {
//         // Check if the user with the provided ID exists
//         const users = await user.findById(Id);
//         if (!users) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         // Create a new profile using the provided data
//         const newProfile = await profile.create({
//             firstname, middlename, lastname, image, email, mobileno, gender, date_of_birth,
//             qualification, college, state, year_of_passing, percentage,organization,designation,from_date,to_date,totalexperience,resume,
//             user: Id  // Associate the profile with the user by using the user ID
//         });

//         // if (req.files['image']) {
//         //     const imageFile = req.files['image'][0];
//         //     newProfile.image = imageFile.path;
//         // }

//         // // Handle resume file upload
//         // if (req.files['resume']) {
//         //     const resumeFile = req.files['resume'][0];
//         //     newProfile.resume = {
//         //         data: fs.readFileSync(resumeFile.path),
//         //         contentType: resumeFile.mimetype
//         //     };
//         // }

//         if (newProfile) {
//             return res.status(201).json({
//                 success: true,
//                 message: 'Profile successfully created'
//             });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//     }
// });

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req , file, cb) => {
    const uniqueSuffix = uuidv4();
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

//student build their profile
router.post(
  "/profile/:Id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res, next) => {
    const userId = req.params.Id;

    try {
      // Check if the user with the provided ID exists
      const users = await user.findById(userId);
      if (!users) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const {
        firstname,
        middlename,
        lastname,
        email,
        mobileno,
        gender,
        date_of_birth,
        qualification,
        college,
        state,
        year_of_passing,
        percentage,
        organization,
        designation,
        from_date,
        to_date,
        totalexperience,
        address,
        about,
      } = req.body;

      // Create a new profile using the provided data
      const newProfile = await profile.create({
        firstname,
        middlename,
        lastname,
        email,
        mobileno,
        gender,
        date_of_birth,
        qualification,
        college,
        state,
        year_of_passing,
        percentage,
        organization,
        designation,
        from_date,
        to_date,
        totalexperience,
        address,
        about,
        user: userId,
        image: req.files["image"][0].filename,
        resume: req.files["resume"][0].filename,
      });

      if (newProfile) {
        return res.status(201).json({
          success: true,
          message: "Profile successfully created",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

//student get the information
router.get(
  "/profile/:id",
  async (req, res, next) => {
    const id = req.params.id;

    try {
      const users = await user.findById(id);
      if (!users) {
        res.status(200).json({
          success: false,
          message: "user not found",
        });
      }
      const userprofile = await profile.findOne({ user: id });

      const userdata = {
        //    user:users,
        profile: userprofile,
      };
      res.status(200).json({
        success: true,
        userdata,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        sucess: false,
        message: "internal server error",
      });
    }
  }
);

//update the user profile
// Update user profile
router.put(
  "/profile/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res, next) => {
    const id = req.params.id;

    try {
      const existingProfile = await profile.findOne({ user: id });

      if (existingProfile) {
        // Extract update data from req.body
        const {
          firstname,
          middlename,
          lastname,
          email,
          mobileno,
          gender,
          date_of_birth,
          qualification,
          college,
          state,
          year_of_passing,
          percentage,
          organization,
          designation,
          from_date,
          to_date,
          totalexperience,
          address,
          about,
        } = req.body;

        // Check if an image file is uploaded
        const updatedImage = req.files["image"]
          ? req.files["image"][0].filename
          : existingProfile.image;

        // Check if a resume file is uploaded
        const updatedResume = req.files["resume"]
          ? req.files["resume"][0].filename
          : existingProfile.resume;

        // Update the user profile
        const updatedProfile = await profile.findOneAndUpdate(
          { user: id },
          {
            firstname,
            middlename,
            lastname,
            email,
            mobileno,
            gender,
            date_of_birth,
            qualification,
            college,
            state,
            year_of_passing,
            percentage,
            organization,
            designation,
            from_date,
            to_date,
            totalexperience,
            address,
            about,
            image: updatedImage,
            resume: updatedResume,
          },
          { new: true }
        ); // Use { new: true } to return the updated document

        res.status(200).json({
          success: true,
          update: updatedProfile,
          message: "Profile updated successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

//delete the profile for the student
router.delete(
  "/profile/:id",
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await profile.findById(id);
      if (user) {
        await profile.findByIdAndDelete(id);
        res.status(200).json({
          success: true,
          message: "delete successfully",
        });
      } else {
        res.status(404).json({
          succcess: false,
          message: "user not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal serve error",
      });
    }
  }
);

// section-B

//student get all admin internship the internship
router.get(
  "/intern/:userid",
  async (req, res, next) => {
    const userid = req.params.userid;
    try {
      const student = await user.findById(userid);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }

      // Assuming you want to find internships with a specific status, e.g., active internships
      const internships = await intern.find({ status: true });

      // If you want to check if there are any internships found
      if (internships.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No active internships found",
        });
      }

      // If active internships are found
      return res.status(200).json({
        success: true,
        internships,
      });
    } catch (error) {
      console.log(error);
      next(error); // Utilize centralized error handling
    }
  }
);

//student get particuar internship in this id
router.get(
  "/intern/:userid/:internid",
  async (req, res, next) => {
    const { userid, internid } = req.params;
    try {
      const student = await user.finndById(userid);
      if (!student) {
        res.status(404).json({
          success: false,
          message: "student not found",
        });
      } else {
        const interndhipid = await intern.findById(internid);
        if (interndhipid) {
          res.status(200).json({
            success: true,
            interndhipid,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "no internship found",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        suucess: false,
        messahe: "internal server error",
      });
    }
  }
);

//student get the internship by search by name

type  = {
  title?: string; // Making it optional since it might not always be present
};

router.get(
  "/internship/:userid",
  async (req, res, next) => {
    const { userid } = req.params;
    const queryObj = req.query ; // Casting the entire query object
    const { title } = queryObj; // Destructuring to get the title from the casted query

    try {
      // Find the user by userid
      const student = await user.findById(userid);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }

      // Define the base query
      let query = {}; // Using 'any' or you could define a more specific type/interface
      if (title) {
        query.title = { $regex: new RegExp(title, "i") }; // Using RegExp to ensure title is treated as a regex pattern
      }

      // Find internships based on the query
      const internships = await intern.find(query);

      if (internships.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No internships found",
        });
      }

      // If internships are found, return the result
      return res.status(200).json({
        success: true,
        internships,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

//SECTION-c //STUDENT APPLY FOR THE INTERNSHIP
const store = multer.diskStorage({
  destination: "resume",
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const resume = multer({ storage: store });

//apply for internship for the student
router.post(
  "/apply/:userid/:internid",
  resume.fields([{ name: "resume", maxCount: 1 }]),
  async (req, res, next) => {
    const { userid, internid } = req.params;
    try {
      const { fullname, email, mobileno, Address, qualification, percentage } = req.body;

      // Check if the user and intern exist
      const userExists = await user.findById(userid);
      const internExists = await intern.findById(internid);

      if (!userExists) {
        return res.status(400).json({
          success: false,
          message: "user not found",
        });
      }
      if (!internExists) {
        return res.status(400).json({
          success: false,
          message: "internship not found inthis id ",
        });
      }

      const onetime = await applyintern.findOne({
        intern: internid,
        user: userid,
      });
      if (onetime) {
        return res.status(400).json({
          success: false,
          message: "Already applied",
        });
      }

      // Create an application using the provided data
      const application = await applyintern.create({
        user: userid,
        intern: internid,
        fullname,
        email,
        mobileno,
        qualification,
        percentage,
        Address,
        resume: req.files["resume"][0].filename,
      });

      res.status(201).json({
        success: true,
        message: "Application successfully created",
        application,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

//get the all applicatin of user
// router.get('/apply/:userId', async (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.params.userId;
//     try {
//         const users = await user.findById(userId);
//         if (!users) {
//             res.status(404).json({
//                 success: false,
//                 message: "user not found"
//             })
//         }
//         const userprofile = await applyintern.find({ user: userId })
//         console.log(userprofile)
//         const internid = await userprofile.map((item:any)=>{
//            return item.intern
//         })
//         console.log(internid)

//         const interns = await intern.findById(internid)
//         console.log(interns)

//         if (userprofile ) {
//             res.status(200).json({
//                 success: true,
//                 internship: userprofile,
//                 interns
//             })
//         } else {
//             res.status(404).json({
//                 success: false,
//                 message: "data not found"
//             })
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: "internal server error"
//         })

//     }
// })

router.get(
  "/apply/:userId",
  async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const userDoc = await user.findById(userId);
      if (!userDoc) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const userprofile = await applyintern.find({ user: userId });
      if (!userprofile || userprofile.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No internship applications found for this user",
        });
      }

      const internIds = userprofile.map((item) => item.intern);

      const interns = await intern.find({ _id: { $in: internIds } });

      if (userprofile && interns) {
        return res.status(200).json({
          success: true,
          internship: userprofile,
          interns,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

//get application status
router.get(
  "/apply/:userId/:internid",
  async (req, res, next) => {
    const { userId, internid } = req.params;
    try {
      const users = await user.findById(userId);
      if (!users) {
        res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
      const userprofile = await applyintern.find({
        user: userId,
        intern: internid,
      });
      const interns = await admin.find({ intern: internid });

      if (userprofile && intern) {
        res.status(200).json({
          success: true,
          profile: userprofile,
          interns,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "data not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  }
);

// Students can write the exam
router.post(
  "/students/answers/:userid/:internid",
  async (req, res, next) => {
    try {
      const userId = req.params.userid;
      const internId = req.params.internid;
      const { answers } = req.body;

      const result = await AnswerSubmission.findOne({
        userId: userId,
        internId: internId,
      });
      if (result !== null || result) {
        return res.status(400).json({ msg: "You already Written This Exam" });
      }

      // Validate input
      if (!userId || !internId || !answers || !Array.isArray(answers)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid input. Please provide userId, internId, and an array of answers.",
        });
      }

      // Find the questions for this internship
      const questionSet = await Question.findOne({ internId });
      if (!questionSet) {
        return res.status(404).json({
          success: false,
          message: "No questions found for this internship.",
        });
      }

      let totalMarks = 0;
      const gradedAnswers = answers.map((answer) => {
        const question = questionSet.questions.find(
          (q) => q._id.toString() === answer.questionId
        );

        if (!question) {
          return {
            ...answer,
            isCorrect: false,
            marksObtained: 0,
          };
        }

        const isCorrect =
          answer.submittedAnswer.toLowerCase() ===
          question.answer.toLowerCase();

        const marksObtained = isCorrect ? Number(question.marks) : 0;

        totalMarks += marksObtained;
        return {
          ...answer,
          isCorrect,
          marksAwarded: marksObtained,
        };
      });

      // Create a new answer submission
      const submission = new AnswerSubmission({
        userId,
        internId,
        answers: gradedAnswers,
        totalMarks,
      });

      // Save the submission
      await submission.save();

      res.status(200).json({
        success: true,
        message: "Answers submitted and graded successfully",
        data: {
          submissionId: submission._id,
          totalMarks,
          answers: gradedAnswers,
        },
      });
    } catch (error) {
      console.error("Error in /students/answers:", error);
      res.status(500).json({
        success: false,
        message: "Failed to submit answers",
        error: error.message,
      });
    }
  }
);

// Students Can get the Questions

router.get("/get/questions/:internid", async (req, res) => {
  const internId = req.params.internid;
  try {
    const questions = await Question.findOne({ internId: internId });

    if (!questions) {
      return res.status(404).json({
        success: false,
        message: "No questions found for the given intern ID",
      });
    }

    // Extract questions with IDs
    const questionsWithId = questions.questions.map((question) => ({
      questionId: question._id,
      questionText: question.questionText,
    }));

    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questionsWithId,
    });
  } catch (error) {
    console.error("Error in /get/questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to Get The Questions",
      error: error.message,
    });
  }
});

// Assume you have a function to check the password, replace it with your actual logic
async function checkPassword(
  enteredPassword,
  savedPassword
) {
  // Replace this with your actual password checking logic, for example, using bcrypt
  return enteredPassword === savedPassword;
}

module.exports = router;
