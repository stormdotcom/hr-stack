import { createSlice } from "@reduxjs/toolkit"; 

 const requestSlice= createSlice({
    name:'requests',
    initialState:{
        isloading:true,
        error:"",
        reqData:[],
        data:{},
        learnings:[],
        cab:[]
    },
    reducers:{
        initial:(state)=>{
            state.isloading=true
        },
        fetchData:(state, {payload})=>{
            state.isloading=false;
            state.data =payload[0]
            state.isloading=false
        },  
        fetchCabRequest:(state, {payload})=>{
            console.log(payload)
            state.isloading=false;
            state.cab = payload
            state.isloading=false
        },   
        fetchRequest:(state, {payload})=>{
            state.isloading=false;
            state.reqData = payload
            state.isloading=false
        },
        fetchLearning:(state, {payload})=>{
            state.isloading=false;
            state.learnings = payload
            state.isloading=false
        },
        errorfetching:(state, {payload})=>{
            state.isloading=false;
            state.error=payload;
        },
        final:(state)=>{
            state.data =[]
        }
    }
})

export const {reducer , actions} = requestSlice

export const {fetchData, fetchLearning, initial, errorfetching, fetchCabRequest,
    fetchRequest, final } = actions

export default reducer;