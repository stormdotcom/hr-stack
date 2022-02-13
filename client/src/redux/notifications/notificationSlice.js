import { createSlice } from "@reduxjs/toolkit"; 
const notificationSlice = createSlice({
    name: 'notifications',
    initialState:{
        notify:[]
    },
    reducers:{
        fetchNotification:( state, {payload} )=>{
            state.data=payload
        }
    }
})

export const {reducer , actions} = notificationSlice;
export const { fetchNotification } = actions

export default reducer;