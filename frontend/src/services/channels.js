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
    removeChannel: build.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
