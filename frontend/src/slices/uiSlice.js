/* eslint-disable no-param-reassign */

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import api from '../services/api.js';
import { removeChannel, renameChannel } from './channelsSlice.js';

const initialState = {
  activeChannel: null,
  defaultChannel: null,
  isModalShown: false,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectChannel: (state, { payload: channel }) => {
      state.activeChannel = channel;
    },
    setIsModalShown: (state, { payload }) => {
      state.isModalShown = payload;
    },
  },
  extraReducers: (builder) => {
    const matchRejectedCases = [
      api.endpoints.getChannels.matchRejected,
      api.endpoints.getMessages.matchRejected,
      api.endpoints.addChannel.matchRejected,
      api.endpoints.removeChannel.matchRejected,
      api.endpoints.renameChannel.matchRejected,
      api.endpoints.getChannels.matchRejected,
      api.endpoints.sendMessage.matchRejected,
    ];

    builder
      .addCase(removeChannel, (state, { payload: channelId }) => {
        state.isModalShown = false;
        if (state.activeChannel.id === channelId) {
          state.activeChannel = state.defaultChannel;
        }
      })
      .addCase(renameChannel, (state, { payload: channel }) => {
        state.activeChannel = channel;
        state.isModalShown = false;
      })
      .addMatcher(api.endpoints.getChannels.matchFulfilled, (state, { payload }) => {
        if (Object.keys(payload).length !== 0) {
          const defaultChannel = Object.values(payload)[0];
          state.defaultChannel = defaultChannel;
          state.activeChannel = defaultChannel;
        }
      })
      .addMatcher(api.endpoints.addChannel.matchFulfilled, (state, { payload }) => {
        state.activeChannel = payload;
        state.isModalShown = false;
        toast.success(t('toastify.channelAdded'));
      })
      .addMatcher(api.endpoints.removeChannel.matchFulfilled, () => {
        toast.success(t('toastify.channelDeleted'));
      })
      .addMatcher(api.endpoints.renameChannel.matchFulfilled, () => {
        toast.success(t('toastify.channelRenamed'));
      })
      .addMatcher(isAnyOf(...matchRejectedCases), (_, { payload }) => {
        if (payload.status !== 401) {
          toast.error(t('toastify.network'));
        }
      });
  },
});

export default slice.reducer;
export const { selectChannel, setIsModalShown } = slice.actions;

export const selectActiveChannel = (state) => state.ui.activeChannel;
export const selectIsModalShown = (state) => state.ui.isModalShown;
