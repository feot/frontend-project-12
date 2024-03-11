import { api } from './api.js';

export const messagesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => ({ url: 'messages' }),
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;
