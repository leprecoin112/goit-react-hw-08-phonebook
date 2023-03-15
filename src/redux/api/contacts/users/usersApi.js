import { baseApi } from '../baseApi';

export const usersApi = baseApi.injectEndpoints({
  reducerPath: 'usersApi',
  tagTypes: ['user'],
  endpoints: builder => ({
    getCurrentUser: builder.query({
      query: () => 'users/current',
      providesTags: ['user'],
    }),
    loginUser: builder.mutation({
      query(body) {
        return { url: `users/login`, method: 'POST', body };
      },

      invalidatesTags: ['user'],
    }),
    signupUser: builder.mutation({
      query(body) {
        return { url: `users/signup`, method: 'POST', body };
      },
      invalidatesTags: ['user'],
    }),
    logoutUser: builder.mutation({
      query() {
        return { url: `users/logout`, method: 'POST' };
      },
      invalidatesTags: ['user'],
    }),
  }),
});
export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} = usersApi;
