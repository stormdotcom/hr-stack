import mongoose from "mongoose"
const eventSchema = mongoose.Schema({
    start: {type: Date, required:true},
    end: {type: Date, required:true},
    title:{type: String, required:true},
    description:{type: String, required:true},
    type:{type: String, required:true},
    time:{type:String},
    selectedFlle:{type:String} 
})
const Events = mongoose.model('Event', eventSchema)
export default Events;