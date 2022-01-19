import mongoose from "mongoose"
const issueSchema = mongoose.Schema({
    employeeName:{type: String, required:true},
    employeeID: {type: String, required:true},
    manager: {type: String, required:true},
    project: {type: String, required:false},
    priority: {type: String, required:true},
    subject:{type: String, required:true},
    issue:{type: String, required:true},
    userID:{type:Object, required:true },
    date:{type: Date, default: new Date()},
    resolved:{type:Boolean, default: false, required: true},
    onDelay:{type:Boolean, default: false, required: true} ,
    comments:{type: String, default:""},
})
const Issues = mongoose.model('Issues', issueSchema)
export default Issues;