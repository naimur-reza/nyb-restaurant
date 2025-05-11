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
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `/orders/${id}`,
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/orders/${id}`,
      }),
      invalidatesTags: ["orders"],
  }),
  }),
});

export const { useGetAllOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation } = ordersApi;