import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchInboxsData = createAsyncThunk('inboxs/fetchData', async (id, accessToken) => {
    try {
        const res = await axios.get(`https://firealerthub.onrender.com/api/${id}/getInbox`, {
            headers: { token: `Bearer ${accessToken}` },
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
});

const inboxsSlice = createSlice({
    name: 'modalbox',
    initialState: {
        data: [],
        loading: 'idle',
    },
    reducers: {
        deleteInbox: (state, action) => {
            state.data = state.data.filter((inbox) => inbox._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInboxsData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchInboxsData.fulfilled, (state, action) => {
                state.loading = 'success';
                state.data = action.payload;
            })
            .addCase(fetchInboxsData.rejected, (state) => {
                state.loading = 'error';
            });
    },
});

export const { deleteInbox } = inboxsSlice.actions;

export default inboxsSlice.reducer;
