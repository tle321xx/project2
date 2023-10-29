import mongoose from "mongoose";

const userModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:{},
        required:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

export default mongoose.model('user',userModel)