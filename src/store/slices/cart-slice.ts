import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  authorName: string;
  category: string;
  coverImage?: string | null;
}

interface CartState {
  items: CartItem[];
  selectedIds: number[];
  checkoutIds: number[];
}

const initialState: CartState = {
  items: [],
  selectedIds: [],
  checkoutIds: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    setCheckoutNow(state, action: PayloadAction<CartItem>) {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
      state.checkoutIds = [action.payload.id]; // langsung set checkout 1 buku
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.selectedIds = state.selectedIds.filter(
        (id) => id !== action.payload
      );
      state.checkoutIds = state.checkoutIds.filter(
        (id) => id !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.selectedIds = [];
      state.checkoutIds = [];
    },
    toggleSelectItem: (state, action: PayloadAction<number>) => {
      if (state.selectedIds.includes(action.payload)) {
        state.selectedIds = state.selectedIds.filter(
          (id) => id !== action.payload
        );
      } else {
        state.selectedIds.push(action.payload);
      }
    },
    selectAll: (state) => {
      state.selectedIds = state.items.map((item) => item.id);
    },
    deselectAll: (state) => {
      state.selectedIds = [];
    },
    setCheckoutItems: (state, action: PayloadAction<number[]>) => {
      state.checkoutIds = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  toggleSelectItem,
  selectAll,
  deselectAll,
  setCheckoutItems,
  setCheckoutNow,
} = cartSlice.actions;

export default cartSlice.reducer;
