import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { bookSlice } from './book/bookSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    book: bookSlice.reducer
  },
});