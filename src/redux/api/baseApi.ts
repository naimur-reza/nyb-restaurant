/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set(`authorization`, `bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["auth", "orders", "user"],
});
