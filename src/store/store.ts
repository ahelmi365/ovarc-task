import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import authSlice from "./authSlice/authSlice";

// import requestDetailsSlice from "./requestDetailsSlice/requestDetailsSlice";
// slices
// import storage from "redux-persist/es/storage";

const rootReducer = combineReducers({
  auth: authSlice,
  //   requestDetails: requestDetailsSlice,
});

const persistConfig = {
  key: "root-epassOfficerApp",

  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // When using Redux Persist without using the Thunk middleware,
  // we‘d get an error in the browser’s console "reading a non-serializable value was detected in the state".
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { persistor, store };
