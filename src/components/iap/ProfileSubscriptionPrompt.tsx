import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useCurrentOfferings } from '../../hooks/iap/subscription'

import { RootStackParamList } from '../../navigators/RootStack'
import { Card } from '../Card'
import { NavigationRow } from '../row/NavigationRow'

export const ProfileSubscriptionPrompt = () => {
  const offerings = useCurrentOfferings()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const goToSubscription = () => {
    navigation.navigate('Subscription')
  }

  return (
    <Card>
      <NavigationRow
        hideDivider
        title="Netli.fyi Pro"
        value="Keep it up"
        type="navigation"
        onPress={goToSubscription}
      />
    </Card>
  )
}
