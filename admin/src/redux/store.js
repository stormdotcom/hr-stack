import {configureStore} from "@reduxjs/toolkit"
import  adminReducer  from "./admin/adminSlice"
import loginReducer from "./login/loginSlice"
import requestReducer from "./requests/requestSlice"
const store= configureStore({
    reducer:{
        login:loginReducer,
        admin:adminReducer,  
        requests:requestReducer    
    }
})

export default store;