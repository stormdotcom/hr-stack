import { createSlice } from "@reduxjs/toolkit"; 

 const requestSlice= createSlice({
    name:'request',
    initialState:{
        isloading:false,
        error:"",
        issues:[],
        assets:[],
        allAssets:[]
    },
    reducers:{
        initial:(state)=>{
            state.isloading=true
        },
        fetchIssues:(state, {payload})=>{
            state.error="";
            state.issues = payload
            state.isloading=false
        },
        fetchAssetReq:(state, {payload})=>{
            state.isloading=false;
            state.assets=payload;
        },
        fetchAllAssets:(state, {payload})=>{
            state.isloading=false;
            state.allAssets=payload;
        },
        errorfetching:(state, {payload})=>{
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

export const {fetchIssues, fetchAssetReq,fetchAllAssets, initial, errorfetching, final } = actions

export default reducer;