import { createSlice } from "@reduxjs/toolkit"; 

 const requestSlice= createSlice({
    name:'request',
    initialState:{
        isloading:true,
        error:"",
        tickets:[],
        reqData:[],
        myticket:[],
        learnings:[],
        assets:[],
        cab:[]
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
        fetchTickets:(state, {payload})=>{
            state.isloading=false;
            state.tickets = payload;
        },
        fetchAssets:(state, {payload})=>{
            state.isloading=false;
            state.assets = payload;
        },
        fetchMyticket:(state, {payload})=>{
            state.isloading=false;
            state.myticket = payload;
            state.error=null;
        },
        fetchLearnings:(state, {payload})=>{
            state.isloading=false;
            state.learnings = payload;
            state.error=null;
        },
        fetchCab:(state, {payload})=>{
            state.isloading=false;
            state.cab = payload;
            state.error=null;
        },
        errorfetching:(state, {payload})=>{
            state.isloading=false;
            state.error=payload;
        }
    }
})

export const {reducer , actions} = requestSlice

export const {request, fetchAll, initial, errorfetching, 
    fetchRequest, fetchTickets, fetchMyticket, fetchLearnings, fetchAssets, fetchCab } = actions

export default reducer;