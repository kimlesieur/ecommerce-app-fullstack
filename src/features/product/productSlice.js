import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getProductById, sendToCart} from '../../api';

export const loadProduct = createAsyncThunk(
    'product/loadProduct',
    async (id) => {
        const data = await getProductById(id);
        return data;
    }
);

export const addToCart = createAsyncThunk(
    'product/addToCart',
    async ({token, quantity, id}) => {
        const data = await sendToCart(token, quantity, id);
    }
)

export const productSlice = createSlice({
    name:'product',
    initialState: {
        product: [],
        quantity: 4,
        isLoadingProduct: false,
        hasError: false,
    },
    reducers: {
        addQuantity: state => {
            state.quantity += 1; 
        },
        removeQuantity: state => {
            state.quantity -= 1; 
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadProduct.pending, state => {
            state.isLoadingProduct = true;
            state.hasError = false;
        })
        .addCase(loadProduct.fulfilled, (state, action) => {
            state.isLoadingProduct = false;
            state.hasError = false;
            state.product = action.payload;
        })
        .addCase(loadProduct.rejected, state => {
            state.isLoadingProduct = false;
            state.hasError = true;
            state.product = [];
        })

    }
});

export const selectProduct = state => state.product.product;
export const selectQuantity = state => state.product.quantity;
export const isLoading = state => state.product.isLoadingProduct;
export const hasError = state => state.product.hasError;

export const {addQuantity, removeQuantity} = productSlice.actions;

export default productSlice.reducer;
