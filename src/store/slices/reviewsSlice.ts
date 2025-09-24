import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewsState {
  searchQuery: string;
}

const initialState: ReviewsState = {
  searchQuery: '',
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
  },
});

export const { setSearchQuery, clearSearchQuery } = reviewsSlice.actions;
export default reviewsSlice.reducer;
