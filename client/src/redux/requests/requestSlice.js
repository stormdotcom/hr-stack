import { createSlice } from "@reduxjs/toolkit"; 

 const requestSlice= createSlice({
    name:'request',
    initialState:{
        isloading:true,
        error:"",
        tickets:[],
        reqData:[],
        myticket:[]
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
        fetchMyticket:(state, {payload})=>{
            state.isloading=false;
            state.myticket = payload;
            state.error=null;
        },
        errorfetching:(state, {payload})=>{
            state.isloading=false;
            state.error=payload;
        }
    }
})

export const {reducer , actions} = requestSlice

export const {request, fetchAll, initial, errorfetching, fetchRequest, fetchTickets, fetchMyticket } = actions

export default reducer;