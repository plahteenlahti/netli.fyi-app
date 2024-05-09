import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { useCurrentOfferings } from '@hooks/iap/subscription'

import { RootStackParamList } from '@navigators/RootStack'
import { NavigationRow } from '../row/NavigationRow'
import { View } from 'react-native'

export const ProfileSubscriptionPrompt = () => {
  const offerings = useCurrentOfferings()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const goToSubscription = () => {
    navigation.navigate('Subscription')
  }

  return (
    <View className="m-2 flex-1 bg-white rounded-md">
      <NavigationRow
        hideDivider
        title="Netli.fyi Pro"
        value="Keep it up"
        type="navigation"
        onPress={goToSubscription}
      />
    </View>
  )
}
