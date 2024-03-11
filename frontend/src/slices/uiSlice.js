import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';

const initialState = {
  activeChannel: null,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectChannel: (state, { payload: channel }) => {
      state.activeChannel = channel;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getChannels.matchFulfilled, (state, { payload }) => {
        if (Object.keys(payload).length !== 0) {
          state.activeChannel = Object.values(payload)[0];
        }
      });
  },
});

export default slice.reducer;
export const { selectChannel } = slice.actions;

export const selectActiveChannel = (state) => state.ui.activeChannel;
