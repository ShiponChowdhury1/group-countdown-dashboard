import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface AuthUserDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  is_email_verified: boolean;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access: string;
  refresh: string;
  user: AuthUserDto;
}

export interface SendOtpRequest {
  email: string;
}

export interface SendOtpResponse {
  message: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp_code: string;
  /** "email_verification" */
  otp_type: string;
}

export interface VerifyOtpResponse {
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ProfileResponse {
  user: AuthUserDto;
  subscription: {
    plan: string;
    billing_cycle: string | null;
    valid_until: string | null;
    is_active: boolean;
    is_premium: boolean;
    created_at: string;
    updated_at: string;
  };
  activity_summary: {
    events: number;
    total_tasks: number;
    completed: number;
  };
}

export interface UpdateProfileRequest {
  name: string;
  phone: string;
  image?: File;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

// ─── API slice ────────────────────────────────────────────────────────────────

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    /**
     * Attach Bearer token from Redux state (or localStorage fallback so the
     * very first request after a reload also gets the header).
     * NOTE: Do NOT set Content-Type here — let the browser set it for
     * FormData (multipart) requests; fetchBaseQuery sets it for JSON automatically.
     */
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");

      // Primary: token already in Redux state
      const token = (
        getState() as { auth: { accessToken: string | null } }
      ).auth.accessToken;

      // Fallback: token persisted to localStorage (needed on first render
      // before StoreProvider has fully hydrated, or after a hard reload)
      const resolvedToken =
        token ??
        (typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null);

      if (resolvedToken) {
        headers.set("Authorization", `Bearer ${resolvedToken}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    // ── Auth ─────────────────────────────────────────────────────────────────

    /** POST /auth/login/ */
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body,
      }),
    }),

    /** POST /auth/forgot-password/send-otp/ */
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: (body) => ({
        url: "/auth/forgot-password/send-otp/",
        method: "POST",
        body,
      }),
    }),

    /** POST /auth/forgot-password/verify-otp/ */
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "/auth/forgot-password/verify-otp/",
        method: "POST",
        body,
      }),
    }),

    /** POST /auth/forgot-password/reset/ */
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>(
      {
        query: (body) => ({
          url: "/auth/forgot-password/reset/",
          method: "POST",
          body,
        }),
      }
    ),

    // ── Profile ───────────────────────────────────────────────────────────────

    /** GET /profile/ — cached and tagged so updateProfile can invalidate it */
    getProfile: builder.query<ProfileResponse, void>({
      async queryFn(_, { getState }) {
        const token =
          (getState() as { auth: { accessToken: string | null } }).auth
            .accessToken ??
          (typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null);

        try {
          const response = await fetch("/api/proxy/profile/", {
            method: "GET",
            headers: {
              Accept: "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            cache: "no-store",
          });

          const data = await response.json().catch(() => null);

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data,
              },
            };
          }

          return { data: data as ProfileResponse };
        } catch (error) {
          return {
            error: {
              status: "FETCH_ERROR",
              data: String(error),
            },
          };
        }
      },
      providesTags: ["Profile"],
    }),

    /**
     * PATCH /profile/update/ — sends multipart FormData so image uploads work.
     * On success: invalidates the Profile cache so every getProfile subscriber
     * (TopNav, PersonalDetails, etc.) automatically re-fetches the fresh data.
     */
    updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
      query: ({ name, phone, image }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        if (image) formData.append("image", image);
        return {
          url: "/profile/update/",
          method: "PATCH",
          body: formData,
          // Do NOT set Content-Type header — browser will add it with the
          // correct multipart boundary automatically.
          formData: true,
        };
      },
      // Invalidate the profile cache → triggers automatic re-fetch everywhere
      invalidatesTags: ["Profile"],
      // Also eagerly push the returned user into Redux state so the UI
      // updates instantly without waiting for the re-fetch round-trip.
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch {}
      },
    }),

    /**
     * POST /profile/change-password/
     * Body: { current_password, new_password }
     */
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/profile/change-password/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
