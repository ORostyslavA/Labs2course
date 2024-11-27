import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
    },
    incrementQuantity(state, action) {
      const { id, city, day } = action.payload;
      const item = state.items.find(i => 
        i.id === id && 
        i.city === city && 
        i.day === day
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const { id, city, day } = action.payload;
      const item = state.items.find(i => 
        i.id === id && 
        i.city === city && 
        i.day === day
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => 
            !(i.id === id && i.city === city && i.day === day)
          );
        }
      }
    },
    addItem(state, action) {
      const { id, city, day } = action.payload;
      const existingItem = state.items.find(item => 
        item.id === id && 
        item.city === city && 
        item.day === day
      );
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ 
          ...action.payload, 
          quantity: action.payload.quantity,
        });
      }
    },
  },
});

export const { setCart, incrementQuantity, decrementQuantity, addItem } = cartSlice.actions;
export default cartSlice.reducer;