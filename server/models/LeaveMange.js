import mongoose from "mongoose"
const leaveSchema = mongoose.Schema({
    leaveType: {type: String, required:true},
    userID:{type: Object, required:true},
    fullname:{type: String, required:true},
    empID:{type: String, required:true},
    team:{type: String, default:"EC Alpha"},
     requestedDate:{type:Date, default:true,required:true},
     fromDate:{type:Date},
     toDate:{type:Date},
     manager:{type: String, required:false},
     reason:{type: String, required:true},
     approvedStatus:{type:Boolean, default:false,required:true},
     submittedStatus:{type:Boolean, default:false,required:true},
    approvedBy:{type:String},
    comments:{type:String},
    projectName:{type: String, required:true}
   
})
const LeaveManage = mongoose.model('LeaveManage', leaveSchema)
export default LeaveManage;