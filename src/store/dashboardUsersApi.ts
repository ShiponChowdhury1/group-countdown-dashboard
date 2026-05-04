import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DashboardUserDto {
  id: string;
  name: string;
  email: string;
  image: string | null;
  groups: number;
  subscription: string;
  status: string;
}

export interface DashboardUsersResponse {
  total: number;
  total_pages: number;
  current_page: number;
  users: DashboardUserDto[];
}

export interface DashboardUsersQueryParams {
  page?: number;
}

export interface DashboardUserDetailsResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  image: string | null;
  groups: number;
  subscription: {
    plan: string;
    billing_cycle: string | null;
    valid_until: string | null;
    is_active: boolean;
    is_premium: boolean;
  };
  status: string;
  is_email_verified: boolean;
  created_at: string;
}

export interface DashboardDeleteUserResponse {
  message: string;
}

export interface DashboardSetUserStatusRequest {
  id: string;
  is_active: boolean;
}

export interface DashboardSetUserStatusResponse {
  message: string;
  status: "Active" | "Inactive";
}

export interface DashboardOverviewResponse {
  total_users: number;
  active_groups: number;
  total_tasks: number;
  active_subscriptions: number;
}

export interface DashboardUserGrowthItem {
  month: string;
  count: number;
}

export interface DashboardSubscriptionGrowthItem {
  month: string;
  count: number;
}

export const dashboardUsersApi = createApi({
  reducerPath: "dashboardUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (typeof document !== "undefined") {
        const csrfCookie = document.cookie
          .split(";")
          .map((part) => part.trim())
          .find((part) => part.startsWith("csrftoken="));

        if (csrfCookie) {
          const csrf = csrfCookie.split("=")[1];
          if (csrf) headers.set("X-CSRFTOKEN", csrf);
        }
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDashboardSubscriptionGrowth: builder.query<
      DashboardSubscriptionGrowthItem[],
      void
    >({
      query: () => "/api/proxy/dashboard/subscription-growth/",
    }),
    getDashboardUserGrowth: builder.query<DashboardUserGrowthItem[], void>({
      query: () => "/api/proxy/dashboard/user-growth/",
    }),
    getDashboardOverview: builder.query<DashboardOverviewResponse, void>({
      query: () => "/api/proxy/dashboard/overview/",
    }),
    getDashboardUsers: builder.query<
      DashboardUsersResponse,
      DashboardUsersQueryParams | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set("page", String(params.page));

        const qs = searchParams.toString();
        return `/api/proxy/dashboard/users/${qs ? `?${qs}` : ""}`;
      },
    }),
    getDashboardUserDetails: builder.query<DashboardUserDetailsResponse, string>({
      query: (id) => `/api/proxy/dashboard/users/${id}/`,
    }),
    deleteDashboardUser: builder.mutation<DashboardDeleteUserResponse, string>({
      query: (id) => ({
        url: `/api/proxy/dashboard/users/${id}/delete/`,
        method: "DELETE",
      }),
    }),
    setDashboardUserStatus: builder.mutation<
      DashboardSetUserStatusResponse,
      DashboardSetUserStatusRequest
    >({
      query: ({ id, is_active }) => ({
        url: `/api/proxy/dashboard/users/${id}/set-status/`,
        method: "PATCH",
        body: { is_active },
      }),
    }),
  }),
});

export const {
  useGetDashboardSubscriptionGrowthQuery,
  useGetDashboardUserGrowthQuery,
  useGetDashboardOverviewQuery,
  useGetDashboardUsersQuery,
  useGetDashboardUserDetailsQuery,
  useDeleteDashboardUserMutation,
  useSetDashboardUserStatusMutation,
} = dashboardUsersApi;
