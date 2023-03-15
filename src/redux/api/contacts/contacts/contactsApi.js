import { baseApi } from '../baseApi';

export const contactsApi = baseApi.injectEndpoints({
  ...baseApi,
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => 'contacts/',
      providesTags: ['Contacts', 'user'],
    }),
    deleteContacts: builder.mutation({
      query(id) {
        return { url: `contacts/${id}`, method: 'DELETE' };
      },
      invalidatesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query(body) {
        return { url: `contacts/`, method: 'POST', body };
      },
      invalidatesTags: ['Contacts'],
    }),
  }),
});
export const {
  useGetContactsQuery,
  useDeleteContactsMutation,
  useAddContactsMutation,
} = contactsApi;
