import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    meeting : null,
}

const meetingSlice = createSlice({
    name: "meeting",
    initialState,
    reducers : {
        createMeeting: (state, action)=>{
                state.meeting = action.payload;
        },
        joinMeeting: (state, action)=>{
                state.meeting = action.payload;
        },
        exitMeeting: (state, action) => {
                state.meeting = action.payload;
        },
        closeMeeting: (state) => {
                state.meeting = null;
        } 
    }
})

export const { createMeeting, exitMeeting, closeMeeting, joinMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;