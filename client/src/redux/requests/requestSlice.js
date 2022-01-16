import { createSlice } from "@reduxjs/toolkit"; 

 const requestSlice= createSlice({
    name:'request',
    initialState:{
        isloading:true,
        error:"",
        reqData:[]
    },
    reducers:{
        initial:(state)=>{
            state.isloading=true
        },
        fetchRequest:(state, {payload})=>{
            state.isloading=false;
            state.reqData = payload;
            state.isloading=false
        },
        fetchAll:(state, {payload})=>{
            state.isloading=false;
            state.data = payload;
        },
        errorfetching:(state, {payload})=>{
            state.isloading=false;
            state.error=payload;
        }
    }
})

export const {reducer , actions} = requestSlice

export const {request, fetchAll, initial, errorfetching, fetchRequest } = actions

export default reducer;