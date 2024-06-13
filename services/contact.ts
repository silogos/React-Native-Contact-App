import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Contact } from '@/types'

export const contactApi = createApi({
  reducerPath: 'contact',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://contact.herokuapp.com/' }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => 'contact',
      transformResponse: (response: { data: Contact[] }) => response.data,
      providesTags: ['Contact']
    }),
    getContact: builder.query<Contact, string>({
      query: (id) => `contact/${id}`,
      transformResponse: (response: { data: Contact }) => response.data,
      providesTags: (result, error, arg) => [{ type: 'Contact', id: result?.id }]
    }),
    createContact: builder.mutation<Contact, Omit<Contact, 'id'>>({
      query: (data) => ({
        url: 'contact',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Contact']
    }),
    updateContact: builder.mutation<Contact, Contact>({
      query: ({ id, ...data }) => ({
        url: `contact/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Contact']
    }),
    deleteContact: builder.mutation<Contact, string>({
      query: (id) => ({
        url: `contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact']
    })
  }),
})

export const { useGetContactsQuery, useGetContactQuery, useCreateContactMutation, useUpdateContactMutation, useDeleteContactMutation } = contactApi