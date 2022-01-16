import { createSlice } from "@reduxjs/toolkit"; 

 const pending= createSlice({
    name:'pending',
    initialState:{
        isloading:true,
        error:"",
        data:[],
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
        editPending:(state, {payload})=>{
            state.isloading=false;
            state.data = payload
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

export const {reducer , actions} = pending

export const {fetchData, editPending, initial, errorfetching, final } = actions

export default reducer;