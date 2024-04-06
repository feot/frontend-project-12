import api from './api.js';

export const initialDataApi = api.injectEndpoints({
  endpoints: (build) => ({
    getInitialData: build.query({
      query: () => ({ url: 'data' }),
    }),
  }),
});

export const { useGetInitialDataQuery } = initialDataApi;
