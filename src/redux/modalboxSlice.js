import { createSlice } from '@reduxjs/toolkit';

const modalboxSlice = createSlice({
    name: 'modalbox',
    initialState: {
        warning: false,
        openStatus: false,
    },
    reducers: {
        setWarning: (state, action) => {
            state.warning = action.payload;
        },
        setOpenStatus: (state, action) => {
            state.openStatus = action.payload;
        },
    },
});

export const { setWarning, setOpenStatus } = modalboxSlice.actions;

export default modalboxSlice.reducer;
