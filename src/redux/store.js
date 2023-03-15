import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { filtersReducer } from './filters/filtersSlice';
import { contactsApi } from './api/contacts/contacts/contactsApi';
import { usersApi } from './api/contacts/users/usersApi';
import { authReducer } from './api/contacts/users/authSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    filters: filtersReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    contactsApi.middleware,
    usersApi.middleware,
  ],
});
export const persistor = persistStore(store);
