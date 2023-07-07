import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = []

export const fetchEventAsync = createAsyncThunk(
    'event',
    async() => {
        try {
            const {data} = await axios.get('/api/events')
            return data
            
        } catch (error) {
            console.log(error);
        }
    }
)

const addEventAsync = createAsyncThunk(
    'event',
    async({title, start, end, userId}) => {
        try {
                    
        const {data} = await axios.post('/api/events', {
            title: title,
            start: start,
            end: end,
            userId: userId
        })
        return data
            
        } catch (error) {
            console.log(error);
        }

    }
)



const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEventAsync.fulfilled, (state, action) => {
            return action.payload
        })
        builder.addCase(addEventAsync.fulfilled, (state, action) => {
            state.push(action.payload)
        })
    }
})

export default eventSlice.reducer