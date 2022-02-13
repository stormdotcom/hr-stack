import {configureStore} from "@reduxjs/toolkit"
import  employeeReducer  from "./employee/employeeSlice"
import loginReducer from "./login/loginSlice"
import timeSheetReducer from "./timesheet/timeSheetSlice"
import requestSlice from "./requests/requestSlice"
import notificationSlicer from "./notifications/notificationSlice"
const store= configureStore({
    reducer:{
        login:loginReducer,
        employee:employeeReducer,
        timesheet:timeSheetReducer,
        request:requestSlice,
        notification:notificationSlicer,
    }
})

export default store;