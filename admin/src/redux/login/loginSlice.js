import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:"login",
    initialState:{
        isLoading: false,
        isAuth: false,
        error:"",
        user:{}
    },
    reducers:{
        loginPending:(state)=>{
            state.isLoading=true
        },
        loginSuccess:(state, {payload})=>{

            state.isLoading = false
            state.isAuth=true
            state.error=""
            state.user=payload
        },
        loginFail:(state, {payload})=>{
            state.isLoading=false
            state.isAuth=true
            state.error=payload
            
        },  
        logout:(state, {payload})=>{
            localStorage.removeItem("admin")
            state.isLoading=false
            state.isAuth=false
            state.error=payload
            state.user={}
            state.user.loggedIn=false
        }
    }
})
export const {reducer, actions} = loginSlice

export const { loginPending, loginSuccess, loginFail, logout} = actions

export default reducer