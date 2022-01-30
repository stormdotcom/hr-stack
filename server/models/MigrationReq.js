import mongoose from "mongoose"
const migrationSchema = mongoose.Schema({
     type: {type: String, required:true},
     leaving:{type:Boolean},
     userID:{type: Object, required:true},
     fullname:{type: String, required:true},
     empID:{type: String, required:true},
     requestedDate:{type:Date, default:new Date,required:true},
     leavingDate:{type:Date},
     data:{type: String, required:true},
     approvedStatus:{type:Boolean, default:false,required:true},
     submittedStatus:{type:Boolean, default:false,required:true},
     comments:{type:String},   
})
const MigrationReq = mongoose.model('MigrationReq', migrationSchema)
export default MigrationReq;