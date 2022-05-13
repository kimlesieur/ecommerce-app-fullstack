import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../api';

export const loadAllProducts = createAsyncThunk(
    'homepage/loadAllProducts',
    async (category) => {
        const data = await getProducts(category);
        return data;
    }
);


export const homepageSlice = createSlice({
    name: 'homepage',
    initialState: {
        products: [],
        isLoadingProducts: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadAllProducts.pending, (state) => {
            state.isLoadingProducts = true;
            state.hasError = false;
        })
        .addCase(loadAllProducts.fulfilled, (state, action) => {
            state.isLoadingProducts = false;
            state.hasError = false;
            state.products = action.payload;
        })
        .addCase(loadAllProducts.rejected, (state) => {
            state.isLoadingProducts = false;
            state.hasError = true;
            state.products = [];
        })
    }
});

export const selectProducts = state => state.homepage.products;
export const isLoading = state => state.homepage.isLoadingProducts;

export default homepageSlice.reducer;