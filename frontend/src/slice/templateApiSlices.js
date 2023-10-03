import { apiSlice } from "./apiSlice";
const TEMPLATE_URL = '/api/mail';

export const templateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTemplate: builder.mutation({
            query: (data) => ({
                url: `${TEMPLATE_URL}/templates`,
                method: 'GET',
                body: data
            })
        }),
        getUserTemplates: builder.mutation({
            query: (data) => ({
                url: `${TEMPLATE_URL}/templates/me`,
                method: 'GET',
                body: data
            })
        }),
        createTemplate: builder.mutation({
            query: (data) => ({
                url: `${TEMPLATE_URL}/templates/me`,
                method: 'POST',
                body: data
            })
        }),
        deleteTemplate: builder.mutation({
            query: () => ({
                url: `${TEMPLATE_URL}/templates/me/delete`,
                method: 'DELETE',
            })
        }),
    })
});

export const { useGetAllTemplateMutation, useCreateTemplateMutation, useGetUserTemplatesMutation, useDeleteTemplateMutation  } = templateApiSlice;