import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api.js';
import auth from './slices/authSlice.js';
import channels from './slices/channelsSlice.js';
import messages from './slices/messagesSlice.js'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    channels,
    messages,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
