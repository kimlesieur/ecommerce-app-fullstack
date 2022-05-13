import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getOrderDetails, checkoutPayment} from '../../api';

export const loadOrderDetails = createAsyncThunk(
    'checkout/loadOrderDetails',
    async ({token, id}) => {
        let data = await getOrderDetails(token, id);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const event = new Date(data.created);
        const newDate = event.toLocaleDateString(undefined, options);
        data = {...data, date: newDate};
        return data;
    }
);

export const checkoutSlice = createSlice({
    name:'checkout',
    initialState: {
        order:[],
        isLoadingOrder: false,
        hasErrorOrder: false,
    }, 
    reducers: {
        sendCheckout: (state, action) => {
            const token = action.payload.token;
            const id = action.payload.orderId;
            checkoutPayment(token, id);
        },
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(loadOrderDetails.pending, state => {
            state.isLoadingOrder = true;
            state.hasErrorOrder = false;
        })
        .addCase(loadOrderDetails.fulfilled, (state, action) => {
            state.isLoadingOrder = false;
            state.hasErrorOrder = false;
            state.order = action.payload;
        })
        .addCase(loadOrderDetails.rejected, state => {
            state.isLoadingOrder = true;
            state.hasErrorOrder = false;
            state.order = [];
        })
       
    }
});

export const selectOrder = state => state.checkout.order;
export const isLoadingOrder = state => state.checkout.isLoadingOrder;
export const hasErrorOrder = state => state.checkout.hasErrorOrder;

export const {sendCheckout} = checkoutSlice.actions;

export default checkoutSlice.reducer;
