import { useAppSelector } from '../store/store'

export const useToken = () =>
  useAppSelector(({ accounts }) => accounts.selectedAccount?.accessToken)
