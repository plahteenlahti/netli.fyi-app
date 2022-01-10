import { combineReducers } from 'redux'
import appReducer from './app'
import accountsReducer from './accounts'

const rootReducer = combineReducers({
  app: appReducer,
  accounts: accountsReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
