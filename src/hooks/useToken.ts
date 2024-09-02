import Config from 'react-native-config'
import { useAppSelector } from '../store/store'

export const useToken = () => {
  const token = useAppSelector(
    ({ accounts }) => accounts.selectedAccount?.accessToken
  )

  if (__DEV__ && !token) {
    return Config.test_token
  }

  return token
}
