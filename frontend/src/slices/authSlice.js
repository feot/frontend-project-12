/* eslint-disable no-param-reassign */

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18nInstance from '../i18next.js';
import api from '../services/api.js';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
const localStorageAuthData = (localStorage.getItem('auth'))
  ? JSON.parse(localStorage.getItem('auth'))
  : {};

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
    const dataRequestRejects = [
      api.endpoints.getChannels.matchRejected,
      api.endpoints.getMessages.matchRejected,
    ];

    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        const { username: user, token } = action.payload;
        const isAuthenticated = true;
        state.user = user;
        state.token = token;
        state.isAuthenticated = isAuthenticated;
        localStorage.setItem('auth', JSON.stringify({ user, token, isAuthenticated }));
      })
      .addMatcher(api.endpoints.signup.matchFulfilled, (state, action) => {
        const { username: user, token } = action.payload;
        const isAuthenticated = true;
        state.user = user;
        state.token = token;
        state.isAuthenticated = isAuthenticated;
        localStorage.setItem('auth', JSON.stringify({ user, token, isAuthenticated }));
      })
      .addMatcher(isAnyOf(...dataRequestRejects), (_, { payload }) => {
        if (payload.status === 401) {
          slice.caseReducers.logout();
        }
      })
      .addMatcher(api.endpoints.login.matchRejected, (_, action) => {
        const { status } = action.payload;
        if (status !== 401) {
          toast.error(i18nInstance.t('toastify.network'));
        }
      })
      .addMatcher(api.endpoints.signup.matchRejected, (_, action) => {
        const { status } = action.payload;
        if (status !== 409) {
          toast.error(i18nInstance.t('toastify.network'));
        }
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUsername = (state) => state.auth.user;
