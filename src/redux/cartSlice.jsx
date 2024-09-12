import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart or increase quantity if it exists
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newProduct.id);

      if (existingItemIndex !== -1) {
        // Product already exists, increase its quantity
        state.cartItems[existingItemIndex].quantity += 1;
      } else {
        // If the item is new, add it with an initial quantity of 1
        state.cartItems.push({ ...newProduct, quantity: 1 });
      }

      // Sync with local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    
    // Increase the quantity of a product
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        // Sync with localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },

    // Decrease the quantity or remove the product if quantity is 1
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Remove the item from the cart if the quantity is 1 and the user decreases it
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
      // Sync with localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // Remove a product from the cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      // Sync with localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
