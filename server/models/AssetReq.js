import mongoose from "mongoose"
const assetReqSchema = mongoose.Schema({
    employeeName:{type: String, required:false},
    employeeID: {type: String, required:true},
    projectName: {type: String, required:true},
    asset: {type: String, required:true},
    assetType:{type: String, required:true},
    comments:{type: String, required:false, default:""},
    approved:{type: Boolean, required:true, default:false},
    submitted:{type: Boolean, required:true, default:false},
    description:{type:String },
    userID:{type:Object, required:true},
    requestedDate:{type:Date, default: new Date, required:true},
    assetID:{type:Object},
    priority:{type:Number, default:1, required:true},
    submittedDate:{type:Date}
})
const AssetReq = mongoose.model('AssetReq', assetReqSchema)
export default AssetReq;