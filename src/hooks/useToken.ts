import Config from 'react-native-config'
import { useAppSelector } from '../store/store'

export const useToken = () => Config.test_token
// useAppSelector(({ accounts }) => accounts.selectedAccount?.accessToken)
