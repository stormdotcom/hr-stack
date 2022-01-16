import { createSlice } from "@reduxjs/toolkit"; 

 const employeeSlice= createSlice({
    name:'hr',
    initialState:{
        isloading:false,
        error:"",
        data:{},
        stats:{}
    },
    reducers:{
        initial:(state)=>{
            state.isloading=true
        },
        fetchStats:(state, {payload})=>{
            state.isloading=false;
            state.stats = payload
            state.isloading=false
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
        final:(state)=>{
            state.data ={}
        }
    }
})

export const {reducer , actions} = employeeSlice

export const {fetchStats, fetchProfile, initial, errorfetching, final } = actions

export default reducer;