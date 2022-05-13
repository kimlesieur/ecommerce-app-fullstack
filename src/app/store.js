import { configureStore } from '@reduxjs/toolkit';
import homepageReducer from '../features/homepage/homepageSlice';
import headerReducer from '../components/header/headerSlice';
import cartReducer from '../features/cart/cartSlice';
import accountReducer from '../features/account/accountSlice';
import productReducer from '../features/product/productSlice';
import checkoutReducer from '../components/checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    header: headerReducer,
    cart: cartReducer,
    account: accountReducer,
    product: productReducer,
    checkout: checkoutReducer,
  },
});
