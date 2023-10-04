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
            query: (templateId) => ({
                url: `${TEMPLATE_URL}/templates/${templateId}`,
                method: 'DELETE',
                body: templateId
            })
        }),
    })
});

export const { useGetAllTemplateMutation, useCreateTemplateMutation, useGetUserTemplatesMutation, useDeleteTemplateMutation  } = templateApiSlice;