import mongoose from "mongoose"
const userSChema = mongoose.Schema({
    fullname: {type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true},
     AccessStatus:{type:Boolean, default:true,required:true},
     isHR:{type:Boolean, default:false,required:true}, //access if User is not HR   
    createdAt:{
        type: Date,
        required: true,
        default: new Date()
    }
   
})
const User = mongoose.model('User', userSChema)
export default User;