import { api } from './api.js';

export const channelsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getChannels: build.query({
      query: () => ({ url: 'channels' }),
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;
