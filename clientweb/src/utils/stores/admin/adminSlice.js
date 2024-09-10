import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from "../../apiRequest"
import Cookies from "js-cookie";

export const getDataAdmin = createAsyncThunk(
    'admin/getDataAdmin',
    async ({ search, page, perPage, role }) => {

        const token = Cookies.get("token");

        const res = await Api.get('/admin/get', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                search: search,
                page: page,
                perPage: perPage,
                role: role,
            }
        })
        // console.log('res:', res.data.data)
        return res.data.data
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDataAdmin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDataAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getDataAdmin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default adminSlice.reducer;
