import { ValidationChain } from "express-validator";
import { body, param,query, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const  registervalidation = [
    body('companyname')
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


//const company =title,companyname,experience,salary,location,time,opening,description,Shifts,role,Industry_Type,Department,Employment_Type,Education,Key_Skills,Address
const  internvalidation = [
    body('title')
    .notEmpty()
    .withMessage('title is required'),

    body('companyname')
    .notEmpty()
    .withMessage('companyname is required'),
    
    body('experience')
    .notEmpty()
    .withMessage('experience is required'),

    body('salary')
    .notEmpty()
    .withMessage('salary is required'),

    body('location')
    .notEmpty()
    .withMessage('location is required'),

    body('time')
    .notEmpty()
    .withMessage('time is required'),

    body('opening')
    .notEmpty()
    .withMessage('opening is required'),

    body('description')
    .notEmpty()
    .withMessage('description is required'),

    body('Shifts')
    .notEmpty()
    .withMessage('Shifts is required'),

    body('role')
    .notEmpty()
    .withMessage('role is required'),

    body('Industry_Type')
    .notEmpty()
    .withMessage('Industry_Type is required'),

    body('Department')
    .notEmpty()
    .withMessage('Department is required'),

    body('Employment_Type')
    .notEmpty()
    .withMessage('Employment_Type is required'),

    body('Education')
    .notEmpty()
    .withMessage('Education is required'),

    body('Key_Skills')
    .notEmpty()
    .withMessage('Key_Skills is required'),

    body('Address')
    .notEmpty()
    .withMessage('Address is required'),





];




const validate = (validationResult) => {
    return (req, res, next) => {
        try {
            for (const validation of validations) {
                validation.run(req);
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





module.exports = {validate,registervalidation,loginvalidation,internvalidation}