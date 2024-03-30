import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';
import { removeChannel } from './channelsSlice.js';

const initialState = {
  entities: {},
  ids: [],
};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload: message }) => {
      const { id } = message;
      state.entities[id] = message;
      state.ids.push(id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload: channelId }) => {
        const rest = Object.values(state.entities).reduce((acc, message) => {
          if (message.channelId === channelId) {
            delete state.entities[message.id];
            return acc;
          } else {
            return [...acc, message.id];
          }
        }, []);
        state.ids = rest;
      })
      .addMatcher(api.endpoints.getMessages.matchFulfilled, (state, { payload: messages }) => {
        messages.forEach(message => {
          state.entities[message.id] = message;
        });
        state.ids.push(...messages.map(({ id }) => id));
      });
  },
});

export default slice.reducer;
export const { addMessage } = slice.actions;

export const selectMessages = (state) => state.messages.entities;
