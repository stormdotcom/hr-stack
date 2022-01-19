import mongoose from "mongoose"
const learningSchema = mongoose.Schema({
    technology: {type: String, required:true},
    userID:{type: Object, required:true},
    fullname:{type: String, required:true},
    empID:{type: String, required:true},
    courseType:{type: String, required:true},
     requestedDate:{type:Date,required:true},
     resourceURL:{type:String, required:true},
     date:{type:Date},
     duration:{type: String, required:true},
     platform:{type: String, required:true},
     approvedStatus:{type:Boolean, default:false,required:true},
     rejectedStatus:{type:Boolean, default:false,required:true},
     started:{type:Boolean, default:false,required:true},
     completed:{type:Boolean, default:false,required:true},
     delayed:{type:Boolean, default:false,required:true},
    approvedBy:{type:String},
    courseName:{type: String, default:""},
    comments:{type:String},
    project:{type: String},
    videoID:{type: String}
   
})
const Learnings = mongoose.model('Learnings', learningSchema)
export default Learnings;