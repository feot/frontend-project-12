import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';

const initialState = {
  entities: {},
  ids: [],
};

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload: channels }) => {
      channels.forEach(channel => {
        state.entities[channel.id] = channel;
      });
      state.ids.push(channels.map(({ id }) => id));
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getChannels.matchFulfilled, (state, action) => {
        slice.caseReducers.addChannels(state, action);
      });
  },
});

export default slice.reducer;
export const { addChannels } = slice.actions;

export const selectChannels = (state) => state.channels.entities;
