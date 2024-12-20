// src/features/items/itemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Async thunks for API calls
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id) => {
    const response = await axios.get(`${API_URL}/items/${id}`);
    return response.data;
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (itemData) => {
    const response = await axios.post(`${API_URL}/items`, itemData);
    return response.data;
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, itemData }) => {
    const response = await axios.put(`${API_URL}/items/${id}`, itemData);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id) => {
    await axios.delete(`${API_URL}/items/${id}`);
    return id;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    currentItem: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all items
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch single item
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      })
      // Create item
      .addCase(createItem.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      // Update item
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.currentItem = action.payload;
      })
      // Delete item
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { clearCurrentItem, setError } = itemsSlice.actions;
export default itemsSlice.reducer;