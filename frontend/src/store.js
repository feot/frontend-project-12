import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api.js';
import auth from './slices/authSlice.js';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
