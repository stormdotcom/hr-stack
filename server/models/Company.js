import mongoose from "mongoose"
const companySchema = mongoose.Schema({
    assetCode:{type: String},
    locations: {type: Array},
    designations: {type: Array, required:true},
    events: {type: Array, required:true},
    holidays:{type: Array}
})
const Company = mongoose.model('Company', companySchema)
export default Company;