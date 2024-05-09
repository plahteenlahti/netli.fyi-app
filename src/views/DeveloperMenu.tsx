import { TouchableOpacity, View } from 'react-native'
import { CardTitle } from '@components/CardTitle'
import { Text } from '@components/text/Text'
import { removeAllAccounts } from '../store/reducers/accounts'
import { useAppDispatch, useAppSelector } from '../store/store'

export const DeveloperMenu = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(
    ({ accounts }) => accounts.selectedAccount?.accessToken
  )

  const deleteToken = () => {
    dispatch(removeAllAccounts())
  }

  return (
    <View>
      <Text className="border-b border-gray-300 dark:border-gray-700 rounded-md p-4 mb-4">
        {token}
      </Text>
      <TouchableOpacity
        onPress={deleteToken}
        className="border-b border-gray-300 dark:border-gray-700 rounded-md p-4 mb-4">
        <Text>Delete all accounts</Text>
      </TouchableOpacity>
    </View>
  )
}
