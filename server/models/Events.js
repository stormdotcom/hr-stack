import mongoose from "mongoose"
const eventSchema = mongoose.Schema({
    start: {type: Date, required:true},
    end: {type: Date, required:true},
    title:{type: String, required:true},
    description:{type: String, required:true},
    type:{type: String, required:false},
    time:{type:String},
    selectedFile:{type:String},
    isAnnouncements:{type:Boolean, required:true, default:false}
})
const Events = mongoose.model('Event', eventSchema)
export default Events;