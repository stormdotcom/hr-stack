import Employees from "../models/Employees"
import Notification from "../models/Notifications"

const setNotificationUnRead = async(userID)=>{
     
    try {
        const result = await Notification.findOne({user:userID})
    } catch (error) {
        console.log(error)
    }
} 