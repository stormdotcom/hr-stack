import { createSlice } from "@reduxjs/toolkit"; 

 const adminSlice= createSlice({
    name:'admin',
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
            console.log(payload)
            state.error="";
            state.stats = payload
            state.isloading=false
        },
        errorfetching:(state, {payload})=>{
            console.log(payload)
            state.isloading=false;
            state.error=payload;
        },
        final:(state)=>{
            state.isloading=false;
            state.data ={}
        }
    }
})

export const {reducer , actions} = adminSlice

export const {fetchStats, fetchProfile, initial, errorfetching, final } = actions

export default reducer;