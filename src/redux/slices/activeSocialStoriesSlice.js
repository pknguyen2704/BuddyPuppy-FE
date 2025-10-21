// src/redux/slices/activeSocialStoriesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROOT } from '~/utils/constants';

// Thunk để fetch social stories từ API
export const fetchSocialStories = createAsyncThunk(
  'activeSocialStories/fetchActiveSocialStories',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // lấy token từ localStorage
      const response = await axios.get(`${API_ROOT}/v1/social-stories`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });

      // Nếu API trả về object { stories: [...] }
      return response.data.stories || [];
    } catch (error) {
      // Nếu server trả lỗi JSON {message, statusCode}, lấy message
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      // Nếu lỗi khác, trả về message mặc định
      return rejectWithValue({ message: error.message });
    }
  }
);

const activeSocialStoriesSlice = createSlice({
  name: 'activeSocialStories',
  initialState: {
    stories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    updateCurrentActiveSocialStories(state, action) {
      state.stories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialStories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSocialStories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stories = action.payload;
      })
      .addCase(fetchSocialStories.rejected, (state, action) => {
        state.status = 'failed';
        // Nếu payload là object {message}, lấy message, nếu không lấy action.error.message
        state.error = action.payload?.message || action.error.message || 'Đã có lỗi xảy ra';
      });
  },
});

// Export actions
export const { updateCurrentActiveSocialStories } = activeSocialStoriesSlice.actions;

// Export selectors
export const selectActiveSocialStories = (state) => state.activeSocialStories.stories;
export const selectSocialStoriesStatus = (state) => state.activeSocialStories.status;
export const selectSocialStoriesError = (state) => state.activeSocialStories.error;

// Export reducer
export const activeSocialStoriesReducer = activeSocialStoriesSlice.reducer;
