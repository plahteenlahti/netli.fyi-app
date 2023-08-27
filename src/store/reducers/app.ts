import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

type State = {
  theme: 'light'
  followSystemTheme: boolean
}

const initialState: State = {
  theme: 'light',
  followSystemTheme: true
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<'light'>) => {
      state.theme = action.payload
    }
  }
})

export const { toggleTheme } = appSlice.actions

export default appSlice.reducer
