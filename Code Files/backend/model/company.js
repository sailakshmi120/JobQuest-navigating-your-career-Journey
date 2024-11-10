import mongoose from "mongoose";

const company = new mongoose.Schema({
    companyname:{
        type:String
    },
    role:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },

})

let model = mongoose.model('company' , company);

module.exports = model