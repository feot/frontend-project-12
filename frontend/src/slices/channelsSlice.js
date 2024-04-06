/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import api from '../services/api.js';

const initialState = {
  entities: {},
  ids: [],
};

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload: channels }) => {
      channels.forEach((channel) => {
        state.entities[channel.id] = channel;
      });
      state.ids.push(...channels.map(({ id }) => id));
    },
    addChannel: (state, { payload: channel }) => {
      const { id } = channel;
      state.entities[id] = channel;
      state.ids.push(id);
    },
    removeChannel: (state, { payload: id }) => {
      delete state.entities[id];
      const index = state.ids.indexOf(id);
      if (index > -1) {
        state.ids.splice(index, 1);
      }
    },
    renameChannel: (state, { payload: channel }) => {
      state.entities[channel.id] = channel;
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
export const {
  addChannels,
  addChannel,
  removeChannel,
  renameChannel,
} = slice.actions;

export const selectChannels = (state) => state.channels.entities;
