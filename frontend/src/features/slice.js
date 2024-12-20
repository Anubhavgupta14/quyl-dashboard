import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Async thunks for API calls
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (params = {}) => {
    const { search = '' } = params;
    const queryString = new URLSearchParams({ search }).toString();
    const response = await axios.get(`${API_URL}/items${queryString ? `?${queryString}` : ''}`);
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
    toast.success('Student added successfully');
    return response.data;
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, itemData }) => {
    const response = await axios.put(`${API_URL}/items/${id}`, itemData);
    toast.success('Student updated successfully');
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id) => {
    await axios.delete(`${API_URL}/items/${id}`);
    toast.success('Student deleted successfully');
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
    searchQuery: '', // Added to track current search query
    totalCount: 0,   // Added to track total number of items (useful for pagination)
  },
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
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
        // Assuming the API returns { items: [], totalCount: number }
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
          state.totalCount = action.payload.length;
        } else {
          state.items = action.payload.items || action.payload;
          state.totalCount = action.payload.totalCount || action.payload.length;
        }
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch single item
      .addCase(fetchItemById.pending, (state) => {
        state.currentItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
        state.error = null;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Create item
      .addCase(createItem.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
        state.totalCount += 1;
        state.error = null;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Update item
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.currentItem = action.payload;
        state.error = null;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Delete item
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalCount -= 1;
        state.error = null;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentItem, setError, setSearchQuery } = itemsSlice.actions;

// Selectors
export const selectAllItems = (state) => state.items.items;
export const selectItemById = (state, itemId) => 
  state.items.items.find(item => item.id === itemId);
export const selectItemsStatus = (state) => state.items.status;
export const selectItemsError = (state) => state.items.error;
export const selectSearchQuery = (state) => state.items.searchQuery;
export const selectTotalCount = (state) => state.items.totalCount;

export default itemsSlice.reducer;