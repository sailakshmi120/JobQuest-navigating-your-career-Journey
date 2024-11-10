import mongoose from "mongoose";

const intern = new mongoose.Schema({
    title:{
        type:String
    },
    companyname:{
        type:String
    },
    experience:{
        type:String
    },
    salary:{
        type:String
    },
    location:{
        type:String
    },
    time:{
        String
    },
    opening:{
        type:String
    },
    description:{
        type:String
    },
    Shifts:{
        type:String
    },
    role:{
        type:String
    },
    Industry_Type:{
        type:String
    },
    Department:{
        type:String
    },
    Employment_Type:{
        type:String
    },
    Education:{
        type:String
    },
    Key_Skills:{
        type:String
    },
    Address:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    },
    company:{   
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
    }
   
})

let model = mongoose.model('intern', intern);

module.exports = model