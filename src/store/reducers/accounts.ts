import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = Array<{
  accessToken: string
}>

const initialState: State = []

const accountsSlice = createSlice({
  name: 'accountsSlice',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.push(action.payload)
    },
    removeAccount: (state, action) => {
      state = state.filter((accessToken) => accessToken !== action.payload)
    }
  }
})

export const { addAccount } = accountsSlice.caseReducers

export default accountsSlice.reducer
