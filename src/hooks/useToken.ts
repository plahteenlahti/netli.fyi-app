import Config from 'react-native-config'
import { useAppSelector } from '../store/store'

export const useToken = () =>
  useAppSelector(({ accounts }) => accounts.selectedAccount?.accessToken)
