import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload || {}
      state.accessToken = accessToken ?? null
      if (refreshToken !== undefined) state.refreshToken = refreshToken ?? null
      state.isAuthenticated = Boolean(accessToken)
    },
    logout: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
    },
  },
})

export const { setTokens, logout } = authSlice.actions

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAccessToken = (state) => state.auth.accessToken

export default authSlice.reducer
