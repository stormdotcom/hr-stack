import {configureStore} from "@reduxjs/toolkit"
import  hrReducer  from "./hr/hrSlice"
import loginReducer from "./login/loginSlice"
import pendingReducer from "./pendingTimeSheet/pendingTimeSheetSlice"
const store= configureStore({
    reducer:{
        login:loginReducer,
        hr:hrReducer,
        pending:pendingReducer,
        
    }
})

export default store;