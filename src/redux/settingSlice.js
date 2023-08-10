import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        themeMode: false,
        sidebarWidth: false,
    },
    reducers: {
        setSidebarWidth: (state, action) => {
            state.sidebarWidth = action.payload;
        },
        setThemeMode: (state, action) => {
            state.themeMode = action.payload;
        },
    },
});

export const { setSidebarWidth, setThemeMode } = settingSlice.actions;

export default settingSlice.reducer;
