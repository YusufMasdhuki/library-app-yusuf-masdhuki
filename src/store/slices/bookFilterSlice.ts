import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookFilterState {
  q: string;
  categoryId?: number;
  authorId?: number;
  rating?: number; // tambahkan rating
  page: number;
  limit: number;
}

const initialState: BookFilterState = {
  q: '',
  categoryId: undefined,
  authorId: undefined,
  rating: undefined, // default
  page: 1,
  limit: 10,
};

const bookFilterSlice = createSlice({
  name: 'bookFilter',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.q = action.payload;
      state.page = 1;
    },
    setCategory(state, action: PayloadAction<number | undefined>) {
      state.categoryId = action.payload;
      state.page = 1;
    },
    setAuthor(state, action: PayloadAction<number | undefined>) {
      state.authorId = action.payload;
      state.page = 1;
    },
    setRating(state, action: PayloadAction<number | undefined>) {
      state.rating = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters(state) {
      state.q = '';
      state.categoryId = undefined;
      state.authorId = undefined;
      state.rating = undefined;
      state.page = 1;
    },
  },
});

export const {
  setSearchQuery,
  setCategory,
  setAuthor,
  setRating,
  setPage,
  resetFilters,
} = bookFilterSlice.actions;

export default bookFilterSlice.reducer;
