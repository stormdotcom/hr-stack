import mongoose from "mongoose"
const adminSchema = mongoose.Schema({
    fullname: {type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true},
     isAdmin:{type:Boolean, default:true,required:true},
    createdAt:{
        type: Date,
        required: true,
        default: new Date()
    }
   
})
const Admin = mongoose.model('Admin', adminSchema)
export default Admin;