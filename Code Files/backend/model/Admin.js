import mongoose from "mongoose";

const admin = new mongoose.Schema({
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
        type:Boolean
    },
    company:{   
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'company'
        
    },
    intern:{   
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'intern'
    }
   
})

let model = mongoose.model('adminjobs', admin);

module.exports = model