import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    // Register user
    register: builder.mutation({
      query: (credentials) => ({
        url: `/auth/register`,
        method: "POST",
        data: credentials,
      }),
    }),

    // Login user
    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        data: credentials,
      }),
    }),

    // Get me
    getMe: builder.query({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery } = authApi;
