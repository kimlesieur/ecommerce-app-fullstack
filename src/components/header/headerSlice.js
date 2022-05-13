import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../../api';

export const loadAllCategories = createAsyncThunk(
    'header/loadAllCategories',
    async () => {
        const data = await getCategories();
        return data;
    }

);


export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        categories: [],
        isLoadingCategories: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadAllCategories.pending, (state) => {
            state.isLoadingCategories = true;
            state.hasError = false;
        })
        .addCase(loadAllCategories.fulfilled, (state, action) => {
            state.isLoadingCategories = false;
            state.hasError = false;
            state.categories = action.payload;
        })
        .addCase(loadAllCategories.rejected, (state) => {
            state.isLoadingCategories = false;
            state.hasError = true;
            state.categories = [];
        })
    }
});

export const selectCategories = state => state.header.categories;
export const isLoading = state => state.header.isLoadingCategories;

export default headerSlice.reducer;