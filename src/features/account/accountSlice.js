import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getToken, getUserInfo, getOrders } from '../../api';

export const loadToken = createAsyncThunk(
    'account/loadToken',
    async ({email, password}) => {
        const data = await getToken(email, password);
        return data;
    }
);
//TODO Create an util function to add a formatted date string (used in loadOrders async thunk and in checkoutSlice too )
export const loadUserInfo = createAsyncThunk(
    'account/loadUserInfo',
    async (token) => {
        let data = await getUserInfo(token);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const event = new Date(data.created);
        const newDate = event.toLocaleDateString(undefined, options);
        data = {...data, date: newDate};
        return data;
    }
);

export const loadOrders = createAsyncThunk(
    'account/loadOrders',
    async (token) => {
        const data = await getOrders(token);
        let data2 = [];
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        data.map(element => {
            const event = new Date(element.created);
            const newDate = event.toLocaleDateString(undefined, options);
            data2.push({...element, date: newDate});
        });
        return data2;
    }
);


export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        token: null,
        isLoadingToken: false,
        hasErrorToken: false,
        userInfos: [],
        isLoadingInfos: false,
        hasErrorInfos: false,
        orders: {},
        isLoadingOrders: false,
        hasErrorOrders: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadToken.pending, state => {
            state.isLoadingToken = true;
            state.hasErrorToken = false;
        })
        .addCase(loadToken.fulfilled, (state, action) => {
            state.isLoadingToken = false;
            state.hasErrorToken = false;
            state.token = action.payload.token;
        })
        .addCase(loadToken.rejected, state => {
            state.isLoadingToken = false;
            state.hasErrorToken = true;
            state.token = null;
        })
        .addCase(loadUserInfo.pending, state => {
            state.isLoadingInfos = true;
            state.hasErrorInfos = false;
        })
        .addCase(loadUserInfo.fulfilled, (state, action) => {
            state.isLoadingInfos = false;
            state.hasErrorInfos = false;
            state.userInfos = action.payload;
        })
        .addCase(loadUserInfo.rejected, state => {
            state.isLoadingInfos = false;
            state.hasErrorInfos = true;
            state.userInfos = [];
        })
        .addCase(loadOrders.pending, state => {
            state.isLoadingOrders = true;
            state.hasErrorOrders = false;
        })
        .addCase(loadOrders.fulfilled, (state, action) => {
            state.isLoadingOrders = false;
            state.hasErrorOrders = false;
            state.orders = action.payload;
        })
        .addCase(loadOrders.rejected, state => {
            state.isLoadingOrders = false;
            state.hasErrorOrders = true;
            state.orders = [];
        })

    }
});

export const selectToken = state => state.account.token;
export const isLoading = state => state.account.isLoadingToken;
export const hasErrorToken = state => state.account.hasErrorToken;
export const selectUserInfos = state => state.account.userInfos;
export const isLoadingInfos = state => state.account.isLoadingInfos;
export const hasErrorInfos = state => state.account.hasErrorInfos;
export const selectOrders = state => state.account.orders;
export const isLoadingOrders = state => state.account.isLoadingOrders;
export const hasErrorOrders = state => state.account.hasErrorOrders;

export default accountSlice.reducer;