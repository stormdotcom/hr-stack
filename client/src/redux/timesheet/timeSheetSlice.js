import { createSlice } from "@reduxjs/toolkit"; 

 const timezSheetSlice= createSlice({
    name:'timesheet',
    initialState:{
        isloading:false,
        error:"",
        data:{}
    },
    reducers:{
        initial:(state)=>{
            state.isloading=true
        },
        editTimeSheet:(state, {payload})=>{
            state.isloading=false;
            state.data = {...state, payload}
            state.isloading=false
        },
        fetchTimeSheet:(state, {payload})=>{
            state.isloading=false;
            state.data = payload;
        },
        errorfetching:(state, {payload})=>{
            state.isloading=false;
            state.error=payload;
        }
    }
})

export const {reducer , actions} = timezSheetSlice

export const {editTimeSheet, fetchTimeSheet, initial, errorfetching } = actions

export default reducer;