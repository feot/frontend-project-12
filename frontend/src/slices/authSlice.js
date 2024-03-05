import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
const localStorageAuthData = JSON.parse(localStorage.getItem('auth'));

const slice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    ...localStorageAuthData,
  },
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchPending, (_, action) => {
        console.log('pending', action);
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);
        const { username: user, token } = action.payload;
        const isAuthenticated = true;
        state.user = user;
        state.token = token;
        state.isAuthenticated = isAuthenticated;
        localStorage.setItem('auth', JSON.stringify({ user, token, isAuthenticated }));
      })
      .addMatcher(api.endpoints.login.matchRejected, (_, action) => {
        console.log('rejected', action);
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUsername = (state) => state.auth.user;
