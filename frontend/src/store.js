import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api.js';
import auth from './slices/authSlice.js';
import channels from './slices/channelsSlice.js';
import messages from './slices/messagesSlice.js';
import ui from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    channels,
    messages,
    ui,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
