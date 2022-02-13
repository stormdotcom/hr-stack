import mongoose from "mongoose"
const companySchema = mongoose.Schema({
    locations: {type: Array},
    designations: {type: Array},
    projects:{type: Array},
    months:{type: Array},
    events: {type: Array, required:false},
    holidays:{type: Array},
   
})
const Company = mongoose.model('Company', companySchema)
export default Company;
