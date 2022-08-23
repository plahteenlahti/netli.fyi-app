import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import analytics from '@react-native-firebase/analytics'

type State = {
  theme: 'light'
  followSystemTheme: boolean
  analyticsEnabled: boolean
}

const initialState: State = {
  theme: 'light',
  followSystemTheme: true,
  analyticsEnabled: false
}

export const toggleAnalytics = createAsyncThunk(
  'analytics/enable',
  async (value: boolean) => {
    await analytics().setAnalyticsCollectionEnabled(value)
    return value
  }
)

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<'light'>) => {
      state.theme = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(toggleAnalytics.fulfilled, (state, action) => {
      state.analyticsEnabled = action.payload
    })
  }
})

export const { toggleTheme } = appSlice.actions

export default appSlice.reducer
