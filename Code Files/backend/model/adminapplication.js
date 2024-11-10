import mongoose from "mongoose";


const admininternstudent = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'user'
    },
    intern:{
        type : mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"intern"
    },
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    mobileno:{
        type:String
    },
    Address:{
        type:String
    },
    resume:{
        type:String
    },
    Accept:{
        type:Boolean,
    }

})

let model = mongoose.model('admininternstudent',admininternstudent)

module.exports = model