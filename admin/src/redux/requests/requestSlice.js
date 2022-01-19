import { createSlice } from "@reduxjs/toolkit"; 

 const requestSlice= createSlice({
    name:'request',
    initialState:{
        isloading:false,
        error:"",
        issues:[],
        assetReq:[]
    },
    reducers:{
        initial:(state)=>{
            state.isloading=true
        },
        fetchIssues:(state, {payload})=>{
            console.log(payload)
            state.error="";
            state.issues = payload
            state.isloading=false
        },
        fetchassetReq:(state, {payload})=>{
            console.log(payload)
            state.isloading=false;
            state.assetReq=payload;
        },
        errorfetching:(state, {payload})=>{
            console.log(payload)
            state.isloading=false;
            state.error=payload;
        },
        final:(state)=>{
            state.isloading=false
            state.issues=[]
            state.assetReq=[]
        }
    }
})

export const {reducer , actions} = requestSlice

export const {fetchIssues, fetchassetReq, initial, errorfetching, final } = actions

export default reducer;