import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const initialState = {
  entities: {},
  ids: [],
};

const slice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getMessages.matchFulfilled, (state, { payload: messages }) => {
        messages.forEach(message => {
          state.entities[message.id] = message;
        });
        state.ids.push(messages.map(({ id }) => id));
      });
  },
});

export default slice.reducer;

export const selectMessages = (state) => state.messages.entities;
