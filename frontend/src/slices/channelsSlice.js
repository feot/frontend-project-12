import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';

const initialState = {
  entities: {},
  ids: [],
};

const slice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getInitialData.matchFulfilled, (state, { payload }) => {
        console.log('channels, matchFulfilled', payload);
        const { channels } = payload;
        channels.forEach(channel => {
          state.entities[channel.id] = channel;
        });
        state.ids.push(channels.map(({ id }) => id));
      });
  },
});

export default slice.reducer;

export const selectChannels = (state) => state.channels.entities;
