import { baseApi } from "../baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        method: "GET",
        url: `/orders`,
      }),
      providesTags: ["orders"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/orders`,
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useCreateOrderMutation } = ordersApi;
