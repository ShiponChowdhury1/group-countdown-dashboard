import { configureStore } from "@reduxjs/toolkit";
import authReducer, { initialAuthState, AuthState } from "./authSlice";
import { authApi } from "./authApi";

/**
 * Factory so StoreProvider can inject the localStorage-preloaded auth state
 * synchronously before any component renders (avoids the first getProfile
 * request going out without an Authorization header).
 */
export function makeStore(preloadedAuth: Partial<AuthState> = {}) {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    preloadedState: {
      auth: { ...initialAuthState, ...preloadedAuth },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
