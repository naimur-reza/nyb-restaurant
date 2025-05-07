 
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: object) => ({
        method: "POST",
        url: `/login`,
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    registerUser: builder.mutation({
      query: (data: object) => ({
        method: "POST",
        url: `/register`,
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
} = authApi;