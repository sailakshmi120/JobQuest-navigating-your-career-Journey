import { ValidationChain } from "express-validator";
import { body, param,query, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const  registervalidation = [
    body('fullname')
        .notEmpty()
        .withMessage('name is required'),

    body('email')
    .notEmpty()
    .withMessage('email is required'),

    body('password')
    .notEmpty()
    .withMessage('password is required')   

];

const  loginvalidation = [
    body('email')
    .notEmpty()
    .withMessage('email is required'),

    body('password')
    .notEmpty()
    .withMessage('password is required')   

];

const  profilevalidation = [

    body('firstname')
       .notEmpty()
       .withMessage(' is required'),

    body('lastname')
       .notEmpty()
       .withMessage('lastname is required'),
    
    body('image')
       .notEmpty()
       .withMessage('image is required'),


    body('email')
       .notEmpty()
       .withMessage('email is required'),  

    body('mobileno')
       .notEmpty()
       .withMessage('mobileno is required'),  

    body('gender')
        .notEmpty()
        .withMessage('gender is required'), 

    body('date_of_birth')
       .notEmpty()
       .withMessage('date_of_birth is required'),
    
    body('qualification')
    .notEmpty()
    .withMessage(' is required'),

    body('college')
    .notEmpty()
    .withMessage('college is required'),

    body('state')
    .notEmpty()
    .withMessage('state is required'),

    body('year_of_passing')
    .notEmpty()
    .withMessage('year_of_passing is required'),

    body('percentage')
    .notEmpty()
    .withMessage('percentage is required')

];


const  applyvalidation = [

    param('userid')
      .notEmpty()
      .withMessage("user id is requied"),

    param('internid')
      .notEmpty()
      .withMessage("user id is requied"),

    body('fullname')
    .notEmpty()
    .withMessage('fullname is required'),

    body('email')
    .notEmpty()
    .withMessage('email is required'), 
    
    body('resume')
    .notEmpty()
    .withMessage('resume is required')   

];

const getvalidation=[
    param('userId')
       .notEmpty()
       .withMessage('userid is required')
]

const validate = (validations:ValidationChain[]) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            for (const validation of validations) {
                await validation.run(req);
            }

            const errors = validationResult(req);
            if (errors.isEmpty()) {   // if the errors are empty
                return next();    // we are going to next function or controller
            }

            res.status(400).json({ errors: errors.array() });
        } catch (error) {
            res.status(500).json({ error });
        }
    };
};





module.exports = {validate,registervalidation,loginvalidation,profilevalidation,getvalidation}