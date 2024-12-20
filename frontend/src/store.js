// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './features/slice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});