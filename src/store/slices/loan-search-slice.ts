// src/store/slices/loanSearchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoanSearchState {
  term: string;
}

const initialState: LoanSearchState = {
  term: '',
};

const loanSearchSlice = createSlice({
  name: 'loanSearch',
  initialState,
  reducers: {
    setLoanSearch: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
    clearLoanSearch: (state) => {
      state.term = '';
    },
  },
});

export const { setLoanSearch, clearLoanSearch } = loanSearchSlice.actions;
export default loanSearchSlice.reducer;
