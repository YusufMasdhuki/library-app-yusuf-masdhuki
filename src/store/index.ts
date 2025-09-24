// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookFilterReducer from './slices/bookFilterSlice';
import cartReducer from './slices/cart-slice';
import loanSearchReducer from './slices/loan-search-slice';
import reviewsReducer from './slices/reviewsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  bookFilter: bookFilterReducer,
  cart: cartReducer,
  loanSearch: loanSearchReducer,
  reviews: reviewsReducer,
});

// konfigurasi persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// buat store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// buat persistor
export const persistor = persistStore(store);

// tipe helper
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
