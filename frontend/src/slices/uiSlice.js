import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';
import { removeChannel, renameChannel } from './channelsSlice.js';

const initialState = {
  activeChannel: null,
  defaultChannel: null,
  isModalShown: false,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectChannel: (state, { payload: channel }) => {
      state.activeChannel = channel;
    },
    setIsModalShown: (state, { payload }) => {
      state.isModalShown = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state) => {
        state.activeChannel = state.defaultChannel;
        state.isModalShown = false;
      })
      .addCase(renameChannel, (state, { payload: channel }) => {
        state.activeChannel = channel;
        state.isModalShown = false;
      })
      .addMatcher(api.endpoints.getChannels.matchFulfilled, (state, { payload }) => {
        if (Object.keys(payload).length !== 0) {
          const defaultChannel = Object.values(payload)[0];
          state.defaultChannel = defaultChannel;
          state.activeChannel = defaultChannel;
        }
      })
      .addMatcher(api.endpoints.addChannel.matchFulfilled, (state, { payload }) => {
        state.activeChannel = payload;
        state.isModalShown = false;
      });
  },
});

export default slice.reducer;
export const { selectChannel, setIsModalShown } = slice.actions;

export const selectActiveChannel = (state) => state.ui.activeChannel;
export const selectIsModalShown = (state) => state.ui.isModalShown;
