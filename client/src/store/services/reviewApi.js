import { api } from "./api";

export const reviewApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query({
      query: () => "/reviews",
      providesTags: ["Reviews"],
    }),
    createReview: build.mutation({
      query: (data) => ({ url: "/reviews", method: "POST", body: data }),
      invalidatesTags: ["Reviews", "Books"],
    }),
    updateReview: build.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews", "Books"],
    }),
    deleteReview: build.mutation({
      query: (id) => ({ url: `/reviews/${id}`, method: "DELETE" }),
      invalidatesTags: ["Reviews", "Books"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
