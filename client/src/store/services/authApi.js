import { api } from './api'
import { setTokens, logout } from '../features/auth/authSlice'

/**
 * Endpoints:
 * - POST /auth/login -> { accessToken, refreshToken? }
 * - GET  /auth/me    -> { id, name, email, role? }
 * - POST /auth/logout
 */
export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }))
          // Let others refetch anything user-related
          dispatch(authApi.util.invalidateTags(['Auth', 'User']))
        } catch {
          // no-op; error handled by component
        }
      },
    }),

    me: build.query({
      query: () => ({ url: '/auth/me' }),
      providesTags: ['Auth', 'User'],
    }),

    logoutServer: build.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try { await queryFulfilled } finally { dispatch(logout()) }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation,
  useMeQuery,
  useLogoutServerMutation,
} = authApi
