import { api } from './api.js';

export const messagesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => ({ url: 'messages' }),
    }),
    sendMessage: build.mutation({
      query: (message) => ({
        url: 'messages',
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApi;
