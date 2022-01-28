import mongoose from "mongoose"
const cabSchema = mongoose.Schema({
    employeeName:{type: String, required:true},
    empID: {type: String, required:true},
    manager: {type: String, required:false},
    projectName: {type: String, required:false},
    pickupPoint:{type: String, required:true},
    dropPoint:{type: String, required:true},
    time:{type: String, required:true},
    contactNumber:{type: Number, required:true},
    userID:{type:String, required:true },
    date:{type: Date, default: new Date()},
    remarks:{type: String, default:""},
    approved:{type:Boolean, default: false, required: true},
    submittedStatus:{type:Boolean, default:false,required:true},
    comments:{type: String, default:""},
})
const CabReq = mongoose.model('CabReq', cabSchema)
export default CabReq;