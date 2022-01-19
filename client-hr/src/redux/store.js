import {configureStore} from "@reduxjs/toolkit"
import  hrReducer  from "./hr/hrSlice"
import loginReducer from "./login/loginSlice"
import pendingReducer from "./pendingTimeSheet/pendingTimeSheetSlice"
import requestReducer from "./requests/requestSlice"
const store= configureStore({
    reducer:{
        login:loginReducer,
        hr:hrReducer,
        pending:pendingReducer,
        requests:requestReducer
        
    }
})

export default store;