// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setTokens, logout } from '../features/auth/authSlice'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'https://api.example.com',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('accept', 'application/json')
    return headers
  },
  credentials: 'include', 
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // Try refresh token
    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const { accessToken, refreshToken } = refreshResult.data
      api.dispatch(setTokens({ accessToken, refreshToken }))
      // Retry original request
      result = await rawBaseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'User'],
  endpoints: () => ({}),
})
