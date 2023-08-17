import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchNodesData = createAsyncThunk('nodes/fetchData', async (id, accessToken) => {
    try {
        const res = await axios.get('https://firealerthub.onrender.com/api/getNodesOfUser', {
            params: { id },
            headers: { token: `Bearer ${accessToken}` },
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
});

const nodesSlice = createSlice({
    name: 'nodes',
    initialState: {
        data: [],
        loading: 'idle',
    },
    reducers: {
        setNodesValue: (state, action) => {
            action.payload.forEach((element) => {
                const nodeSelect = state.data.filter((node) => node.node_name === element.node_name)[0];
                if (nodeSelect) {
                    nodeSelect.Fire_value.push(element.Fire_value);
                    nodeSelect.Smoke_value.push(element.Smoke_value);
                    nodeSelect.Gas_value.push(element.Gas_value);
                    nodeSelect.warning = element.warning;
                } else {
                    state.data.push(element);
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNodesData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchNodesData.fulfilled, (state, action) => {
                state.loading = 'success';
                state.data = action.payload?.data;
            })
            .addCase(fetchNodesData.rejected, (state) => {
                state.loading = 'error';
            });
    },
});

export const { setNodesValue } = nodesSlice.actions;

export default nodesSlice.reducer;
