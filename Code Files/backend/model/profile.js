import mongoose from "mongoose";
const validator = require('validator'); // Make sure to import the validator library

const profileSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String
    },
    image:{
        type:String
    },   
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    mobileno: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    date_of_birth: {
        type: String
    },
    qualification: {
        type: String
    },
    college: {
        type: String
    },
    state: {
        type: String
    },
    year_of_passing: {
        type: Number
    },
    percentage: {
        type: String
    },
    organization: {
        type: String
    },
    designation: {
        type: String
    },
    from_date: {
        type: String
    },
    to_date: {
        type: String
    },
    totalexperience: {
        type: Number
    },
    resume:{
        type:String

    },
    
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'user'
    },
    address:{
        type:String
       },
    about:{
        type:String
       }
});


// Validate image file type (PNG or JPG)
// profileSchema.path('image.contentType').validate(function (value) {
//     return /^image\/(png|jpg|jpeg)$/.test(value);
// }, 'Invalid image file type. Supported types: PNG, JPG');

// // Validate resume file type (DOC, PDF, or Word)
// profileSchema.path('resume.contentType').validate(function (value) {
//     return /^application\/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)$/.test(value);
// }, 'Invalid resume file type. Supported types: PDF, DOC, Word');


let model = mongoose.model('profile', profileSchema)

module.exports = model