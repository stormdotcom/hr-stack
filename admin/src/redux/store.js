import {configureStore} from "@reduxjs/toolkit"
import  adminReducer  from "./admin/adminSlice"
import loginReducer from "./login/loginSlice"
const store= configureStore({
    reducer:{
        login:loginReducer,
        admin:adminReducer,      
    }
})

export default store;