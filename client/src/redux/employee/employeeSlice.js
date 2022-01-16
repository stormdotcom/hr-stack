import { createSlice } from "@reduxjs/toolkit"; 

 const employeeSlice= createSlice({
    name:'employee',
    initialState:{
        isloading:false,
        error:"",
        error1:"",
        data:{},
        company:{}
    },
    reducers:{
        initial:(state)=>{
            state.isloading=true
        },
        gotData:(state)=>{
            state.isloading=false;
        },
        editProfile:(state, {payload})=>{
            state.isloading=false;
            state.data = {...state, payload}
            state.isloading=false
        },
        fetchProfile:(state, {payload})=>{
            state.isloading=false;
            state.data = payload;
        },
        errorfetching:(state, {payload})=>{
            state.isloading=false;
            state.error=payload;
        },
        fetchCompany:(state, {payload})=>{
            state.isloading=false;
            state.company=payload;
        },
        errorCompany:(state, {payload})=>{
            state.isloading=false;
            state.error1=payload;
        },
        final:(state)=>{
            state.data={}
            state.company={}
        }
    }
})

export const {reducer , actions} = employeeSlice

export const {editProfile, fetchProfile, initial, errorfetching, fetchCompany, gotData, final, errorcompany } = actions

export default reducer;