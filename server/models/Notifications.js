import mongoose from "mongoose"
const notificationSChema = mongoose.Schema({
    user:{type:Object, ref: "Employee"},
    notification:[{
        id: {type: Object, required:true},
        fullname:{type: String, required:true},
        date:{type: Date, required:true, default:Date.now},
         read:{type:Boolean, default:false,required:true},
         message:{type: String, required:true},   
         type:{type: String, required:true},  
        }   
    ]

})
const Notification = mongoose.model('notification', notificationSChema)
export default Notification;