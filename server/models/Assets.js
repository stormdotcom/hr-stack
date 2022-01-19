import mongoose from "mongoose"
const assetSchema = mongoose.Schema({
    assetCode:{type: String, required:false},
    assetName: {type: String, required:true},
    assetModel: {type: String, required:true},
    assetCategory: {type: String, required:true},
    assetType:{type: String, required:true},
    healthStatus:{type: Boolean, required:true, default:true},
    availableStatus:{type: Boolean, required:true, default:true},
    description:{type:String },
    alloactedTo:{type: Object}
   
})
const Assets = mongoose.model('Asset', assetSchema)
export default Assets;