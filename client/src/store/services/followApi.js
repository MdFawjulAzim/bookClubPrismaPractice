import { api } from "./api";

export const followApi = api.injectEndpoints({
  endpoints: (build) => ({
    followUser: build.mutation({
      query: (data) => ({ url: "/follows", method: "POST", body: data }),
      invalidatesTags: ["Users"],
    }),
    unfollowUser: build.mutation({
      query: (data) => ({ url: "/follows", method: "DELETE", body: data }),
      invalidatesTags: ["Users"],
    }),
    getFollowers: build.query({
      query: (id) => `/follows/followers/${id}`,
      providesTags: ["Users"],
    }),
    getFollowing: build.query({
      query: (id) => `/follows/following/${id}`,
      providesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = followApi;
