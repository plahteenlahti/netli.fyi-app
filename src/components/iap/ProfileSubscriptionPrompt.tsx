import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '@navigators/RootStack'
import { View } from 'react-native'
import { NavigationRow } from '../row/NavigationRow'

export const ProfileSubscriptionPrompt = () => {
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
