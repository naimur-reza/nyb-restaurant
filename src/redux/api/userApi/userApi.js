import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        method: "GET",
        url: `/users`,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
