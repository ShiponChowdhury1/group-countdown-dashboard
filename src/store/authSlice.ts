import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  is_email_verified: boolean;
  created_at: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  /** Email kept in memory across the forgot-password → verify-otp → reset flow */
  forgotPasswordEmail: string;
}

export const initialAuthState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  forgotPasswordEmail: "",
};

// ─── localStorage helpers (SSR-safe) ─────────────────────────────────────────

function saveToStorage(access: string, refresh: string | null, user: AuthUser) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("accessToken", access);
    if (refresh) localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("authUser", JSON.stringify(user));
  } catch {}
}

function clearStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authUser");
  } catch {}
}

/** Call on the client side to restore auth state from localStorage. */
export function loadAuthFromStorage(): Partial<AuthState> {
  if (typeof window === "undefined") return {};
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return {};
    const refreshToken = localStorage.getItem("refreshToken");
    const userJson = localStorage.getItem("authUser");
    return {
      accessToken,
      refreshToken,
      isAuthenticated: true,
      user: userJson ? (JSON.parse(userJson) as AuthUser) : null,
    };
  } catch {
    return {};
  }
}

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: AuthUser; access: string; refresh: string }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isAuthenticated = true;
      saveToStorage(
        action.payload.access,
        action.payload.refresh,
        action.payload.user
      );
    },

    /** Update just the user object (e.g. after a profile update). */
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      // Keep localStorage in sync so the next reload shows the updated data.
      if (state.accessToken) {
        saveToStorage(state.accessToken, state.refreshToken, action.payload);
      }
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.forgotPasswordEmail = "";
      clearStorage();
    },

    setForgotPasswordEmail(state, action: PayloadAction<string>) {
      state.forgotPasswordEmail = action.payload;
    },

    /**
     * Rehydrate auth state from localStorage after client-side hydration.
     * Only called from StoreProvider's useEffect (never on the server).
     */
    rehydrate(state, action: PayloadAction<Partial<AuthState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setCredentials,
  setUser,
  logout,
  setForgotPasswordEmail,
  rehydrate,
} = authSlice.actions;
export default authSlice.reducer;
