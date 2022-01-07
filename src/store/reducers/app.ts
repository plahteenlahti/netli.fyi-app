import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    theme: 'light',
    followSystemTheme: true
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload
    }
  }
})

export const { toggleTheme } = appSlice.actions

export default appSlice.reducer
