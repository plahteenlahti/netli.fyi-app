import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Account = {
  createdAt: string
  accessToken: string
  name: string
}

type State = {
  selectedAccount: undefined | Account
  accounts: Array<Account>
  selectedTeam: string | undefined
}

const initialState: State = {
  selectedAccount: undefined,
  accounts: [],
  selectedTeam: undefined
}

const accountsSlice = createSlice({
  name: 'accountsSlice',
  initialState,
  reducers: {
    addAccountFirstTime: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload)
      state.selectedAccount = action.payload
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload)
    },
    removeAccount: (state, action: PayloadAction<Account>) => {
      state.accounts = state.accounts.filter(
        (account) => account.accessToken !== action.payload.accessToken
      )
    },
    setSelectedAccount: (state, action: PayloadAction<Account>) => {
      state.selectedAccount = action.payload
    }
  }
})

export const {
  addAccount,
  removeAccount,
  setSelectedAccount,
  addAccountFirstTime
} = accountsSlice.actions

export default accountsSlice.reducer
