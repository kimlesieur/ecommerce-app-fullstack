import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCartItems, order } from '../../api';

export const loadAllItems = createAsyncThunk(
    'cart/loadAllItems',
    async (token) => {
        const data = await getCartItems(token);
        return data;
    }
);

export const orderItems = createAsyncThunk(
    'cart/orderItems',
    async (token) => {
        const data = await order(token);
        console.log(data);
        return data;
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        isLoadingItems: false,
        hasError: false,
        orderId: null,
        isLoadingOrder: false,
        hasErrorOrder: false,
    },
    reducers: {
        changeOrderId: (state, action) => {
            state.orderId = action.payload;
        },
        test: (state, action) => {
            state.isLoadingOrder = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadAllItems.pending, state => {
            state.isLoadingItems = true;
            state.hasError = false;
        })
        .addCase(loadAllItems.fulfilled, (state, action) => {
            state.isLoadingItems = false;
            state.hasError = false;
            state.items = action.payload;
        })
        .addCase(loadAllItems.rejected, state => {
            state.isLoadingItems = false;
            state.hasError = true;
            state.items = [];
        })
        .addCase(orderItems.pending, state => {
            state.isLoadingOrder = true;
            state.hasErrorOrder = false;
        })
        .addCase(orderItems.fulfilled, (state, action) => {
            state.isLoadingOrder = false;
            state.hasErrorOrder = false;
            state.orderId = action.payload;
        })
        .addCase(orderItems.rejected, state => {
            state.isLoadingOrder = false;
            state.hasErrorOrder = true;
            state.orderId = null;
        })
    }
});

export const selectItems = state => state.cart.items;
export const isLoading = state => state.cart.isLoadingItems;
export const orderId = state => state.cart.orderId;

export const {changeOrderId, test} = cartSlice.actions;

export default cartSlice.reducer;