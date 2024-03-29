import { api } from './api.js';

export const channelsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getChannels: build.query({
      query: () => ({ url: 'channels' }),
    }),
    addChannel: build.mutation({
      query: (channel) => ({
        url: 'channels',
        method: 'POST',
        body: channel,
      }),
    }),
  }),
});

export const { useGetChannelsQuery, useAddChannelMutation } = channelsApi;
