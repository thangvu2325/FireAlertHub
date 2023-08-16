import { createSlice } from '@reduxjs/toolkit';
const mapRoutingMachineSlice = createSlice({
    name: 'modalbox',
    initialState: {
        start: [],
        end: [],
    },
    reducers: {
        setStart: (state, action) => {
            state.start = action.payload;
        },
        setEnd: (state, action) => {
            state.end = action.payload;
        },
    },
});

export const { setStart, setEnd } = mapRoutingMachineSlice.actions;

export default mapRoutingMachineSlice.reducer;
