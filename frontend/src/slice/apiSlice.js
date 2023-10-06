import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: "https://mailnest-ts4x.onrender.com/"});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User','Template'],
    endpoints: (builder) => ({}),
});