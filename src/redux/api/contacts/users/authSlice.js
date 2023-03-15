import { createSlice } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(usersApi.endpoints.getCurrentUser.matchPending, state => {
        state.isRefreshing = true;
      })
      .addMatcher(
        usersApi.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.isRefreshing = false;
        }
      )
      .addMatcher(usersApi.endpoints.getCurrentUser.matchRejected, state => {
        state.isRefreshing = false;
      })
      .addMatcher(usersApi.endpoints.logoutUser.matchFulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const { setCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
