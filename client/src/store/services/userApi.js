import { api } from "./api"

/**
 * Endpoints:
 * - GET  /users/me
 * - PATCH /users/me  (Partial update: { name?, avatarUrl? })
 * If your backend already uses /auth/me for profile, you can skip this file.
 */
export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => ({ url: '/users/me' }),
      providesTags: ['User'],
    }),

    updateMyProfile: build.mutation({
      query: (body) => ({ url: '/users/me', method: 'PATCH', body }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = userApi
