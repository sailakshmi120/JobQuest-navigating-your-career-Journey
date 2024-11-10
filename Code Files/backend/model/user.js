import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    fullname:{
        type: String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})

let model =  mongoose.model('user', userschema)

module.exports = model