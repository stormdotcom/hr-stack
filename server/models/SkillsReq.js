import mongoose from "mongoose"
const skillSchema = mongoose.Schema({
    fullname:{type: String, required:true},
    empID: {type: String, required:true},
    manager: {type: String, required:false},
    project: {type: String, required:false},
    technology:{type: String, required:false},
    category:{type: String, required:true},
    selfRating:{type: Number, required:true},
    score:{type: Number, required:true, default:0},
    experience:{type: String, required:false},
    type:{type: String, required:false},
    userID:{type:Object, required:true },
    date:{type: Date, default: new Date()},
    approved:{type:Boolean, default: false, required: true},
    submittedStatus:{type:Boolean, default:false,required:true},
    comments:{type: String, default:""},
    selectedFile:{type: String, required:false},
})
const Skllls = mongoose.model('sklll', skillSchema)
export default Skllls;