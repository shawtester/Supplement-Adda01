import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newProduct.id);

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += newProduct.quantity;
      } else {
        state.cartItems.push({ ...newProduct, quantity: newProduct.quantity || 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
